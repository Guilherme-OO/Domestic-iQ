# 🚀 GUIA SUPER RÁPIDO - Domestic-iQ (20 Dias para Usar)

## **PASSO 1: Você JÁ FEZ** ✅

- ✅ Criou conta no Supabase
- ✅ Criou projeto "domestic-iq"
- ✅ Criou as 3 tabelas (funcionarios, pagamentos, auditoria)
- ✅ Tem a URL e a chave pública

## **PASSO 2: ABRIR O APLICATIVO (5 MINUTOS)**

### **Opção A: Usar DIRETO em HTML (Mais Fácil!)**

1. Abra o arquivo `domestic-iq.html` que geramos
2. Abra com **qualquer navegador** (Chrome, Safari, Firefox, Edge)
3. **PRONTO!** Está funcionando! 🎉

Não precisa instalar nada. Não precisa de terminal. Não precisa de configuração.

### **Opção B: Usar no Seu Computador (Um Pouco Mais Complexo)**

Se você quer ter a estrutura Vue + Vite profissional:

```bash
# 1. Abra Terminal/CMD na pasta do projeto
npm create vite@latest domestic-iq -- --template vue
cd domestic-iq

# 2. Instale dependências
npm install @supabase/supabase-js pinia axios

# 3. Copie os arquivos Vue que geramos

# 4. Execute
npm run dev

# 5. Abra http://localhost:5173
```

**MAS RECOMENDO OPÇÃO A** (muito mais simples!) até você estar confortável.

---

## **PASSO 3: USANDO O APLICATIVO**

### **Na Aba "Funcionário":**
1. Preencha o formulário com dados do funcionário
2. Clique "Salvar Funcionário"
3. Vê lista de funcionários abaixo

### **Na Aba "Pagamentos":**
1. Selecione o funcionário
2. Escolha tipo de pagamento (Salário, Benefício, etc)
3. Adicione valor, data, mês/ano
4. Clique "Registrar Pagamento"

### **Na Aba "Dashboard":**
- Ver total gasto este mês
- Ver funcionários ativos
- Ver últimos pagamentos

### **Na Aba "Relatórios":**
- Ver quanto gastou por tipo de pagamento
- Ver quanto gastou por funcionário

---

## **PRÓXIMOS PASSOS (PRÓXIMAS 2 SEMANAS)**

Depois que você usar um pouco, posso:

1. ✅ **Adicionar autenticação** (login/senha)
2. ✅ **Adicionar offline mode** (funciona sem internet)
3. ✅ **Adicionar exportação PDF** (para impressão)
4. ✅ **Adicionar backup automático**
5. ✅ **Fazer interface mobile melhor** (celular)

---

## **DÚVIDAS COMUNS**

### "E se eu fechar o navegador?"
Não perca dados! Tudo está no Supabase. Abre de novo e vê tudo.

### "E se internet cair?"
Você pode adicionar dados e depois sincroniza (implementaremos em breve).

### "E se eu tiver mais de 1 funcionário?"
Funciona normal! O app escala para qualquer quantidade.

### "Como eu acesso de outro computador?"
Acessa o arquivo HTML novamente de qualquer computador com internet.

### "Como eu hospedo na internet?"
Nos próximos dias, colocamos numa URL pública para você acessar de qualquer lugar.

---

## **ESTRUTURA DE ARQUIVOS VOCÊ RECEBEU**

Se quiser usar a versão completa (Vue + Vite):

```
domestic-iq/
├── supabase-config.js      ← Suas credenciais
├── funcionarios-store.js   ← Lógica de funcionários
├── pagamentos-store.js     ← Lógica de pagamentos
├── README.md               ← Documentação
└── domestic-iq.html        ← USAR ESSA AGORA!
```

---

## **COMEÇAR AGORA**

1. **Abra o arquivo `domestic-iq.html`** com seu navegador
2. **Clique em "Funcionário"** e cadastre seu primeiro funcionário
3. **Clique em "Pagamentos"** e registre o primeiro pagamento
4. **Vá ao Dashboard** e veja os resumos

**Pronto! Você tem seu app funcionando!** 🎉

---

## **PRECISA DE AJUDA?**

- Qualquer dúvida com o Supabase → docs.supabase.com (em inglês, mas Google Translate ajuda)
- Qualquer erro no app → avise e corrijo
- Quer adicionar mais funcionalidade → pode pedir

---

**Versão 1.0 | Dezembro 2025**
**Pronto para usar em 20 dias? Faltam 18! 🚀**
