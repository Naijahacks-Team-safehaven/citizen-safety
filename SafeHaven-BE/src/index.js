const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const ussdRouter = require('./routes/ussd');

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use('/api/v1/', ussdRouter);
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

