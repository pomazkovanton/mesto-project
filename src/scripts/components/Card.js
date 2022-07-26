export default class Card {
  constructor({ _id, name, link, likes, owner }, userID, selectors) {
    this.likes = likes;

    this._id = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._userID = userID;
    this._selectors = selectors;
    //this._handleImageClick = handleImageClick;
    //this._handleLikeCard = handleLikeCard;
    //this._handleDeleteCard = handleDeleteCard;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selectors.templateSelector)
      .content.querySelector(this._selectors.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();

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
    this._cardLikeCounter.textContent = this.likes.length; //Заменить

    if (this._owner._id !== this._userID) {
      this._cardDeleteBtn.remove();
    }

    return this._element;
  }

  _setEventListeners() {}
}
