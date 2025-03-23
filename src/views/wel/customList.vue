<!-- 关于我们 -->
<template>
  <div class="index-container account">
    <main-header title="客户列表"></main-header>
    <div class="container customCon">
      <div class="searchCon">
        <div class="input">
          <input
            v-model="key"
            @blur="fetchListBykey"
            type="text"
            placeholder="请输入客户姓名或手机号"
          />
          <img src="/img/search.png" alt="" class="search" />
        </div>
      </div>

      <div class="customList">
        <div
          class="customItem"
          v-for="item in customList"
          :key="item.id"
          @click="goDetail(item)"
        >
          <div class="userInfo">
            <img src="/img/user1.png" alt="" />
            &nbsp;
            <span class="name">{{ item[0] && item[0].nickName }}</span>
            &nbsp;&nbsp;
            <span class="phone">{{ item[0] && item[0].userMobile }}</span>
          </div>

          <div class="subCon">
            <div class="subItem sub1">
              <p>持有产品本金</p>
              <p>{{ getAmount(item) }}&nbsp;<span>元</span></p>
            </div>
            <div class="line"></div>
            <div class="subItem sub2">
              <p>待收收益</p>
              <p>{{ getBen(item) || "-" }}&nbsp;<span>元</span></p>
            </div>
          </div>
          <div class="cNum">
            持有数量： <span>{{ item.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import mainHeader from "../common/header.vue";
  import { mapGetters } from "vuex";
  import { getPlannerProd } from "@/api/user.js";
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
        key: "",
        customList: [],
        oList: [],
      };
    },
    created() {
      this.fetchList();
    },
    methods: {
      fetchList() {
        getPlannerProd({ uid: this.userInfo.id }).then((res) => {
          let list = [];
          res.data.data.forEach((item) => {
            const { userDtm = [] } = item;
            userDtm.forEach((user) => {
              if (user.puserId == this.userInfo.id) {
                list.push({ ...user, ...item, uid: user.id });
              }
            });
          });
          this.oList = res.data.data;
          let result = {};
          list.forEach((item) => {
            if (result[item.userMobile]) {
              result[item.userMobile].push(item);
            } else {
              result[item.userMobile] = [item];
            }
          });
          this.customList = result;
        });
      },

      fetchListBykey() {
        if (!this.key) {
          this.fetchList();
          return;
        }
        let oList = JSON.parse(JSON.stringify(this.oList));
        let list = [];
        oList.forEach((item) => {
          const { userDtm = [] } = item;
          userDtm.forEach((user) => {
            if (user.puserId == this.userInfo.id) {
              list.push({ ...user, ...item, uid: user.id });
            }
          });
        });
        let result = {};
        list = list.filter((item) => {
          return (
            (item.nickName && item.nickName.indexOf(this.key) > -1) ||
            (item.idcard && item.idcard.indexOf(this.key) > -1)
          );
        });
        list.forEach((item) => {
          if (result[item.userMobile]) {
            result[item.userMobile].push(item);
          } else {
            result[item.userMobile] = [item];
          }
        });
        this.customList = result;
      },
      getAmount(list) {
        let result = 0;
        list.forEach((item) => {
          result += item.amount;
        });
        return result;
      },
      getBen(list) {
        let result = 0;
        list.forEach((item) => {
          if (item.days) {
            result += (item.amount * item.days) / 365;
          }
        });
        return result ? result.toFixed(2) : "-";
      },
      goDetail(data) {
        console.log(data);
        let userId = "";
        if (data.length) {
          userId = data[0].uid;
        }
        this.$router.push({
          path: "/buyDetail",
          query: {
            userId: userId,
          },
        });
      },
    },
  };
</script>
  
  <style lang="scss" scoped>
  .customCon {
    padding: 0.2rem 0.4rem;
    box-sizing: border-box;
  }
  .searchCon {
    margin-bottom: 0.38rem;
  }
  .searchCon .input {
    width: 100%;
    height: 0.72rem;
    border: 1px solid rgba(165, 135, 84, 0.1);
    // opacity: 0.3;
    border-radius: 0.12rem;
    position: relative;
    input {
      width: 100%;
      height: 0.72rem;
      box-sizing: border-box;
      background: rgba(234, 186, 99, 0.1);
      padding: 0 0.3rem;
      border: 1px solid rgba(131, 108, 76, 0.3);
      // opacity: 0.3;
      border-radius: 0.12rem;
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #836c4c;

      &::placeholder {
        font-size: 0.2rem;
        font-family: Heiti SC;
        font-weight: 500;
        color: #836c4c;
        opacity: 0.8;
      }
    }
    .search {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      top: 0;
      bottom: 0;
      right: 0.3rem;
      margin: auto;
    }
  }
  .searchCon .button {
    width: 1.2rem;
    flex-shrink: 0;
    height: 0.72rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #836c4c;
    border: 1px solid rgba(131, 108, 76, 0.3);
    border-radius: 0.12rem;
    background: rgba(234, 186, 99, 0.1);
    cursor: pointer;
  }
  .button span {
    font-size: 0.26rem;
  }
  .searchCon .button img {
    width: 0.3rem;
    height: 0.3rem;
  }
  .customList {
    height: calc(100vh - 2.35rem);
    overflow-y: scroll;
    padding: 0.02rem;
  }
  .customItem {
    padding: 0.32rem;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px 0px 0.09rem 2px rgba(48, 51, 59, 0.1);
    border-radius: 6px;
    min-height: 3.17rem;
    margin-bottom: 0.2rem;
    .userInfo {
      display: flex;
      align-items: center;
      margin-bottom: 0.32rem;
      img {
        width: 0.32rem;
        height: 0.32rem;
      }
      .name {
        font-weight: 400;
        font-size: 0.32rem;
        color: #30333b;
      }
      .phone {
        padding-top: 0.1rem;
        font-weight: 400;
        font-size: 0.24rem;
        color: #eaba63;
        line-height: 0.24rem;
      }
    }
    .cNum {
      background: linear-gradient(90deg, #f8fafb, #ffffff);
      line-height: 0.45rem;
      font-weight: 400;
      font-size: 0.24rem;
      color: #9a9a9c;
      box-sizing: border-box;
      padding: 0 0.12rem;
      span {
        font-weight: 400;
        font-size: 0.24rem;
        color: #9a9a9c;
      }
    }

    .subCon {
      margin-top: 0.2rem;
      margin-bottom: 0.3rem;
      display: flex;
      background: #ffffff;
      border-radius: 6px;
      box-sizing: border-box;
      align-items: center;
      .line {
        height: 0.67rem;
        border-left: 2px dashed #999;
      }
    }
    .subItem {
      flex: 1;
      &.sub2 {
        padding-left: 0.34rem;
      }
      p {
        font-weight: 400;
        font-size: 0.24rem;
        color: #9a9a9c;
        margin: 0;
        margin-bottom: 0.3rem;
        &:nth-child(2) {
          font-weight: 400;
          font-size: 0.36rem;
          color: #30333b;
          margin-bottom: 0rem;
          span {
            font-size: 0.24rem;
            color: #30333b;
          }
        }
      }
    }
  }
</style>