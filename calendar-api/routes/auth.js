/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { createUser, loginUser, renewToken } = require('../controllers/auth')
const { fieldsValidator } = require('../middlewares/fields-validator')
const { validateJWT } = require('../middlewares/jwt-validator')
const router = Router()

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caarcteres').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  createUser
)

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caarcteres').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  loginUser
)

router.get('/renew', validateJWT, renewToken)

module.exports = router
