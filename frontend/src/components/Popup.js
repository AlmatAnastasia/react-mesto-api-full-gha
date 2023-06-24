import { useEffect } from "react";
// создать компонент 'Popup' для обертки любых попапов
const Popup = ({
  isOpen,
  name,
  onClose,
  popupContionerSelector = "",
  children,
}) => {
  // указать 'useEffect' для обработчика 'Escape'
  useEffect(() => {
    if (!isOpen) return; // остановить действие эффекта, если попап закрыт
    // объявить внутри 'useEffect' функцию, чтобы она не теряла ссылку при перерисовке компонента
    // закрыть попап клавишей Esc
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    //  удалить обработчики в 'clean-up'- функции
    return () => document.removeEventListener("keydown", handleEscape);
    // выполнять только при открытии (isOpen)
  }, [isOpen, onClose]);

  // закрыть попап при нажатии на кнопку overlay
  const handleOverlay = (event) => {
    if (event.target.classList.contains("popup_opened")) {
      onClose();
    }
  };

  // верстка обертки любого попапа с классом 'popup' и добавлением 'popup_opened'
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      // добавить обработчик оверлея
      onClick={handleOverlay}
    >
      {/* добавить контейнер для контента попапа */}
      <div className={`popup__container ${popupContionerSelector}`}>
        {/* контент попапа в 'children' */}
        {children}
        {/* кнопка крестика */}
        <button
          type="button"
          name="close-button"
          aria-label='Кнопка "Закрыть"'
          className="popup__close-button indicator"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
