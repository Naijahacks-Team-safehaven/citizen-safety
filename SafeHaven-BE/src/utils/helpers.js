const Nexmo = require('nexmo');
const dotEnv = require('dotenv');
const models = require('../models');
const User = models.User
const eContact = models.eContact
const Personnel = models.Personnel
const number = '12014167198'

dotEnv.config();

const nexmo = new Nexmo({
    apiKey: `${process.env.NEXMO_API_KEY}`,
    apiSecret: `${process.env.NEXMO_API_SECRET}`,
})

const Helper = {
    async sendSOS(res, phoneNumber) {
    try {
        let response;
        //Emergency contacts should be fetched from database
   const user = await User.findOne({
    where: {
      phone: phoneNumber,
    },
  })
    if (!user) {
        nexmo.message.sendSms(
            'SafeHaven', `+2348165656988` , `${phoneNumber} is in danger`,
            (err, responseData) => {
              if (err) {
                console.log(err);
              } else {
                console.dir(responseData);
              }
            }
         );  
      response = `END Your SOS has been sent to next police station. Please Signup to be able send to your emergency contacts`;
      return res.send(response);
    }
    const contacts = await eContact.findAll({
        where:{
            user_id: user.id,
          },
          attributes: {
             exclude: ['createdAt', 'updatedAt'],
           },
     });
      const contactArray = contacts.map(x => x.phone);
      await contactArray.forEach(phone => {
          console.log(phone);
        nexmo.message.sendSms(
            'SafeHaven', `+234${phone}` , `${name} is in danger`,
            (err, responseData) => {
              if (err) {
                console.log(err);
              } else {
                console.dir(responseData);
              }
            }
         );
      });
   response = `END Alert Successfully sent`;
   return res.send(response);  
    } catch (e) {
        console.log(e.message);
        response = `END An error occured please try again`;
        return res.send(response);
    }
},

}

export default Helper;
