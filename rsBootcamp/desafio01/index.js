const express = require('express');
const server = express();
server.listen(3000);
server.use(express.json());

//{ id: "1", title: 'Novo projeto', tasks: [] }
const projects = [];

function  checkIdProject(req,res,next){
  if (!req.bode.id) {
    res.state(400,'')
  }
}

server.post('/projects', (req, res) => {
  projects.push(req.body);
  return res.send('Projeto criado com sucesso!');
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(project => {
    if (project.id == id) {
      project.tasks.push(title);
    }
  });

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;

  projects[].forEach(project => {
    if (project.id == id) {
      projects[project.indexOf] = req.body;
    }
  });

  return res.json(projects);
});
