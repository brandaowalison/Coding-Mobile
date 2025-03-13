const express = require('express')
const filmesController = require('../controller/filmes.controller')
const router = express.Router()

router.post('/add', filmesController.CreateFilme)

router.get('/', filmesController.GetAllFilmes)

router.get('/id', filmesController.GetIdFilmes)

router.get('/name', filmesController.GetNameFilmes)

router.put('/:id', filmesController.PutIdFilmes)

router.delete('/', filmesController.DeleteAllFilmes)

router.delete('/:id', filmesController.DeleteIdFilmes)

module.exports = router