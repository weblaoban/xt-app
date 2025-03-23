<!-- 关于我们 -->
<template>
  <div class="index-container account">
    <main-header title="我的账户"></main-header>
    <div class="accountBgContainer">
      <div class="container accountBg">
        <div class="username" style="padding: 0 0.3rem">
          <img src="/img/user.png" alt="" />&nbsp;
          <span> {{ userInfo.realName || userInfo.userMobile || 11111 }}</span>
        </div>
        <div class="muNumCon">
          <div class="myNumLabel">持有资产（元）</div>
          <div class="myNum">{{ amount + ben * 1 }} <span>元</span></div>
        </div>
        <div class="subCon">
          <div class="subItem sub1">
            <p>持有本金（元）</p>
            <p>{{ amount }}&nbsp;<span>元</span></p>
          </div>
          <div class="line"></div>
          <div class="subItem sub2">
            <p>持有收益（元）</p>
            <p>{{ ben }}&nbsp;<span>元</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <ul class="accountList">
        <li v-if="userInfo.score === 1" @click="go('/plannerDetail')">
          <img src="/img/account1.png" alt="" />
          <div>份额管理</div>
          <img class="arrow" src="/img/arrow.png" alt="" />
        </li>
        <li v-else @click="go('/buyDetail')">
          <img src="/img/account1.png" alt="" />
          <div>份额管理</div>
          <img class="arrow" src="/img/arrow.png" alt="" />
        </li>
        <li v-if="userInfo.score === 1" @click="go('/customList')">
          <img src="/img/account2.png" alt="" />
          <div>客户列表</div>
          <img class="arrow" src="/img/arrow.png" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import mainHeader from "../common/header.vue";
  import { mapGetters } from "vuex";
  import { getUserProd } from "@/api/user.js";
  export default {
    name: "account",
    components: {
      mainHeader,
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    data() {
      return {
        amount: 0,
        ben: 0,
      };
    },
    created() {
      this.getMyAccountInfo();
    },
    methods: {
      getMyAccountInfo() {
        getUserProd({ current: 1, pageSize: 10000, uid: this.userInfo.id }).then(
          (res) => {
            let list = [];
            res.data.data.records.forEach((item) => {
              const { userDtm = [] } = item;
              userDtm.forEach((user) => {
                if (user.id == this.userInfo.id) {
                  list.push({ ...user, ...item });
                }
              });
            });

            let amount = 0;
            let ben = 0;
            list.forEach((item) => {
              const pList = JSON.parse(item.qlist);
              let days = 0;
              pList.forEach((item) => {
                if (!item.finish) {
                  days += item.days;
                }
              });
              amount += item.amount;
              if (days) {
                ben = ((item.amount * days) / 365).toFixed(2);
              }
            });
            this.amount = amount;
            this.ben = ben;
          }
        );
      },
      go(link) {
        this.$router.push(link);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .accountBg {
    padding: 0.32rem 0.1rem 0.1rem;
    box-sizing: border-box;
    background-color: #3b2b0d;
    background-image: linear-gradient(
      64deg,
      rgba(234, 186, 99, 0.3),
      rgba(59, 43, 13, 0.3)
    );
    border-radius: 6px;
    box-sizing: border-box;
    .username {
      font-weight: 400;
      font-size: 0.32rem;
      color: #eaba63;
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .muNumCon {
    .myNumLabel {
      margin: 0.2rem;
      font-weight: 400;
      font-size: 0.24rem;
      color: #eaba63;
      opacity: 0.5;
    }
    .myNum {
      margin: 0 0.3rem;
      font-weight: 400;
      font-size: 0.36rem;
      color: #eaba63;
      span {
        font-size: 0.24rem;
        color: #eaba63;
      }
    }
  }
  .subCon {
    margin-top: 0.2rem;
    display: flex;
    background: #ffffff;
    border-radius: 6px;
    padding: 0.4rem 0;
    box-sizing: border-box;
    align-items: center;
    .line {
      height: 0.67rem;
      border-left: 2px dashed #999;
    }
  }
  .subItem {
    flex: 1;
    padding-left: 0.32rem;
    &.sub2 {
      padding-left: 0.34rem;
    }
    p {
      font-weight: 400;
      font-size: 0.24rem;
      color: #9a9a9c;
      margin: 0;
      &:nth-child(2) {
        font-weight: 400;
        font-size: 0.24rem;
        color: #30333b;
        margin-top: 0.16rem;
        span {
          font-size: 0.24rem;
          color: #30333b;
        }
      }
    }
  }
  .accountList {
    list-style: none;
    padding: 0;
    margin: 0;
    background: #ffffff;
    box-shadow: 0px 0px 9px 1px rgba(48, 51, 59, 0.1);
    border-radius: 6px;
  }
  .accountList li {
    list-style: none;
    display: flex;
    align-items: center;
    display: flex;
    padding: 0 0.4rem;
    align-items: center;
    img {
      width: 0.32rem;
      height: 0.32rem;
      margin-right: 16px;
    }
    .arrow {
      width: 0.12rem;
      height: 0.24rem;
    }
    & > div {
      font-weight: 400;
      font-size: 0.24rem;
      color: #021b0c;
      flex: 1;
      height: 1.12rem;
      line-height: 1.12rem;
      border-bottom: 1px solid #e1e8e4;
    }
    &:last-child {
      & > div {
        border: none;
      }
    }
  }
  .accountBgContainer {
    padding: 0.2rem 0.3rem;
    background: #eaba63;
    width: 100%;
    height: 3.2rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
</style>