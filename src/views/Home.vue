<template>
  <div class="container">
    <div class="home">
      <aside>
        <section class="profile">
          <img src="../assets/img/ISYANA-SARASVATI-1.jpg" alt="profile" />
          <div class="info">
            <p>Isyana Sarasvati</p>
            <small>isyanaku@qmail.com</small>
          </div>
        </section>
        <section class="all-user">
          <i class="fas fa-users"></i>
          <h4>All User</h4>
        </section>
        <section class="add-user" @click="addUser">
          <i class="fas fa-user-plus"></i>
          <h4>Add User</h4>
        </section>
        <section class="sign-out" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          <h4>Sign Out</h4>
        </section>
      </aside>
      <modalEdit />
      <modalAdd />
      <div class="menu">
        <nav></nav>
        <div class="title">
          <h2>All User</h2>
        </div>
        <div class="list">
          <section class="item-list" v-for="item in allUser" :key="item.id">
            <router-link :to="'user/' + item.id" class="item-user">
              <img :src="item.avatar" alt="profile" />
              <div class="info">
                <h3>{{ item.first_name }} {{ item.last_name }}</h3>
                <small>{{ item.email }}</small>
              </div>
            </router-link>
          </section>
          <footer>
            <div>
              <div class="prev" @click="prev" v-if="page == 2">
                <i class="fas fa-long-arrow-alt-left"></i>
                <small>previous Page</small>
              </div>
            </div>
            <div>
              <div class="next" @click="next" v-if="page == 1">
                <small>Next Page</small>
                <i class="fas fa-long-arrow-alt-right"></i>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalEdit from "../components/modalEdit.vue";
import modalAdd from "../components/modalAdd.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["allUser", "page"])
  },
  components: {
    modalEdit,
    modalAdd
  },
  methods: {
    Alluser() {
      this.$store.commit("ALL_USER");
    },
    editUser() {
      document.querySelector(".container-modal").style.display = "flex";
    },
    addUser() {
      document.querySelector(".container-add").style.display = "flex";
    },
    next() {
      this.$store.commit("NEXT");
      this.$store.dispatch("allUser");
    },
    prev() {
      this.$store.commit("PREV");
      this.$store.dispatch("allUser");
    },
    logout() {
      delete localStorage.id;
      delete localStorage.token;
      this.$router.go("/login");
    }
  },
  mounted() {
    this.$store.dispatch("allUser");
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
  .home {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 20px;
    aside {
      width: 17%;
      background: #ffffff;
      padding: 20px;
      box-sizing: border-box;
      .profile {
        display: flex;
        width: 100%;
        margin-top: 20px;
        img {
          object-fit: cover;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .info {
          display: flex;
          flex-direction: column;
          margin-top: 5px;
          small {
            color: #b4b9cd;
          }
        }
      }
      .all-user {
        display: flex;
        margin-top: 100px;
        border-radius: 8px;
        background: #e8ecf5;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        h4 {
          margin-left: 5px;
        }
      }
      .add-user {
        margin-top: 20px;
        display: flex;
        border-radius: 8px;
        background: #e8ecf5;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        h4 {
          margin-left: 5px;
        }
      }
      .sign-out {
        display: flex;
        margin-top: 100px;
        border-radius: 8px;
        background: #e8ecf5;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        h4 {
          margin-left: 5px;
        }
      }
      .sign-out:active {
        background: red;
      }
    }
    .menu {
      width: 80%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 20px;
      background: #f3f3f3cb;
      .title {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
      }
      .list {
        width: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .item-list {
          width: 100%;
          display: flex;
          margin-bottom: 15px;
          border-radius: 10px;
          background: #e8ecf5;
          padding: 5px;
          box-sizing: border-box;
          .item-user {
            width: 100%;
            display: flex;
            text-decoration: none;

            img {
              object-fit: cover;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin-right: 10px;
            }
            .info {
              display: flex;
              flex-direction: column;
              margin-top: 5px;
              h3 {
                color: black;
              }
              small {
                color: #b4b9cd;
              }
            }
          }
          .action {
            display: flex;
            width: 40%;
            align-items: center;
            justify-content: space-around;
            .edit {
              display: flex;
              cursor: pointer;
              p {
                margin-left: 5px;
              }
            }
            .delete {
              display: flex;
              color: red;
              cursor: pointer;
              p {
                margin-left: 5px;
              }
            }
          }
        }
        footer {
          display: flex;
          padding: 15px;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          .prev {
            display: flex;
            cursor: pointer;
            small {
              margin-left: 10px;
            }
          }
          .next {
            display: flex;
            cursor: pointer;
            small {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
