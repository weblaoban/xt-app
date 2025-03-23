<template>
  <div class="loginContent">
    <h4 class="loginTitle">登录</h4>
    <div class="inputItem">
      <input v-model="userName" class="input" id="userName" type="text" /><label
        class="placeholder"
        for="userName"
        v-show="!userName"
        >您的手机号</label
      >
      <div class="cut" v-show="!userName"></div>
    </div>
    <div class="inputItem">
      <input
        v-model="passWord"
        class="input"
        id="passWord"
        type="password"
      /><label class="placeholder" for="passWord" v-if="!passWord"
        >登录密码</label
      >
      <div class="cut" v-if="!passWord"></div>
    </div>
    <div class="button" @click="onLogin">立即登录</div>
    <div class="other">
      <p @click="goRegister">还没有账号？ <span>立即注册</span></p>
      <p @click="onForgetPassword">忘记密码</p>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    name: "wel",
    data() {
      return {
        userName: "",
        passWord: "",
        loading: false,
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    methods: {
      onLogin() {
        const { userName, passWord } = this;
        if (!userName) {
          document.getElementById("userName").focus();
          return;
        }
        if (!passWord) {
          document.getElementById("passWord").focus();
          return;
        }
        this.$store
          .dispatch("LoginByUsername", { username: userName, password: passWord })
          .then(() => {
            this.$store.dispatch("GetUserInfo");
            history.back();
          });
      },
    },
  };
</script>