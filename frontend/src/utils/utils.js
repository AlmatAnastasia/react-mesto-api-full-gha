export const dataApi = {
  baseUrl: "http://localhost:3000", // адрес сервера
  headers: {
    "Content-Type": "application/json",
  },
};


export const conditionForClassList = (errors) =>
  errors !== undefined && errors !== "";
export const inputDescriptionUrlSelector = "popup__input_type_description-url";
export const inputNameTextSelector = "popup__input_type_name-text";
export const inputDescriptionTextSelector = "popup__input_type_description-text";
export const inputEmailSelector = "form__input_type_email";
export const inputPasswordSelector = "form__input_type_password";