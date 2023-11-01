import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const router = express.Router();
const prisma = new PrismaClient();

//Envio das informações do jogo
router.post('/reports', async (req, res) => {
  const { idUser, age, sex, city, state, typeGame, answerRight, answerWrong } = req.body;

  try {
    const newReport = await prisma.reports.create({
      data: {
        idUser,
        age,
        sex,
        city,
        state,
        typeGame,
      },
    });

    const answerRightObj = JSON.parse(answerRight);
    const answerWrongObj = JSON.parse(answerWrong);

    if (answerRightObj && answerRightObj.questions.length > 0) {
      await prisma.reports.update({
        where: { id: newReport.id },
        data: {
          answeredRight: {
            connect: answerRightObj.questions.map((questionId:string) => ({ id: questionId })),
          },
        },
      });
    }
    
    if (answerWrongObj && answerWrongObj.questions.length > 0) {
      await prisma.reports.update({
        where: { id: newReport.id },
        data: {
          answeredWrong: {
            connect: answerRight.questions.map((questionId:string) => ({ id: questionId })),
          },
        },
      });
    }

    res.json(newReport);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar relatório' });
  }
});

//Busca todos os relatórios
router.get('/reports', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const itemsPerPage = Number(req.query.itemsPerPage) || 10;
  
  if (isNaN(page) || isNaN(itemsPerPage) || page <= 0 || itemsPerPage <= 0) {
    return res.status(400).json({ error: 'Parâmetros de consulta inválidos.' });
  }

  try {
    const reports = await prisma.reports.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage, 
      orderBy: { createdAt: 'desc' },
      include: {
        answeredRight: { include: { options: true } },
        answeredWrong: { include: { options: true } },
      },
    });

    const totalReports = await prisma.reports.count();
    const totalPages = Math.ceil(totalReports / itemsPerPage);

    if (reports) {
      res.json({
        data: reports,
        pageInfo: {
          page,
          itemsPerPage,
          totalPages,
          totalItems: totalReports,
        },
      });
    } else {
      res.status(404).json({ error: 'Relatório não encontrado' });
    }
  } catch (error:any) {
    console.error(error);

    res.status(500).json({ error: 'Erro ao obter relatório', details: error.message });
  }
});

//Busca os relatórios por usuário do jogo
router.get('/reports/:idUser', async (req, res) => {
  const reportUserId = req.params.idUser.toString();
  const page = Number(req.query.page) || 1;
  const itemsPerPage = Number(req.query.itemsPerPage) || 10;

  if (isNaN(page) || isNaN(itemsPerPage) || page <= 0 || itemsPerPage <= 0) {
    return res.status(400).json({ error: 'Parâmetros de consulta inválidos.' });
  }

  try {
    const reportData = await prisma.reports.findMany({
      where: {
        idUser: reportUserId,
      },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      include: {
        answeredRight: { include: { options: true } },
        answeredWrong: { include: { options: true } },
      },
    });

    const totalReports = await prisma.reports.count({
      where: {
        idUser: reportUserId,
      },
    });

    const totalPages = Math.ceil(totalReports / itemsPerPage);

    if (reportData) {
      res.json({
        data: reportData,
        pageInfo: {
          page,
          itemsPerPage,
          totalPages,
          totalItems: totalReports,
        },
      });
    } else {
      res.status(404).json({ error: 'Relatório não encontrado' });
    }
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter relatório', details: error.message });
  }
});


export default router;