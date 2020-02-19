<template>
  <div class="myNav">
    <ul class="navTop">
      <li>
        <Avatar :imgSrc="'/api'+currentSpeaker.avatarUrl" @click.stop.native="showProfile">
          <div
            class="profile"
            @click.stop
            v-show="profShow"
            v-bind:style="{top:y +'px',left: x + 'px'}"
          >
            <ShowProfile :profile="currentSpeaker" />
          </div>
        </Avatar>
      </li>
      <router-link
        v-for="(item,index) in navList"
        :key="item.to"
        tag="li"
        :to="item.to"
        class="navBar"
        @click.native="changeShow(index)"
      >
        <i v-if="icon[index].show > 0">{{ icon[index].show < 99 ? icon[index].show : "..." }}</i>

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
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      profShow: false,
      x: 0,
      y: 0,
      navList: [
        {
          to: "/message",
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
  computed: {
    ...mapState("regist_login", ["currentSpeaker"]),
    icon() {
      return [
        { show: this.$store.getters['message/unreadNumberIcon'].totalUnread },
        // 这第二个不对, 等把friend交友信息重新后补上,这就属于架构错误
        { show: this.$store.getters['message/unreadNumberIcon'].totalUnread }
      ];
    }
  },
  components: {
    Avatar: () => import("../Avatar"),
    ShowProfile: () => import("./ShowProfile")
  },
  methods: {
      ...mapActions("friend", ["getFriendList"]),
    ...mapActions("message", ["getUnreadSingleMessage"]),
    showProfile(event) {
      this.x = event.clientX;
      this.y = event.clientY;
      this.profShow = true;
      document.body.onclick = () => {
        this.profShow = false;
        document.body.onclick = null;
      };
    },
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
  },
  watch: {
    $route(to, from) {
      if (/^\/message/.test(to.path)) {
        this.changeShow(0);
      } else if (/^\/friend/.test(to.path)) {
        this.changeShow(1);
      }
    }
  },
  created() {
    this.getUnreadSingleMessage();
   
    this.getFriendList();
  }
};
</script>

<style scoped lang="less">
.profile {
  position: absolute;
  z-index: 100;
  height: 200px;
  width: 250px;
  background: #eee;
}
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
      position: relative;
      margin-top: 15px;
      text-align: center;

      i {
        position: absolute;
        right: 0;
        top: -5px;
        height: 13px;
        width: 13px;
        border-radius: 50%;
        background: red;
        font-size: 10px;
        text-align: center;
        line-height: 13px;
        font-style: normal;
        color: white;
        letter-spacing: 0px;
      }

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
      &:hover {
        color: @bghover;
      }
    }
  }
}
</style>
