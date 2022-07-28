export const handleOpenPopup = (popup, form) => {
  popup.open();
  form.resetValidation();
};

//Обработчик ошибок
export const handleErrors = (error, message) => {
  console.error(`Ошибка: ${message}. Подробности ниже.`);
  if (error.response) {
    console.error('Error:', error.response.status + ": " + error.response.data.message);
  } else if (error.request) {
    console.error('Error:', error.request);
  } else {
    console.error('Error:', error.message);
  }
}
