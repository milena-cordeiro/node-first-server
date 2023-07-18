// importar o express para poder utiliza-lo
const express = require('express');
const validateTeam = require('./middlewares/validateTeam');
const existingId = require('./middlewares/existingId');
const teams = require('./utils/teams');
const apiCredentials = require('./middlewares/apiCredentials');

let nextId = 3;

const app = express();

app.use(express.json());
app.use(apiCredentials);

// get usamos para pedir, buscar, algum dado;
app.get('/', (request, response) => response.status(200).send({ message: 'olá mundo!' }));

// criar um endpoint do tipo get com a rota teams
app.get('/teams', (request, response) => response.status(200).json({ teams }));

// Crie um endpoint do tipo GET com a rota /teams/:id.

app.get('/teams/:id', existingId, (request, response) => {
  const { id } = request.params;
  const teamById = teams.find((team) => team.id === Number(id));

  response.status(200).json({ teamById });
});

// cadastrando times por meio do metodo post / crie um endpoint do tipo post com a rota teams
app.post('/teams', validateTeam, (request, response) => {
  const newTeam = { id: nextId, ...request.body };
  teams.push(newTeam);
  nextId += 1;
  response.status(201).json({ team: newTeam });
});

// editandp times por meio do metodo put 
app.put('/teams/:id', existingId, (req, res) => {
  const { id } = req.params;

  const updateTeam = teams.find((team) => team.id === Number(id));

    const index = teams.indexOf(updateTeam);
    const updated = { id, ...req.body };
    teams.splice(index, 1, updated);
    res.status(201).json(updated);
});

// deletando times por meio do metodo delete /  Crie um endpoint do tipo DELETE com a rota /teams/:id

app.delete('/teams/:id', existingId, (req, res) => {
  const { id } = req.params;
  const team = teams.find((t) => t.id === Number(id));
  if (team) {
    const index = teams.indexOf(team);
    teams.splice(index, 1);
    res.status(204).end();
  }
});
module.exports = app;