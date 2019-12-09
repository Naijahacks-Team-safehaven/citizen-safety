const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Nexmo = require('nexmo');

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

const port = process.env.PORT || 5000
const emergencyContacts  = [ '1223858078674', '6742678468', '674286448']
app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request
    let response = `CON Welcome to safehaven, Select an option below
    1. Send alert to emergency contacts
    2. Change emergency contacts`
    res.send(response)
  } else if (text == '1') {
    //Emergency contacts should be fetched from database
    let response = `CON Choose contacts to send emergency alert
    1. ${emergencyContacts[0]}
    2. ${emergencyContacts[1]}
    3. ${emergencyContacts[2]}
    4. Send to all contacts`
    res.send(response)
  } else if (text == '2') {
    // Business logic for first level response
    let response = `CON Input emergency contact numbers`
    res.send(response)
  } else if (text == '1*1') {
    // When user selects 1 and 1
    app.post('*', (req, res) => {
      nexmo.message.sendSms(
        //the number should be fetched from the database, this is just a dummy number
      '1234','2349095605545', '',
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      }
   );
    let response = `END Alert Successfully sent`
     res.send(response)
  })
   
  } else if (text == '1*2') {
    // This is a second level response where the user selected 1 in the first instance
    app.post('*', (req, res) => {
      nexmo.message.sendSms(
        //the number should be fetched from the database, this is just a dummy number
      '1234','2349095605545', 'SOS alert',
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      }
   );
    let response = `END Alert Successfully sent`
     res.send(response)
  })
    let response = `END Alert Successfully sent`
    res.send(response)
  } else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

