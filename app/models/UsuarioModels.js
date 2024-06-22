var pool = require("../../config/pool_conexoes")
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de saltos para o bcrypt

const UsuarioModels = {
    create: async (data) => {
        try {
            // Hash da senha utilizando bcrypt
            const hashedPassword = await bcrypt.hash(data.senha, saltRounds);

            const [linhas] = await pool.query(
                'INSERT INTO usuario (`nome_usuario`, `email_usuario`, `senha_usuario`) VALUES (?, ?, ?)',
                [data.nome, data.email, hashedPassword]
            );

            return linhas;
        } catch (error) {
            throw error; // Você pode tratar melhor o erro aqui conforme necessário
        }
    },


    findByEmail: async (email) => {
        try {
            const [rows] = await pool.query('SELECT * FROM usuario WHERE email_usuario = ?', [email]);
            return rows[0]; // Retorna o primeiro usuário encontrado ou undefined se não houver correspondência
        } catch (error) {
            console.error('Erro ao buscar usuário por email:', error);
            throw error;
        }
    },

    totalReg: async () => {
        try {
            const [linhas] = await pool.query('select count(*) FROM tipo_quartos WHERE status_quarto = 1;')
            return linhas;
        } catch (error) {
            return error;
        }  
    },

    findPage: async (pagina, total) => {
        try {
            const [linhas] = await pool.query('select * from tipo_quartos where status_quarto = 1 limit ?, ?', [pagina,total])
            return linhas;
        } catch (error) {
            return error;
        }  
    },
    
    update: async (camposForm) => {
        try {
            const [resultados] = await pool.query(
                "UPDATE usuario SET nome_usuario = ?, user_usuario = ?, senha_usuario = ?,  " +
                " email_usuario = ?, fone_usuario = ?, tipo_usuario = ?, status_usuario = ? " +
                " WHERE id_usuario = ?",
                [camposForm.nome_usuario, camposForm.user_usuario, camposForm.senha_usuario,
                camposForm.email_usuario, camposForm.fone_usuario, camposForm.tipo_usuario,
                camposForm.status_usuario, camposForm.id_usuario]
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    delete: async (id) => {
        try {
            const [resultados] = await pool.query(
                "UPDATE usuario SET status_usuario = 0 WHERE id_usuario = ? ", [id]
            )
            return resultados;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    authenticate: async (email, senha) => {
        try {
            const [rows] = await pool.query('SELECT * FROM usuario WHERE email_usuario = ?', [email]);
            const user = rows[0];

            if (!user) {
                return null; // Usuário não encontrado
            }

            // Verifica se a senha é válida utilizando bcrypt
            const match = await bcrypt.compare(senha, user.senha_usuario);

            if (match) {
                return user; // Retorna o usuário autenticado
            } else {
                return null; // Senha incorreta
            }
        } catch (error) {
            throw error; // Você pode tratar melhor o erro aqui conforme necessário
        }
    },
    
  
};

module.exports = UsuarioModels;
