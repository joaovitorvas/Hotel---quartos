var express = require("express");
var router = express.Router();
const tipoQuartosController = require("../controllers/tipoQuartosController");
const UsuarioController = require("../controllers/UsuarioController");
const { body, validationResult } = require("express-validator");

// Rota padrão para a página inicial
router.get("/", function (req, res) {
    res.render("pages/template-home", { pagina: "home", logado: req.session.user | null });
});

// Rota para listar tipos de quartos paginados
router.get(`/quartos`, function (req, res) {
    tipoQuartosController.listarTiposQuartosPaginados(req, res);
});

// Rota para página estática de quartos
router.get("/quartos-estatico", function (req, res) {
    res.render("pages/template-home", { pagina: "quartos-estatico", logado: null });
});

// Rota para página de login
router.get("/login", function (req, res) {
    res.render("pages/template-home", { pagina: "login", logado: null });
});

// Rota para página de cadastro de usuário
router.get("/cadastro", function (req, res) {
    res.render("pages/template-home", { pagina: "cadastro", logado: null, retorno: null, listaErros: null, dados: null });
});

// Rota para página de perfil
router.get("/perfil", function (req, res) {
    res.render("pages/template-home", { pagina: "perfil", logado: null });
});

// Rota para página de administração principal
router.get("/adm", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "index" });
});

// Rota para página de administração de clientes
router.get("/adm-cliente", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/index" });
});

// Rota para página de criação de novo cliente
router.get("/adm-cliente-novo", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/create" });
});

// Rota para página de edição de cliente
router.get("/adm-cliente-edit", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/edit" });
});

// Rota para página de detalhes de cliente
router.get("/adm-cliente-list", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/detalhes" });
});

// Rota para página de exclusão de cliente
router.get("/adm-cliente-del", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/delete" });
});

router.get('/login', (req, res) => {
    res.render('pages/template-home', { pagina: 'login', logado: req.session.user });
});

router.post('/login', UsuarioController.regrasValidacaoLogin, UsuarioController.LoginUsuario);

// Rota para página de cadastro de usuário
router.get('/cadastro', (req, res) => {
    res.render('pages/template-home', { pagina: 'cadastro', logado: req.session.user });
});

router.post('/cadastro', UsuarioController.regrasValidacao, UsuarioController.CriarUsuario);

// Rota para logout
router.get('/logout', UsuarioController.LogoutUsuario);

module.exports = router;

