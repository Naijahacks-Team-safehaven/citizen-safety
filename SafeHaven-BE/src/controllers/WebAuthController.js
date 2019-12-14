const model = require('../models');
const { hashPassword, comparePassword } = require('../utils/passwordHash');
const { createToken } = require('../utils/proccessToken');

const { User } = model;

const WebAuthController = {
    async register (req, res) {
        try {
            const { name, phone, email, Haven, havenLocation, password } = req.body;
            const encryptedPass = hashPassword(password);
            const user = await User.create({
                name,
                email,
                Haven,
                havenLocation,
                phone,
                password: encryptedPass,
            });
           return res.status(200).send({
                status: 'Success', 
                data: 'You have successfully signed up, Please login to help create a safe haven together',
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send({status: 'Error', data: 'An error occured'});
        }
    },
    async login (req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: { email: email},
            });
            if (!user) return res.status(404).send({status: 'Error', data: 'User not found please signup to create a safehaven'});
            const checkPassword = comparePassword(password, user.dataValues.password);
            if(!checkPassword) {
                return res.status(404).send({ status: 'Error', data: 'password incorrect please check your password and try again'});
            }
            return res.status(200).send({status: 'Success', data: createToken({ user: user.dataValues})});
        } catch (e) {
            console.log(e);
            res.status(500).send({status: 'Error', data: 'An error occured'});
        }
    },
    async me(req, res, next) {
        try {
          const user = req.userData;
          const profile = await User.findOne({
            where: { id: user.id },
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt'],
            },
          });
          return res.status(200).send({status: 'Success', data: profile});
        } catch (e) {
          return next(e);
        }
      },
}

export default WebAuthController;