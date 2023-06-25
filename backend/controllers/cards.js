const cardModel = require('../models/card');
const BadRequestError = require('../errors/Bad_Request_Error');
const ForbiddenError = require('../errors/Forbidden_Error');
const NotFoundError = require('../errors/Not_Found_Error');

// вернуть все карточки
const getCards = (req, res, next) => {
  cardModel
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

// удалить карточку по идентификатору
const deleteCardByID = (req, res, next) => {
  const owner = req.user._id;
  const id = req.params.cardId;
  cardModel
    .findById(id)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      const ownerCard = card.owner.toString();
      if (ownerCard !== owner) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      cardModel.findByIdAndRemove(req.params.cardId).then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// создать карточку
const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardModel
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// поставить лайк карточке
const putCardLike = (req, res, next) => {
  const owner = req.user._id;
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      // $addToSet - добавить _id в массив, если его там нет (Mongo)
      { $addToSet: { likes: owner } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// убрать лайк с карточки
const deleteCardLike = (req, res, next) => {
  const owner = req.user._id;
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      // $pull - убрать _id из массива (Mongo)
      { $pull: { likes: owner } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  deleteCardByID,
  postCard,
  putCardLike,
  deleteCardLike,
};
