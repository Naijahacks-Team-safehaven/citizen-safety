const model = require('../models');

const { eContact } = model;

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
    }
}

export default WebContactController;