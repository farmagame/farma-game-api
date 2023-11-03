import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/Users/userRoutes';
import categoryRoutes from './routes/Categories/categoryRoutes';
import questionRoutes from './routes/Questions/questionRoutes';
import reportsRouter from './routes/Reports/reportsRouter';
import cors from 'cors';



const port = 3000 || process.env.PORT

const app = express();

app.use(bodyParser.json());

app.use(cors());


// Rota Inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de gerenciamento de usuários!');
});

// Define a porta do servidor local
app.listen(port, () => {
  console.log('Server is running on port ', port);
});

app.use(categoryRoutes);
app.use(questionRoutes);
app.use(reportsRouter);
app.use(userRoutes);

