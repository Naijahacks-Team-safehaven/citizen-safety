const express = require('express');
const Nexmo = require('nexmo');
const dotEnv = require('dotenv');
const models = require('../models');
const User = models.User
const eContact = models.eContact
const Personnel = models.Personnel
const number = '12014167198'

const router = express.Router();
dotEnv.config();

const nexmo = new Nexmo({
    apiKey: `${process.env.NEXMO_API_KEY}`,
    apiSecret: `${process.env.NEXMO_API_SECRET}`,
})

router.get('/', (req, res, next) => {
  console.log('working');
  res.send('welcome to safehaven let\' create a safe place together');
})

router.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request
    let response = `CON Welcome to safehaven, Select an option below
    1. Send alert to emergency contacts now
    2. Alert the Police
    3. Alert a lawyer
    4. Alert a doctor`
    
    res.send(response)
  } else if (text == '1') {
    //Emergency contacts should be fetched from database
    User.findAll(({
      where: {
        phone: phoneNumber,
      },
      include: 'eContacts'
    })).then(eContacts => {
      let response = `CON Choose contacts to send emergency alerts to
      1. ${eContacts[0]}
      2. ${eContacts[1]}
      3. ${eContacts[2]}
      4. Send to all contacts`
      res.send(response)
    })
    
  }  else if (text == '1*1') {
    // When user selects 1 and 1
    router.post('*', (req, res) => {
      nexmo.message.sendSms(
        //the number should be fetched from the database, this is just a dummy number
      number ,eContact[0], `SOS Alert`,
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
      Personnel.findOne({
        where: {
          category: 'Police'
        },
        include: 'phone'
      }).then(phone => {
        nexmo.message.sendSms(
        number, phone , 'A robbery in progress',
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            console.dir(responseData);
          }
        }
     );
      })  
    let response = `END Alert Successfully sent`
     res.send(response)
  })
  } else if (text == '1*3') {
    // This is a second level response where the user selected 1 in the first instance
    router.post('*', (req, res) => {
      Personnel.findOne({
        where: {
          category: 'Lawyer'
        },
        include: 'phone'
      }).then(phone => {
        nexmo.message.sendSms(
        number, phone , 'i need a lawyer',
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            console.dir(responseData);
          }
        }
     );
      })  
    let response = `END Alert Successfully sent`
     res.send(response)
  })
  } else if (text == '1*4') {
    // This is a second level response where the user selected 1 in the first instance
    router.post('*', (req, res) => {
      Personnel.findOne({
        where: {
          category: 'Doctor'
        },
        include: 'phone'
      }).then(phone => {
        nexmo.message.sendSms(
        number, phone , 'An ambulance is needed urgently',
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            console.dir(responseData);
          }
        }
     );
      })  
    let response = `END Alert Successfully sent`
     res.send(response)
  })
  } else {
    res.status(400).send('Bad request!')
  }
})

module.exports = router;