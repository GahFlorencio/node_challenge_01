const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).send(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(200).send(repository)
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json('This Repository dont Exists');
  }

  const repository = { title, techs, url }

  repositories[repositoryIndex] = { id: repositories[repositoryIndex].id,title, techs, url, likes: repositories[repositoryIndex].likes }

  return response.status(200).json(repositories[repositoryIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json('This Repository dont Exists');
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json('This Repository dont Exists');
  }


  repositories[repositoryIndex] = { id:repositories[repositoryIndex].id,title:repositories[repositoryIndex].title, techs:repositories[repositoryIndex].techs, url:repositories[repositoryIndex].url, likes: repositories[repositoryIndex].likes+1 }

  return response.status(200).json({likes:repositories[repositoryIndex].likes})
});

module.exports = app;
