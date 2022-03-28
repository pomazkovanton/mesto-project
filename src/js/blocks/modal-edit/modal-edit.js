const modal = document.querySelector('.modal-edit');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.modal-edit__btn-close');

const modaledit = closeBtn.addEventListener('click', function () {
  modal.classList.add('modal-edit_hide');
  overlay.classList.add('overlay_hide');
});

export default modaledit;
