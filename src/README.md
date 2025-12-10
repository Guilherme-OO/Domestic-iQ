# Domestic-iQ - Gestor de Funcionários Domésticos

Aplicação web para gerenciar funcionários domésticos, pagamentos, benefícios e auditoria completa.

## ⚡ Início Rápido

### 1. Clone o Projeto
```bash
git clone <seu-repo>
cd domestic-iq
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure o Supabase
1. Abra `src/lib/supabase-config.js`
2. Adicione sua URL do Supabase
3. Adicione sua Publishable Key

### 4. Execute o Projeto
```bash
npm run dev
```

Acesse: **http://localhost:5173**

## 📁 Estrutura de Pastas

```
domestic-iq/
├── src/
│   ├── components/
│   │   ├── Dashboard.vue          # Tela principal
│   │   ├── FuncionarioForm.vue    # Cadastro de funcionário
│   │   ├── PagamentosForm.vue     # Registro de pagamentos
│   │   ├── Relatorios.vue         # Relatórios simples
│   │   └── Navbar.vue             # Navegação
│   ├── stores/
│   │   ├── funcionarios.js        # Estado dos funcionários
│   │   └── pagamentos.js          # Estado dos pagamentos
│   ├── lib/
│   │   └── supabase-config.js     # Configuração Supabase
│   ├── App.vue                    # Aplicação principal
│   ├── main.js                    # Entrada
│   └── style.css                  # Estilos globais
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Funcionalidades

✅ Cadastrar funcionário com dados pessoais  
✅ Registrar pagamentos (salário, benefícios, etc)  
✅ Ver histórico completo de pagamentos  
✅ Dashboard com resumo financeiro  
✅ Relatórios simples em PDF  
✅ Auditoria de todas as ações  
✅ Interface responsiva e fácil de usar  

## 🔧 Tecnologias

- **Vue 3** - Framework reativo
- **Supabase** - Banco de dados e autenticação
- **Pinia** - Gerenciamento de estado
- **TailwindCSS** - Estilos
- **Vite** - Build tool rápido

## 💾 Banco de Dados

O Supabase já possui 3 tabelas criadas:

1. **funcionarios** - Dados dos funcionários
2. **pagamentos** - Histórico de pagamentos
3. **auditoria** - Log de todas as ações

## 🚀 Deploy

Para colocar em produção:

```bash
npm run build
```

Hospede a pasta `dist/` em qualquer servidor web (Netlify, Vercel, seu próprio servidor, etc)

## ❓ Dúvidas?

Cada arquivo possui comentários explicativos.

---

**Versão 1.0** | Criado em Dezembro 2025
