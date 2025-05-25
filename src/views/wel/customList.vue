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
      <div class="tabs">
        <div
          :class="{ tabItem: true, active: currentCat === 1 }"
          @click="setCat(1)"
        >
          理财类
        </div>
        <div
          :class="{ tabItem: true, active: currentCat === 2 }"
          @click="setCat(2)"
        >
          保险类
        </div>
      </div>
      <div class="customList" v-if="currentCat === 1">
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
              <p>
                {{ getAmount(item).result }}&nbsp;<span>元</span><br />{{
                  getAmount(item).resulto
                }}&nbsp;<span>美元</span>
              </p>
            </div>
            <div class="line"></div>
            <div class="subItem sub2">
              <p>待收收益</p>
              <p>
                {{ getBen(item).result || "-" }}&nbsp;<span>元</span><br />{{
                  getBen(item).resulto || "-"
                }}&nbsp;<span>美元</span>
              </p>
            </div>
          </div>
          <div class="cNum">
            持有数量： <span>{{ item.length }}</span>
          </div>
        </div>
      </div>
      <div class="customList" v-if="currentCat === 2">
        <div
          class="customItem"
          v-for="item in bCustomList"
          :key="item"
          @click="goDetail(item)"
        >
          <div class="userInfo">
            <img src="/img/user1.png" alt="" />
            &nbsp;
            <span class="name">{{
              item[0] && item[0].info.userDtm.nickName
            }}</span>
            &nbsp;&nbsp;
            <span class="phone">{{
              item[0] && item[0].info.userDtm.userMobile
            }}</span>
          </div>

          <div class="subCon">
            <div class="subItem sub1">
              <p>总金额</p>
              <p>{{ getTAmount(item) || "-" }}&nbsp;<span>元</span></p>
            </div>
            <div class="line"></div>
            <div class="subItem sub2">
              <p>待缴金额</p>
              <p>{{ getbAmount(item) }}&nbsp;<span>元</span></p>
            </div>
          </div>
          <div v-if="getNextBItem(item)">
            <div class="line"></div>
            <div
              class="subItem sub2"
              style="display: flex; align-items: center; padding: 0"
            >
              <p style="margin: 0; margin-right: 4px">下一个缴费日：</p>
              <p>{{ getNextBItem(item) }}&nbsp;<span></span></p>
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
  import { getBUserProd, getPlannerProd } from "@/api/user.js";

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
        bCustomList: [],
        oList: [],
        obList: [],
        currentCat: 1,
      };
    },
    created() {
      this.fetchList();
      this.getBInfo();
    },
    methods: {
      setCat(cat) {
        this.currentCat = cat;
      },
      getBInfo() {
        getBUserProd().then((res) => {
          console.log(res);
          this.getAllList(res.data.data);
        });
      },
      getAllList(list) {
        const cuserId = this.userInfo.id;
        const result = [];
        list.forEach((item) => {
          const { userInsurances = [] } = item;
          userInsurances.forEach((user) => {
            let { userId, paidList, remainingAmount, puserid } = user;
            const amount = remainingAmount ? remainingAmount : 0;
            try {
              paidList = JSON.parse(paidList);
            } catch (error) {
              paidList = [];
            }
            if (!paidList) {
              paidList = [];
            }
            user.paidList = paidList;
            user.totalAmount = paidList.length * amount;
            const limit = paidList.filter((item) => item.status === 0);
            const has = paidList.filter((item) => item.status === 1);
            user.toAmount = limit.length * amount;
            user.nextBItem = paidList.find((item) => item.status === 0);
            if (user.nextBItem) {
              user.nextBItem.amount = amount;
            }
            user.hasDate = 0;
            if (has && has.length) {
              user.hasDate = has.length;
            }
            user.lastDate = 0;
            if (limit && limit.length) {
              user.lastDate = limit.length;
            }
            if (puserid === cuserId) {
              result.push({ ...item, info: user });
            }
          });
        });
        this.obList = result;
        let resultobj = {};
        result.forEach((item) => {
          if (resultobj[item.info.userId]) {
            resultobj[item.info.userId].push(item);
          } else {
            resultobj[item.info.userId] = [item];
          }
        });
        this.bCustomList = resultobj;
        console.log(resultobj);
        // this.state0list = result.filter((item) => item.info.nextBItem);
        // this.state1list = result.filter((item) => !item.info.nextBItem);
        // this.prodList = this.state0list;
        // console.log(this.state0list);
      },
      filterBList() {
        let oBList = JSON.parse(JSON.stringify(this.obList));

        let result = oBList.filter((item) => {
          return (
            (item.info.userDtm.nickName &&
              item.info.userDtm.nickName.indexOf(this.key) > -1) ||
            (item.info.userDtm.userMobile &&
              item.info.userDtm.userMobile.indexOf(this.key) > -1)
          );
        });
        let resultobj = {};
        result.forEach((item) => {
          if (resultobj[item.info.userId]) {
            resultobj[item.info.userId].push(item);
          } else {
            resultobj[item.info.userId] = [item];
          }
        });
        this.bCustomList = resultobj;
      },
      getTAmount(item) {
        return item.reduce((acc, cur) => {
          const { totalAmount } = cur.info;
          return acc + totalAmount;
        }, 0);
      },
      getbAmount(item) {
        return item.reduce((acc, cur) => {
          const { toAmount } = cur.info;
          return acc + toAmount;
        }, 0);
      },
      getNextBItem(result) {
        const nextDate = result.filter((item) => item.info.nextBItem);
        if (nextDate && nextDate.length) {
          const nextBItem = nextDate.sort((a, b) => {
            return (
              new Date(a.info.nextBItem.value).getTime() -
              new Date(b.info.nextBItem.value).getTime()
            );
          });
          return nextBItem[0].info.nextBItem.value;
        }
        return "";
      },
      fetchList() {
        getPlannerProd({ uid: this.userInfo.id }).then((res) => {
          let list = [];
          res.data.data.forEach((item) => {
            const qlist = JSON.parse(item.qlist);
            if (Array.isArray(qlist)) {
              item.pList = qlist;
            } else {
              item.pList = qlist.qlist;
              item.days = qlist.days;
              item.tpe = qlist.tpe;
              item.periods = qlist.periods;
            }
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
          this.getBInfo();
          return;
        }
        this.filterBList();
        let oList = JSON.parse(JSON.stringify(this.oList));
        let list = [];
        oList.forEach((item) => {
          const { userDtm = [] } = item;
          userDtm.forEach((user) => {
            if (user.puserId === this.userInfo.id) {
              list.push({ ...user, ...item, uid: user.id });
            }
          });
        });
        let result = {};
        list = list.filter((item) => {
          return (
            (item.nickName && item.nickName.indexOf(this.key) > -1) ||
            (item.userMobile && item.userMobile.indexOf(this.key) > -1)
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
        let resulto = 0;
        list.forEach((item) => {
          if (item.tpe === 1) {
            resulto += item.amount;
          } else if (item.tpe === 0) {
            result += item.amount;
          }
        });
        return {
          result: result.toFixed(2),
          resulto: resulto.toFixed(2),
        };
      },
      getBen(list) {
        console.log(list);
        let result = 0;
        let resulto = 0;
        list.forEach((item) => {
          if (item.days) {
            if (item.tpe === 1) {
              resulto += (((item.amount * item.days) / 365) * item.brief) / 100;
            } else if (item.tpe === 0) {
              result += (((item.amount * item.days) / 365) * item.brief) / 100;
            }
          }
        });
        return {
          result: result.toFixed(2),
          resulto: resulto.toFixed(2),
        };
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

  .tabs {
    height: 0.6rem;
    width: 100%;
    //padding: 0 0.4rem;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    .tabItem {
      font-size: 0.28rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #9a9a9c;
      position: relative;
      float: left;
      margin-right: 0.34rem;
      line-height: 0.6rem;
      &.active {
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #30333b;
        &::before {
          content: "";
          display: block;
          width: 100%;
          height: 0.06rem;
          background: #eaba63;
          left: 0;
          bottom: 0;
          position: absolute;
        }
      }
    }
  }
</style>
