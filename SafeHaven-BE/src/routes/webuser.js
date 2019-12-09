import express from 'express';
import WebAuthController from '../controllers/WebAuthController';
import auth from '../middleWares/auth';
const webRouter = express.Router();

webRouter.post('/web/signup', WebAuthController.register);
webRouter.post('/web/login', WebAuthController.login);
webRouter.get('/web/profile', auth, WebAuthController.me);


module.exports = webRouter;