const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Routes
router.get('/', usuarioController.view);
router.post('/', usuarioController.find);
router.get('/addusuario', usuarioController.form);
router.post('/addusuario', usuarioController.create);
router.get('/editusuario/:id', usuarioController.edit);
router.post('/editusuario/:id', usuarioController.update);
router.get('/viewusuario/:id', usuarioController.viewall);
router.get('/:id', usuarioController.delete);

module.exports = router;