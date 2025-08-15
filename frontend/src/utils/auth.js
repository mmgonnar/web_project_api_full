import { getToken } from "./token";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://18-web-project-api-full-backend.vercel.app";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    return Promise.reject(data.message || data.error || "Request failed");
  }
  return data;
};

export const register = (email, password, confirmPassword, name, link) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword, name, link }),
  }).then(handleResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

// export const getUserEmail = async (email) => {
//   try {
//     const response = await fetch("https://api.sudoa.crabdance.com", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const responseJson = await response.json();
//     return responseJson;
//   } catch (err) {
//     console.error(err);
//     return;
//   }
// };
