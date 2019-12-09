const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const ussdRouter = require('./routes/ussd');

const app = express()
const nexmo = new Nexmo({
    apiKey: '0ac5d43c',
    apiSecret: '9UDM0qeBLNG7GafZ'
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use('/api/v1/', [ussdRouter]);
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

