const modal = document.querySelector(".modal-edit");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".modal-edit__btn-close");
const editBtn = document.querySelector(".profile__btn-edit");

closeBtn.addEventListener("click", function () {
  modal.classList.add("modal-edit_hide");
  overlay.classList.add("overlay_hide");
});

editBtn.addEventListener("click", function () {
  modal.classList.remove("modal-edit_hide");
  overlay.classList.remove("overlay_hide");
});
