<template>
  <!-- 消息左侧的item -->
  <ul class="MessageItem">
    <router-link
      class="item"
      tag="li"
      v-for="item in lastSingleMessage"
      :key="item.listenerWxId"
      :to="'/message/talking/' + item.listenerWxId"
    >
      <div class="left">
        <Avatar :imgSrc="'/api'+item.avatarUrl"></Avatar>
        <i
          v-if="unreadNumberIcon[item.listenerWxId]> 0"
        >{{ unreadNumberIcon[item.listenerWxId] < 99 ? unreadNumberIcon[item.listenerWxId] : "..." }}</i>
      </div>
      <div class="right">
        <p class="top">
          <span class="name elipsis">{{item.nickName}}</span>
          <span
            class="time"
          >{{ dealDate(item.time).standeredDate == dealDate(new Date()).standeredDate ? dealDate(item.time).standeredTime : dealDate(item.time).standeredDate }}</span>
        </p>
        <p class="bottom elipsis">{{item.message|isFile}}</p>
      </div>
    </router-link>
  </ul>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    Avatar: () => import("@/components/Avatar")
  },
  data() {
    return {
      //   [ { listenerWxId: 'gggg',
      //   avatarUrl: '/getPic/1f65acd65b9cdae256907c7a620df647',
      //   nickName: '是是',
      //   time: '10:8' },
      // { listenerWxId: 'iiii',
      //   avatarUrl: '/getPic/62f20870f599b002a431fb28d5fde495',
      //   nickName: '你好漂亮',
      //   time: '10:7' } ]
      id: ""
    };
  },
     filters: {
    isFile(obj) {
      var lastMessage;
      try {
        obj = JSON.parse(obj);
       const extionname = obj.originalname.match(/\.[a-z]+$/)[0].slice(1) ; //获取后缀名
       if(extionname.match(/(jpg)|(png)|(jpeg)|(gif)$/)){
         lastMessage = '[图片]'
       }else{
         lastMessage = '[文件]'
       }
      } catch {
        lastMessage = obj;
      }
      return lastMessage;
    }
  },
  computed: {
    ...mapState("message", ["currentListener", "singleMessage"]),
    ...mapGetters("message", [
      "unreadNumber",
      "unreadNumberIcon",
      "lastSingleMessage"
    ]),
    ...mapState("friend", ["friendsList"])
  },
  methods: {
    ...mapActions("message", ["getCurrentListener"]),
    ...mapMutations("message", [
      "setCurrentListener",
      "changeUnreadSingleMessage"
    ]),
    dealDate(date) {
      if (typeof date == "string") {
        date = new Date(date);
      }
      var year = date.getFullYear() + "";
      var month = parseInt(date.getMonth()) + 1 + "";
      var day = date.getDate() + "";
      var hour = date.getHours() + "";
      var munite = date.getMinutes() + "";
      return {
        standeredDate: year.slice(2) + "/" + month + "/" + day,
        standeredTime: hour + ":" + munite
      };
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.name == "talking" ||
        to.name == "message" ||
        to.name == "friends"
      ) {
        this.id = to.params.id;
        if (!this.id) {
          this.setCurrentListener(null);
        }
      }
    }
  },
  created() {
    // this.getLastSingleMessage(); //除了历史记录的消息还需要所有朋友都显示出来
    this.id = this.$route.params.id;
    if (this.id && !this.currentListener) {
      this.getCurrentListener(this.id);
    }
  }
};
</script>

<style scoped lang="less">
.MessageItem {
  // padding: 20px 0;
  width: 100%;
  @padding: 10px;
  .item {
    display: flex;
    // overflow: hidden;
    padding: @padding;
    cursor: default;
    &:hover {
      background: #ccc;
    }
    .left {
      padding-right: @padding;
      height: 40px;
      width: 40px;
      position: relative;
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
    }
    .right {
      flex: 1;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 14px;
          width: 145px;
        }
        .time {
          display: inline-block;
          font-size: 12px;
          width: 35px !important;
          text-align: right;
          color: #666;
        }
      }
      .bottom {
        font-size: 12px;
        width: 180px;
        color: #666;
      }
    }
  }
  .router-link-exact-active {
    background: #bbb;
  }
}
</style>