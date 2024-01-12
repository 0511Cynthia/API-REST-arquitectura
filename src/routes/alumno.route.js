const express = require('express');
const router = express.Router();
const {create, getById, index, update,  logicDelete} = require('../controllers/alumno.controller');

router.post('/', create);
router.get('/:id', getById);
router.get('/', index);
router.delete('/:id', logicDelete);
router.patch('/:id', update);

module.exports = router;