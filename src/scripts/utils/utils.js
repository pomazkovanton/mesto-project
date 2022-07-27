export const renderLoading = (isLoading = false, typeBtnSubmit) => {
  const button = document.querySelector(
    `.popup__form-btn_type_${typeBtnSubmit}`
  );
  isLoading
    ? (button.textContent = "Сохранение...")
    : (button.textContent = "Сохранить");
};

export const handleOpenPopup = (popup, form) => {
  popup.open();
  form.resetValidation();
};
