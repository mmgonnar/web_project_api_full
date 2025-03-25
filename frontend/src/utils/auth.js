import { getToken } from "./token";

export const BASE_URL = "http://localhost:3000";

export const register = (email, password, confirmPassword, name, link) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword, name, link }),
  }).then((res) => {
    return res.status ? Promise.reject(res.message) : res;
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res.status ? Promise.reject(res.message) : res;
    });
};

export const getUserEmail = async (email) => {
  try {
    const response = await fetch(
      "https://se-register-api.en.tripleten-services.com/v1/users/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.error(err);
    return;
  }
};
