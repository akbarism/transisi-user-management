<template>
  <div class="container">
    <div class="login">
      <aside>
        <header>
          <h1>Register</h1>
          <p>Welcome! Please Register to create your account.</p>
        </header>
        <form @submit="register">
          <section class="form">
            <div class="form-group">
              <label for="nama">Email</label>
              <input type="text" v-model="email" />
            </div>
            <div class="form-group">
              <label for="job">Password</label>
              <input type="password" v-model="password" />
            </div>
          </section>
          <footer>
            <button type="submit">Register</button>
            <small>
              have an account?
              <router-link to="/Login">Login </router-link>Here
            </small>
          </footer>
        </form>
      </aside>
      <div class="cover">
        <img src="../assets/img/undraw_annotation_7das.svg" alt="cover" />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register(e) {
      e.preventDefault();
      this.$store
        .dispatch("register", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          Swal.fire({
            title: "Register Success",
            icon: "success",
            showConfirmButton: false,
            timer: 2200
          });
          this.$router.go("/login");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  background: #b4b9cd;
  height: 100vh;
  .login {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 20px;
    aside {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 25%;
      background: #ffffff;
      padding: 20px;
      box-sizing: border-box;
      header {
        padding: 10px;
        box-sizing: border-box;
        h1 {
          margin-bottom: 10px;
        }
      }
      .form {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        .form-group {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: 10px;
          input {
            width: 100%;
            height: 35px;
            border-radius: 5px;
            border: 1px solid #ccc;
            padding: 5px;
            box-sizing: border-box;
          }
        }
      }
      footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        box-sizing: border-box;
        button {
          background: #5e98e4;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
        }
      }
    }
    .cover {
      width: 75%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 20px;
      background: #f3f3f3cb;
      img {
        width: 80%;
        height: 80%;
      }
    }
  }
}
</style>
