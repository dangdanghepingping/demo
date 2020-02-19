<template>
  <!-- 写消息区 -->
  <div class="writeZoon" :style="{background: style=='blur' ? '#eee' : 'white'}">
    <div class="cover" v-if="btnClicking" @mouseup="mouseup"></div>
    <!-- 表情区域 -->
    <div class="top_emoji_area">
      <span class="icon iconfont icon-smiling" @click.stop="emojiShow"></span>
      <span class="icon iconfont icon-wenjianjia" style="overflow:hidden;position:relative">
        <input
          ref="childFile"
          type="file"
          style="position:absolute;top:0;left:0; opacity:0"
          title="发送文件"
          @change="addFile"
        />
      </span>
      <span class="icon iconfont icon-jiandao"></span>
      <span class="icon iconfont icon-xiaoxi" @click="historyShow"></span>
    </div>
    <!-- 输入区域 -->
    <div class="bottom_write_area">
      <!-- <textarea rows="20"></textarea> -->
      <SliderFrame sliderWidth="6px">
        <TextAreaZoon @keydown.enter.native.prevent="send" :emoj="emojSrc" ref="child" :file="file"></TextAreaZoon>
      </SliderFrame>
      <button @mousedown="send" v-bind:style="{background:color}">发送(S)</button>
    </div>

    <!-- 悬浮区域 -->
    <div class="emojiBox" v-show="emoji" @click.stop="emojiShow">
      <div class="top">
        <EmojiFrame :emojiId="emojiId" @disppearEmoji="disppearEmoji"></EmojiFrame>
      </div>
      <div class="bottom">
        <span @click.stop="changePropsId(0)">表情</span>
        <span @click.stop="changePropsId(1)">自然</span>
        <span @click.stop="changePropsId(2)">物品</span>
        <span @click.stop="changePropsId(3)">地点</span>
        <span @click.stop="changePropsId(4)">符号</span>
      </div>
    </div>
    <!-- 历史记录 -->
    <div class="history" v-show="history">
      <HistoryMessage @cloth='historyShow' />
    </div>
  </div>
