<template>
  <div class="friend">
    <div class="left">
      <search />
      <div class="FriendsFrame">
        <!-- <FriendsFrame></FriendsFrame> -->
        <SliderFrame sliderWidth="5px">
          <div class="friendItem">
            <FriendNav>
              <Notice />
            </FriendNav>
            <FriendItem></FriendItem>
          </div>
        </SliderFrame>
      </div>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
// import Search from "@/components/friends/Search.vue";
// import FriendsFrame from "@/components/friends/FriendsFrame.vue";
//可以共同的样式;可以写一个共同的style样式引用他们
import { mapMutations } from "vuex";

export default {
  components: {
    Search: () => import("@/components/Search.vue"),

    SliderFrame: () => import("@/components/SliderFrame.vue"),
    FriendItem: () =>
      import("@/components/friends/left/friendItem/FriendItem.vue"),
    FriendNav: () =>
      import("@/components/friends/left/friendItem/FriendNav.vue"),
    Notice: () => import("@/components/friends/left/friendItem/Notice.vue")
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    ...mapMutations("message", ["setCurrentListener"])
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.name == "friends") {
        this.setCurrentListener(null);
      }
    }
  }
};
</script>

<style scoped lang="less">
.friend {
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

