const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
// создать схему userSchema
const userSchema = new mongoose.Schema({
  // поля схемы пользователя:
  // имя пользователя (name), информация о пользователе (about), ссылка на аватарку (avatar)
  // почта (email), пароль (password)
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => isURL(url),
      message: 'Недопустимый URL-адрес',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Недопустимый email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
// создать модель user и экспортировать её
module.exports = mongoose.model('user', userSchema);
