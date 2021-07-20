import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
  login(data) {
    return axios.post(API_URL + "login", data)
  }

  signup(data) {
    return axios.post(API_URL + "signup", data);
  }

  getProfile(user_id) {
    return axios.get(API_URL + "user/" + user_id);
  }

  deleteProfile(user_id) {
    return axios.delete(API_URL + "user/" + user_id)
  }
}

export default new AuthService();