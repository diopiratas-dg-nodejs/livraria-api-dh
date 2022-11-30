const express = require('express')
const router = express.Router();

const livroController = require('../controllers/livroController')

router.get('/',livroController.list)
router.get('/:id',livroController.findById)
router.post('/', livroController.create)
router.put('/:id', livroController.update)
router.patch('/:id', livroController.partialUpdate)
router.delete('/:id', livroController.delete)

module.exports = router;