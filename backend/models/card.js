const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
// создать схему cardSchema
const cardSchema = new mongoose.Schema({
  // поля схемы карточки:
  // имя карточки (name), ссылка на картинку (link), ссылка на модель автора карточки (owner)
  // список лайкнувших пост пользователей (likes), дата создания (createdAt)
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Недопустимый URL-адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// создать модель card и экспортировать её
module.exports = mongoose.model('card', cardSchema);
