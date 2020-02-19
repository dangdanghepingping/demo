<template>
  <div class="notice">
    <li class="listWrapper" v-for="(item,i ) in navList" :key="item.title">
      <p class="title nav" @click="changeHeight(i)">
        <span>{{item.title}}</span>
        <span class="icon" :style="{transform: 'scale(0.7,0.7) rotate(' + item.rotate+')'}">>></span>
      </p>
      <ul class="listContent" :style="{height: item.height}">
        <router-link class="item" tag="li" to="/friends/myNewFriends">
          <span class="hasIcon">
            我的审核
            <i
              v-if="friendRequestMessage.length > 0"
            >{{ friendRequestMessage.length < 99 ? friendRequestMessage.length : "..." }}</i>
          </span>
        </router-link>
        <router-link class="item" tag="li" to="/friends/reply">
          <span class="hasIcon">
            我的申请
            <i
              v-if="replyMessage.length > 0 && iconFlag "
            >{{ replyMessage.length < 99 ? replyMessage.length : "..." }}</i>
          </span>
        </router-link>
      </ul>
    </li>
  </div>
</template>

<script>
import { mapState, mapActions,mapMutations } from "vuex";

export default {
  data() {
    return {
      navList: [
        {
          title: "消息",
          height: "60px",
          rotate: "90deg"
        }
      ],
      iconFlag: true
    };
  },
  computed: {
    ...mapState("friend", ["friendRequestMessage", "replyMessage"])
  },
  watch: {
    $route(to, from) {
      if (to.name == "reply") {
        //将icon去掉
        this.iconFlag = false;
      } if (from.name == "reply") {
        // 发送后端请求设置已读

        var arr = [];
        if (this.replyMessage && this.replyMessage.length > 0) {
          console.log(this.replyMessage);
          this.replyMessage.forEach(ele => {
            arr.push(ele.id);
          });
          console.log(arr);
          socket.emit("setResposeRecieved", arr);
          this.iconFlag = true;
          this.setReplyMessage([]);//把replyMessage置空
        }
      }
    }
  },

  methods: {
    ...mapActions("friend", ["getFriendRequestMessage", "getReplyMessage"]),
    ...mapMutations('friend',['setReplyMessage']),
    rotateIcon(i) {
      this.navList[i].rotate =
        this.navList[i].height == "0px" ? "0deg" : "90deg";
    },
    changeHeight(i) {
      this.navList[i].height =
        this.navList[i].height == "0px" ? 2 * 30 + "px" : "0px";
      this.rotateIcon(i);
    }
  },
  mounted() {
    //此刻发送两个http请求, 一个请求我没有审核的, 一个请求别人给我发而我没有看到的
    this.getFriendRequestMessage();
    this.getReplyMessage();
  }
};
</script>

<style scoped lang="less">
.notice {
  .listWrapper {
    @padding: 10px;
    .title {
      padding: 5px 0;
      padding-left: @padding;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        font-size: 13px;
        margin-right: 20px;
        background: #bbb;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0px;
        padding-bottom: 2px;
        cursor: default;
        transform: scale(0.8);
        transition: all 0.5s;
      }

      &:hover {
        background: #4dd52b !important;
      }
      &:hover .icon {
        background: #4dd52b !important;
      }
    }
    .listContent {
      overflow: hidden;
      transition: all 0.5s;

      .item {
        padding: 5px 10px;
        box-sizing: border-box;
        display: flex;
        cursor: default;
        &:hover {
          background: #ccc;
        }
        span {
          display: inline-block;
          height: 20px;
          font-size: 13px;
          letter-spacing: 2px;
          line-height: 20px;
          padding-left: 10px;
        }
        .hasIcon {
          position: relative;
          i {
            position: absolute;
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
        }
      }
      .router-link-exact-active {
        background: #bbb;
      }
    }
  }
}
</style>
