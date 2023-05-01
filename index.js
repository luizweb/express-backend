import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// arquivo de conexao com o bando de dados
import connect from './config/db.config.js';

// rotas
import userRoute from './routes/user.routes.js'
import contactRoute from './routes/contact.routes.js';


// dotenv
dotenv.config();

// express
const app = express();

//para enviar e recebeer JSON
app.use(express.json()); 

// cors - configurar o servidor para Cors
// Ex.: app.use(cors({origin: process.env.REACT_URL}))
app.use(cors());

// conectando com o banco de dados
connect();

// requisição GET 
app.get("/", (req,res)=>{
    return res.send("<h1>Meu app - backend</h1>");
});


// ROTAS ÚNICAS
app.use('/user', userRoute);
app.use('/contact', contactRoute);


// Inicialização do servidor
app.listen(process.env.PORT, ()=>{
    console.log(`App up and running on port http://localhost:${process.env.PORT}`);
});

