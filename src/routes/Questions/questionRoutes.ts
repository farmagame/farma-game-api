import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Option, Question } from '../../models/question';


const router = express.Router();
const prisma = new PrismaClient();

// Rota para obter uma questão específica
router.get('/questions/:id', async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: 'Questão não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter questão' });
  }
});

// Rota para obter questões por categoria 
router.get('/questions/category/:category', async (req, res) => {
  const newcategoryQuestion = req.params.category;
  try {
    const question = await prisma.question.findMany({
      where: { 
        category: {
          category: newcategoryQuestion,
        },
      },
    });
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: 'Questões não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter questões' });
  }
});

// Rota para obter questões por usuário 
router.get('/questions/user/:id', async (req, res) => {
  const newuserQuestion = req.params.id;
  try {
    const question = await prisma.question.findMany({
      where: { 
        user: {
          id: newuserQuestion,
        },
      },
    });
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: 'Questões não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter questões' });
  }
});

// Rota para listar questões
router.get('/questions', async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        category: true,
        user: true,
      },
    });
    res.json(questions.map(question => ({
      ...question,
      options: question.options.split(', '),
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar questões' });
  }
});


// rota para criar questões
router.post('/questions', async (req, res) => {
  const { ask, options, hint, status, answer, categoryId, userId, messageQuestionWrong, messageQuestionSuccess } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'usuário não fornecido' });
  }
  try {
    const newQuestion = await prisma.question.create({
      data: {
        ask,       
        options: options.join(', '),
        hint,         
        status, 
        answer,
        messageQuestionWrong,
        messageQuestionSuccess,
        category: {
          connect: { id: categoryId }
        },
        user: {
          connect: { id: userId }
        }
      },
    });
    res.json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar questão' });
  }
});



// Rota para editar questões
router.put('/questions/:id', async (req, res) => {
  const newid = req.params.id;
  const { ask, options, hint, status, answer, categoryId, userId, messageQuestionWrong, messageQuestionSuccess } = req.body;

  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: newid },
      data: {
        ask,
        options: options.join(', '),
        hint,
        status,
        answer,
        messageQuestionWrong,
        messageQuestionSuccess,
        category: {
          connect: { id: categoryId }
        },
        user: {
          connect: { id: userId }
        }
      },
    });

    res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a Questão' });
  }
});




// Rota para apagar questão
router.delete('/questions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.question.delete({
      where: { id: id },
    });

    res.json({ message: 'Questão deletada com suscesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar questão' });
  }
});


export default router;