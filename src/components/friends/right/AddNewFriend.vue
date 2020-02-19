<template>
  <div class="addNewFriend">
    <div class="wrapper">
      <div class="grid">
        <div class="left">
          <p>神州号</p>
          <p>留言</p>
        </div>
        <div class="right">
          <p>
            <input type="text" v-model="wxId" placeholder="请输入神州号" />
          </p>
          <p>
            <textarea v-model="words"></textarea>
          </p>
        </div>
      </div>
      <button @click="addNewFriend">加为好友</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  props: {},
  data() {
    return {
      wxId: "",
      words: ""
    };
  },
  computed: {
    ...mapState("regist_login", ["currentSpeaker"])
  },
  methods: {
    isFriend(friendWxId) {
      this.http.isFriend(friendWxId);
    },
    async addNewFriend() {
      const wxId = this.wxId.trim();
      const words = this.words;
      if (wxId == this.currentSpeaker.wxId) {
        return this.$message({
          message: "请不要输入自己的微信号",
          type: "err"
        });
      }

      const flag = await this.http.isFriend(wxId);
      if (flag.data) {
        return this.$message({
          message: "你和" + wxId + "已经是好友了, 请勿重复添加",
          type: "err"
        });
      }
      socket.emit("makeFriend", {
        wxId: this.currentSpeaker.wxId,
        friendWxId: wxId,
        words
      });
      socket.on("sendErrWxId", data => {
        this.$message({ type: "err", message: data });
      });
    }
  },

  watch: {}
};
</script>

<style scoped lang="less">
.addNewFriend {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .wrapper {
    width: 500px;
    height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    .grid {
      display: flex;
      height: 200px;
      width: 100%;
      .left {
        text-align: right;
        line-height: 80px;
        width: 150px;
        background: #eee !important;
        display: flex;
        flex-direction: column;

        p:nth-of-type(1) {
          flex: 1;
          margin-bottom: 5px;
        }
        p:nth-of-type(2) {
          flex: 3;
          margin-top: 5px;
          letter-spacing: 6px;
        }
      }
      .right {
        text-align: center;
        line-height: 80px;
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        p:nth-of-type(1) {
          flex: 1;
          margin-bottom: 5px;
          input {
            height: 50%;
            width: 100%;
            padding: 0 10px;
            letter-spacing: 2px;
          }
        }
        p:nth-of-type(2) {
          flex: 3;
          margin-top: 5px;
          padding: 20px 0;
          box-sizing: border-box;
          textarea {
            font-size: 14px;
            line-height: 25px;
            padding: 10px;
            height: 60%;
            width: 100%;
            background: #fff !important;
            outline: none;
            border: none;
            max-width: 100%;
            min-width: 100%;
            min-height: 60%;
            max-height: 60%;
          }
        }
      }
    }
    button {
      margin-top: 30px;
      width: 150px;
      padding: 15px;
      background: #cccccc !important;
      border-radius: 5px;
      outline: none;
      border: none;
      &:hover {
        background: #4dd52b !important;
      }
    }
  }
}
</style>
