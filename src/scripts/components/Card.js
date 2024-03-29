export default class Card {
  constructor({ _id, name, link, likes, owner }, userID, selectors, handleLikeCard, handleImageClick, handleDeleteCard) {
    this.likes = likes;

    this._id = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._userID = userID;
    this._selectors = selectors;
    this._handleLikeCard = handleLikeCard;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  checkLike() {
    return this.likes.some(like => like._id === this._userID);
  }

  renderLike() {
    if (this.checkLike()) {
      this._cardLikeBtn.classList.add('gallery__btn-like_active');
      this._cardLikeCounter.textContent = this.likes.length;
    } else {
      this._cardLikeBtn.classList.remove('gallery__btn-like_active');
      this._cardLikeCounter.textContent = this.likes.length;
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._cardImage = this._element.querySelector(this._selectors.imgSelector);
    this._cardTitle = this._element.querySelector(
      this._selectors.titleSelector
    );
    this._cardDeleteBtn = this._element.querySelector(
      this._selectors.btnDelSelector
    );
    this._cardLikeBtn = this._element.querySelector(
      this._selectors.btnLikeSelector
    );
    this._cardLikeCounter = this._element.querySelector(
      this._selectors.likeCounterSelector
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this.renderLike();

    if (this._owner._id !== this._userID) {
      this._cardDeleteBtn.remove();
    }

    return this._element;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selectors.templateSelector)
      .content.querySelector(this._selectors.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(this._selectors.btnLikeSelector)
      .addEventListener('click', () => {
        this._handleLikeCard(this);
      });
    this._element
      .querySelector(this._selectors.imgSelector)
      .addEventListener('click', () => {
        this._handleImageClick(this._name, this._link);
      });
    this._element
      .querySelector(this._selectors.btnDelSelector)
      .addEventListener('click', () => {
        this._handleDeleteCard(this);
      });
  }
}
