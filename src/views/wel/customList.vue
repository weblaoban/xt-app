<!-- 关于我们 -->
<template>
  <div class="index-container account">
    <main-header title="客户列表"></main-header>
    <div class="container customCon">
      <div class="searchCon">
        <input type="text" placeholder="请输入客户姓名或手机号" />
        <div class="button">
          <img src="/img/search.png" alt="" class="search" />
          <span>查询</span>
        </div>
      </div>

      <div class="customList">
        <div
          class="customItem"
          v-for="item in customList"
          :key="item.id"
          @click="goDetail(item)"
        >
          <el-row>
            <el-col :span="12" :gutter="10">
              <div class="desc">
                <div class="span">用户姓名：</div>
                <div class="value">111111111111111111111111</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="desc">
                <div class="span">用户手机号码：</div>
                <div class="value">1111</div>
              </div></el-col
            >
            <el-col :span="24">
              <div class="desc">
                <div class="span">持有产品数量：</div>
                <div class="value">1111</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="desc">
                <div class="span">持有产品本金（元）：</div>
                <div class="value">1111</div>
              </div></el-col
            >
            <el-col :span="12">
              <div class="desc">
                <div class="span">待收收益：</div>
                <div class="value">1111</div>
              </div></el-col
            >
          </el-row>
        </div>
      </div>
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
      return {
        customList: [1, 2, 3],
      };
    },
    created() {
      this.getMyCustom();
    },
    methods: {
      getMyCustom() {
        console.log(this.userInfo.id);
      },
      goDetail(data) {
        this.$router.push({
          path: "/buyDetail",
          query: {
            userId: data.userId,
          },
        });
      },
    },
  };
</script>
  
  <style lang="scss" scoped>
  .customCon {
    padding: 0.2rem 0;
    box-sizing: border-box;
  }
  .searchCon {
    display: flex;
  }
  .searchCon input {
    flex: 1;
    height: 0.72rem;
    box-sizing: border-box;
    background: rgba(234, 186, 99, 0.1);
    padding: 0 0.3rem;
    border: 1px solid rgba(131, 108, 76, 0.3);
    border-radius: 0.12rem;
    font-size: 0.2rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #836c4c;
    margin-right: 0.2rem;
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
    height: calc(100vh - 2rem);
    overflow-y: scroll;
  }
  .customItem {
    padding: 0.2rem 0.32rem;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;

    .desc {
      display: flex;
      font-size: 0.22rem;
      .span {
        flex-shrink: 0;
        font-size: 0.22rem;
      }
      .value {
        overflow: hidden;
        font-size: 0.22rem;
        word-break: break-all;
      }
    }
  }
</style>