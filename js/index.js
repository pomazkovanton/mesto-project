const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__btn-close");
const editBtn = document.querySelector(".profile__btn-edit");

closeBtn.addEventListener("click", function () {
  popup.classList.add("popup_hide");
});

editBtn.addEventListener("click", function () {
  popup.classList.remove("popup_hide");
});
