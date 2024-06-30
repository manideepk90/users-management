import axios from "axios";
import { clientId, clientSecret, tokenUrl } from "../constants/secrets";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(
        tokenUrl,
        new URLSearchParams({
          grant_type: "password",
          username,
          password,
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access_token);
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  isAuthenticated() {
    const accessToken = this.getToken();
    return accessToken !== null;
  }
}

export default new AuthService();
