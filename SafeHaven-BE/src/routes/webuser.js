import express from 'express';
import WebAuthController from '../controllers/WebAuthController';
import WebContactController from '../controllers/webContactController';
import auth from '../middleWares/auth';
const webRouter = express.Router();

webRouter.post('/web/signup', WebAuthController.register);
webRouter.post('/web/login', WebAuthController.login);
webRouter.get('/web/profile', auth, WebAuthController.me);
webRouter.post('/web/add-SOS-contact', auth, WebContactController.addSosContact);
webRouter.delete('web/delete-sos-contact', auth, WebContactController.addSosContact);
webRouter.put('/web/update-sos-contact', auth, WebContactController.editSosContact);
webRouter.get('/web/contacts', auth, WebContactController.getSosContact);
webRouter.post('/web/send-sos', auth, WebContactController.sendSOSAlert);

module.exports = webRouter;