import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ReportsGamePlayer } from '../../models/reports';


const router = express.Router();
const prisma = new PrismaClient();

//Envio das informações do jogo
router.post('/reports', async (req, res) => {
  const { idUser, age, sex, city, state, typeGame, questionsGame } = req.body;

  try {
    // Primeiro, crie o relatório sem associar perguntas
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

    // Em seguida, associe as perguntas ao relatório
    if (questionsGame && questionsGame.length > 0) {
      await prisma.reports.update({
        where: { id: newReport.id },
        data: {
          questions: {
            connect: questionsGame.map((questionId:string) => ({ id: questionId })),
          },
        },
      });
    }

    res.json(newReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar relatório' });
  }
});


router.get('/reports/:idUser', async (req, res) => {
  const reportId = req.params.idUser.toString();
  try {
    const reports = await prisma.reports.findMany({
      where: {
        id: reportId,
      },
    });
    if (reports) {
      res.json(reports);
    } else {
      res.status(404).json({ error: 'Relatório não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter relatório' });
  }
});


export default router;