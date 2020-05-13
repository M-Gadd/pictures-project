import axios from "axios";

export function setAuthorizationToken(token: any) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

const service = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: { Authorization: localStorage.token ? `Bearer ${localStorage.token}` : "" },
});

const errHandler = (err: any) => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  async getUsers() {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    return response.data;
  },

  async getPosts() {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    return response.data;
  },

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : "";
  },

  async getFirstPage() {
    return await service.get("/");
  },
  async getTest() {
    return await service.get("/about");
  },

  // ----------> AUTH <-------------
  async signup(data: any) {
    const response = await service.post("/signup", data).catch(errHandler);
    localStorage.setItem("token", response.data.data);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  },
  async login(data: any) {
    const response = await service.post("/login", data);
    localStorage.setItem("token", response.data.data);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setAuthorizationToken(response.data.data);
    return response.data;
  },
  async logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // return await service.get("/logout");
  },
  // --------------------------------

  // ----------> USERS <-------------
  async getAllUsers() {
    return await service.get("/users");
  },
  async getUser(id: string) {
    return await service.get(`/users/${id}`);
  },

  async deleteUser(id: string) {
    return await service.delete(`/users/${id}`);
  },
  async updateUser(id: string, data: any) {
    return await service.put(`/users/${id}`, data);
  },
  async uploadImageUser(id: string, data: any) {
    return await service.post(`/users/image/${id}`, data);
  },
  // --------------------------------

  // ----------> STREET ART <-------------
  async getStreetArt() {
    return await service.get("/streetart");
  },

  async createStreetArt(data: any) {
    return await service.post("/streetart", data).catch(errHandler);
  },

  async uploadImageStreetArt(id: string, data: any) {
    return await service.post(`/streetart/image/${id}`, data);
  },
  async getOneUserImages(id: string) {
    return await service.get(`/streetart/user/${id}`);
  },
  async getSearchStreetArt(data: any) {
    return await service.post(`/streetart/search`, data);
  },
  async deleteStreetArt(id: string) {
    return await service.delete(`/streetart/${id}`);
  },
  // --------------------------------

  // ----------> VISIT <-------------
  async getAllVisits() {
    return await service.get("/visits");
  },

  async createVisit(id: any) {
    return await service.post("/visit", id).catch(errHandler);
  },

  async deleteVisit(id: string) {
    return await service.delete(`/visit/${id}`).catch(errHandler);
  },
  async getAllVisitsForOneStreetArt(id: string) {
    return await service.get(`/visit/${id}`).catch(errHandler);
  },

  // --------------------------------

  // ----------> Likes <-------------
  async getAllLikes() {
    return await service.get("/likes");
  },

  async createLike(id: any) {
    return await service.post("/like", id).catch(errHandler);
  },

  async deleteLike(id: string) {
    return await service.delete(`/like/${id}`).catch(errHandler);
  },
  async getAllLikesForOneStreetArt(id: string) {
    return await service.get(`/like/${id}`).catch(errHandler);
  },

  // --------------------------------
  // ----------> Comments <-------------
  async getAllComments() {
    return await service.get("/comments");
  },

  async createComment(data: any) {
    return await service.post("/comment", data).catch(errHandler);
  },

  async deleteComment(id: string) {
    return await service.delete(`/comment/${id}`).catch(errHandler);
  },
  async getAllCommentsForOneStreetArt(id: string) {
    return await service.get(`/comment/${id}`).catch(errHandler);
  },

  // --------------------------------
};
