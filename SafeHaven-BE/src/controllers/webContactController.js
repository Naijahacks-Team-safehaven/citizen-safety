import { Op, fn, col } from 'sequelize';

const Nexmo = require('nexmo');
const dotEnv = require('dotenv');
const model = require('../models');
import uploadimage from '../utils/imageUploader';

const number = '12014167198'
dotEnv.config();

const nexmo = new Nexmo({
    apiKey: `${process.env.NEXMO_API_KEY}`,
    apiSecret: `${process.env.NEXMO_API_SECRET}`,
})


const { eContact, User, Alert } = model;

const WebContactController = {
    async addSosContact (req, res) {
        try {
            const { id } = req.userData;
            console.log(id);
            const { name, email, phone } = req.body;
            await eContact.create({
                user_id: id,
                name,
                email,
                phone,
            });
            return res.status(200).send({ status: 'Success', data: 'SOS contact successfully added'});
        } catch (e) {
            console.log(e);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});
        }
    },

    async editSosContact(req, res) {
        try {
            const { id, name, email, phone} = req.body;
            await eContact.update( 
                {
                    name,
                    email,
                    phone
                },
                {
                  returning: true,
                  where: { uuid },
                },)
                return res.status(200).send({ status: 'Success', data: 'contact successfully updated'})
        } catch (e) {
            console.log(e);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});

        }
    },
    async deleteSosContact(req, res) {
        try {
         const { id } = req.query;
         const contact = await eContact.findOne({
             where: {id: id}
         });
         if (!contact) return res.status(404).send({status: 'Error', data: 'contact not found'})
         await eContact.destory({
             where: { id },
         });
         return res.status(200).send({ status: 'Success', data: 'contact successfully deleted'})
        } catch (e) {
            console.log(e);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});

        }
    },
    async getSosContact(req, res) {
        try {
         const { name, id, phone } = req.userData;
         const Contacts = await User.findAll(({
           
           where:{
               phone: phone
             },
             attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
              },
              include: ['eContacts'],
          }))
         if (!Contacts) return res.status(404).send({status: 'Error', data: 'contact not found'})
         return res.status(200).send({ status: 'Success', data: Contacts})
        } catch (e) {
            console.log(e);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});

        }
    },
    async sendSOSAlert (req, res) {
        try {
         const { id, name } = req.userData;
         const { location } = req.body;
         const contacts = await eContact.findAll({
            where:{
                user_id: id,
              },
              attributes: {
                 exclude: ['createdAt', 'updatedAt'],
               },
         });
          const contactArray = contacts.map(x => x.phone);
          await contactArray.forEach(phone => {
              console.log(phone);
            nexmo.message.sendSms(
                'SafeHaven', `+234${phone}` ,    `${name} is in danger at ${location}`,
                (err, responseData) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.dir(responseData);
                  }
                }
             );
          });
          return res.status(200).send({ status: 'Success', data: 'Sos sent successfully'});
        } catch (e) {
            console.log(e.message);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});
        }
    },
    async reportAlert(req, res) {
        try {
            const { name, phone } = req.userData;
            const { details, address, location } = req.body;
            let proofile = '';
            if (req.file) { proofile = await uploadimage(req.file) }
            await Alert.create({
                details,
                address,
                location: location || '',
                proof: proofile,
                phone,
            })
            await nexmo.message.sendSms(
                'SafeHaven', `+2348165656988` , `${name} is in danger at ${location}`,
                (err, responseData) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.dir(responseData);
                  }
                }
             );
            return res.status(200).send({ status: 'Success', data: 'Alert has been sent to the closest police station around.Thank you for reporting'}); 
        } catch (e) {
            console.log(e.message);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});
        }
    },
    async reportAlertLawyer(req, res) {
        try {
            const { name, phone } = req.userData;
            const { details, address, location } = req.body;
            let proofile = '';
            if (req.file) { proofile = await uploadimage(req.file) }
            await Alert.create({
                details,
                address,
                location: location || '',
                proof: proofile,
                phone,
            })
            await nexmo.message.sendSms(
                'SafeHaven', `+2348165656988` , `${name} is in danger at ${location}`,
                (err, responseData) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.dir(responseData);
                  }
                }
             );
            return res.status(200).send({ status: 'Success', data: 'Alert has been sent. Thank you for reporting'}); 
        } catch (e) {
            console.log(e.message);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});
        }
    },
    async reportAlertHospital(req, res) {
        try {
            const { name, phone } = req.userData;
            const { details, address, location } = req.body;
            let proofile = '';
            if (req.file) { proofile = await uploadimage(req.file) }
            await Alert.create({
                details,
                address,
                location: location || '',
                proof: proofile,
                phone,
            })
            await nexmo.message.sendSms(
                'SafeHaven', `+2348165656988` , `${name} is in danger at ${location}`,
                (err, responseData) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.dir(responseData);
                  }
                }
             );
            return res.status(200).send({ status: 'Success', data: 'Alert has been sent to the nearest hospital.Thank you for reporting'}); 
        } catch (e) {
            console.log(e.message);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});
        }
    },
}

export default WebContactController;