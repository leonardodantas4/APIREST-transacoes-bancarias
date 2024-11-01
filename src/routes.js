const express = require("express");
const routes = express();
const {
  deletAccountValidate,
} = require("./middlewares/mid_contas");
const {
  listAccount,
  createAccount,
  deletAccount,
  accountBalance,
  extract,
} = require("./controllers/contas");

const {
  depositIntoAccountValidate,
  withdrawFromAnAccountValidate,
  transferValidate,
} = require("./middlewares/mid_transacoes");
const {
  depositIntoAccount,
  withdrawFromAnAccount,
  transfer,
} = require("./controllers/transacoes");

routes.get("/contas", listAccount);
routes.get("/contas/saldo", accountBalance);

routes.post("/criarConta", createAccount);

routes.delete("/contas/:numeroConta", deletAccountValidate, deletAccount);
routes.get("/contas/extrato", extract);

routes.post(
  "/transacoes/depositar",
  depositIntoAccountValidate,
  depositIntoAccount
);
routes.post(
  "/transacoes/sacar",
  withdrawFromAnAccountValidate,
  withdrawFromAnAccount
);
routes.post("/transacoes/transferir", transferValidate, transfer);
module.exports = routes;
