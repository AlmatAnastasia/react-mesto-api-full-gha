import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { id } = useContext(CurrentUserContext);
  const isOwn = card.owner === id;
  const isLiked = card.likes.some((i) => i === id);
  const cardLikeButtonClassName = `card__item-like-button indicator ${
    isLiked && "card__item-like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="card">
      <img
        className="card__image indicator"
        src={`${card.link}`}
        alt={`Фотография места &quot;${card.name}&quot;`}
        onClick={handleClick}
      />
      <div className="card__item">
        <h2 className="card__item-title much-text">{card.name}</h2>
        <div className="card__item-like-container">
          <button
            type="button"
            name="like-button"
            aria-label='Кнопка "Лайк"'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <label
            type="text"
            name="like-number"
            className="card__item-like-number"
          >
            {card.likes.length}
          </label>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          name="delete-button"
          aria-label='Кнопка "Удалить"'
          className="card__delete-button indicator"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}
