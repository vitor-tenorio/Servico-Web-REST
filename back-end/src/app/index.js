import express from 'express';
// import GenericRouter from './generic.controller.js'
import TaskRouter from './tasks/task.controller.js'

const router = express();
router.disable('x-powered-by');

router.use('/tarefas', TaskRouter);
// route-r.use('/', GenericRouter); //deixar no final para dar prioridade às primeiras

export default router;
