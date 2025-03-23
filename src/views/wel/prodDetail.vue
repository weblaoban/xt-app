<template>
  <div class="prodDetail">
    <main-header title="产品详情"></main-header>
    <div class="banner"></div>
    <div class="prodDetailCon">
      <div class="container">
        <div class="section1">
          <div :class="{ productItem: true, finish: detail.status == 3 }">
            <div :class="'title ' + 'title' + detail.categoryId">
              {{ detail.name }}
            </div>
            <div class="descCon">
              <div class="desc">业绩比较基准</div>
              <div class="desc">投资门槛</div>
            </div>
            <div class="descCon">
              <p class="count">{{ detail.brief || 0 }} <span></span></p>
              <p class="count">
                <span>{{ detail.pmStandCnt }}</span>
              </p>
            </div>
            <div class="line"></div>
            <div class="duration">产品期限：{{ detail.investLimitCnt }}</div>
            <div class="tag" v-if="detail.status == 1 || detail.status == 3">
              <img :src="'/img/h5/tag' + detail.status + '.png'" alt="" />
            </div>

            <div class="button" v-if="!detail.imgs" @click="onYuyue(detail)">
              我要预约
            </div>
            <div class="button gray" v-if="detail.imgs">已预约</div>
          </div>
        </div>

        <div class="section2">
          <div class="title">产品概况</div>
          <el-row>
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">产品名称</div>
                <div class="infoDesc">{{ detail.name }}</div>
              </div></el-col
            >

            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">产品类别</div>
                <div class="infoDesc">{{ detail.categoryCnt }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">发行机构</div>
                <div class="infoDesc">{{ detail.organCnt }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">投资领域</div>
                <div class="infoDesc">{{ detail.prodEffCnt }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">收益类型</div>
                <div class="infoDesc">{{ detail.investId }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">规模</div>
                <div class="infoDesc">{{ detail.totalStocks }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">投资门槛</div>
                <div class="infoDesc">{{ detail.pmStandCnt }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">产品期限</div>
                <div class="infoDesc">{{ detail.investLimitCnt }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">付息方式</div>
                <div class="infoDesc">{{ detail.inrestMethodCnt }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">所在地域</div>
                <div class="infoDesc">{{ detail.area }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">业绩比较基准</div>
                <div class="infoDesc">{{ detail.brief }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">大小配额比</div>
                <div class="infoDesc">{{ detail.investRatio }}</div>
              </div></el-col
            >
            <el-col :span="24"
              ><div class="infoItem">
                <div class="infoLabel">风控级别</div>
                <div class="infoDesc">{{ detail.lev }}</div>
              </div></el-col
            >
          </el-row>

          <div class="title">产品进度</div>
          <div class="progress" v-show="detail.porder && detail.porder.length">
            <div class="progressItem" v-for="item in detail.porder" :key="item">
              {{ item.detail }}
            </div>
          </div>
          <div class="title">产品详情</div>
          <div class="detailCon" v-html="detail.content"></div>
        </div>
      </div>
    </div>

    <!-- 确认预约产品弹窗 -->
    <div class="model" v-if="showYuyue">
      <div class="modelContent">
        <div class="yuyue">
          <img
            class="close el-icon-close"
            @click="hiddenYuyue"
            src="/img/close.png"
            alt=""
          />
          <h3>产品预约</h3>
          <p class="desc">您要预约的产品为</p>
          <p class="title">{{ detail.name }}</p>
          <div class="button" @click="onDoYuyue">确定</div>
        </div>
      </div>
    </div>
    <!-- 协议 -->
    <div class="model" v-if="showAgreement">
      <div class="modelContent">
        <div class="agreement">
          <img
            class="close el-icon-close"
            @click="showAgreement = false"
            src="/img/close.png"
            alt=""
          />
          <img class="logo" src="/img/logo.png" alt="" />
          <div class="agCon">
            <h1>《合格投资者认定》</h1>
            <p>
              本网谨遵中国银行业监督管理委员会发布的《信托公司集合资金信托计划管理办法》之规定，只向特定投资者展示信托产品信息，不构成任何投资推介建议。
            </p>
            <p>
              阁下如有意进行信托投资，请承诺符合《信托公司集合资金信托计划管理办法》之规定合格投资者的条件。
            </p>
            <p>
              即具备相应风险识别能力和风险承担能力，投资于单只信托产品金额不低于100万元，且符合下列相关标准之一：
            </p>
            <p class="red">
              1.承诺符合金融类资产不低于300万元;（金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等）
            </p>
            <p class="red">或</p>
            <p class="red">
              2.承诺符合最近三年个人平均收入不低于50万元人民币；
            </p>
            <h1 style="margin-top: 50px">《免责条款》</h1>
            <p>
              一、本网致力于提供完整、准确的产品信息，信息内容绝大部份来自于本网的授权机构，本网尽谨慎注意和一致描述义务。尽管如此，本网不能保证信息的绝对正确，投资者据此交易、服务、投资的，请务必向交易主体核实相关信息，风险自负。
            </p>
            <p>
              二、对于部分非上述来源的信息内容本网将特别注明类似“信息未证实，仅供参考”字样，请投资者务必注意甄别。
            </p>
            <p>
              三、本网所提供的产品统计数据及其相关分析，投资者教育的内容来源于权威媒体机构，仅供投资者参考，不作为交易、服务、投资使用的依据，亦不代表本网的观点或主张。
            </p>
            <p>
              四、凡以任何方式登录本网站或直接、间接使用本网站资料者，视为自愿接受本网站声明的约束。
            </p>
            <p>
              五、引用本网的研究报告等须注明来源，同时，引用的报告仅能作为自身的学术参考用，不能用于商业目的，否则我们有权追究版权责任.
            </p>
          </div>
          <div class="checkBox">
            <img
              v-if="checked"
              src="/img/checked.png"
              @click="toggleCheck"
              alt=""
              class="checked"
            />
            <img
              v-if="!checked"
              src="/img/unchecked.png"
              @click="toggleCheck"
              alt=""
              class="notCheced"
            />
            <span
              >我接受 <span class="yel">《合格投资者认定》</span>、<span
                class="yel"
                >《免责条款》</span
              >中所有条款</span
            >
          </div>
          <div class="button" @click="onAgree">确定</div>
        </div>
      </div>
    </div>
    <contact></contact>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import mainFooter from "../common/footer.vue";
  import mainHeader from "../common/header.vue";
  import { proddetail, yuyue } from "@/api/prod.js";
  import { addComment } from "@/api/index.js";
  import contact from "../common/contact.vue";
  import { setStore, getStore } from "utils/store";
  export default {
    name: "jeZi",
    components: {
      mainFooter,
      mainHeader,
      contact,
    },
    data() {
      return {
        detail: {},
        active: "",
        zixun: "",
        content: "",
        loading: false,
        checked: false,
        showAgreement: false,
        showYuyue: false,
        name: "",
        type: {
          1: "集合信托",
          2: "集合资管",
          3: "私募基金",
        },
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    mounted() {
      document.body.scrollTo(0, 0);
    },
    created() {
      const checked = getStore({ name: "checked" });
      console.log(checked + "checked");
      if (!checked) {
        this.showAgreement = true;
      }
      this.getDetail();
    },
    mounted() {},
    methods: {
      getDetail() {
        const id = this.$route.params.id;
        const active = this.$route.query.type || 1;
        this.active = active;
        proddetail({ id }).then((res) => {
          this.detail = res.data.data;
          this.detail.porder = JSON.parse(this.detail.porder);
        });
      },
      sendComm() {
        if (this.loading) {
          return;
        }
        const { name, tel } = this.userInfo;
        const { content } = this;
        if (!name || !tel || !content) {
          return;
        }
        const id = this.$route.params.id;
        this.loading = true;
        addComment({ content, prodId: id })
          .then((res) => {
            const data = res.data;
            if (data && data.success) {
              this.$message.success("提交成功");
              this.content = "";
              this.loading = false;
            }
          })
          .catch(() => {
            this.loading = false;
          });
      },
      onYuyue() {
        if (!this.userInfo.id) {
          this.$router.push("/login");
          return;
        }
        this.showYuyue = true;
      },
      toggleCheck() {
        this.checked = !this.checked;
      },
      onAgree() {
        if (!this.checked) {
          this.$message.error("请先同意协议");
          return;
        }
        setStore({ name: "checked", content: true });
        this.showAgreement = false;
      },
      onDoYuyue() {
        const cur = this.detail;
        const userInfo = this.userInfo;
        if (cur.id) {
          yuyue({ prodId: cur.id, userId: userInfo.id }).then((res) => {
            if (res && res.data && res.data.success) {
              this.$message.success("预约成功");
              this.showYuyue = false;
              this.cur = {};
              this.getDetail();
            }
          });
        }
      },
      hiddenYuyue() {
        this.showYuyue = false;
      },
    },
  };
</script>

<style lang="scss">
  .prodDetail {
    padding-bottom: 0.5rem;
    box-sizing: border-box;
    background: #f8fafb;
    .banner {
      width: 100%;
      height: 3.3rem;
      background: linear-gradient(
        0deg,
        rgba(161, 196, 253, 0.5),
        rgba(194, 233, 251, 0.5)
      );
    }
    .prodDetailCon {
      margin-top: -3rem;
      .container {
      }
    }
    .section1 {
      margin-bottom: 0.2rem;

      .baseInfo {
        float: left;
        width: 740px;
        height: 366px;
        background-image: url(/img/prod2.png);
        background-size: 653px 249px;
        background-position: left bottom;
        background-repeat: no-repeat;
        padding: 40px;
        box-sizing: border-box;
        font-size: 30px;
        font-family: Heiti SC;
        font-weight: 500;
        color: #30333b;
        h4 {
          margin: 0;
          margin-bottom: 100px;
        }
        ul,
        li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        ul {
          height: 70px;
        }
        li {
          width: 25%;
          height: 70px;
          float: left;
          border-right: 1px solid #ebebeb;
          box-sizing: border-box;
          padding-left: 30px;
          &:last-child {
            border: none;
          }
          .label {
            font-size: 18px;
            font-family: Heiti SC;
            font-weight: 500;
            color: #9a9a9c;
            margin-bottom: 20px;
          }
          .con {
            font-size: 24px;
            font-family: Heiti SC;
            font-weight: 500;
            color: #eaba63;
          }
        }
      }
      .zixun {
        width: 460px;
        height: 366px;
        float: right;
        background-image: url(/img/prod1.png);
        background-size: 460px 366px;
        background-position: center center;
        background-repeat: no-repeat;
        box-sizing: border-box;
        padding: 40px;
        h5 {
          font-size: 18px;
          font-family: Heiti SC;
          font-weight: 500;
          color: #30333b;
          margin: 0;
          margin-bottom: 20px;
        }
        p {
          font-size: 18px;
          font-family: Heiti SC;
          font-weight: 500;
          color: #30333b;
          margin: 0;
          margin-bottom: 20px;
        }
      }

      .el-textarea {
        box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.09);
        border-radius: 12px;
        border: none;
        textarea {
          border: none;
          box-shadow: none !important;
          outline: none;
        }
      }
      .button {
        height: 0.76rem;
        background: linear-gradient(
          163deg,
          #e1ad4f,
          rgba(234, 186, 99, 0.7),
          #e0af56
        );
        box-shadow: 0px 0.05rem 0px 0px #dea949;

        border-radius: 0.12rem;
        margin: 0.3rem auto 0;
        text-align: center;
        line-height: 0.76rem;
        font-size: 0.32rem;
        font-family: Heiti SC;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
        &.gray {
          background: #9a9a9c;
          box-shadow: none;
        }
      }
    }
    .section2 {
      padding: 0.2rem 0.1rem 0.82rem;
      box-sizing: border-box;
      background: #ffffff;
      border-radius: 0.12rem;
      .title {
        font-size: 0.3rem;
        font-family: Heiti SC;
        font-weight: 500;
        color: #eaba63;
        line-height: 0.64rem;
        border-bottom: 1px solid rgba(234, 186, 99, 0.2);
        position: relative;
        padding-left: 0.11rem;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        &::after {
          content: "";
          display: block;
          width: 1.4rem;
          height: 0.04rem;
          background: #eaba63;
          position: absolute;
          bottom: 0;
          left: 0.11rem;
        }
      }

      .el-col {
        margin: 0;
        &:first-child {
          .infoDesc {
            font-weight: 500;
          }
        }
        &:nth-child(10) {
          .infoDesc {
            color: #eaba63;
          }
        }
      }
      .el-row {
        width: 100%;
        margin: 0 auto 0.8rem;
        border: 1px solid #ebebeb;
        border-bottom: none;
      }
      .infoItem {
        border-bottom: 1px solid rgba(235, 235, 235, 1);
        height: 0.5rem;

        .infoLabel {
          width: 1.5rem;
          height: 0.5rem;
          line-height: 0.5rem;
          background: rgba(173, 181, 193, 0.1);

          font-size: 0.2rem;
          font-family: Heiti SC;
          font-weight: 500;
          color: #30333b;
          text-align: center;
          float: left;
        }
        .infoDesc {
          padding-right: 0.24rem;
          box-sizing: border-box;
          font-size: 0.2rem;
          font-family: Heiti SC;
          font-weight: 500;
          color: #30333b;
          float: left;
          text-align: right;
          line-height: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: calc(100% - 1.5rem);
        }
      }
    }
  }

  .detailCon {
    img {
      max-width: 100%;
    }
  }

  .progress {
    width: 100%;
    background: rgba(234, 186, 99, 0.1);
    border: 1px solid #eaba63;
    border-radius: 0.12rem;
    box-sizing: border-box;
    margin-bottom: 0.8rem;

    padding: 0 0.25rem;
    .progressItem {
      line-height: 1.5;
      border-bottom: 1px dashed #eaba63;
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 400;
      color: #30333b;
      width: 100%;
      padding: 0.22rem 0;
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .productItem {
    width: 100%;
    background: #ffffff;
    box-shadow: 0rem 0rem 0.1rem 0rem rgba(234, 186, 99, 0.15);
    border-radius: 0.06rem;
    padding: 0.2rem 0.3rem 0.5rem;
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
      padding-left: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      background-image: url(/img/h5/title1.png);
      background-repeat: no-repeat;
      background-size: 0.92rem 0.3rem;
      background-position: left center;
      &.title98 {
        background-image: url(/img/h5/title2.png);
      }
      &.title99 {
        background-image: url(/img/h5/title3.png);
      }
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

  .model {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    // align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    overflow-y: scroll;
    .modelContent {
      padding: 0 38px;
      position: relative;
      margin: 100px auto 0;
      .close {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: -1rem;
        z-index: 2;
        width: 0.64rem;
        height: 0.64rem;
        cursor: pointer;
      }
      .yuyue {
        width: 6.5rem;
        height: 4.2rem;
        background-image: url(/img/yuyuebg.png);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        padding: 0.6rem;
        box-sizing: border-box;
        position: relative;
        h3 {
          font-size: 0.34rem;
          font-family: Heiti SC;
          font-weight: 500;
          color: #eaba63;
          margin-bottom: 0.5rem;
          margin-top: 0;
        }
        p.desc {
          font-size: 0.24rem;
          font-family: Heiti SC;
          font-weight: 500;
          color: #30333b;
          margin: 0;
          margin-bottom: 0.2rem;
        }
        p.title {
          font-size: 0.24rem;
          font-family: Heiti SC;
          font-weight: 400;
          color: #30333b;
          margin: 0;
          margin-bottom: 0.6rem;
        }
      }
      .button {
        width: 100%;
        height: 0.76rem;
        background: linear-gradient(
          163deg,
          #e1ad4f,
          rgba(234, 186, 99, 0.7),
          #e0af56
        );
        box-shadow: 0px 0.03rem 0px 0px #dea949;
        border-radius: 0.12rem;
        margin: 0 auto;
        text-align: center;
        line-height: 0.76rem;
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
      }
      .agreement {
        width: 6.5rem;
        height: 8.8rem;
        background-image: url(/img/agreement.png);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        padding: 0.3rem;
        box-sizing: border-box;
        position: relative;
        .logo {
          width: 1.78rem;
          height: 0.52rem;
          margin-bottom: 0.32rem;
        }
        .agCon {
          width: 100%;
          height: 5.4rem;
          background: #ffffff;
          box-shadow: 0px 0.04rem 0.02rem 0px rgba(234, 186, 99, 0.5);
          border-radius: 0.12rem;
          overflow-y: scroll;
          padding: 0.24rem;
          box-sizing: border-box;
          &::-webkit-scrollbar {
            width: 0.04rem;
            background: #eaba63;
            opacity: 0.5;
            border-radius: 0.02rem;
          }
          h1 {
            margin: 0 auto 0.2rem;
            text-align: center;
            font-size: 0.24rem;
            font-family: Heiti SC;
            font-weight: 500;
            color: #30333b;
          }
          p {
            margin: 0 auto 0.06rem;
            text-indent: 0.32rem;
            font-size: 0.2rem;
            font-family: Heiti SC;
            font-weight: 500;
            color: #30333b;
            &.red {
              color: #ec5e2a;
            }
          }
        }
        .checkBox {
          margin-top: 0.25rem;
          margin-bottom: 0.29rem;
          img {
            width: 0.24rem;
            height: 0.24rem;
            vertical-align: middle;
            margin-right: 0.1rem;
          }
          span {
            line-height: 1.5;
            font-size: 0.2rem;
            font-family: Heiti SC;
            font-weight: 500;
            color: #9a9a9c;
            &.yel {
              color: #eaba63;
            }
          }
        }
      }
    }
  }
</style>
