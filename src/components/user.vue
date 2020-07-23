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
        <div class="notfound" v-if="user.id == undefined">
          <img
            src="../assets/img/undraw_page_not_found_su7k (1).svg"
            alt="not found"
          />
          <h2>User Not Found</h2>
        </div>
        <section class="temp" v-else>
          <div class="user-detail">
            <img :src="user.avatar" alt="pp" />
            <section class="name">
              <h3>{{ user.first_name }} {{ user.last_name }}</h3>
            </section>
            <section class="email">
              <small>{{ user.email }}</small>
            </section>
            <section class="job">{{ user.job }}</section>
            <section class="button-group">
              <button class="upd" @click="editUser">Update</button>
              <button class="del" @click="del">Delete</button>
            </section>
          </div>
        </section>
        <modalEdit />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import modalEdit from "../components/modalEdit.vue";
import Swal from "sweetalert2";
export default {
  name: "User",
  components: {
    modalEdit
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    Alluser() {
      this.$store.commit("USER");
    },
    editUser() {
      document.querySelector(".container-modal").style.display = "flex";
    },
    del() {
      const id = this.$route.params.id;
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
            this.$router.go("/user/:id");
          }
        });
      });
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch("userDetail", id);
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
      .notfound {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 400px;
        img {
          width: 380px;
          height: 380px;
        }
      }
      .temp {
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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
            margin-bottom: 5px;
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
    }
  }
}
</style>
