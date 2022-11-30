const express = require('express')
const path = require('path')

const app = express();
const livroRouter = require('./routes/livro')

app.use(express.json());
app.use('/livro', livroRouter);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json(err);
  });

  app.listen('3001', () => console.log('Servidor rodando na porta 3001'))

  module.exports = app;
