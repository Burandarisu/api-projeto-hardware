const router = require('express').Router()
const MeasureController = require('../controllers/MeasureController')
const ConfigController = require('../controllers/ConfigController')

router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'Node Express API',
    version: '0.0.1',
    info: 'API desenvolvida para o projeto de Hardware'
  })
})

router.get('/measure', MeasureController.index)
router.post('/measure', MeasureController.store)

router.get('/config', ConfigController.index)
router.post('/config', ConfigController.store)

module.exports = router
