// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

let accessToken = process.env.VITE_ZOHO_ACCESS_TOKEN;
const refreshToken = process.env.VITE_ZOHO_REFRESH_TOKEN;

const ZOHO_API_BASE = "https://www.zohoapis.com/crm/v2";

// Function to refresh the access token
// server.js

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          grant_type: "refresh_token",
          client_id: process.env.VITE_ZOHO_CLIENT_ID,
          client_secret: process.env.VITE_ZOHO_CLIENT_SECRET,
          refresh_token: process.env.VITE_ZOHO_REFRESH_TOKEN,
        },
      }
    );

    if (response.data.access_token) {
      accessToken = response.data.access_token;
      console.log("Access token refreshed successfully:", accessToken);
      return true;
    } else {
      console.log("Unexpected response from Zoho API:", response.data);
      return false;
    }
  } catch (error) {
    console.error(
      "Failed to refresh access token:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};

// Middleware to handle API requests
app.get("/api/:endpoint", async (req, res) => {
  const { endpoint } = req.params;

  try {
    let response = await axios.get(`${ZOHO_API_BASE}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Access token expired. Refreshing...");
      await refreshAccessToken();

      // Retry the request with the new access token
      try {
        const response = await axios.get(`${ZOHO_API_BASE}/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        res.json(response.data);
      } catch (retryError) {
        res
          .status(retryError.response ? retryError.response.status : 500)
          .json({
            message: retryError.message,
          });
      }
    } else {
      res.status(error.response ? error.response.status : 500).json({
        message: error.message,
      });
    }
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
