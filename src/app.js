// importar o express para poder utiliza-lo
const express = require('express');

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

const app = express();

app.use(express.json());
// get usamos para pedir, buscar, algum dado;
app.get('/', (request, response) => response.status(200).send({ message: 'olá mundo!' }));

// criar um endpoint do tipo get com a rota teams
app.get('/teams', (request, response) => response.status(200).json({ teams }));

// cadastrando times por meio do metodo post / crie um endpoint do tipo post com a rota teams
app.post('/teams', (request, response) => {
  const newTeam = { ...request.body };
  teams.push(newTeam);
  response.status(201).json({ team: newTeam });
});

// editandp times por meio do metodo put 
app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
});

// Crie um endpoint do tipo GET com a rota /teams/:id.

app.get('/teams/:id', (request, response) => {
  const { id } = request.params;
  const teamById = teams.find((team) => team.id === Number(id));

  if (!teamById) {
    return response.status(404).json({ message: 'Team not found' });
  }

  response.status(200).json({ teamById });
});

// deletando times por meio do metodo delete /  Crie um endpoint do tipo DELETE com a rota /teams/:id

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const teamPosition = teams.findIndex((team) => team.id === Number(id));
  teams.splice(teamPosition, 1);

  res.status(200).end();
});
module.exports = app;