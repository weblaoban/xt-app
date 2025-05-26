<!-- 关于我们 -->
<template>
  <div class="index-container account">
    <main-header title="我的账户"></main-header>
    <div class="accountC container">
      <div class="accountContainer"></div>
      <div class="accContainer">
        <div class="username" style="padding: 0 0.3rem">
          <img src="/img/user.png" alt="" />&nbsp;
          <span> {{ userInfo.realName || userInfo.userMobile || 11111 }}</span>
        </div>
        <div class="sectionList">
          <div
            :class="{
              section: true,
              section1: true,
              active: section === 1,
            }"
            @click="setSection(1)"
          >
            理财
          </div>
          <div
            class="section"
            :class="{
              section: true,
              section2: true,
              active: section === 2,
            }"
            @click="setSection(2)"
          >
            保险
          </div>
          <div
            class="section"
            :class="{
              section: true,
              section2: true,
              active: section === 3,
            }"
            @click="setSection(3)"
          >
            境外
          </div>
        </div>
        <div
          :class="{
            sectionCon: true,
            active: section === 1,
          }"
        >
          <div class="muNumCon">
            <div class="myNumLabel">持有资产（元）</div>
            <div class="myNum">{{ amount * 1 + ben * 1 }} <span>元</span></div>
          </div>
          <div class="subCon">
            <div class="subItem sub1">
              <p>持有本金（元）</p>
              <p>{{ amount }}&nbsp;<span>元</span></p>
            </div>
            <div class="line"></div>
            <div class="subItem sub2">
              <p>待收收益（元）</p>
              <p>{{ ben }}&nbsp;<span>元</span></p>
            </div>
          </div>
        </div>

        <div
          :class="{
            sectionCon: true,
            active: section === 2,
          }"
        >
          <div class="muNumCon">
            <div class="myNumLabel">
              总缴费金额
              <div class="total">当前已有 {{ bList.length }}份保单保障中</div>
            </div>
            <div class="myNum">{{ bAmount * 1 }} <span>美元</span></div>
          </div>
          <div class="subCon">
            <div class="subItem sub1">
              <p>待缴金额</p>
              <p>{{ toAmount }}&nbsp;<span>美元</span></p>
            </div>
            <div class="line"></div>
            <div class="subItem sub2">
              <p>下一个缴费日</p>
              <p>{{ nextBItem.value }}&nbsp;<span></span></p>
            </div>
          </div>
        </div>

        <div
          :class="{
            sectionCon: true,
            active: section === 3,
          }"
        >
          <div class="muNumCon">
            <div class="myNumLabel">持有资产（美元）</div>
            <div class="myNum">
              {{ oamount * 1 + oben * 1 }} <span>美元</span>
            </div>
          </div>
          <div class="subCon">
            <div class="subItem sub1">
              <p>持有本金（美元）</p>
              <p>{{ oamount }}&nbsp;<span>美元</span></p>
            </div>
            <div class="line"></div>
            <div class="subItem sub2">
              <p>待收收益（美元）</p>
              <p>{{ oben }}&nbsp;<span>美元</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="accountBgContainer">
      <div class="container accountBg">
        <div class="username" style="padding: 0 0.3rem">
          <img src="/img/user.png" alt="" />&nbsp;
          <span> {{ userInfo.realName || userInfo.userMobile || 11111 }}</span>
        </div>
        <div class="muNumCon">
          <div class="myNumLabel">持有资产（元）</div>
          <div class="myNum">{{ amount * 1 + ben * 1 }} <span>元</span></div>
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
    </div> -->
    <div class="container">
      <ul class="accountList">
        <li v-if="userInfo.score === 2" @click="go('/plannerDetail')">
          <img src="/img/account1.png" alt="" />
          <div>份额管理</div>
          <img class="arrow" src="/img/arrow.png" alt="" />
        </li>
        <li v-else @click="go('/buyDetail')">
          <img src="/img/account1.png" alt="" />
          <div>份额管理</div>
          <img class="arrow" src="/img/arrow.png" alt="" />
        </li>
        <li @click="go('/buyODetail')">
          <img src="/img/account1.png" alt="" />
          <div>境外债管理</div>
          <img class="arrow" src="/img/arrow.png" alt="" />
        </li>
        <li @click="go('/bDetail')">
          <img src="/img/account3.png" alt="" />
          <div>保单详情</div>
          <img class="arrow" src="/img/arrow.png" alt="" />
        </li>
        <li v-if="userInfo.score === 2" @click="go('/customList')">
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
  import { getBUserProd, getUserProd } from "@/api/user.js";
  import store from "@/store";

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
        oamount: 0,
        oben: 0,
        section: 1,
        bAmount: 0,
        toAmount: 0,
        bList: [],
        nextBItem: {},
      };
    },
    created() {
      store.dispatch("GetUserInfo");
      this.getMyAccountInfo();
      this.getBInfo();
    },
    methods: {
      setSection(section) {
        this.section = section;
        // getMyAccountInfo();
      },
      getMyAccountInfo() {
        getUserProd({
          current: 1,
          pageSize: 10000,
          // uid: '3494889a677b4764921244fecafced0b'||this.userInfo.id,
          uid: this.userInfo.id,
        }).then((res) => {
          let list = [];
          res.data.data.records.forEach((item) => {
            const { userDtm = [] } = item;
            userDtm.forEach((user) => {
              if (user.id == this.userInfo.id) {
                list.push({ ...user, ...item });
              }
							// if (user.id =='3494889a677b4764921244fecafced0b') {
              //   list.push({ ...user, ...item });
              // }
            });
          });

          let amount = 0;
          let ben = 0;
          let oamount = 0;
          let oben = 0;
          list.forEach((item) => {
            const qlist = JSON.parse(item.qlist);
            let pList = [];
            if (Array.isArray(qlist)) {
              pList = qlist;
            } else {
              pList = qlist.qlist;
              item.days = qlist.days;
              item.tpe = qlist.tpe;
            }
            let days = 0;
            pList.forEach((pitem) => {
              if (!pitem.finish) {
                if (pitem.days) {
                  days += pitem.days * 1;
                }
              }
            });
						console.log(pList);
            if (pList.find((pitem) => !pitem.finish)) {
              if (item.tpe === 0) {
                amount += item.amount * 1;
              } else if (item.tpe === 1) {
                oamount += item.amount * 1;
              }
            }
            if (days) {
              if (!isNaN(item.brief * 1)) {
                if (item.tpe === 0) {
                  ben += (
                    (((item.amount * days) / 365) * item.brief) /
                    100
                  );
                } else if (item.tpe === 1) {
                  oben += (
                    (((item.amount * days) / 365) * item.brief) /
                    100
                  );
                }
              }
            }
          });
          this.amount = amount.toFixed(2);
          this.ben = ben.toFixed(2);
          this.oamount = oamount.toFixed(2);
          this.oben = oben.toFixed(2);
        });
      },
      go(link) {
        this.$router.push(link);
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
            let { userId, paidList, remainingAmount } = user;
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
            user.toAmount =
              paidList.filter((item) => item.status === 0).length * amount;
            user.nextBItem = paidList.find((item) => item.status === 0);
            if (user.nextBItem) {
              user.nextBItem.amount = amount;
            }
            if (userId === cuserId) {
              result.push({ ...item, info: user });
            }
          });
        });
        console.log(result);
        this.bList = result;
        this.bAmount = result.reduce((acc, item) => {
          return acc + (item.info.totalAmount || 0);
        }, 0);
        this.toAmount = result.reduce((acc, item) => {
          return acc + (item.info.toAmount || 0);
        }, 0);
        const nextDate = result.filter((item) => item.info.nextBItem);
        if (nextDate && nextDate.length) {
          const nextBItem = nextDate.sort((a, b) => {
            return (
              new Date(a.info.nextBItem.value).getTime() -
              new Date(b.info.nextBItem.value).getTime()
            );
          });
          this.nextBItem = nextBItem[0].info.nextBItem;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .username {
    font-weight: 400;
    font-size: 0.32rem;
    color: #eaba63;
    position: absolute;
    top: 0;
    right: 0;
    img {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .muNumCon {
    .myNumLabel {
      margin: 0.16rem;
      margin-top: 0.26rem;
      font-weight: 400;
      font-size: 0.24rem;
      color: rgba(154, 154, 156, 0.5);

      position: relative;
      .total {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        font-weight: 400;
        font-size: 0.24rem;
        color: #a58754;
      }
    }
    .myNum {
      margin: 0 0.3rem;
      font-weight: 400;
      font-size: 0.24rem;
      color: #eaba63;
      span {
        font-size: 0.24rem;
        color: #9a9a9c;
      }
    }
  }
  .subCon {
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
  .accountC {
    position: relative;
  }
  .accountContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3.2rem;
    background-color: #3b2b0d;
    background-image: linear-gradient(
      64deg,
      rgba(234, 186, 99, 0.3),
      rgba(59, 43, 13, 0.3)
    );
    padding: 0.4rem 0.3rem 0;
    box-sizing: border-box;
  }
  .accountC {
    padding-top: 0.3rem;
  }
  .accContainer {
    background-image: url(/img/accountBg.png);
    background-size: 100% 3.17rem;
    position: relative;
    z-index: 1;
    box-shadow: 0px 0px 9px 1px rgba(48, 51, 59, 0.1);
  }

  .sectionCon {
    display: none;
    &.active {
      display: block;
    }
    margin-bottom: 0.2rem;
  }

  .sectionList {
    display: flex;
    align-items: center;
    .section {
      line-height: 0.64rem;
      font-weight: 400;
      font-size: 0.28rem;
      color: #9a9a9c;
      width: 0.98rem;
      text-align: center;
      position: relative;
      //   background: #fff;
      border-radius: 0.1rem;
      &.section1.active {
        &:before {
          content: "";
          display: block;
          width: 100%;
          height: 0.64rem;
          box-shadow: 0px -5px 10px 0px rgba(48, 51, 59, 0.15);
          border-radius: 12px 12px 0px 0px;
          transform: skewX(20deg);
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      &.section2.active {
        &:before {
          content: "";
          display: block;
          width: 100%;
          height: 0.64rem;
          box-shadow: 0px -5px 10px 0px rgba(48, 51, 59, 0.15);
          border-radius: 12px 12px 0px 0px;
          transform: skewX(20deg);
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      &.active {
        font-weight: 400;
        font-size: 0.32rem;
        color: #a58754;
      }
    }
  }
</style>
