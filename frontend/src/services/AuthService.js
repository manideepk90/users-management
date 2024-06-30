import axios from "axios";
import { clientId, clientSecret, tokenUrl } from "../constants/secrets";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(
        tokenUrl,
        new URLSearchParams({
          grant_type: "password",
          username: username,
          password: password,
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access_token);
        return { status: true };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { status: false, error: error.response.data.error_description };
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
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
