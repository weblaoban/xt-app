<!-- 集合信托 -->
<template>
  <div class="index-container prodListContainer">
    <main-header title="客户购买详情"></main-header>

    <div class="combineTabCon">
      <div class="combineTabContent">
        <div class="Tabtabs">
          <div
            :class="{ tabItem: true, active: currentCatbuy == 0 }"
            @click="setCatbuy(0)"
          >
            我认购的
          </div>
          <div
            :class="{ tabItem: true, active: currentCatbuy == 1 }"
            @click="setCatbuy(1)"
          >
            我推荐的
          </div>
        </div>
      </div>
    </div>

    <div class="combineCon">
      <div class="combineContent">
        <div class="tabs">
          <div
            :class="{ tabItem: true, active: currentCat == 0 }"
            @click="setCat(0)"
          >
            存续中
          </div>
          <div
            :class="{ tabItem: true, active: currentCat == 1 }"
            @click="setCat(1)"
          >
            已完成兑付
          </div>
        </div>
      </div>
    </div>

    <div class="container scrollList" ref="scrollCon">
      <div class="products" ref="scrollList">
        <div
          @click="goDetail(item)"
          :class="{ productItem: true, finish: item.status == 3 }"
          v-for="item in prodList"
          :key="item.id"
        >
          <title-prefix
            :item="item"
            :status="item.state"
            :current-cat="item.tpe === 1 ? 3 : 3000"
          ></title-prefix>
          <p class="count kehu" v-if="currentCatbuy == 1">
            <span>客户姓名：{{ item.nickName }}</span>
          </p>
          <div class="descCon">
            <div class="desc">持有金额（{{ item.tpe === 1?'美元':'元' }}）</div>
            <!-- <div class="desc" v-if="currentCatbuy == 0">业绩比较基准</div> -->
            <div class="desc" v-if="currentCat !== 1">待收收益（{{ item.tpe === 1?'美元':'元' }}）</div>
          </div>

          <div class="descCon">
            <p class="count">{{ item.amount || 0 }} <span>{{ item.tpe === 1?'美元':'元' }}</span></p>
            <!-- <p class="count" v-if="currentCatbuy == 0">
              {{ item.brief || 0 }} <span>%</span>
            </p> -->
            <p class="count" v-if="currentCat !== 1">
              {{ getBen(item) || "0" }} <span>{{ item.tpe === 1?'美元':'元' }}</span>
            </p>
          </div>
          <div class="line"></div>

          <div class="duration">
            <span
              >计息日{{ item.periods ? item.periods.split(" ")[0] : "" }}</span
            >
            <span
              >到期日：{{ item.dtime ? item.dtime.split(" ")[0] : "" }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mainFooter from "../common/footer.vue";
  import mainHeader from "../common/header.vue";
  import { getPlannerProd, getUserProd } from "@/api/user.js";
  import { mapGetters } from "vuex";
  import TitlePrefix from "components/titlePrefix.vue";
  export default {
    components: {
      TitlePrefix,
      mainFooter,
      mainHeader,
    },
    data() {
      return {
        currentCatbuy: 0,
        currentCat: 0,
        prodList: [],
        buy0List: [],
        buy1List: [],
        state0list: [],
        state1list: [],
        curList: [],
        page: {
          pageSize: 100,
          total: 0,
          current: 1,
        },
        key: "",
        loading: false,
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    created() {
      this.fetchList();
    },
    methods: {
      fetchList() {
        const { page } = this;
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
                list.push({ ...user, ...item });
              }
            });
          });
          this.state0list = list.filter((item) => item.state === 0);
          this.state1list = list.filter((item) => item.state === 1);
        });

        getUserProd({ ...page, uid: this.userInfo.id }).then((res) => {
          let list = [];
          res.data.data.records.forEach((item) => {
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
              if (user.id == this.userInfo.id) {
                list.push({ ...user, ...item });
              }
            });
          });
          this.buy0List = list.filter((item) => item.state === 0);
          this.buy1List = list.filter((item) => item.state === 1);
          this.prodList = this.buy0List;
          this.page.total = res.data.data.total;
        });
      },
      setCat(cat) {
        if (this.currentCatbuy == 0) {
          //我认购的

          if (cat == 0) {
            this.prodList = this.buy0List;
          }
          if (cat == 1) {
            this.prodList = this.buy1List;
          }
        }

        if (this.currentCatbuy == 1) {
          if (cat == 0) {
            this.prodList = this.state0list;
          }
          if (cat == 1) {
            this.prodList = this.state1list;
          }
        }
        this.currentCat = cat;
      },
      setCatbuy(cat) {
        this.currentCatbuy = cat;
        this.$nextTick(() => {
          this.setCat(0);
        });
      },
      getBen(item) {
        let ben = 0;
        const pList = item.pList;
        let days = 0;
        pList.forEach((item) => {
          if (!item.finish) {
            days += item.days;
          }
        });
        if (days) {
          ben = ((((item.amount * days) / 365) * item.brief) / 100).toFixed(2);
        }
        return ben;
      },
      goDetail(row) {
        let path = "/buyDetailInfo/" + row.id;
        this.$router.push({
          path: path,
          query: {
            type: row.rad,
            name: this.currentCatbuy === 1 ? row.nickName : "",
          },
        });
      },
    },
    beforeUnmount() {
      const scrollCon = this.$refs.scrollCon;
      if (scrollCon) {
        scrollCon.removeEventListener("scroll", this.scrollBottom, true);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .combineTabCon {
    height: 0.8rem;
    background: #fff;
    box-shadow: 0rem 0rem 0.3rem 0rem rgba(154, 154, 156, 0.1);
    .combineTabContent {
      height: 0.8rem;
      .Tabtabs {
        height: 0.8rem;
        .tabItem {
          text-align: center;
          width: 50%;
          float: left;
          font-size: 0.3rem;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 0.8rem;
          color: #9a9a9c;
          &.active {
            color: #eaba63;
          }
        }
      }
    }
  }
  .combineBanner {
    width: 100%;
    height: 1.43rem;
    padding: 0.3rem;
    box-sizing: border-box;
    .input {
      width: 100%;
      height: 0.72rem;
      background: rgba(234, 186, 99, 0.5);
      border: 1px solid rgba(165, 135, 84, 0.1);
      // opacity: 0.3;
      border-radius: 0.12rem;
      position: relative;
      input {
        width: 100%;
        height: 0.72rem;
        box-sizing: border-box;
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
  }

  .combineContent {
    margin-top: 0.7rem;
    .searchCard {
      width: 100%;
      height: 358px;
      background: #ffffff;
      box-shadow: 0px 0px 16px 4px rgba(154, 154, 156, 0.15);
      border-radius: 6px;
      box-sizing: border-box;
      padding: 30px 50px;
      margin-bottom: 30px;
      ul,
      li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .searchItem {
        padding-left: 90px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 16px;
        .label {
          position: absolute;
          left: 0;
          top: 0;
          line-height: 26px;
          font-size: 16px;
          font-family: Heiti SC;
          font-weight: 500;
          color: #9a9a9c;
        }
        ul {
          width: 100%;
          height: 26px;
          li {
            float: left;
            line-height: 26px;
            padding: 0 15px;
            font-size: 16px;
            font-family: Heiti SC;
            font-weight: 500;
            color: #9a9a9c;
            cursor: pointer;
            &.active {
              color: #fff;
              background: #eaba63;
              border-radius: 3px;
            }
          }
        }
      }

      .selected {
        ul {
          width: auto;
          max-width: 800px;
          li {
            margin-left: 16px;
            i {
              line-height: 26px;
            }
          }
        }
        .resetCon {
          position: absolute;
          right: 0px;
          top: 0;
          span {
            line-height: 26px;
            font-size: 16px;
            font-family: Heiti SC;
            font-weight: 500;
          }
          .reset {
            color: #ec5e2a;
            margin-right: 50px;
            cursor: pointer;
          }
          .total {
            color: #9a9a9c;
          }
        }
      }

      .border {
        height: 1px;
        background: #9a9a9c;
        opacity: 0.2;
        margin-top: 30px;
        margin-bottom: 36px;
      }
    }
  }

  .products {
    .productItem {
      width: 100%;
      // height: 2.74rem;
      background: #ffffff;
      box-shadow: 0rem 0rem 0.1rem 0rem rgba(48, 51, 59, 0.2);
      border-radius: 0.06rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      position: relative;
      margin-bottom: 0.2rem;
      .tag {
        position: absolute;
        width: 0.83rem;
        height: 0.73rem;
        top: 0;
        right: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        width: 4.71rem;
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #30333b;
        margin-bottom: 0.1rem;
        box-sizing: border-box;
        padding-left: 0.82rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        background-repeat: no-repeat;
        background-size: 0.72rem 0.3rem;
        background-position: left center;
        &.title0 {
          background-image: url(/img/h5/detailstate0.png);
        }
        &.title1 {
          background-image: url(/img/h5/detailstate1.png);
        }
      }
      .desc {
        width: 50%;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #9a9a9c;
        margin: 0.1rem 0;
      }
      .descCon {
        display: flex;
      }
      .count {
        width: 50%;
        font-size: 0.36rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #eaba63;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0.1rem 0;
        span {
          font-size: 0.24rem;
          font-weight: 400;
        }
        &:nth-child(1) {
          color: #30333b;
        }
        &.kehu {
          color: #30333b;
        }
      }
      .duration {
        width: 6.3rem;
        min-height: 0.45rem;
        background: linear-gradient(90deg, #f8fafb, #ffffff);
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #9a9a9c;
        box-sizing: border-box;
        padding-left: 0.1rem;
      }
      &:last-child {
        margin: 0;
      }

      &.finish {
        color: #9a9a9c !important;
      }
    }
  }

  .paginationCon {
    margin-top: 30px;
    .el-pagination {
      justify-content: center;
      font-size: 16px;
      .btn-prev,
      .btn-next {
        width: 42px;
        height: 36px;
        background: linear-gradient(0deg, #ffffff, #f0f0f0);
        border: 1px solid #ebebeb;
      }
      .el-pager li.number {
        background: linear-gradient(0deg, #ffffff, #f0f0f0);
        border: 1px solid #ebebeb;
      }
      .el-pager li:not(.is-disabled).is-active {
        background: #eaba63;
        &:hover {
          color: #fff !important;
        }
      }
      .el-pager li:hover {
        color: #eaba63 !important;
      }
    }
    .el-pagination.is-background .btn-next:hover:not([disabled]),
    .el-pagination.is-background .btn-prev:hover:not([disabled]) {
      color: #eaba63 !important;
    }
  }

  .tabs {
    height: 0.6rem;
    width: 100%;
    padding: 0 0.4rem;
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
  .prodListContainer {
    height: 100%;
    background: RGBA(248, 250, 251, 1);
  }
  .scrollList {
    height: calc(100% - 3rem);
    overflow-y: scroll;
  }

  .duration {
    width: 6.3rem;
    height: 0.45rem;
    background: linear-gradient(90deg, #f8fafb, #ffffff);
    color: #9a9a9c;
    box-sizing: border-box;
    padding-left: 0.1rem;
    span {
      float: right;
      font-size: 0.24rem;
      font-family: PingFang SC;
      font-weight: 400;
      &:first-child {
        float: left;
      }
    }
  }
</style>
