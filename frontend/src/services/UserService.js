import axios from "axios";
import { apiUrl } from "../constants/secrets";
import AuthService from "./AuthService";

class UserService {
  constructor() {
    this.users = [];
  }

  async fetchUser() {
    try {
      const response = await axios.get(apiUrl + "user", {
        headers: {
          Authorization: AuthService.getAuthHeader(),
        },
      });
      const data = response.data;
      this.users = data;
      return { status: true, data };
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return {
        status: false,
        message:
          error.response.data.error || error.response.data.error_description,
      };
    }
  }

  async fetchUsers() {
    try {
      const response = await axios.get(apiUrl + "users/", {
        headers: {
          Authorization: AuthService.getAuthHeader(),
        },
      });
      const data = response.data;
      this.users = data;
      return { status: true, data };
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return {
        status: false,
        message:
          error.response.data.error || error.response.data.error_description,
      };
    }
  }

  async deleteAccount() {
    try {
      const response = await axios.post(
        apiUrl + "user/remove",
        {},
        {
          headers: {
            Authorization: AuthService.getAuthHeader(),
          },
        }
      );
      const data = response.data;
      this.users = data;
      return { status: true, data };
    } catch (error) {
      console.error("Failed to delete account:", error);
      return {
        status: false,
        message:
          error.response.data.error || error.response.data.error_description,
      };
    }
  }

  async fetchUserById(id) {
    try {
      const response = await axios.post(
        apiUrl + "users/" + id + "/",
        {},
        {
          headers: {
            Authorization: AuthService.getAuthHeader(),
          },
        }
      );
      const data = response.data;
      this.users = data;
      return { status: true, data };
    } catch (error) {
      return {
        status: false,
        message:
          error.response.data.error || error.response.data.error_description,
      };
    }
  }

  async addFriend(id) {
    try {
      const response = await axios.post(
        apiUrl + "friendships/" + "add/" + id + "/",
        { id },
        {
          headers: {
            Authorization: AuthService.getAuthHeader(),
          },
        }
      );
      const data = response.data;
      this.users = data;
      return { status: true, data };
    } catch (error) {
      console.error("Failed to add friend:", error);
      return {
        status: false,
        message:
          error.response.data.error || error.response.data.error_description,
      };
    }
  }
  async removeFriend(id) {
    try {
      const response = await axios.post(
        apiUrl + "friendships/" + "remove/" + id + "/",
        { id },
        {
          headers: {
            Authorization: AuthService.getAuthHeader(),
          },
        }
      );
      const data = response.data;
      this.users = data;
      return { status: true, data };
    } catch (error) {
      console.error("Failed to remove friend:", error);
      return {
        status: false,
        message:
          error.response.data.error || error.response.data.error_description,
      };
    }
  }
}

export default new UserService();
