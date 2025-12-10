import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase-config'

export const useFuncionariosStore = defineStore('funcionarios', () => {
  const funcionarios = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Buscar todos os funcionários
  const fetchFuncionarios = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('funcionarios')
        .select('*')
        .order('criado_em', { ascending: false })
      
      if (err) throw err
      funcionarios.value = data || []
    } catch (err) {
      error.value = err.message
      console.error('Erro ao buscar funcionários:', err)
    } finally {
      loading.value = false
    }
  }

  // Criar novo funcionário
  const criarFuncionario = async (dados) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('funcionarios')
        .insert([{
          nome: dados.nome,
          cpf: dados.cpf,
          data_nascimento: dados.dataNascimento,
          data_contratacao: dados.dataContratacao,
          cargo: dados.cargo,
          salario_base: parseFloat(dados.salarioBase),
          telefone: dados.telefone,
          email: dados.email,
          endereco: dados.endereco,
          status: 'ativo'
        }])
        .select()
      
      if (err) throw err
      
      // Registrar auditoria
      await registrarAuditoria('criar', 'funcionarios', data[0].id, null, data[0])
      
      funcionarios.value.unshift(data[0])
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Atualizar funcionário
  const atualizarFuncionario = async (id, dados) => {
    loading.value = true
    error.value = null
    try {
      // Buscar dados anteriores
      const { data: anterior } = await supabase
        .from('funcionarios')
        .select('*')
        .eq('id', id)
        .single()

      const { data, error: err } = await supabase
        .from('funcionarios')
        .update({
          nome: dados.nome,
          cpf: dados.cpf,
          data_nascimento: dados.dataNascimento,
          data_contratacao: dados.dataContratacao,
          cargo: dados.cargo,
          salario_base: parseFloat(dados.salarioBase),
          telefone: dados.telefone,
          email: dados.email,
          endereco: dados.endereco,
          atualizado_em: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (err) throw err

      // Registrar auditoria
      await registrarAuditoria('atualizar', 'funcionarios', id, anterior[0], data[0])

      const index = funcionarios.value.findIndex(f => f.id === id)
      if (index !== -1) {
        funcionarios.value[index] = data[0]
      }
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Deletar funcionário (marcar como inativo)
  const deletarFuncionario = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data: anterior } = await supabase
        .from('funcionarios')
        .select('*')
        .eq('id', id)
        .single()

      const { data, error: err } = await supabase
        .from('funcionarios')
        .update({ 
          status: 'inativo',
          data_demissao: new Date().toISOString().split('T')[0]
        })
        .eq('id', id)
        .select()

      if (err) throw err

      // Registrar auditoria
      await registrarAuditoria('deletar', 'funcionarios', id, anterior[0], data[0])

      funcionarios.value = funcionarios.value.filter(f => f.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Registrar auditoria
  const registrarAuditoria = async (acao, tabela, registroId, anterior, novo) => {
    try {
      await supabase
        .from('auditoria')
        .insert([{
          usuario_email: 'admin@domestic-iq.local',
          acao,
          tabela,
          registro_id: registroId,
          valores_anteriores: anterior,
          valores_novos: novo
        }])
    } catch (err) {
      console.error('Erro ao registrar auditoria:', err)
    }
  }

  return {
    funcionarios,
    loading,
    error,
    fetchFuncionarios,
    criarFuncionario,
    atualizarFuncionario,
    deletarFuncionario
  }
})
