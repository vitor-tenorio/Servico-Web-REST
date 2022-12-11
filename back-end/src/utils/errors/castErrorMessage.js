export default (err) => {
  switch (err.kind) {
    case 'ObjectId':
      return `Id inválido`;
    default:
      return 'Ocorreu um erro. Verifique seus dados e tente novamente.';
  }
};
