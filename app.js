const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.APP_PORT;
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(session({
    secret: 'seu-segredo-aqui', // Defina uma string secreta segura aqui
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use secure: true em produção com HTTPS
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var rotas = require("./app/routes/router");
app.use("/", rotas);

app.use((req, res, next) => {
  res.locals.logado = req.session.user || null;
  next();
});


app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});
