# 📋 CONFIGURAÇÃO SUPABASE - Passo-a-Passo Detalhado

## **Você já fez:**
- ✅ Criou conta no Supabase
- ✅ Criou projeto "domestic-iq"
- ✅ Copiou URL e chave pública

## **Agora vamos criar as TABELAS no Supabase**

### **PASSO 1: Acessar SQL Editor**

1. Abra seu projeto no Supabase (https://app.supabase.com)
2. No menu esquerdo, clique em **SQL Editor** (ícone de banco de dados)
3. Você verá uma página com "New Query" no topo

### **PASSO 2: Criar Tabela "FUNCIONÁRIOS"**

1. Na página SQL Editor, clique em **"+ New Query"**
2. Uma caixa de texto abrirá
3. **Cole exatamente este código:**

```sql
CREATE TABLE funcionarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  data_nascimento DATE,
  data_contratacao DATE NOT NULL,
  data_demissao DATE,
  cargo TEXT NOT NULL,
  salario_base NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'ativo',
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW()
);
```

4. Clique no botão **RUN** (azul, canto superior direito)
5. Deve aparecer mensagem de sucesso
6. Você vê "funcionarios" aparecer no menu esquerdo

### **PASSO 3: Criar Tabela "PAGAMENTOS"**

1. Clique novamente em **"+ New Query"**
2. **Cole este código:**

```sql
CREATE TABLE pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funcionario_id UUID NOT NULL REFERENCES funcionarios(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  descricao TEXT,
  valor NUMERIC(10, 2) NOT NULL,
  data_pagamento DATE NOT NULL,
  mes_ano_referencia TEXT,
  comprovante_url TEXT,
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW()
);
```

3. Clique **RUN**
4. Deve aparecer mensagem de sucesso

### **PASSO 4: Criar Tabela "AUDITORIA"**

1. Clique novamente em **"+ New Query"**
2. **Cole este código:**

```sql
CREATE TABLE auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_email TEXT,
  acao TEXT,
  tabela TEXT,
  registro_id TEXT,
  valores_anteriores JSONB,
  valores_novos JSONB,
  criado_em TIMESTAMP DEFAULT NOW()
);
```

3. Clique **RUN**
4. Sucesso!

---

## **PASSO 5: Ativar Realtime (IMPORTANTE!)**

Isso faz os dados aparecerem em tempo real no app.

1. No menu esquerdo, vá em **Realtime**
2. Você verá as 3 tabelas: `funcionarios`, `pagamentos`, `auditoria`
3. Para CADA tabela, clique em **"Enable"** (botão azul)
4. Pronto!

---

## **PASSO 6: Verificar Permissões (Row Level Security)**

O Supabase por padrão protege tudo. Para uma app de uso local, vamos liberar:

1. No menu esquerdo, vá em **Authentication** → **Policies**
2. Clique em **"New Policy"** para cada tabela
3. Escolha **"Enable read access for all users"**
4. Clique **"Save"**

Repita para todas as 3 tabelas (funcionarios, pagamentos, auditoria).

---

## **PASSO 7: Pronto! 🎉**

Seu banco está configurado! Agora pode usar o arquivo `domestic-iq.html`:

1. Baixe/salve o arquivo `domestic-iq.html`
2. Abra com seu navegador (Firefox, Chrome, Safari, etc)
3. Comece a usar!

---

## **Resumo das 3 Tabelas**

| Tabela | O que faz |
|--------|-----------|
| **funcionarios** | Armazena nome, CPF, cargo, salário do funcionário |
| **pagamentos** | Registra cada pagamento (salário, benefício, desconto, etc) |
| **auditoria** | Log automático de quem fez o quê e quando |

---

## **Se der erro:**

### Erro: "table already exists"
→ Significa que a tabela já foi criada. Ignore e continue.

### Erro: "permission denied"
→ Vá em Authentication → Policies e ative as permissões.

### Erro ao abrir arquivo HTML
→ Seu navegador bloqueou. Salve o arquivo numa pasta e abra direto do sistema de arquivos.

### O app não conecta ao Supabase
→ Verifique:
- URL do Supabase está correta no arquivo HTML
- Chave pública está correta
- Sua internet está funcionando
- Tabelas foram criadas

---

## **Precisa de ajuda com algo?**

Qualquer erro específico, avise o número da linha e a mensagem exata!

**BOA SORTE!** 🚀
