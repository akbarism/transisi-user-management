<template>
  <div class="container-add">
    <div class="temp-modal">
      <header>
        <h4>Add User</h4>
        <h3 @click="close">X</h3>
      </header>
      <form @submit="addUser">
        <section class="form">
          <div class="form-group">
            <label for="nama">Name</label>
            <input type="text" v-model="name" required />
          </div>
          <div class="form-group">
            <label for="job">Job</label>
            <input type="text" v-model="job" required />
          </div>
          <footer>
            <button>Add</button>
          </footer>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "modalAdd",
  computed: {
    ...mapState(["newUser"])
  },
  data() {
    return {
      name: "",
      job: ""
    };
  },
  methods: {
    close() {
      document.querySelector(".container-add").style.display = "none";
    },
    addUser(e) {
      e.preventDefault();
      this.$store
        .dispatch("addUser", {
          name: this.name,
          job: this.job
        })
        .then(() => {
          Swal.fire("Succes!", "Add User Success", "success");
          this.$router.push("/neo");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container-add {
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
</style>
