<!-- 关于我们 -->
<template>
  <div class="index-container account">
    <main-header title="我的账户"></main-header>
    <div class="container accountBg">
      <div>
        <img src="" alt="" />
        <span> {{ userInfo.realName || userInfo.userMobile }}</span>
      </div>
      <div class="muNumCon">
        <div>1111111</div>
        <div class="myNum">持有资产（元）</div>
      </div>
      <div class="subCon">
        <div class="subItem sub1">
          <p>11111</p>
          <p>持有本金（元）</p>
        </div>
        <div class="subItem sub2">
          <p>11111</p>
          <p>持有收益（元）</p>
        </div>
      </div>
    </div>
    <div class="container">
      <ul class="accountList">
        <li @click="go('/buyDetail')">
          <img src="" alt="" /><span>份额管理</span>
        </li>
        <li><img src="" alt="" /><span>客户列表</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import mainHeader from "../common/header.vue";
  import { mapGetters } from "vuex";
  export default {
    name: "account",
    components: {
      mainHeader,
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    data() {
      return {};
    },
    created() {
      this.getMyAccountInfo();
    },
    methods: {
      getMyAccountInfo() {
        console.log(this.userInfo.id);
      },
      go(link) {
        this.$router.push(link);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .accountBg {
    padding: 0.32rem;
    box-sizing: border-box;
    background: #efefef;
  }
  .muNumCon {
    text-align: center;
  }
  .subCon {
    display: flex;
  }
  .subItem {
    flex: 1;
    text-align: center;
  }
  .accountList {
    list-style: none;
    padding: 0;
  }
  .accountList li {
    list-style: none;
    height: 0.88rem;
    display: flex;
    align-items: center;
  }
</style>