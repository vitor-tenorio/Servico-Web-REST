//Centraliza as urls do front-end, que varia dependendo do ambiente em que o servidor está rodando

var urls;

switch (process.env.NODE_ENV) {
  default:
    //No computador local
    urls = {
      frontUrl: 'http://localhost:3001',
      backUrl: 'http://localhost:3000',
    };
    break;
}

export default urls;
