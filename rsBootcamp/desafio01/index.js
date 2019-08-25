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

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  let project = projects.find(p => p.id == id);

  if (!project.id) {
    return res.status(400).json({ error: `Project with ID: ${id} not exists` });
  }

  return next();
}

function checkBeforeInsert(req, res, next) {
  const { id } = req.body;

  let project = projects.find(p => p.id == id);

  if (project) {
    return res
      .status(400)
      .json({ error: `Project with ID: ${id} already exists` });
  }

  return next();
}

function countRequest(req, res, next) {
  console.log(`Request Count: ${++reqCount}`);
  return next();
}

server.use(countRequest);

server.post('/projects', checkBeforeInsert, (req, res) => {
  projects.push(req.body);
  return res.send('Project was created with success!');
});

server.post(
  '/projects/:id/tasks',
  checkIdProject,
  checkProjectExists,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    let project = projects.find(p => p.id == id);
    project.tasks.push(title);

    return res.json(projects);
  }
);

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdProject, checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
});

server.delete(
  '/projects/:id',
  checkIdProject,
  checkProjectExists,
  (req, res) => {
    const { id } = req.params;

    let indexProject = projects.findIndex(p => p.id == id);
    projects.splice(indexProject, 1);

    return res.json('Project was deleted with success!');
  }
);
