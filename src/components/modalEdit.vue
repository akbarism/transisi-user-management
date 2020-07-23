<template>
  <div class="container-modal">
    <div class="temp-modal">
      <header>
        <h4>Edit User</h4>
        <h3 @click="close">X</h3>
      </header>
      <section class="form">
        <div class="form-group">
          <label for="nama">Name</label>
          <input type="text" v-model="user.first_name" />
        </div>
        <div class="form-group">
          <label for="job">Job</label>
          <input type="text" v-model="job" />
        </div>
        <footer>
          <button @click="upd">Save</button>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  name: "modalEdit",
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      name: "",
      job: ""
    };
  },
  methods: {
    close() {
      document.querySelector(".container-modal").style.display = "none";
    },
    upd() {
      const id = this.$route.params.id;
      this.$store
        .dispatch("update", id, {
          first_name: this.name,
          job: this.job
        })
        .then(() => {
          Swal.fire("Succes!", "Data Updated", "success");
          document.querySelector(".container-modal").style.display = "none";
        });
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
