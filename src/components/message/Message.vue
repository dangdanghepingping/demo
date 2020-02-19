<template>
  <!-- message左右 -->
  <div class="message">
    <div class="left">
      <search />
      <div class="FriendsFrame">
        <SliderFrame sliderWidth="5px">
          <MessageItem></MessageItem>
        </SliderFrame>
      </div>
    </div>
    <div class="right">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Search: () => import("@/components/Search.vue"),
    SliderFrame: () => import("@/components/SliderFrame.vue"),
    MessageItem: () => import("@/components/message/MessageItem.vue")
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {}
};
</script>

<style scoped lang="less">
.message {
  height: 100%;
  background-color: #eee !important;
  display: flex;
  .left {
    background-color: #ddd !important;
    padding-top: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 250px;
    .FriendsFrame {
      flex: 1;
    }
  }
  .right {
    min-width: 300px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .top {
      flex: 1;
    }
    .bottom {
      flex: 3;
    }
  }
}
</style>


