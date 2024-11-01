const { contas } = require("../database/bd");

const deletAccountValidate = (req, res, next) => {
  const { numeroConta } = req.params;
  const foundAccountByNumber = contas.find(
    ({ numero }) => numero === String(numeroConta)
  );

  if (!numeroConta || !foundAccountByNumber) {
    return res.status(404).json({
      message: `Número da conta é inválido! Conta não encontrada.`,
    });
  }
  next();
};

module.exports = {
  deletAccountValidate,
};
