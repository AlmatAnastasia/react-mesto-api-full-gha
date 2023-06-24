import Popup from "./Popup";
export default function PopupWithForm({
  name,
  title,
  textButton,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  children,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form
        name={`popup-form_type_${name}`}
        className="popup__form"
        onSubmit={onSubmit}
        noValidate
      >
        <h3 className="popup__heading">{title}</h3>
        {children}
        <button
          type="submit"
          name="submit"
          aria-label={`Кнопка отправки формы &quot;${textButton}&quot;`}
          className={`popup__submit ${
            isValid ? "indicator" : "popup__submit_disabled indicator_disabled"
          }`}
          disabled={isValid ? false : true}
        >
          {textButton}
        </button>
      </form>
    </Popup>
  );
}
