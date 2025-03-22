class Api {
  constructor({ address, token }) {
    this._url = address;
    this._token = localStorage.getItem("jwt");
  }

  setToken(token) {
    this._token = token;
    //localStorage.setItem("jwt", token);
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  }

  getCards() {
    return fetch(this._url + "/cards", {
      headers: {
        Authorization: `Bearer ${this._token}`,
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
        Authorization: `Bearer ${this._token}`,
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
        Authorization: `Bearer ${this._token}`,
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
        Authorization: `Bearer ${this._token}`,
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
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  }

  likeCard(idCard) {
    console.log(idCard, "card Id like API 89");
    return fetch(this._url + "/cards/" + idCard + "/likes", {
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
    }).then((response) => response.json());
  }

  deleteLikeCard(idCard) {
    return fetch(this._url + "/cards/" + idCard + "/likes", {
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  }
}

const api = new Api({
  address: "http://localhost:3000",
});

export default api;
