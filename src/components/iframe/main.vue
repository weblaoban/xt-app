<template>
  <basic-container>
    <iframe :src="src"
            class="iframe"
            ref="iframe" />
  </basic-container>
</template>

<script>
export default {
  name: "AvueIframe",
  data () {
    return {};
  },
  created () {
  },
  mounted () {
    this.load();
  },
  watch: {
    $route: function () {
      this.load();
    }
  },
  computed: {
    src () {
      return this.$route.query.url.replace(/#/g, "&")
    }
  },
  methods: {
    // 显示等待框
    show () {
    },
    // 隐藏等待狂
    hide () {
    },
    // 加载组件
    load () {
      this.show();
      //超时3s自动隐藏等待狂，加强用户体验
      let time = 3;
      const timeFunc = setInterval(() => {
        time--;
        if (time == 0) {
          this.hide();
          clearInterval(timeFunc);
        }
      }, 1000);
      this.iframeInit();
    },
    //iframe窗口初始化
    iframeInit () {
      const iframe = this.$refs.iframe;
      const clientHeight = document.documentElement.clientHeight - 150;
      if (!iframe) return;
      iframe.style.height = `${clientHeight}px`;
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", () => {
          this.hide();
        });
      } else {
        iframe.onload = () => {
          this.hide();
        };
      }
    }
  }
};
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>