const modal = document.querySelector('.modal-edit');
const overlay = document.querySelector('.overlay');
const editBtn = document.querySelector('.profile__btn-edit');

const profileEdit = editBtn.addEventListener('click', function () {
  modal.classList.remove('modal-edit_hide');
  overlay.classList.remove('overlay_hide');
});

export default profileEdit;
