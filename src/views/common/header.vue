<template>
  <div class="index-container">
    <div class="menuHeader">
      <div class="buger" @click="toggleMenu">
        <img src="/img/h5/burger.png" alt="" />
      </div>
      <div class="title">{{ title }}</div>
      <div class="logout" v-if="userInfo.id" @click="logout">退出</div>
    </div>
    <div class="menuMask" v-show="showMenu" @click="toggleMenu">
      <div class="menuContent">
        <div class="container">
          <div class="logo"><img src="/img/logo.png" alt="" /></div>
          <div class="menuList">
            <div
              @click.stop="onMenuClick(item)"
              :class="{ active: index == active }"
              v-for="(item, index) in menuList"
              :key="item"
              class="menuItem"
            >
              {{ item.name }}
            </div>

            <div
              v-if="userInfo.id"
              class="menuItem"
              @click.stop="goAccountDetail"
            >
              我的账户
            </div>
            <div
              v-if="userInfo.id && userInfo.score == 0"
              class="menuItem"
              @click.stop="goBuyDetail"
            >
              购买详情
            </div>
            <div
              v-if="userInfo.id && userInfo.score == 1"
              class="menuItem"
              @click.stop="gopBuyDetail"
            >
              购买详情
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "header",
    props: ["active", "title"],
    data() {
      return {
        showContact: false,
        cardItem: [
          {
            title: "财富增值",
            desc: "稳健安全的资产配置",
            id: 0,
            img: "/img/icon1.png",
          },
          {
            title: "产品安全",
            desc: "专业风控团队优中优选",
            id: 0,
            img: "/img/icon2.png",
          },
          {
            title: "全面覆盖",
            desc: "信托资管私募全面覆盖",
            id: 0,
            img: "/img/icon3.png",
          },
          {
            title: "专业服务",
            desc: "专业服务经理1对1服务",
            id: 0,
            img: "/img/icon4.png",
          },
        ],
        amount: 111,
        menuList: [
          {
            name: "首页",
            link: "/",
          },
          {
            name: "产品列表",
            link: "/xtcombine",
          },
          {
            name: "资讯问答",
            link: "/trustQa",
          },
          {
            name: "财经资讯",
            link: "/information",
          },
          //   {
          //     name: "关于我们",
          //     link: "/aboutUs",
          //   },
          {
            name: "修改密码",
            link: "/updatePassword",
          },
          {
            name: "联系我们",
            link: "/linkus",
          },
          /*{
                                name:'',
                                link:'/privateFund'
                            },{
                                name:'集合保险',
                                notOpen:true
                            }*/
        ],
        userName: "",
        passWord: "",
        phone: "13888888888",
        gender: 0,
        smsCode: "",
        originTime: 30,
        timeDown: 30,
        timer: null,
        products: [
          {
            name: "名称",
          },
          {
            name: "名称",
          },
          {
            name: "名称",
          },
          {
            name: "名称",
          },
        ],
        contact: {
          name: "",
          phone: "",
          message: "",
        },
        showPassword: false,
        showModifyPass: false,
        showMenu: false,
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    created() {},
    methods: {
      onMenuClick(menu) {
        if (menu.link) {
          this.$router.push(menu.link);
        }
      },
      goAccountDetail() {
        this.$router.push("/account");
      },
      goBuyDetail() {
        this.$router.push("/buyDetail");
      },
      gopBuyDetail() {
        this.$router.push("/plannerDetail");
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      logout() {
        this.$store.dispatch("LogOut");
        this.$router.push("/");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .menuHeader {
    width: 100%;
    height: 0.76rem;
    background: #eaba63;
    position: relative;
    .title {
      font-size: 0.32rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 0.76rem;
    }
    .logout {
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 0.76rem;
      position: absolute;
      right: 0.3rem;
      top: 0;
      cursor: pointer;
    }
    .buger {
      width: 0.42rem;
      height: 0.42rem;
      position: absolute;
      left: 0.32rem;
      top: 0.17rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .menuMask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
  }
  .menuContent {
    width: 4.26rem;
    height: 100%;
    background: #eaba63;
    padding: 0.5rem 0rem;
    box-sizing: border-box;

    overflow-y: scroll;
    .container {
      padding: 0rem 0.3rem;
    }
    .logo {
      padding-left: 0.25rem;
      box-sizing: border-box;
      img {
        width: 100%;
      }
    }
    .menuList {
      .menuItem {
        width: 100%;
        line-height: 1.04rem;
        position: relative;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #806b4b;
        border-bottom: 1px solid #806b4b;
        cursor: pointer;
        box-sizing: border-box;
        padding-left: 0.4rem;
        .tag {
          width: 57px;

          text-align: center;
          position: absolute;
          font-size: 12px;
          font-family: Heiti SC;
          font-weight: 500;
          color: #ffffff;
          background-image: url(/img/notopen.png);
          background-size: 57px 19px;
          background-position: center center;
          background-repeat: no-repeat;
          top: 0;
          left: 110px;
          height: 20px;
          line-height: 20px;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .bannerContent .el-carousel__indicators--vertical {
    top: 50%;
    right: calc(50% - 520px);
    transform: translate(50%, -50%);
  }
  .bannerContent {
    position: relative;
    .carouseCard {
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .el-carousel__button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    .el-carousel__indicator.is-active {
      border: 1px solid #fff;
    }
    .loginContent {
      position: absolute;
      top: 56px;
      right: calc(50% - 490px);
      width: 320px;
      height: 380px;
      background: #ffffff;
      box-shadow: 0px 0px 10px 10px rgba(234, 186, 99, 0.1);
      border-radius: 12px;
      &.haslogin {
        text-align: center;
        .welcom {
          display: block;
          margin: 0 auto;
          width: 128px;
          height: 36px;
          margin-top: 41px;
        }
        .username {
          margin: 40px auto 21px;
          font-size: 24px;
          font-family: Heiti SC;
          font-weight: 500;
          color: #30333b;
        }
        .phoneinfo {
          font-size: 16px;
          font-family: Heiti SC;
          font-weight: 500;
          color: #30333b;
        }
        .gray {
          margin-top: 0;
        }
      }
      &.register {
        .inputItem {
          margin-bottom: 10px;
          .phoneInfo {
            text-align: center;
            font-size: 16px;
            font-family: Heiti SC;
            font-weight: 500;
            color: #30333b;
            margin: 40px auto;
            line-height: 18px;
            span {
              font-size: 18px;
              font-family: Heiti SC;
              font-weight: 500;
              color: #eaba63;
              margin-right: 4px;
            }
          }
          img {
            width: 18px;
            height: 18px;
            position: absolute;
            right: 10px;
            top: 10px;
          }
        }
        .loginTitle {
          margin-bottom: 30px;
        }
        .cut {
          opacity: 0;
        }
        .genderCon {
          display: flex;
          width: 280px;
          margin: 0 auto;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          .inputItem,
          .input {
            width: 150px;
            margin: 0;
          }
          .radio {
            position: relative;
            font-size: 14px;
            font-family: Heiti SC;
            font-weight: 500;
            color: #30333b;
            margin-right: 6px;
          }
          input[type="checkbox"],
          input[type="radio"] {
            opacity: 0;
          }
          .radio-inner {
            width: 18px;
            height: 18px;
            box-sizing: border-box;
            padding: 0 8px;
            border-radius: 50%;
            position: absolute;
            border: 1px solid #d9d9da;
            top: 0;
            bottom: 0;
            left: -5px;
            margin: auto;
            &.active {
              &::after {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 6px;
                background: #30333b;
              }
            }
          }
        }
        .smscodeCon {
          display: flex;
          width: 280px;
          margin: 0 auto;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          .inputItem,
          .input {
            width: 190px;
            margin: 0;
          }
          .send {
            width: 70px;
            height: 39px;
            background: linear-gradient(5deg, #eaba63, #fac76c);
            border-radius: 8px;
            cursor: pointer;

            font-size: 14px;
            font-family: Heiti SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 39px;
            text-align: center;
          }
          .hasSend {
            width: 70px;
            height: 39px;
            background: #f8f8f8;
            border-radius: 8px;
            line-height: 39px;
            font-size: 14px;
            font-family: Heiti SC;
            font-weight: 500;
            color: #30333b;
            text-align: center;
          }
        }
        .button {
          margin-top: 20px;
          margin-bottom: 0;
        }
      }
      .other {
        display: flex;
        justify-content: space-between;
        width: 280px;
        margin: 0 auto;
        p {
          font-size: 0.24rem;
          font-family: Heiti SC;
          font-weight: 500;
          color: #9a9a9c;
          cursor: pointer;
          span {
            font-size: 0.24rem;
            font-family: Heiti SC;
            font-weight: 500;
            color: #eaba63;
            margin-left: 10px;
          }
        }
      }
      .button {
        margin-top: 40px;
        margin-bottom: 20px;
      }
      .loginTitle {
        font-size: 20px;
        font-weight: 500;
        color: #30333b;
        position: relative;
        text-align: center;
        margin-bottom: 40px;
        &::after {
          position: absolute;
          content: "";
          display: block;
          width: 50px;
          height: 4px;
          background: #eaba63;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
      .cut {
        background-color: #fff;
        border-radius: 10px;
        height: 20px;
        left: 20px;
        position: absolute;
        top: -20px;
        transform: translateY(0);
        transition: transform 200ms;
        width: 76px;
      }
      .inputItem {
        position: relative;
        width: 280px;
        margin: 0 auto 22px;
      }
      .input {
        width: 280px;
        height: 40px;
        background: #ffffff;
        border: 1px solid #f3f2f8;
        border-radius: 8px;
        padding-left: 20px;
        box-sizing: border-box;
      }
      .placeholder {
        font-size: 14px;
        font-family: Heiti SC;
        font-weight: 500;
        color: #9a9a9c;

        left: 20px;
        line-height: 14px;
        pointer-events: none;
        position: absolute;
        transform-origin: 0 50%;
        transition: transform 200ms, color 200ms;
        top: 16px;
      }
      .input:focus ~ .cut {
        transform: translateY(8px);
      }
      .input:focus ~ .placeholder {
        transform: translateY(-24px) translateX(10px) scale(0.75);
        color: #dc2f55;
        z-index: 1;
      }
    }
  }
  .button {
    width: 100%;
    background: linear-gradient(
      163deg,
      #e1ad4f,
      rgba(234, 186, 99, 0.7),
      #e0af56
    );
    border-radius: 0.12rem;

    line-height: 0.76rem;
    height: 0.76rem;
    box-shadow: 0rem 0.1rem 0rem 0rem #dea949;
    font-size: 0.32rem;

    margin: 0 auto;
    font-family: Heiti SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    &.gray {
      background: linear-gradient(163deg, #d5d5d5, #efefef);
      box-shadow: 0px 0.03rem 0px 0px #cbcbcb;
      color: #9a9a9c;
      margin-top: 0;
    }
  }
</style>
