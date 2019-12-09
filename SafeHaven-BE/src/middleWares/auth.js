import { verifyToken } from '../utils/proccessToken';
import model from '../models';

const { User } = model;

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send({status: 'Error', data: 'Authentication required'});
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const { user } = verifyToken(token);
    const auser = await User.findOne({
      where: { email: user.email },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    if (!auser) return res.status(401).send({status: 'Error', data: 'you cannot access this'});
    req.userData = auser.dataValues;
    next();
  } catch (err) {
    const error = err.message ? 'Authentication Failed' : err;
    return res.status(401).send({status: 'Error', data: error});
  }
};
