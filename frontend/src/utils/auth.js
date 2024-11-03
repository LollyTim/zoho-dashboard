// src/utils/auth.js

import axios from "axios";

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          grant_type: "refresh_token",
          client_id: import.meta.env.VITE_ZOHO_CLIENT_ID,
          client_secret: import.meta.env.VITE_ZOHO_CLIENT_SECRET,
          refresh_token: import.meta.env.VITE_ZOHO_REFRESH_TOKEN,
        },
      }
    );

    const newAccessToken = response.data.access_token;
    localStorage.setItem("zoho_access_token", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

export { refreshToken };
