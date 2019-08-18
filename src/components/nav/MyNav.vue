<template>
  <div class="myNav">
    <ul class="navTop">
      <li>
        <Avatar />
      </li>
      <router-link
        v-for="(item,index) in navList"
        :key="item.to"
        tag="li"
        :to="item.to"
        class="navBar"
        @click.native="changeShow(index)"
      >
        <span v-if="item.show" class="icon iconfont" :class="item.class"></span>
        <img v-else :src="item.imgSrc" alt />
      </router-link>
    </ul>
    <div class="navBottom">
      <span class="icon iconfont icon-gengduo"></span>
    </div>
  </div>
</template>

<script>
import Avatar from "../Avatar";
export default {
  data() {
    return {
      navList: [
        {
          to: "/",
          imgSrc: require("../../assets/nav/message_active.png"),
          show: false,
          class: "icon-weixinxiaoxixianxing"
        },
        {
          to: "/friends",
          imgSrc: require("../../assets/nav/friends_active.png"),
          show: true,
          class: "icon-lianxiren"
        }
      ]
    };
  },
  components: {
    Avatar
  },
  methods: {
    changeShow(i) {
      this.navList.forEach((element, index) => {
        if (index == i) {
          if (this.navList[index].show == true) {
            this.navList[index].show = false;
          }
        } else {
          if (this.navList[index].show == false) {
            this.navList[index].show = true;
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.myNav {
  padding-top: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  @bg: #ccc;
  @bghover: #fff;
  display: flex;
  flex-direction: column;
  .navTop {
    flex: 1;
    .navBar {
      margin-top: 15px;
      text-align: center;
      .iconfont {
        color: @bg;
        &:hover {
          color: @bghover;
        }
      }
      span,
      img {
        display: inlien-block;
        width: 20px;
        height: 20px;
        font-size: 20px;
      }
    }
  }
  .navBottom {
    height: 30px;
    text-align: center;
    span {
      color: @bg;
      &:hover{
        color: @bghover
      }
    }
  }
}
</style>
