import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputDescriptionUrlSelector,
} from "../utils/utils.js";
export default function EditAvatarPopup({
  textButton,
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  // валидация
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  // наличие текста ошибки для каждого из полей
  const conditionForClassListDescription = conditionForClassList(
    errors[inputDescriptionUrlSelector]
  );
  // очистка полей при монтировании
  useEffect(() => {
    resetForm();
    setValues({});
  }, [resetForm, setValues, isOpen]);
  // обработка отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // передать значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: values[inputDescriptionUrlSelector],
    });
  }
  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      textButton={textButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="popup__info">
        <div className="popup__cell">
          <input
            type="url"
            id="popup-update-avatar-description-url"
            name="popup__input_type_description-url"
            className={`popup__input popup__input_type_description-url ${
              conditionForClassListDescription && "popup__input_type_error"
            }`}
            placeholder="Ссылка на новое изображение аватара"
            value={values[inputDescriptionUrlSelector] || ""}
            onChange={handleChange}
            required
          />
          <span
            className={`popup-update-avatar-description-url-error ${
              conditionForClassListDescription && "popup__input-error"
            }`}
          >
            {errors[inputDescriptionUrlSelector]}
          </span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}
