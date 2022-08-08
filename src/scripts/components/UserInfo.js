export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}){
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const dataUser = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return dataUser;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this._id = userData._id;
  }

  setUserAvatar(userData) {
    this._avatar.src = userData.avatar;
  }
}
