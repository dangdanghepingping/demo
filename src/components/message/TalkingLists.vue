<template>

  <!-- 右侧中部消息展示区 -->
  <ul class="talkingList" @mouseenter="trueFlag" @mouseleave="falseFlag">
    <li
      class="getHistoryMessage"
      v-if="historyFlagArr.length > 0 ? historyFlagArr.find(ele=>ele.title == currentListener.wxId).flag : true"
    >
      <span class="line"></span>
      <span class="clickWord" @click="getHistorySingleMessage">点击查看历史记录</span>
      <span class="line"></span>
    </li>
     <!-- 先判断speaker是不是自己, 如果是,靠右,否则靠左 -->
    <li v-for="(item,index) in rentConversition" :key="item.words+index" class="wrapper">
      <div v-if="item.wxId == currentSpeaker.wxId" class="speaker">
        <div class="message">
          <span
            class="contentImg"
            v-if="dealMessage(item.words).type == 'img'"
            v-html="dealMessage(item.words).content"
          ></span>
          <span
            class="contentFile"
            v-else-if="dealMessage(item.words).type == 'file'"
            v-html="dealMessage(item.words).content"
          ></span>
          <span v-else class="content" v-text="dealMessage(item.words).content"></span>
        </div>
        <Avatar1 size="30px" :position="['right',index]" :profile="getProfile(item.wxId)"></Avatar1>
      </div>

      <div class="listener" v-else>
        <Avatar1 size="30px" :position="['left',index]" :profile="getProfile(item.wxId)"></Avatar1>
        <div class="message">
          <span
            class="contentImg"
            v-if="dealMessage(item.words).type == 'img'"
            v-html="dealMessage(item.words).content"
          ></span>
          <span
            class="contentFile"
            v-else-if="dealMessage(item.words).type == 'file'"
            v-html="dealMessage(item.words).content"
          ></span>
          <span v-else class="content" v-text="dealMessage(item.words).content"></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import fontObj from "@/assets/iconfont/iconfont.js";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      // //  speaker: '轻舞飞扬',
      //       listenner: '小叶子',
      //       listennerId: 1,
      //       speakerId:2,
      //       content: '你知道新华书店怎么走吗',
      //       time: '2019/10/1 10:11:11'
      LestId: undefined,
      flag: true,
      historyFlagArr: []
      // showHistry: true
    };
  },
  components: {
    Avatar1: () => import("@/components/AvatarHasProfile")
  },
  activated(){
console.log('activated');
  },
  eactivated(){
    console.log('deactivated');
  },
  methods: {
    ...mapActions("message", ["getHistrySingleMessages"]),

    safeStr(str) {
      return str
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },
    dealMessage(message) {
      var str = "",
        type = "";
      //     fieldname: 'file',
      // originalname: 'ad_13.webp',
      // encoding: '7bit',
      // mimetype: 'image/webp',
      // destination: 'uploads/',
      // filename: 'a29d7c49ee06ecffbcb1dac3d4c99f7f',
      // path: 'uploads\\a29d7c49ee06ecffbcb1dac3d4c99f7f',
      // size: 954 }
      try {
        const obj = JSON.parse(message);
        if (obj.fileFlag) {
          const extionname = obj.originalname.match(/\.[a-z]+$/)[0].slice(1); //获取后缀名
          const src = "/api/getFile?path=" + obj.destination + obj.filename;
          if (extionname.match(/(jpg)|(png)|(jpeg)|(gif)$/)) {
            //创建图片
            str = `<img style='max-width:300px' src=${src}/>`;
            type = "img";
          } else {
            var fontArr = fontObj.glyphs;
            const temp = fontArr.find(ele => ele.type == extionname);
            const spanContent = temp
              ? temp.unicode
              : fontArr.find(ele => ele.type == "undefind").unicode;
            str = `<a href=${src} download=${obj.originalname}>
          <span class='iconfont' style='display:inline-block;height:40px;width:40px;font-size:40px'>&#x${spanContent};</span>
          </a>`;
            type = "file";
          }
        } else {
          str = this.safeStr(message);
        }
      } catch {
        str = this.safeStr(message);
        type = "string";
      }

      return { content: str, type };
    },

    getProfile(wxId) {
      if (this.currentSpeaker.wxId == wxId) {
        return this.currentSpeaker;
      }
      return this.currentListener;
    },
    resetTop() {
      this.$parent.showBar();
      this.$parent.moveToBottom();
    },
    trueFlag() {
      this.flag = true;
    },
    falseFlag() {
      this.flag = false;
    },
    async getHistorySingleMessage() {
      //这就必须获取最后一次记录的最小id
      const LestId = this.currentConversition[0]
        ? this.currentConversition[0].id
        : undefined;
      await this.getHistrySingleMessages();
      this.historyFlagArr.find(
        ele => ele.title == this.currentListener.wxId
      ).flag = false;
      // this.setCurrentListenerHistoryMessageFlag(0);
    }
  },
  watch: {
    lastSingleMessage(current, provious) {
      for (let i = 0; i < current.length; i++) {
        const index = this.historyFlagArr.findIndex(
          ele => ele.title == current.listenerWxId
        );
        if (index == -1) {
          this.historyFlagArr.push({
            title: current[i].listenerWxId,
            flag: true
          });
        }
      }
    }
  },
  computed: {
    ...mapState("regist_login", ["currentSpeaker"]),
    ...mapState("message", ["currentListener"]),
    ...mapGetters("message", ["currentConversition", "lastSingleMessage"]),

    rentConversition() {
      //当有数据变化时候, 就执行重新计算尺寸 并到底部
      //当正在滑动的时候, 或者鼠标停在那里的时候,就不要滑到最后了;
console.log(11111);
      this.$nextTick(this.resetTop);
      return this.$store.getters["message/currentConversition"];
    }
  }
};
</script>

