class Api {
  constructor({ address, token }) {
    this._url = address;
    this._token = token;
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  }

  getCards() {
    return fetch(this._url + "/cards", {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })

      .catch((error) => console.log(error));
  }

  updateUser(name, job) {
    return fetch(this._url + "/users/me", {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about: job,
      }),
    }).then((response) => response.json());
  }

  updateAvatar(avatar) {
    return fetch(this._url + "/users/me/avatar", {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then((response) => response.json());
  }

  newCard(link, title) {
    return fetch(this._url + "/cards", {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then((response) => response.json());
  }

  deleteCard(idCard) {
    return fetch(this._url + "/cards/" + idCard, {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  }

  likeCard(idCard) {
    return fetch(this._url + "/cards/likes/" + idCard, {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((response) => response.json());
  }

  deleteLikeCard(idCard) {
    return fetch(this._url + "/cards/likes/" + idCard, {
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  }
}

const api = new Api({
  address: "http://localhost:3001",
});

export default api;
