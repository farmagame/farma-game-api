import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const router = express.Router();
const prisma = new PrismaClient();

// Rota para obter uma questão específica
router.get('/category/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter categoria' });
  }
});

// Rota para listar questões
router.get('/categories', async (req, res) => {
  try {
    const categorys = await prisma.category.findMany();
    res.json(categorys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar categorias' });
  }
});

// rota para criar categorias
router.post('/category', async (req, res) => {
  const { category } = req.body;
  try {
    const newQuestion = await prisma.category.create({
      data: {
        category,        
      }
    });
    res.json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});

// Rota para editar categorias
router.put('/category/:id', async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const updatedQuestion = await prisma.category.update({
      where: { id: id },
      data: {
        category,       
      }
    });
    res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao editar a categoria' });
  }
});


// Rota para apagar questão
router.delete('/category/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: id },
    });
    res.json({ message: 'Categoria deletada com suscesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
});


export default router;