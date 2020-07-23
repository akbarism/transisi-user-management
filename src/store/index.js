import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import axios from "axios";
import Swal from "sweetalert2";

export default new Vuex.Store({
  state: {
    allUser: [],
    user: [],
    newUser: [],
    msg: "",
    page: 1,
    idUser: null,
    token: localStorage.getItem("token") || null
  },
  getters: {
    getUser(state) {
      return state.token !== null;
    }
  },
  mutations: {
    ALL_USER(state, data) {
      state.allUser = data;
    },
    USER(state, data) {
      state.user = data;
    },
    NEW_USER(state, data) {
      state.newUser = data;
    },
    MSG(state, error) {
      state.msg = error;
    },
    NEXT(state) {
      state.page = 2;
      state.allUser;
    },
    PREV(state) {
      state.page = 1;
      state.allUser;
    }
  },
  actions: {
    allUser(context) {
      axios
        .get(`https://reqres.in/api/users?page=${this.state.page}`)
        .then(res => {
          context.commit("ALL_USER", res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    register(context, data) {
      return new Promise(resolve => {
        axios
          .post("https://reqres.in/api/register", data)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            context.commit("MSG", error.response.data.error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.response.data.error}`
            });
          });
      });
    },
    isLogin(context, data) {
      return new Promise(resolve => {
        axios
          .post("https://reqres.in/api/login", data)
          .then(res => {
            resolve(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
          })
          .catch(error => {
            context.commit("MSG", error.response);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.response.data.error}`
            });
          });
      });
    },
    userDetail(context, id) {
      return new Promise(resolve => {
        axios
          .get(`https://reqres.in/api/users/${id}`)
          .then(res => {
            context.commit("USER", res.data.data);
            resolve(res.data.data);
          })
          .catch(error => {
            context.commit("MSG", error);
          });
      });
    },
    addUser(context, data) {
      axios
        .post("https://reqres.in/api/users", data)
        .then(res => {
          res.data;
          context.commit("NEW_USER", res.data);
        })
        .catch(error => {
          context.commit("MSG", error.response.data.err);
        });
    },
    delete(id) {
      axios
        .delete(`https://reqres.in/api/users/${id}`)
        .then(res => {
          res.status;
          console.log(res.status);
        })
        .catch(err => {
          console.log(err);
        });
    },
    update(context, id, data) {
      return new Promise(resolve => {
        axios
          .post(`https://reqres.in/api/users/${id}`, data)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            context.commit("MSG", error.response.data.err);
          });
      });
    }
  },
  modules: {}
});
