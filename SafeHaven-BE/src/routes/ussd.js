const express = require('express');
const Nexmo = require('nexmo');
const dotEnv = require('dotenv');
const models = require('../models');
const User = models.User
const eContact = models.eContact
const Personnel = models.Personnel
const number = '12014167198'
import Helper from '../utils/helpers';

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

router.post('/ussd', async (req, res) => {
  console.log(req.body);
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request
    let response = `CON Welcome to safehaven, Select an option below
    1. Alert the Police
    2. Alert a lawyer
    3. Alert a doctor
    0. Emergency`
    
    res.send(response)
  } else if (text == '0') {
     await Helper.sendSOS(res, phoneNumber);
  } else if (text == '1') {
    console.log('details', sessionId, serviceCode);
    let response = `CON Enter brief description of the situation`
     res.send(response)
  } else if (text.toString().length !== 0 && text.toString().length >= 1) {
    console.log('here here');
    // This is a second level response where the user selected 1 in the first instance
    await Helper.sendPoliceAlert(res, phoneNumber, text);
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