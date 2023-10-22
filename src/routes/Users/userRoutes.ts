import { InputUser } from './../../models/user';
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router();
const prisma = new PrismaClient();

// Rota para obter informações de usuário específico
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter informações do usuário' });
    }
});
  
// Rota para listar usuários
router.get('/users', async (req, res) => {
    try{
    const users = await prisma.user.findMany();
    res.json(users) ; 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
});

// Rota de registro de usuário
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, permissions }:InputUser = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name, 
        email, 
        password: hashedPassword, 
        permissions,
      },
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no registro do usuário.' });
  }
});

// Rota de login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ userMail: user.email }, process.env.JWT_SECRET!);
    
    res.json({ 
      message: 'Usuário logado com suscesso', 
      token  
    });
  //comentário só pra testar
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no login.' });
  }
});
  
// Rota para atualizar usuário
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, permissions } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: { 
          name, 
          email, 
          password: hashedPassword, 
          permissions
        },
      });
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar informações' });
    }
});
  
// Rota para apagar usuário
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: id },
      });
      res.json({ message: 'Usuário deletado com suscesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});
  
export default router;