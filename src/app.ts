import 'dotenv/config';
import express from 'express';
import { router } from './routes';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

// cors responsavel por permitir ou barrar requisições do nosso app
app.use(cors());

const serverHttp = http.createServer(app)



const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket=>{
  console.log(`Usuario conectado no socket ${socket.id}`);
});

app.use(express.json());
app.use(router);

// forma para o user ir ao github se autenticar
app.get('/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  )
})

//rota de calback para ter o retorno do código, se user tem permissão se o token foi criado dentro do github
app.get('/signin/callback', (req, res) => {
  const { code } = req.query

  return res.json(code)
})

export {serverHttp, io}