</template>
<script>
import getSocket from "../../../utils/ws";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      emoji: false,
      emojiId: undefined,
      color: "#eee",
      btnClicking: false,
      listernnerWxId: "",
      emojSrc: undefined,
      file: undefined,
      history: false
    };
  },
  components: {
    EmojiFrame: () => import("./EmojiFrame"),
    WriteFrame: () => import("./WriteFrame"),
    SliderFrame: () => import("@/components/SliderFrame.vue"),
    TextAreaZoon: () => import("./TextAreaZoon.vue"),
    HistoryMessage: () => import("./HistoryMessage.vue")
  },

  computed: {
    ...mapState("message", ["style", "writeMessage", "currentListener"]),
    ...mapState("regist_login", ["currentSpeaker"]),
    ...mapState("friend", ["friendsList"])
  },
  methods: {
    ...mapMutations("message", ["setWriteMessage"]),
    historyShow(){
this.history = !this.history;
    },
    addFile() {
      const file = this.$refs.childFile.files[0]; //这是真实文件
      console.log(file);
      //file必须得是实实在在的数据, 如果不是, 自己的页面没法赋制, 也没法发送给后台
      if (file) {
        this.file = {
          name: file.name,
          size: file.size,
          file: file
        };
      }
    },
    mouseup() {
      this.btnClicking = false;
    },
    sendMessageToFriend(wxId, message) {
      //单聊
      window.socket.emit("sendMessageToFriend", { wxId, message });
    },
    dealMessage(message) {
      var reg = /<div id="appendFile"[\w\W]+<\/div>/; //最多只有一个文件
      console.log(message);
      const match = message.match(reg);
      if (!match) {
        return message;
      }
      var arr = [];
      var temp_1 = message.substr(0, match.index);
      if (temp_1) {
        arr.push(temp_1);
      }
      var file = window.file;
      arr.push({ file });
      var temp_3 = message.substr(Number(match.index) + match[0].length);
      temp_3 = temp_3.replace(/<[\/]*span>/g, "");
      if (temp_3 && temp_3 !== "<br>") {
        arr.push(temp_3);
      }
      console.log(arr);
      return arr;
    },
    async send() {
      //这里处理带有标签的内容;
      let message =this.dealMessage(this.$refs.child.$refs.textarea.innerHTML) ;
      const wxId = this.currentListener.wxId;
      //1寻找到信息, 发送给后台
      //2把信息返回给前端
      if (Array.isArray(message)) {
        //表明里面有文件
        for (let i = 0; i < message.length; i++) {
          if (typeof message[i] == "object" && message[i].file) {
            const formData = new FormData();
            formData.append("file", this.file.file); //发送formData到后端
            const {
              data: { originalname, filename, destination, size }
            } = await this.http.postFile(formData);
            this.sendMessageToFriend(wxId, {
              fileFlag: true,
              originalname,
              filename,
              destination,
              size
            });
          } else {
            //当做字符串发送
            this.sendMessageToFriend(wxId, message[i]); //目前只是单聊. 群聊后加上必须用promise来接受id
          }
        }
        this.$refs.child.clearMessage(); //调用子组件的方法清空内容
      } else {
        if (message.trim()) {
          this.sendMessageToFriend(wxId, message); //目前只是单聊. 群聊后加上必须用promise来接受id
          this.$refs.child.clearMessage(); //调用子组件的方法清空内容
        } else {
          this.$message({ type: "err", message: "请不要发送空内容" });
        }
      }
    },
    disppearEmoji(src) {
      this.emojSrc = { src };
      this.emoji = false;
    },
    changePropsId(id) {
      if (id == this.emojiId) {
        return;
      } else {
        this.emojiId = id;
      }
    },
    emojiShow() {
      var that = this;
      this.emoji = true;
      this.emojiId = 0; //第一次默认显示0
      function emojiDisShow() {
        that.emoji = false;
        document.body.removeEventListener("click", emojiDisShow);
      }
      document.body.addEventListener("click", emojiDisShow);
    }
  },
  created() {
    localStorage.getItem("lastMessageArr")
      ? ""
      : localStorage.setItem("lastMessageArr", JSON.stringify([]));
  
  }
};
</script>

<style scoped lang="less">
.writeZoon {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  // overflow: hidden;
  padding: 0 20px;
  .cover {
    height: 100%;
    width: calc(100% + 40px);
    position: absolute;
    left: -20px;
    top: 0;
    background: yellow !important;
    opacity: 0.2;
    z-index: 10;
  }
  .top_emoji_area {
    padding: 5px;
    padding-bottom: 0;
    overflow: hidden;
    &:nth-child(1) {
      padding-left: 0;
    }

    span {
      margin-right: 10px;
      font-size: 20px;
      color: #666;
      font-weight: 500;
      float: left;
      width: 20px;
      height: 18px;
      &:hover {
        color: rgb(9, 148, 9);
      }
    }
    .icon-wenjianjia,
    .icon-jiandao {
      font-size: 18px;
    }
  }
  .bottom_write_area {
    flex: 1;
    padding-bottom: 38px;
    position: relative;
    box-sizing: border-box;
    button {
      position: absolute;
      bottom: 8px;
      right: 30px;
      background: #eee;
      padding: 4px 10px;
      font-size: 14px;
      &:hover {
        background: #33cc52 !important;
        cursor: pointer;
        border-color: #33cc52 !important;
      }
    }
  }
  .emojiBox {
    position: absolute;
    z-index: 10;
    width: 500px;
    height: 250px;
    padding-top: 10px;
    box-sizing: border-box;
    background: yellow !important;
    top: -245px;
    left: -100px;
    display: flex;
    flex-direction: column;
    .top {
      flex: 1;
    }
    .bottom {
      padding: 0 20px;
      height: 30px;
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        border: 1px solid #ddd;
        width: 35px;
        text-align: center;
        cursor: default;
      }
    }
  }
}
</style>
