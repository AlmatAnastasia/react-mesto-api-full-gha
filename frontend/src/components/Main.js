import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main({
  loggedIn,
  path,
  onEditPopup,
  onNewCardPopup,
  onUpdateAvatarPopup,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  // подписка на контекст CurrentUserContext
  const { id, name, about, avatar } = useContext(CurrentUserContext);
  return (
    <main className="main">
      {/* Блок 2 profile */}
      <section
        className={`profile ${loggedIn && "profile_type_logged"}`}
        id={id}
      >
        <button
          type="button"
          name="edit-button"
          aria-label='Кнопка "Редактировать"'
          className="profile__avatar-edit-button indicator"
          onClick={onUpdateAvatarPopup}
        >
          <img
            className="profile__avatar"
            src={`${avatar}`}
            alt='Изображение "Аватар профиля"'
          />
        </button>
        <div
          className={`profile__intro ${
            loggedIn && "profile__intro_type_logged"
          }`}
        >
          <h1 className="profile__intro-title much-text">{name}</h1>
          <button
            type="button"
            name="edit-button"
            aria-label='Кнопка "Редактировать"'
            className="profile__intro-edit-button indicator"
            onClick={onEditPopup}
          ></button>
          <p className="profile__intro-text much-text">{about}</p>
        </div>
        <button
          type="button"
          name="add-button"
          aria-label='Кнопка "Добавить"'
          className={`profile__add-button indicator ${
            loggedIn && "profile__add-button_type_logged"
          }`}
          onClick={onNewCardPopup}
        ></button>
      </section>

      {/* Блок 3 cards */}
      <section className="cards">
        <ul className="cards__list list">
          {cards.map((card, i) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