<style scoped lang="less">
.talkingList {
  padding: 10px 5px;
  box-sizing: border-box;
  .getHistoryMessage {
    height: 20px;
    display: flex;
    align-items: center;
    .line {
      flex: 1;
      height: 1px;
      background: #ccc;
    }
    .clickWord {
      font-size: 10px;
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .wrapper {
    padding: 5px 0;
    &::after {
      clear: both;
      content: "";
      display: block;
    }
    .speaker {
      width: 80%;
      float: right;
      display: flex;
      .message {
        padding-right: 10px;
        flex: 1;
        // display: flex;
        flex-direction: column;
        // position: relative;
        // top: -5px;

        .user {
          text-align: right;
          font-size: 12px;
          display: block;
          position: relative;
          top: -5px;
        }
        .contentImg {
          float: right;
          img {
            max-width: 300px;
          }
        }
        .contentFile {
          float: right;

          // a {
          //   span {
          //     display: inline-block;
          //     width: 100px;
          //     height: 100px;
          //   }
          // }
        }
        .content {
          word-break: break-word;
          font-size: 14px;
          text-align: right;
          padding: 6px 5px;
          background: #4dd52b;
          border-radius: 2px;

          float: right;
          position: relative;
          &::after {
            position: absolute;
            right: -2.5px;
            top: 15px;
            height: 5px;
            width: 5px;
            background: rgb(77, 213, 43);
            content: "";
            transform: translateY(-50%) rotate(50deg);
          }
          &:hover {
            background: #44bb5c;
          }
          &:hover::after {
            background: #44bb5c;
          }
        }
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
    .listener {
      width: 80%;
      float: left;
      display: flex;

      .message {
        position: relative;
        // top: -5px;
        padding-left: 10px;
        padding-top: 0;
        flex: 1;
        // display: flex;
        flex-direction: column;
        .user {
          font-size: 12px;
          display: block;
        }
        .contentImg {
          img {
            max-width: 300px;
          }
        }
        .contentFile {
          span {
            display: inline-block;
            width: 100px;
            height: 100px;
          }
        }
        .content {
          // margin-top: 5px;
          float: left;
          font-size: 14px;
          text-align: left;
          padding: 6px 5px;
          background: #fff !important;
          border-radius: 2px;
          border: 0.5px solid #fff;
          position: relative;
          word-break: break-word;
          &::after {
            position: absolute;
            left: -2.5px;
            top: 15px;
            height: 5px;
            width: 5px;
            background: #fff;
            content: "";
            border: 0.5px solid #fff;
            box-sizing: border-box;
            transform: translateY(-50%) rotate(50deg);
          }
          &:hover {
            background: #eee !important;
            border: 0.5px solid #ccc;
          }
          &:hover::after {
            background: #eee !important;
            border: 0.5px solid #ccc;
            border-top: 0.5px solid transparent;
            border-right: 0.5px solid transparent;
          }
        }
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
