const { SALT_ROUNDS = 10 } = process.env;
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const STATUS_CODES = require('../utils/costants');
const BadRequestError = require('../errors/Bad_Request_Error');
const UnauthorizedError = require('../errors/Unauthorized_Error');
const ConflictingRequestError = require('../errors/Conflicting_Request_Error');
const NotFoundError = require('../errors/Not_Found_Error');
const { signToken } = require('../utils/jwtAuth');

// вернуть всех пользователей
const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

// вернуть информацию о текущем пользователе
const getUserMe = (req, res, next) => {
  const owner = req.user._id;
  userModel
    .findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

// вернуть пользователя по _id
const getUserByID = (req, res, next) => {
  const id = req.params.userId;
  userModel
    .findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// обновить профиль
// { new: true, runValidators: true } - обновление, валидация
const patchUserMe = (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      owner,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// обновить аватар
const patchAvatar = (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// регистрация пользователя (создать пользователя)
const postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      userModel
        .create({
          name, about, avatar, email, password: hash,
        })
        .then(() => {
          res.send({
            data: {
              name, about, avatar, email,
            },
          });
        })
        .catch((err) => {
          if (err.code === STATUS_CODES.MONGO_DUPLICATE_KEY_ERROR) {
            next(new ConflictingRequestError('Такой пользователь уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// авторизация пользователя (проверить почту и пароль)
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return user;
    })
    .then((user) => {
      const match = Promise.all([user, bcrypt.compare(password, user.password)]);
      return match;
    })
    .then(([user, match]) => {
      if (!match) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = signToken({ _id: user._id });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserMe,
  getUserByID,
  patchUserMe,
  patchAvatar,
  postUser,
  loginUser,
};
