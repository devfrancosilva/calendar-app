const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fields-validator')
const { isDate } = require('../helpers/isDate')
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events')
const { validateJWT } = require('../middlewares/jwt-validator')

// Validar token
router.use(validateJWT)
//

router.get('/', getEvents)

router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    fieldsValidator,
  ],
  createEvent
)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router
