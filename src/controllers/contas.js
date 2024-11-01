let {
  contas,
  saques,
  depositos,
  transferencias,
} = require("../database/bd");

const listAccount = (req, res) => {
  return res.status(200).json({ contas });
};

const createAccount = (req, res) => {
  const newId = createNewId();

  const newAccount = {
    numero: newId,
    saldo: 0
  };

  contas.push(newAccount);
  return res.status(201).send();
};

const deletAccount = (req, res) => {
  const { numeroConta } = req.params;
  const foundAccountByNumber = contas.find(
    ({ numero }) => numero === String(numeroConta)
  );

  const isZeroValueAccount = foundAccountByNumber.saldo === 0;

  if (!isZeroValueAccount) {
    return res.status(404).json({
      mensagem: "A conta só pode ser removida se o saldo for zero!",
    });
  }

  if (isZeroValueAccount) {
    contas = contas.filter((conta) => conta !== foundAccountByNumber);
  }

  return res.status(202).send();
};

const accountBalance = (req, res) => {
  const { numero_conta } = req.query;
  const foundAcountByNumber = contas.find(
    ({ numero }) => numero === numero_conta
  );
  console.log('accountNumber: ', foundAcountByNumber);
  res.status(200).json({ saldo: foundAcountByNumber.saldo });
};

const extract = (req, res) => {
  const { numero_conta } = req.query;

  const foundAccountByNumber = contas.find(
    ({ numero }) => numero === numero_conta
  );

  const getWithdraw = saques.filter(
    (saque) => saque.numero_conta === foundAccountByNumber.numero
  );
  const getDeposit = depositos.filter(
    (deposito) => deposito.numero_conta === foundAccountByNumber.numero
  );

  const getSetTransfers = transferencias.filter(
    (transferencia) =>
      transferencia.numero_conta_origem === foundAccountByNumber.numero
  );

  const getIncomingTransfers = transferencias.filter(
    (transferencia) =>
      transferencia.numero_conta_destino === foundAccountByNumber.numero
  );

  const showExtract = {
    saques: getWithdraw,
    depositos: getDeposit,
    transferenciasEnviadas: getSetTransfers,
    transferenciasRecebidas: getIncomingTransfers,
  };

  return res.status(200).json(showExtract);
};

module.exports = {
  listAccount,
  createAccount,
  deletAccount,
  accountBalance,
  extract,
};

function createNewId() {
  return String(Number(contas[contas.length - 1].numero) + 1);
}
