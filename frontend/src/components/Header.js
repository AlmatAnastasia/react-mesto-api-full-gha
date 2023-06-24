import headerLogo from "../images/header-logo.svg";

export default function Header({
  textButton,
  loggedIn,
  onLogin,
  onRegister,
  signOut,
  onClose,
}) {
  return (
    // Блок 1 header
    <header className={`header ${loggedIn && "header_type_logged"}`}>
      <div
        className={`header__container-logo ${
          loggedIn && "header__container-logo_type_logged"
        }`}
      >
        <img
          className={`header__logo ${loggedIn && "header__logo_type_logged"}`}
          src={headerLogo}
          alt='Логотип сервиса "Место"'
        />
        {loggedIn && (
          <button
            type="button"
            name="close-button"
            aria-label='Кнопка "Закрыть"'
            className={`header__close-button indicator ${
              loggedIn && "header__close-button_type_logged"
            }`}
            onClick={onClose}
          />
        )}
      </div>
      <div
        className={`header__container-user ${
          loggedIn && "header__container-user_type_logged"
        }`}
      >
        <p
          className={`header__email ${loggedIn && "header__email_type_logged"}`}
        >
          {loggedIn && localStorage.getItem("userEmail")}
        </p>
        <button
          type="button"
          name="app-login-button"
          aria-label={`Кнопка входа в приложение &quot;${textButton}&quot;`}
          className={`header__app-login-button indicator ${
            loggedIn && "header__app-login-button_type_logged"
          }`}
          onClick={
            textButton === "Войти"
              ? onLogin
              : textButton === "Регистрация"
              ? onRegister
              : signOut
          }
        >
          {textButton}
        </button>
      </div>
    </header>
  );
}
