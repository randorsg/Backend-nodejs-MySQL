const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const imageController = require('../controllers/imageController');
const commentController = require('../controllers/commentController');
const eventosController = require('../controllers/eventosController');
const likesController = require('../controllers/LikesController');
const seguidoresController = require('../controllers/seguidoresController');
const siguiendoController = require('../controllers/siguiendoController');
const middleware = require('../middleware');

router.post('/register', userController.register);
router.post('/auth', userController.auth);
router.post('/logout', middleware.verifyToken, userController.logout);
router.get('/user/:id', middleware.verifyToken, userController.show);
router.get('/user', middleware.verifyToken, userController.userAuth);
router.post('/user/changePassword', middleware.verifyToken, userController.updatePassword);
router.put('/user/update/:id', middleware.verifyToken, userController.update);

router.get('/images', middleware.verifyToken, imageController.index);
router.get('/image/:id', middleware.verifyToken, imageController.show);
router.post('/images/create', middleware.verifyToken, imageController.create);
router.get('/images/eventos/:ideventos', middleware.verifyToken, imageController.searchXeventos);
router.delete('/images/delete/:id', middleware.verifyToken, imageController.delete);
router.put('/images/edit/:id', middleware.verifyToken, imageController.update);
router.get('/contenido', middleware.verifyToken, imageController.getContenido);
router.get('/images/user/:id', middleware.verifyToken, imageController.getImagesUser);
router.get('/images/user/top5/:userId', middleware.verifyToken, imageController.getImagesUserTop5V);
router.get('/images/user/populares/:userId', middleware.verifyToken, imageController.getImagesPopularesUser);

router.post('/comment/create', middleware.verifyToken, commentController.create);
router.delete('/comment/delete/:id', middleware.verifyToken, commentController.delete);
router.get('/comment/:id', middleware.verifyToken, commentController.show);
router.get('/comments/:idImagen', middleware.verifyToken, commentController.index);
router.put('/comment/update/:id', middleware.verifyToken, commentController.update);

router.get('/eventos', middleware.verifyToken, eventosController.index);
router.post('/eventos/create', middleware.verifyToken, eventosController.create);
router.delete('/eventos/delete/:id', middleware.verifyToken, eventosController.delete);
router.get('/eventos/show/:id', middleware.verifyToken, eventosController.show);
router.put('/eventos/update/:id', middleware.verifyToken, eventosController.update);

router.post('/likes/create', middleware.verifyToken, likesController.toggleLike);
router.get('/likes/:imagenId', middleware.verifyToken, likesController.getLikes);
router.get('/images/likes', middleware.verifyToken, likesController.likesImages);

router.post('/seguidores/create', middleware.verifyToken, seguidoresController.create);
router.delete('/seguidores/delete/:idSeguidor', middleware.verifyToken, seguidoresController.delete);
router.get('/seguidores', middleware.verifyToken, seguidoresController.index);

router.get('/siguiendo', middleware.verifyToken, siguiendoController.index);
router.post('/siguiendo/create', middleware.verifyToken, siguiendoController.create);
router.delete('/siguiendo/delete/:idSiguiendo', middleware.verifyToken, siguiendoController.delete);
router.get('/siguiendo/verify/:idSiguiendo', middleware.verifyToken, siguiendoController.validarSiguiendo);

router.get('/search/user/:termino', middleware.verifyToken, userController.search);
router.get('/search/image/:termino', middleware.verifyToken, imageController.search);

module.exports = router;