const express = require('express');
const Nexmo = require('nexmo');
const dotEnv = require('dotenv');

const router = express.Router();
dotEnv.config();

const nexmo = new Nexmo({
    apiKey: `${process.env.NEXMO_API_KEY}`,
    apiSecret: `${process.env.NEXMO_API_SECRET}`,
})

const emergencyContacts  = [ '1223858078674', '6742678468', '674286448']
router.get('/', (req, res, next) => {
  console.log('working');
})
router.post('*', (req, res) => {
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
    router.post('*', (req, res) => {
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
    router.post('*', (req, res) => {
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

module.exports = router;