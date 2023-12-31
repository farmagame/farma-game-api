import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const router = express.Router();
const prisma = new PrismaClient();

// Rota para obter uma questão específica
router.get('/questions/:id', async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        category: true,
        user: true,
      },
    });
    if (!question) {
      return res.status(404).json({ error: 'Questão não encontrada' });
    }
    const { options, ...rest } = question;
    res.json({
      ...rest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a Questão' });
  }
});

// Rota para obter questões por categoria
router.get('/questions/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const questions = await prisma.question.findMany({
      where: {
        category: {
          category,
        },
      },
      include: {
        category: true,
        user: true,
      },
    });
    if (questions.length > 0) {
      res.json(questions.map(question => ({
        ...question,
      })));
    } else {
      res.status(404).json({ error: 'Questões não encontradas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter questões' });
  }
});

// Rota para obter questões por usuário
router.get('/questions/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const questions = await prisma.question.findMany({
      where: {
        userId: userId,
      },
      include: {
        category: true,
        user: true,
      },
    });
    if (questions.length > 0) {
      res.json(questions.map(question => ({
        ...question,

      })));
    } else {
      res.status(404).json({ error: 'Questões não encontradas' });
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
    if (questions.length > 0) {
      res.json(questions.map(question => ({
        ...question,

      })));
    } else {
      res.status(404).json({ error: 'Questões não encontradas' });
    }
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
        options: JSON.stringify(options),
        hint,
        status,
        answer,
        messageQuestionWrong,
        messageQuestionSuccess,
        categoryId,
        userId
      },
    });
    res.json(newQuestion);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar questão', message: error.message });
  }
});



// Rota para editar questões
router.put('/questions/:id', async (req, res) => {
  const questionId = req.params.id;
  const { ask, options, hint, status, answer, categoryId, userId, messageQuestionWrong, messageQuestionSuccess } = req.body;

  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: {
        ask,
        options: JSON.stringify(options), // Converte o array de objetos em uma string JSON
        hint,
        status,
        answer,
        messageQuestionWrong,
        messageQuestionSuccess,
        categoryId,
        userId
      },
    });

    res.json(updatedQuestion);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a Questão', message: error.message });
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