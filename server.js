const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 🔹 Ler eventos
app.get('/events', (req, res) => {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  res.json(JSON.parse(data));
});

// 🔹 Salvar novo evento
app.post('/events', (req, res) => {
  const newEvent = req.body;

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  data.push(newEvent);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.status(201).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});

///rotas para curtir e favoritar
app.post('/events/:index/like', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const i = req.params.index;

  if (!data[i]) return res.status(404).end();

  data[i].likes += 1;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ likes: data[i].likes });
});

// ⭐ Favoritar
app.post('/events/:index/favorite', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const i = req.params.index;

  if (!data[i]) return res.status(404).end();

  data[i].favorite = !data[i].favorite;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ favorite: data[i].favorite });
});
