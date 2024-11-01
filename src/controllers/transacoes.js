let {
  contas,
  saques,
  depositos,
  transferencias,
} = require("../database/bd");

const depositIntoAccount = (req, res) => {
  const { numero_conta, valor } = req.body;
  const foundAccountByNumber = contas.find(
    ({ numero }) => numero === numero_conta
  );

  foundAccountByNumber.saldo += valor;
  const newRegister = {
    data: dateAndHourGenerate(),
    numero_conta,
    valor,
  };

  depositos.push(newRegister);

  return res.status(201).send();
};

const withdrawFromAnAccount = (req, res) => {
  const { numero_conta, valor } = req.body;
  const foundAccountByNumber = contas.find(
    ({ numero }) => numero === numero_conta
  );

  if (foundAccountByNumber.saldo < valor) {
    return res
      .status(403)
      .json({
        mensagem: `Não há saldo na conta para sacar o valor de ${valor}`,
      })
      .send();
  }
  if (valor <= 0) {
    return res
      .status(403)
      .json({
        mensagem: `Não é permitido sacar o valor de ${valor}`,
      })
      .send();
  }

  if (foundAccountByNumber.saldo < valor) {
    return res
      .status(403)
      .json({
        mensagem: `Não há saldo na conta para sacar o valor de ${valor}`,
      })
      .send();
  }

  foundAccountByNumber.saldo -= valor;

  const newRegister = {
    data: dateAndHourGenerate(),
    numero_conta,
    valor,
  };

  saques.push(newRegister);

  return res.status(201).send();
};

const transfer = (req, res) => {
  const transactions = req.body; 

  const results = transactions.map(({ numero_conta_origem, numero_conta_destino, valor }) => {
    const foundOriginAccountByNumber = contas.find(
      ({ numero }) => numero === numero_conta_origem
    );
    const foundTargetAccountByNumber = contas.find(
      ({ numero }) => numero === numero_conta_destino
    );

    if (foundOriginAccountByNumber.saldo < valor) {
      return {
        sucesso: false,
        mensagem: `Saldo insuficiente na conta ${numero_conta_origem}.`,
      };
    }

    foundOriginAccountByNumber.saldo -= valor;
    foundTargetAccountByNumber.saldo += valor;

    const newRegister = {
      data: dateAndHourGenerate(),
      numero_conta_origem,
      numero_conta_destino,
      valor,
    };

    transferencias.push(newRegister);

    return {
      sucesso: true,
      mensagem: `Transferência de ${valor} realizada da conta ${numero_conta_origem} para ${numero_conta_destino}.`,
    };
  });

  return res.status(200).json(results);
};

function dateAndHourGenerate() {
  const dateAndHourOfTransaction = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  return dateAndHourOfTransaction;
}
module.exports = { depositIntoAccount, withdrawFromAnAccount, transfer };
