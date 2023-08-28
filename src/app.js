const express = require('express');
const { userController } = require('./controllers');
const { validateInputs } = require('./middlewares/validateInputs');

// ...

const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', userController.login);
app.post('/user', validateInputs, userController.create);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
