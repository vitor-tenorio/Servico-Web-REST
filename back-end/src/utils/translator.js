const translator = {
  description: 'descrição',
  title: 'título',
  deadline: 'prazo',
  completed: 'completa',
};

export default (expression) => {
  return translator[expression] || expression;
};
