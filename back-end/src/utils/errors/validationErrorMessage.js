import translator from '../translator.js'

export default (err) => {
  const field = Object.keys(err.errors)[0];
  switch (err.errors[field].kind) {
    case 'required':
      return `O campo ${translator(field)} é obrigatório`;
    default:
      return 'Ocorreu um erro. Verifique seus dados e tente novamente.';
  }
};
