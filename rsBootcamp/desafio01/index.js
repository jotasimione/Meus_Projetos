const express = require('express');
const server = express();
server.listen(3000);
server.use(express.json());

//{ id: "1", title: 'Novo projeto', tasks: [] }
const projects = [];
let reqCount = 0;

function checkIdProject(req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Project ID is required!' });
  }
  return next();
}

function countRequest(req, res, next) {
  reqCount++;
  console.log(`Request Count: ${reqCount}`);
  return next();
}

server.post('/projects', countRequest, (req, res) => {
  projects.push(req.body);
  return res.send('Project was created with success!');
});

server.post('/projects/:id/tasks', countRequest, checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(project => {
    if (project.id == id) {
      project.tasks.push(title);
    }
  });

  return res.json(projects);
});

server.get('/projects', countRequest, (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', countRequest, checkIdProject, (req, res) => {
  const { id } = req.params;

  projects.forEach((project, index) => {
    if (project.id == id) {
      projects[index] = req.body;
    }
  });

  return res.json(projects);
});

server.delete('/projects/:id', countRequest, checkIdProject, (req, res) => {
  const { id } = req.params;

  projects.forEach((project, index) => {
    if (project.id == id) {
      projects[index].delete;
    }
  });

  return res.json('Project was deleted with success!');
});
