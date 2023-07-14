// importamos nosso arquivo app.js e aí sim, damos start em nosso servidor.
// O start é provido pelo trecho app.listen... e dentro dele podemos passar até 2 parâmetros:
// 1. port (ou porta): Aqui passamos 3001, mas poderia ser qualquer número não utilizado acima de 1023
// 2. função: Aqui passamos apenas um console.log exibindo uma mensagem “que estamos no ar”

const app = require('./app');

app.listen(3001, () => console.log('server running on port 3001'));