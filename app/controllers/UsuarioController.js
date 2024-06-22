const UsuarioModels = require("../models/UsuarioModels");
const { body, validationResult } = require("express-validator");
const auth = require('../auth'); // Importa o módulo de gerenciamento de autenticação

const UsuarioController = {
    CriarUsuario: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/template-home", {
                dados: req.body,
                listaErros: errors,
                pagina: "cadastro",
                logado: null
            });
        }
        try {
            await UsuarioModels.create(req.body);
            res.render("pages/template-home", { pagina: "home", logado: null });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).send('Erro ao criar usuário');
        }
    },

    regrasValidacao: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome inválido"),
        body("email")
            .isEmail()
            .withMessage("Email inválido"),
        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("Senha inválida, deve conter pelo menos 8 dígitos"),
        body("c-senha")
            .notEmpty()
            .withMessage('Campo vazio.')
            .custom((value, { req }) => {
                const senha = req.body.senha;
                if (value !== senha) {
                    throw new Error('Senhas diferentes.');
                }
                return true;
            })
    ],

    LoginUsuario: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("pages/template-home", {
                dados: req.body,
                listaErros: errors.array(),
                pagina: "login",
                logado: null
            });
        }
    
        try {
            const { email, senha } = req.body;
            const user = await UsuarioModels.authenticate(email, senha);
    
            if (!user) {
                return res.render("pages/template-home", {
                    mensagem: "Credenciais inválidas",
                    pagina: "login",
                    logado: null
                });
            }
    
            // Autentica o usuário
            auth.authenticateUser(req, user); 
            // Renderiza a página home com o usuário autenticado
            res.render("pages/template-home", { pagina: "home", logado: user });
            
        } catch (error) {
            console.error('Erro no login:', error);
            return res.render("pages/template-home", {
                mensagem: "Erro no login",
                pagina: "login",
                logado: null
            });
        }
    },
    

    regrasValidacaoLogin: [
        body("email").isEmail().withMessage("Email inválido"),
        body("senha").notEmpty().withMessage("Senha não pode estar vazia")
    ],

    LogoutUsuario: (req, res) => {
        try {
            auth.logoutUser(req);
            res.redirect('/');
        } catch (error) {
            console.error('Erro no logout:', error);
            res.redirect('/');
        }
    }
};

module.exports = UsuarioController;
