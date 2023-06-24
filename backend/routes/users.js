const router = require('express').Router();
const {
  getUsers,
  getUserMe,
  getUserByID,
  patchUserMe,
  patchAvatar,
} = require('../controllers/users');
const {
  validatorUserByID,
  validatorPatchUserMe,
  validatorPatchAvatar,
} = require('../middlewares/validate');

// вернуть всех пользователей
router.get('', getUsers);
// вернуть информацию о текущем пользователе
router.get('/me', validatorUserByID, getUserMe);
// вернуть пользователя по _id
router.get('/:userId', validatorUserByID, getUserByID);
// обновить профиль
router.patch('/me', validatorPatchUserMe, patchUserMe);
// обновить аватар
router.patch('/me/avatar', validatorPatchAvatar, patchAvatar);

module.exports = router;
