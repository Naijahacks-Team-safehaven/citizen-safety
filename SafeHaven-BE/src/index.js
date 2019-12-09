const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const ussdRouter = require('./routes/ussd');
const webRouter = require('./routes/webuser');

const app = express()

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/api/v1/', ussdRouter);
app.use('/api/v1/', [webRouter, ussdRouter])

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err.message);
  console.log(err);
});

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

