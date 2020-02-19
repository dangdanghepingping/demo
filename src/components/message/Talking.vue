<template>
  <!-- message右侧 -->
  <div class="talking">
    <div class="top">{{currentListener ? currentListener.nickName: ''}}</div>
    <div class="middle">
      <!-- 想要保持不变, 必须得满足:1数据不能是重新获取来的 2各模块的独立性 -->
      <!-- <keep-alive>
        <SliderFrame ref="talkingFrame" sliderWidth="5px" :setDemoTop="true" :id="'bottomReset'">
          <TalkingLists></TalkingLists>
        </SliderFrame>
      </keep-alive> -->
      <SliderFrame ref='talkingFrame' sliderWidth="5px" :setDemoTop='true'  :id="'bottomReset'">

        <TalkingLists></TalkingLists>

      </SliderFrame>
    </div>

    <div class="bottom">
      <WriteZoon></WriteZoon>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {
    WriteZoon: () => import("./writeZoon/WriteZoon"),
    TalkingLists: () => import("./TalkingLists"),
    SliderFrame: () => import("@/components/SliderFrame.vue")
  },

  methods: {
    ...mapActions("message", ["getCurrentListener"])
  },
  computed: {
    ...mapState("message", ["currentListener", "demoTop"])
  },
  data() {
    return {
      demo: 0
    };
  },
  watch: {
    $route(now, pre) {
      const wxId = now.params.id; //这是个listenner(群或者是单个人)的id
      wxId && this.getCurrentListener(wxId);
    }
  },
  created() {
    const wxId = this.$route.params.id;
    this.getCurrentListener(wxId);
  }
};
</script>

<style scoped lang="less">
.frFrame .demo {
  background: transparent !important;
}
.talking {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    height: 65px;
    background: #eee !important;
    line-height: 65px;
    padding: 0 20px;
    border-bottom: 1px solid rgb(187, 32, 32);

    box-sizing: border-box;
  }
  .middle {
    flex: 1;
  }
  .bottom {
    border-top: 1px solid #dddddd;
    height: 150px;
    background: #ffffff !important;
    box-sizing: border-box;
  }
}
</style>

