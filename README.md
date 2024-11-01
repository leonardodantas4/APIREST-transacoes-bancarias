# Teste de API REST para transações bancárias
<img alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Nodejs">

## Como testar:

- Fazer o download ou clonar o repositório;

- Executar o comando ``npm install`` dentro da pasta do projeto para instalar as dependências;

- Em seguida executar o comando ``npm run dev`` para dar início ao servidor local;

- Para testar as requisições da API, foi utilizado o Insomnia.

## Funcionalidades:

- Listar contas bancárias. ``GET`` ``http://localhost:8000/contas``

- Acessar o saldo de determinada conta "X". ``GET`` ``http://localhost:8000/contas/saldo?numero_conta="X"``

- Acessar o extrato de determinada conta "X". ``GET`` ``http://localhost:8000/contas/extrato?numero_conta="X"``

- Criar conta bancária. ``POST`` ``http://localhost:8000/criarConta``

- Deletar uma determinada conta "X". ``DELETE`` ``http://localhost:8000/contas/"X"``

- Depósito de um valor em uma determinada conta. ``POST`` ``http://localhost:8000/transacoes/depositar``

```json
// EXEMPLO DE BODY EM JSON PARA DEPÓSITO

{
	"numero_conta":"3",
	"valor":12096
}
```
- Sacar um valor de uma determinada conta. ``POST`` ``http://localhost:8000/transacoes/sacar``

```json
// EXEMPLO DE BODY EM JSON PARA SAQUE

{
	"numero_conta":"5",
	"valor":12000
}
```

- Transferir um valor entre duas contas. ``POST`` ``http://localhost:8000/transacoes/transferir``

```json
// EXEMPLO DE BODY EM JSON PARA TRANSFERENCIA

[
	{
		"numero_conta_origem": "2",
		"numero_conta_destino": "1",
		"valor": 500
	},
	{
		"numero_conta_origem": "2",
		"numero_conta_destino": "3",
		"valor": 30
	},
	{
		"numero_conta_origem": "3",
		"numero_conta_destino": "4",
		"valor": 150
	}
]

```
