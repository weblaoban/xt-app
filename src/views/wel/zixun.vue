<!-- 财经资讯 -->
<template>
  <div class="index-container zixun">
    <main-header :active="6" title="财经资讯"></main-header>
    <div class="banner"></div>
    <div class="container scrollList">
      <div class="zixunCon" ref="scrollCon">
        <div class="zixunList" ref="scrollList">
          <div
            class="zixunItem"
            @click="goDetail(item)"
            v-for="item in list"
            :key="item.id"
          >
            <h4 class="ellipsis">{{ item.title }}</h4>
            <p class="ellipsis">{{ item.des }}</p>
            <span class="time">{{ item.uploadTime }}</span>
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
    </div>
  </div>
</template>

<script>
  import mainFooter from "../common/footer.vue";
  import mainHeader from "../common/header.vue";
  import { zxlist } from "@/api/prod.js";
  export default {
    name: "jeZi",
    components: {
      mainFooter,
      mainHeader,
    },
    data() {
      return {
        page: {
          pageSize: 10,
          total: 0,
          current: 1,
        },
        list: [],
        loading: false,
      };
    },
    mounted() {
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
        if (this.loading) {
          return;
        }
        this.loading = true;
        const { page } = this;
        zxlist({ ...page, status: 0, categoryId: 8 })
          .then((res) => {
            console.log(res);
            this.list = this.list.concat(res.data.data.records);
            this.page.total = res.data.data.total;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      },
      onSelectSearch(value, prop) {
        console.log(value, prop);
        this.selected[prop] = value;
      },
      goDetail(row) {
        this.$router.push("/informationDetail/" + row.id);
      },
      scrollBottom(e) {
        if (this.loading) {
          return;
        }
        const scrollList = this.$refs.scrollList;
        const scrollCon = this.$refs.scrollCon;
        console.log(scrollCon.scrollTop);
        console.log(scrollCon.clientHeight);
        console.log(scrollList.clientHeight);
        const toBottom =
          Math.ceil(scrollCon.scrollTop + scrollCon.clientHeight + 4) >=
          Math.floor(scrollList.clientHeight);
        const { pageSize, total, current } = this.page;
        const unfinish = pageSize * current < total;
        if (unfinish && toBottom) {
          this.page.current = this.page.current + 1;
          this.fetchList();
        }
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

<style lang="scss">
  .zixun {
    width: 100%;
    height: 100%;
    .banner {
      width: 100%;
      height: 1.82rem;
      background-image: url(/img/zixunbanner.png);
      background-size: calc(100% + 0.3rem) 1.83rem;
      background-position: left top;
      background-repeat: no-repeat;
    }

    .el-col {
      border-bottom: 1px dashed rgba(154, 154, 156, 0.4);
      &:last-child {
        border-bottom: none;
      }
    }
    .zixunItem {
      height: 1.74rem;
      border-bottom: 1px dashed rgba(154, 154, 156, 0.2);
      padding: 0.3rem 0;
      box-sizing: border-box;
      position: relative;
      &:last-child {
        border-bottom: none;
      }
      .time {
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #9a9a9c;
        margin-top: 0.2rem;
      }
      h4 {
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #30333b;
        margin: 0;
        margin-bottom: 0.23rem;
      }
      p {
        margin: 0;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #30333b;
      }
      .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &:hover {
        h4 {
          color: #eaba63;
          text-decoration: underline;
        }
      }
    }

    .scrollList {
      width: 100%;
      height: calc(100% - 2.6rem);
      padding: 0;
      .zixunCon {
        height: 100%;
        padding: 0 0.3rem;
      }
      .zixunCon {
        overflow-y: scroll;
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
  }
</style>
