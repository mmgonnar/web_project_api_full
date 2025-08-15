class Api {
  constructor({ address }) {
    this._url = address;
  }

  setToken(token) {
    this._token = token;
  }

  //?
  // _makeRequest(url, method, body) {
  //   const options = {
  //     method,
  //     headers: {
  //       Authorization: `Bearer ${this._token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   return fetch(`${this._url}${url}`, options);
  // }

  getUserInfo() {
    //return this._makeRequest(`${this.baseUrl}/cards`);
    return fetch(this._url + "/users/me", {
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  }

  //?d
  // getCards() {
  //   return this._makeRequest(`${this.baseUrl}/cards`);
  // }

  getCards(token) {
    return fetch(this._url + "/cards", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })

      .catch((error) => console.log(error));
  }
  //?
  // updateUser(name, job) {
  //   return this._makeRequest(
  //     "/users/me",
  //     "PATCH",
  //     JSON.stringify({
  //       name,
  //       about: job,
  //     })
  //   );
  // }

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
    }).then((response) => {
      console.log(response), response.json();
    });
  }

  likeCard(idCard) {
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

// Updated backend URL for production - v2
const api = new Api({
  address:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://18-web-project-api-full-backend.vercel.app",
});

export default api;
