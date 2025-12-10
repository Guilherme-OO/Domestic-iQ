import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase-config'

export const usePagamentosStore = defineStore('pagamentos', () => {
  const pagamentos = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Buscar todos os pagamentos
  const fetchPagamentos = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('pagamentos')
        .select(`
          *,
          funcionarios (
            id,
            nome,
            cpf
          )
        `)
        .order('data_pagamento', { ascending: false })
      
      if (err) throw err
      pagamentos.value = data || []
    } catch (err) {
      error.value = err.message
      console.error('Erro ao buscar pagamentos:', err)
    } finally {
      loading.value = false
    }
  }

  // Buscar pagamentos de um funcionário específico
  const fetchPagamentosPorFuncionario = async (funcionarioId) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('pagamentos')
        .select('*')
        .eq('funcionario_id', funcionarioId)
        .order('data_pagamento', { ascending: false })
      
      if (err) throw err
      return data || []
    } catch (err) {
      error.value = err.message
      console.error('Erro ao buscar pagamentos:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // Criar novo pagamento
  const criarPagamento = async (dados) => {
    loading.value = true
    error.value = null
    try {
      // Formatar data
      const dataPagamento = new Date(dados.dataPagamento).toISOString().split('T')[0]
      
      const { data, error: err } = await supabase
        .from('pagamentos')
        .insert([{
          funcionario_id: dados.funcionarioId,
          tipo: dados.tipo,
          descricao: dados.descricao,
          valor: parseFloat(dados.valor),
          data_pagamento: dataPagamento,
          mes_ano_referencia: dados.mesAnoReferencia,
          comprovante_url: dados.comprovanteUrl || null
        }])
        .select()
      
      if (err) throw err

      // Registrar auditoria
      await registrarAuditoria('criar', 'pagamentos', data[0].id, null, data[0])

      pagamentos.value.unshift(data[0])
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Atualizar pagamento
  const atualizarPagamento = async (id, dados) => {
    loading.value = true
    error.value = null
    try {
      // Buscar dados anteriores
      const { data: anterior } = await supabase
        .from('pagamentos')
        .select('*')
        .eq('id', id)
        .single()

      const dataPagamento = new Date(dados.dataPagamento).toISOString().split('T')[0]

      const { data, error: err } = await supabase
        .from('pagamentos')
        .update({
          tipo: dados.tipo,
          descricao: dados.descricao,
          valor: parseFloat(dados.valor),
          data_pagamento: dataPagamento,
          mes_ano_referencia: dados.mesAnoReferencia,
          atualizado_em: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (err) throw err

      // Registrar auditoria
      await registrarAuditoria('atualizar', 'pagamentos', id, anterior[0], data[0])

      const index = pagamentos.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pagamentos.value[index] = data[0]
      }
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Deletar pagamento
  const deletarPagamento = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data: anterior } = await supabase
        .from('pagamentos')
        .select('*')
        .eq('id', id)
        .single()

      const { error: err } = await supabase
        .from('pagamentos')
        .delete()
        .eq('id', id)

      if (err) throw err

      // Registrar auditoria
      await registrarAuditoria('deletar', 'pagamentos', id, anterior[0], null)

      pagamentos.value = pagamentos.value.filter(p => p.id !== id)
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
    pagamentos,
    loading,
    error,
    fetchPagamentos,
    fetchPagamentosPorFuncionario,
    criarPagamento,
    atualizarPagamento,
    deletarPagamento
  }
})
