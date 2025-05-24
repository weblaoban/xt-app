<!-- 集合信托 -->
<template>
  <div class="index-container prodListContainer">
    <main-header title="产品列表"></main-header>
    <div class="combineCon">
      <div class="combineBanner">
        <div class="input">
          <input
            v-model="key"
            @blur="fetchListBykey"
            type="text"
            placeholder="状态｜期限｜门槛｜付息方式｜领域"
          />
          <img src="/img/search.png" alt="" class="search" />
        </div>
      </div>
      <div class="combineContent">
        <div class="tabs" v-if="!key">
          <div
            :class="{ tabItem: true, active: currentCat == 97 }"
            @click="setCat(97)"
          >
            集合信托
          </div>
          <div
            :class="{ tabItem: true, active: currentCat == 98 }"
            @click="setCat(98)"
          >
            直融资产
          </div>
          <div
            :class="{ tabItem: true, active: currentCat == 99 }"
            @click="setCat(99)"
          >
            私募基金
          </div>
          <div
            :class="{ tabItem: true, active: currentCat == 100 }"
            @click="setCat(100)"
          >
            保险
          </div>
          <div
            :class="{ tabItem: true, active: currentCat == 3 }"
            @click="setCat(3)"
          >
            境外债
          </div>
        </div>
      </div>
    </div>

    <div class="container scrollList" ref="scrollCon">
      <div class="baoxianCat" v-if="currentCat === 100">
        <div
          :class="{
            baoxianCItem: true,
            active: bType === 0,
          }"
          @click="toggleBType(0)"
        >
          储蓄产品
        </div>
        <div
          :class="{
            baoxianCItem: true,
            active: bType === 1,
          }"
          @click="toggleBType(1)"
        >
          重疾产品
        </div>
      </div>
      <div class="products" ref="scrollList" v-if="currentCat !== 100">
        <div
          @click="goDetail(item)"
          :class="{ productItem: true, finish: item.status == 3 }"
          v-for="item in prodList"
          :key="item.id"
        >
          <div :class="'title ' + 'title' + currentCat">
            <div class="titlePrefixCon" v-if="currentCat === 97">
              <div class="titlePrefix">
                集<span></span>合<span></span>信<span></span>托
              </div>
            </div>
            <div class="titlePrefixCon" v-if="currentCat === 98">
              <div class="titlePrefix">
                直<span></span>融<span></span>资<span></span>产
              </div>
            </div>
            <div class="titlePrefixCon" v-if="currentCat === 99">
              <div class="titlePrefix">
                私<span></span>募<span></span>基<span></span>金
              </div>
            </div>
            <div class="titlePrefixCon" v-if="currentCat === 100">
              <div class="titlePrefix">保<span></span>险</div>
            </div>
            <div class="titlePrefixCon" v-if="currentCat === 3">
              <div class="titlePrefix">境<span></span>外<span></span>债</div>
            </div>
            <img
              v-if="currentCat === 100 && item.tpe === 0"
              class="bao"
              src="/img/chu.png"
              alt=""
            />
            <img
              v-if="currentCat === 100 && item.tpe === 1"
              class="bao"
              src="/img/zhong.png"
              alt=""
            />
            <div class="titleDesc">{{ item.name }}</div>
          </div>
          <div class="descCon">
            <div class="desc">业绩比较基准</div>
            <div class="desc">投资门槛</div>
          </div>
          <div class="descCon">
            <p class="count">{{ item.brief || 0 }} <span></span></p>
            <p class="count">
              <span v-if="item.categoryId === 3">{{ item.pmStand }}万美元</span>
              <span v-else>{{ item.pmStandCnt }}</span>
            </p>
          </div>
          <div class="line"></div>
          <div class="duration">产品期限：{{ item.investLimitCnt }}</div>
          <div class="tag" v-if="item.status == 1 || item.status == 3">
            <img :src="'/img/h5/tag' + item.status + '.png'" alt="" />
          </div>
          <img
            v-if="item.imgs && userInfo.id"
            src="/img/yuyue.png"
            alt=""
            class="yuyue"
          />
        </div>
      </div>
      <div class="products" ref="scrollList" v-else>
        <div
          @click="goBDetail(item)"
          :class="{ productItem: true, finish: item.status == 3 }"
          v-for="item in prodList"
          :key="item.id"
        >
          <div :class="'title ' + 'title' + currentCat">
            <div class="titlePrefixCon" v-if="currentCat === 97">
              <div class="titlePrefix">
                集<span></span>合<span></span>信<span></span>托
              </div>
            </div>
            <div class="titlePrefixCon" v-if="currentCat === 98">
              <div class="titlePrefix">
                直<span></span>融<span></span>资<span></span>产
              </div>
            </div>
            <div class="titlePrefixCon" v-if="currentCat === 99">
              <div class="titlePrefix">
                私<span></span>募<span></span>基<span></span>金
              </div>
            </div>
            <div class="titlePrefixCon" v-if="currentCat === 100">
              <div class="titlePrefix">保<span></span>险</div>
            </div>
            <div class="titlePrefixCon" v-if="currentCat === 3">
              <div class="titlePrefix">境<span></span>外<span></span>债</div>
            </div>
            <img
              v-if="currentCat === 100 && item.tpe === 0"
              class="bao"
              src="/img/chu.png"
              alt=""
            />
            <img
              v-if="currentCat === 100 && item.tpe === 1"
              class="bao"
              src="/img/zhong.png"
              alt=""
            />
            <div class="titleDesc">{{ item.name }}</div>
          </div>
          <div class="descCon">
            <div class="desc">IRR高达</div>
            <div class="desc">投资门槛</div>
          </div>
          <div class="descCon">
            <p class="count">{{ item.irr || 0 }}% <span></span></p>
            <p class="count">
              {{ item.investmentThreshold }}<span>万（美元）</span>
            </p>
          </div>
          <div class="line"></div>
          <div class="duration duration1">
            <div>缴费灵活：{{ item.phasesc }}</div>
            <span>中长期收益可观</span>
          </div>
          <div class="tag" v-if="item.status == 1 || item.status == 3">
            <img :src="'/img/h5/tag' + item.status + '.png'" alt="" />
          </div>
          <img
            v-if="item.imgs && userInfo.id"
            src="/img/yuyue.png"
            alt=""
            class="yuyue"
          />
        </div>
      </div>

      <!-- <div class="paginationCon">
						<el-pagination
							background
							layout="prev, pager, next"
							:page-size="page.pageSize"
							:current-page="page.current"
							:total="page.total"
							@current-change="currentChange"
						>
						</el-pagination>
					</div> -->
    </div>

    <contact></contact>
  </div>
