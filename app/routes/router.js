var express = require("express");
var router = express.Router();
const tipoQuartosController = require("../controllers/tipoQuartosController");
var TarefasControl = require("../controllers/control")
const { body, validationResult } = require("express-validator");

const { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado, verificarUsuAutorizado } = require("../models/autenticador_middleware");
const usuarioController = require("../controllers/usuarioController")


router.get("/", function (req, res) {
    res.render("pages/template-home", {pagina:"home", logado:null});
});


router.get(`/quartos`, function (req, res) {
    tipoQuartosController.listarTiposQuartosPaginados(req, res);
});

router.get("/quartos-estatico", function (req, res) {
    res.render("pages/template-home", {pagina:"quartos-estatico", logado:null});
});

router.get("/login", function (req, res) {
    res.render("pages/template-home", {pagina:"login", logado:null});
});

router.get("/cadastro", function (req, res) {
    res.render("pages/template-home", {pagina:"cadastro", logado:null, retorno: null, listaErros: null, dados: null
    
    /* valores: { nome_usuario: ""  , email_usuario:"", senha_usuario:""   } */   });
});
router.post("/cadastro", TarefasControl.regrasValidacao,  async function (req, res) {
    TarefasControl.Criarussuario(req,res)
});

router.get("/perfil", function (req, res) {
    res.render("pages/template-home", {pagina:"perfil", logado:"logado"});
});

router.get("/adm", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"index"});
});
router.get("/adm-cliente", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/index"});
});

router.get("/adm-cliente-novo", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/create"});
});

router.get("/adm-cliente-edit", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/edit"});
});

router.get("/adm-cliente-list", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/detalhes"});
});

router.get("/adm-cliente-del", function (req, res) {
    res.render("pages/adm/template-adm",{pagina:"cliente/delete"});
});

router.get("/login", function (req, res) {
    res.render("pages/login", { listaErros: null });
  });
  
  router.post(
    "/login",
    usuarioController.regrasValidacaoFormLogin,
    gravarUsuAutenticado,
    function (req, res) {
      usuarioController.logar(req, res);
    });
  
  router.get("/cadastro", function (req, res) {
    res.render("pages/cadastro", { listaErros: null, valores: { nome_usu: "", nomeusu_usu: "", email_usu: "", senha_usu: "" } });
  });
  
  router.post("/cadastro",
    usuarioController.regrasValidacaoFormCad,
    async function (req, res) {
      usuarioController.cadastrar(req, res);
    });
  
  router.get(
    "/adm",
    verificarUsuAutorizado([2, 3], "pages/restrito"),
    function (req, res) {
      res.render("pages/adm", req.session.autenticado);
    });
  

module.exports = router;
