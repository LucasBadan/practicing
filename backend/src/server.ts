import express from 'express';
import { db } from './database.js';
import { sql } from 'drizzle-orm';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API funcionando',
  });
});

app.get('/api/health/db', async (_req, res) => {
  try {
    const result = await db.execute(sql`SELECT NOW() AS database_time`);

    res.status(200).json({
      status: 'ok',
      database: 'connected',
      time: result.rows[0]?.database_time,
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);

    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: 'Não foi possível verificar a conexão com o banco de dados.',
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API disponível na porta ${PORT}`);
});
