// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import db from './src/config/dbConnect.js';
import app from './src/app.js';

dotenv.config();

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('conexão com o banco feita com sucesso');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor escutando em http://localhost:${PORT}`);
});
