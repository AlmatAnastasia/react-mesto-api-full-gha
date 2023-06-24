const router = require('express').Router();
const {
  getCards,
  deleteCardByID,
  postCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');
const {
  validatorCardByID,
  validatorPostCard,
} = require('../middlewares/validate');
// вернуть все карточки
router.get('', getCards);
// удалить карточку по идентификатору
router.delete('/:cardId', validatorCardByID, deleteCardByID);
// создать карточку
router.post('', validatorPostCard, postCard);
// поставить лайк карточке
router.put('/:cardId/likes', validatorCardByID, putCardLike);
// убрать лайк с карточки
router.delete('/:cardId/likes', validatorCardByID, deleteCardLike);

module.exports = router;
