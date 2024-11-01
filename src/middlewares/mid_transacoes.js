let { contas } = require("../database/bd");

const depositIntoAccountValidate = (req, res, next) => {
  const { numero_conta, valor } = req.body;
  const isValidDespositValue = valor > 0;
  const isNotAllFillFields = !numero_conta || !valor;
  const isCharacter = typeof valor === "string";

  const foundAccountByNumber = contas.find(
    ({ numero }) => numero === numero_conta
  );

  if (isNotAllFillFields) {
    return res.status(404).json({
      message: `Número da conta e valor do depósito precisam ser informados.`,
    });
  }

  if (isCharacter || !isValidDespositValue) {
    return res.status(404).send({
      mensagem:
        "O valor do depósito não aceita valores negativos ou zerados e nem caracteres.",
    });
  }

  if (!foundAccountByNumber) {
    return res.status(404).json({
      message: `Conta não encontrada.`,
    });
  }

  next();
};

const withdrawFromAnAccountValidate = (req, res, next) => {
  const { numero_conta, valor } = req.body;
  const isNotAllFillFields = !numero_conta || !valor;

  const foundAccountByNumber = contas.find(
    ({ numero }) => numero === numero_conta
  );

  if (isNotAllFillFields) {
    return res.status(400).json({
      mensagem:
        "O numero da conta e o valor do saque devem ser informados!",
    });
  }

  if (!foundAccountByNumber) {
    return res.status(400).json({
      mensagem: "Número de conta inválido!",
    });
  }
  if (foundAccountByNumber.numero !== numero_conta) {
    return res
      .status(400)
      .json({
        mensagem:
          "O número informada não é o número dessa conta!",
      })
      .send();
  }
  next();
};

const transferValidate = (req, res, next) => {
  const transactions = req.body;

  if (!Array.isArray(transactions)) {
    return res.status(403).json({
      mensagem: `O body precisa ser um array de transações.`,
    });
  }

  const errors = [];

  transactions.forEach(({ numero_conta_origem, numero_conta_destino, valor }, index) => {
    const foundOriginAccountByNumber = contas.find(
      ({ numero }) => numero === numero_conta_origem
    );
    const foundTargetAccountByNumber = contas.find(
      ({ numero }) => numero === numero_conta_destino
    );

    const isNotAllFillFields = !numero_conta_origem || !numero_conta_destino || valor == null;
    if (isNotAllFillFields) {
      errors.push({
        index,
        mensagem: `O número da conta de origem, destino e valor são obrigatórios na transação ${index + 1}.`,
      });
      return;
    }

    if (!foundOriginAccountByNumber) {
      errors.push({
        index,
        mensagem: `A conta de número: ${numero_conta_origem} não existe.`,
      });
    }
    if (!foundTargetAccountByNumber) {
      errors.push({
        index,
        mensagem: `A conta de número: ${numero_conta_destino} não existe.`,
      });
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  depositIntoAccountValidate,
  withdrawFromAnAccountValidate,
  transferValidate,
};
