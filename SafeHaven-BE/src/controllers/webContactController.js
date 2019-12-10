import { Op, fn, col } from 'sequelize';

const model = require('../models');

const { eContact, User } = model;

const WebContactController = {
    async addSosContact (req, res) {
        try {
            const { name, email, phone } = req.body;
            await eContact.create({
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
         await eContact.destory({
             where: { id },
         });
         return res.status(200).send({ status: 'Success', data: Contacts.dataValues})
        } catch (e) {
            console.log(e);
            return res.status(500).send({ status: 'Error', data: 'An error occured'});

        }
    }
}

export default WebContactController;