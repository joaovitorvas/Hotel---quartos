var pool = require("../../config/pool_conexoes")

const tarefasModel = {
    create: async (data) => {
        try {
            const [linhas] = await pool.query('INSERT INTO usuario (`nome_usuario`, `email_usuario`,`senha_usuario`  ) VALUES ( ? , ? , ? ) ',
             [ data.nome, data.email, data.senha ])  
            return linhas;

        } catch (error) {
            return error;
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
  
};

module.exports = tarefasModel;
