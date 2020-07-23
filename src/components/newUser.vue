<template>
  <div class="container">
    <div class="user">
      <aside>
        <router-link to="/" class="head">
          <i class="fas fa-long-arrow-alt-left"></i>
          <h4>Back</h4>
        </router-link>
        <div class="men">
          <i class="fas fa-user"></i>
          <h4>User Detail</h4>
        </div>
      </aside>
      <div class="cover">
        <section class="title">
          <h2>User Detail</h2>
        </section>
        <section class="temp">
          <div class="notfound" v-if="newUser.length == 0">
            <img
              src="../assets/img/undraw_page_not_found_su7k (1).svg"
              alt="not found"
            />
            <h2>User Not Found</h2>
          </div>
          <div class="user-detail" v-else>
            <img src="../assets/img/pp.jpg" alt="pp" />
            <section class="name">
              <h3>{{ newUser.name }}</h3>
            </section>
            <section class="email">
              <small>{{ newUser.name }}@vue.com</small>
            </section>
            <section class="job">
              <i class="fas fa-briefcase ico"></i>
              {{ newUser.job }}
            </section>
            <section class="button-group">
              <button class="upd" @click="editUser">Update</button>
              <button class="del" @click="del">Delete</button>
            </section>
          </div>
        </section>
        <div class="container-modal">
          <div class="temp-modal">
            <header>
              <h4>Edit User</h4>
              <h3 @click="close">X</h3>
            </header>
            <section class="form">
              <div class="form-group">
                <label for="nama">Name</label>
                <input type="text" v-model="newUser.name" />
              </div>
              <div class="form-group">
                <label for="job">Job</label>
                <input type="text" v-model="newUser.job" />
              </div>
              <footer>
                <button @click="upd">Save</button>
              </footer>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "User",
  data() {
    return {
      name: "",
      job: ""
    };
  },
  computed: {
    ...mapState(["newUser"])
  },
  methods: {
    Alluser() {
      this.$store.commit("NEW_USER");
    },
    del() {
      const id = this.newUser.id;
      this.$store.dispatch("delete", id).then(() => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.value) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            this.$router.go("/neo");
          }
        });
      });
    },
    upd() {
      const id = this.newUser.id;
      this.$store
        .dispatch("update", id, {
          name: this.name,
          job: this.job
        })
        .then(() => {
          Swal.fire("Succes!", "Data Updated", "success");
          document.querySelector(".container-modal").style.display = "none";
        });
    },
    close() {
      document.querySelector(".container-modal").style.display = "none";
    },
    editUser() {
      document.querySelector(".container-modal").style.display = "flex";
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
  .user {
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
      align-items: center;
      width: 15%;
      background: #ffffff;
      padding: 0 10px 0 0;
      box-sizing: border-box;
      .head {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 10px;
        box-sizing: border-box;
        text-decoration: none;
        color: black;
        h4 {
          margin-left: 10px;
        }
      }
      .men {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        background: #b4b9cd;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 100px;
        h4 {
          margin-left: 10px;
        }
      }
    }
    .cover {
      width: 85%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 20px;
      background: #f3f3f3;
      .title {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
      }
      .temp {
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .notfound {
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 100%;
          height: 400px;
          img {
            width: 380px;
            height: 380px;
          }
        }
        .user-detail {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          box-sizing: border-box;
          width: 350px;
          height: 450px;
          background: #b4b9cd;
          border-radius: 10px;
          img {
            width: 330px;
            height: 300px;
            border-radius: 10px;
            object-fit: cover;
            margin-bottom: 10px;
          }
          .email {
            margin-bottom: 10px;
          }
          .job {
            display: flex;
            margin-bottom: 5px;
            .ico {
              margin-right: 10px;
            }
          }
          .button-group {
            display: flex;
            width: 100%;
            justify-content: center;
            .upd {
              padding: 10px;
              border: none;
              background: blue;
              color: white;
              border-radius: 5px;
              margin: 5px;
            }
            .del {
              padding: 10px;
              border: none;
              background: red;
              color: white;
              border-radius: 5px;
              margin: 5px;
            }
          }
        }
      }
      .container-modal {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: none;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        justify-content: center;
        align-items: center;
        z-index: 2;
        .temp-modal {
          width: 400px;
          background: #ffffff;
          border-radius: 5px;
          header {
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            justify-content: space-between;
            h3 {
              cursor: pointer;
              color: red;
            }
          }
          .form {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            .form-group {
              display: flex;
              justify-content: space-between;
              width: 100%;
              margin-bottom: 10px;
              input {
                width: 250px;
                height: 35px;
                border-radius: 5px;
                border: 1px solid #ccc;
                padding: 5px;
                box-sizing: border-box;
              }
            }
            footer {
              width: 100%;
              box-sizing: border-box;
              display: flex;
              justify-content: flex-end;
              button {
                padding: 10px 20px;
                background: #5e98e4;
                border-radius: 5px;
                border: none;
                color: #ffffff;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
  }
}
</style>
