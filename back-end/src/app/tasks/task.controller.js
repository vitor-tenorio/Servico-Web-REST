import { Router } from 'express';
import TaskService from './task.service.js'

const TaskRouter = new Router();
const service = new TaskService();

TaskRouter.get('/', (req, res) => {
  service.get().then(result => {
    return res.send(result);
  }).catch(err => {
    return res.status(err.status || 500).send({ error: err.message })
  });
});

TaskRouter.get('/:id', (req, res) => {
  //:id significa que id é um parâmetro da requisição
  //é possivel obter o id através de req.params.id
  const id = req.params.id;
  service.getById(id).then(result => {
    return res.send(result);
  }).catch(err => {
    return res.status(err.status || 500).send({ error: err.message })
  });
});

TaskRouter.post('/', async (req, res) => {
  service.create(req.body).then(result => {
    return res.status(200).send(result)
  }).catch(err => {
    return res.status(err.status || 500).send({ error: err.message })
  })
});

TaskRouter.put('/:id', (req, res) => {
  //:id significa que id é um parâmetro da requisição
  //é possivel obter o id através de req.params.id
  const id = req.params.id;
  service.update(id, req.body).then(result => {
    return res.status(200).send(result)
  }).catch(err => {
    return res.status(err.status || 500).send({ error: err.message })
  })
});

TaskRouter.delete('/:id', (req, res) => {
  //:id significa que id é um parâmetro da requisição
  //é possivel obter o id através de req.params.id
  const id = req.params.id;
  service.delete(id).then(result => {
    return res.status(200).send(result)
  }).catch(err => {
    return res.status(err.status || 500).send({ error: err.message })
  })
});

export default TaskRouter;
