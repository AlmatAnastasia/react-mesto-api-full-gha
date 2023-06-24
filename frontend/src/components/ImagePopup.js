import Popup from "./Popup";
export default function ImagePopup({ name, isOpen, onClose, heading, link }) {
  return (
    <Popup
      isOpen={isOpen.isPopupImageOpen}
      name={name}
      onClose={onClose}
      popupContionerSelector="popup__container_preview"
    >
      <img
        className="popup__image indicator"
        src={`${link}`}
        alt={`Превью Фотографии места &quot;${heading}&quot;`}
      />
      <h3 className="popup__heading popup__heading_preview">{heading}</h3>
      <button
        type="button"
        name="close-button"
        aria-label='Кнопка "Закрыть"'
        className="popup__close-button indicator"
        onClick={onClose}
      />
    </Popup>
  );
}