</template>

<script>
  import mainFooter from "../common/footer.vue";
  import mainHeader from "../common/header.vue";
  import { list, keylist, bList } from "@/api/prod.js";
  import contact from "../common/contact.vue";
  import { mapGetters } from "vuex";
  export default {
    name: "jeZi",
    components: {
      mainFooter,
      mainHeader,
      contact,
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    data() {
      return {
        searchs: [
          {
            label: "产品状态：",
            prop: "status",
            options: [
              {
                label: "不限",
                value: "-1",
              },
              {
                label: "预售",
                value: "1",
              },
              {
                label: "在售",
                value: "2",
              },
              {
                label: "售罄",
                value: "3",
              },
            ],
          },
          {
            label: "产品期限：",
            prop: "investLimitId",
            options: [
              {
                label: "不限",
                value: "-1",
              },
              {
                label: "一年内（含）",
                value: "1",
              },
              {
                label: "一年至两年（含）",
                value: "2",
              },
              {
                label: "两年以上",
                value: "3",
              },
            ],
          },
          {
            label: "投资门槛：",
            prop: "pmStand",
            options: [
              {
                label: "不限",
                value: "-1",
              },
              {
                label: "50万以内（含）",
                value: "1",
              },
              {
                label: "50万至100万（含）",
                value: "2",
              },
              {
                label: "100万至300万（含）",
                value: "3",
              },
              {
                label: "300万以上",
                value: "4",
              },
            ],
          },
          {
            label: "付息方式：",
            prop: "inrestMethodId",
            options: [
              {
                label: "不限",
                value: "-1",
              },
              {
                label: "按月付息",
                value: "1",
              },
              {
                label: "按季付息",
                value: "2",
              },
              {
                label: "半年付息",
                value: "3",
              },
              {
                label: "按年付息",
                value: "4",
              },
              {
                label: "到期付息",
                value: "5",
              },
            ],
          },
          {
            label: "投资领域：",
            prop: "prodEffid",
            options: [
              {
                label: "不限",
                value: "-1",
              },
              {
                label: "工商企业类",
                value: "0",
              },
              {
                label: "金融市场类",
                value: "1",
              },
              {
                label: "基础设施类",
                value: "2",
              },
              {
                label: "房地产类",
                value: "3",
              },
              {
                label: "资金池类",
                value: "4",
              },
              {
                label: "其他",
                value: "5",
              },
            ],
          },
        ],
        selected: {
          status: {
            label: "不限",
            value: "-1",
          },
          investLimitId: {
            label: "不限",
            value: "-1",
          },
          pmStand: {
            label: "不限",
            value: "-1",
          },
          inrestMethodId: {
            label: "不限",
            value: "-1",
          },
          prodEffid: {
            label: "不限",
            value: "-1",
          },
        },
        currentCat: 97,
        prodList: [],
        propColumn: [
          {
            label: "产品名称",
            value: "name",
            align: "left",
          },
          {
            label: "状态",
            value: "status",
          },
          {
            label: "类型",
            value: "categoryId",
          },
          {
            label: "期限",
            value: "investLimitCnt",
          },
          {
            label: "业绩比较基准",
            value: "brief",
          },
          {
            label: "投资门槛",
            value: "pmStandCnt",
          },
          {
            label: "付息方式",
            value: "inrestMethodCnt",
          },
          {
            label: "投资领域",
            value: "prodEffCnt",
          },
          {
            label: "防控评级",
            value: "lev",
          },
        ],

        page: {
          pageSize: 10,
          total: 0,
          current: 1,
        },
        key: "",
        loading: false,
        bType: "",
      };
    },
    mounted() {
      if (this.$route.query.isInsurance == 1) {
        this.setCat(100);
      }
      if (this.$route.query.isDirect == 1) {
        this.setCat(98);
      }
      if (this.$route.query.isPrivate == 1) {
        this.setCat(99);
      }
      const scrollCon = this.$refs.scrollCon;
      if (scrollCon) {
        scrollCon.addEventListener("scroll", this.scrollBottom, true);
      }
    },
    created() {
      this.fetchList();
    },
    methods: {
      fetchList() {
        const { selected, page, currentCat } = this;
        if (this.currentCat === 100) {
          this.fetchBList();
          return;
        }
        list({ ...page, categoryId: currentCat }).then((res) => {
          this.prodList = this.prodList.concat(res.data.data.records);
          this.page.total = res.data.data.total;
        });
      },
      fetchBList() {
        const { selected, page, currentCat } = this;
        let params = {
          // ...page,
        };
        if (this.bType > -1) {
          params.tpe = this.bType;
        }
        bList({ ...params }).then((res) => {
          this.prodList = res.data.data;
          this.page.total = res.data.data.total;
        });
      },
      setCat(cat) {
        this.currentCat = cat;
        this.prodList = [];
        this.page = {
          pageSize: 10,
          total: 0,
          current: 1,
        };
        if (cat === 100) {
          this.fetchBList();
        }
        this.fetchList();
      },
      toggleBType(type) {
        this.bType = this.bType === type ? "" : type;
        this.fetchBList();
      },
      fetchListBykey() {
        if (!this.key) {
          this.fetchList();
          return;
        }
        keylist({ keystr: this.key, catstr: 97, size: 100 }).then((res) => {
          this.prodList = res.data.data.records;
          this.page.total = res.data.data.total;
        });
      },

      scrollBottom(e) {
        if (this.loading) {
          return;
        }
        const scrollList = this.$refs.scrollList;
        const scrollCon = this.$refs.scrollCon;
        const toBottom =
          Math.ceil(scrollCon.scrollTop + scrollCon.clientHeight + 4) >=
          Math.floor(scrollList.clientHeight);
        const { pageSize, total, current } = this.page;
        const unfinish = pageSize * current < total;
        if (unfinish && toBottom) {
          this.page.current = this.page.current + 1;
          if (this.key) {
            this.fetchListBykey();
            return;
          }
          this.fetchList();
        }
      },
      goBDetail(row) {
        if (!this.userInfo.id) {
          this.$router.push("/login");
          return;
        }
        this.$router.push({
          path: "/bProdDetail/" + row.id,
          query: {
            type: 1,
          },
        });
      },
      goDetail(row) {
        if (!this.userInfo.id) {
          this.$router.push("/login");
          return;
        }
        if (this.currentCat === 3) {
          this.$router.push({
            path: "/oProdDetail/" + row.id,
            query: {
              type: 1,
            },
          });
          return;
        }
        this.$router.push({
          path: "/prodDetail/" + row.id,
          query: {
            type: 1,
          },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .combineBanner {
    width: 100%;
    height: 1.43rem;
    padding: 0.3rem;
    box-sizing: border-box;
    .input {
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
  }

  .combineContent {
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
      min-height: 2.74rem;
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
        // width: 4.71rem;
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #30333b;
        margin-bottom: 0.1rem;
        box-sizing: border-box;
        // padding-left: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        // background-image: url(/img/h5/title1.png);
        // background-repeat: no-repeat;
        // background-size: 0.92rem 0.3rem;
        // background-position: left center;
        display: flex;
        align-items: center;
        &.title100 {
          //   background-image: url(/img/h5/title2.png);
          .titlePrefix {
            background-image: -webkit-linear-gradient(right, #7683d9, #d8a0fe);
            border-image: linear-gradient(-90deg, #7683d9, #d8a0fe) 1 1;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            width: 0.92rem;
            height: 0.3rem;
            border-radius: 2px;
            border: 1.5px solid;
            content: attr(data-content);
            font-weight: 400;
            font-size: 0.2rem;
            text-align: center;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            padding: 0 0.1rem;
            align-items: center;
            border-image: linear-gradient(-90deg, #7683d9, #d8a0fe) 1 1;
          }
        }
        // &.title99 {
        //   background-image: url(/img/h5/title3.png);
        // }
      }
      .desc {
        width: 50%;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #9a9a9c;
      }
      .descCon {
        display: flex;
      }
      .count {
        width: 50%;
        font-size: 0.52rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #eaba63;
        margin: 0.1rem 0;
        span {
          font-size: 0.24rem;
          font-weight: 400;
        }
        &:nth-child(2) {
          color: #30333b;
        }
      }
      .duration {
        width: 6.3rem;
        height: 0.45rem;
        line-height: 0.45rem;
        background: linear-gradient(90deg, #f8fafb, #ffffff);
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #9a9a9c;
        box-sizing: border-box;
        padding-left: 0.1rem;
        &.duration1 {
          display: flex;
          justify-content: space-between;
        }
        div {
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: #9a9a9c;
          box-sizing: border-box;
        }
        span {
          font-size: 0.22rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: #9a9a9c;
          text-align: right;
          margin-right: 0.25rem;
        }
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
    padding-left: 0.4rem;
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
    padding-bottom: 0.3rem;
    box-sizing: border-box;
  }
  .yuyue {
    width: 1.98rem;
    position: absolute;
    right: 0.19rem;
    bottom: 0.39rem;
  }
  .titlePrefixCon {
    width: 0.92rem;
    height: 0.3rem;
    border-radius: 2px;
    overflow: hidden;
  }
  .titlePrefix {
    background-image: -webkit-linear-gradient(right, #89f7fe, #66a6ff);
    border-image: linear-gradient(-90deg, #89f7fe, #66a6ff) 1 1;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 0.92rem;
    height: 0.3rem;
    border-radius: 2px;
    border: 1.5px solid;
    content: attr(data-content);
    font-weight: 400;
    font-size: 0.2rem;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 0.04rem;
    align-items: center;
    border-image: linear-gradient(-90deg, #89f7fe, #66a6ff) 1 1;
  }
  .bao {
    width: 0.3rem;
    height: 0.3rem;
    margin-left: 0.05rem;
  }
  .baoxianCat {
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    .baoxianCItem {
      width: 1.4rem;
      height: 0.62rem;
      line-height: 0.62rem;
      background: rgba(173, 181, 193, 0.1);
      border-radius: 0.28rem;
      font-weight: 400;
      font-size: 0.24rem;
      color: #9a9a9c;
      text-align: center;
      margin-right: 0.2rem;
      &.active {
        background: linear-gradient(163deg, #e1ad4f, #eaba63, #e0af56);
        box-shadow: inset 0px 3px 0.07rem 0px rgba(90, 66, 22, 0.47);
        color: #fff;
      }
    }
  }

  .titleDesc {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
