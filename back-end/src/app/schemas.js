import TaskSchema from './tasks/task.model.js'

const schemas = {
  task: TaskSchema,
};

export default (schema) => {
  return schemas[schema];
};
