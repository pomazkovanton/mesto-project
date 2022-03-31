const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__btn-close");
const editBtn = document.querySelector(".profile__btn-edit");
const likeBtns = document.querySelectorAll(".gallery__btn-like");

closeBtn.addEventListener("click", function () {
  popup.classList.add("popup_hide");
});

editBtn.addEventListener("click", function () {
  popup.classList.remove("popup_hide");
});

likeBtns.forEach(function (likeBtn) {
  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("gallery__btn-like_active");
  });
});
