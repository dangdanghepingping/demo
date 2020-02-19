<template>
  <!-- 头像上传组件 -->
  <div class="uploadImg">
    <div class="avatar flexCenter marginTopLi">
      <span class="fileinput-button">
        <span v-if="!currentSpeaker.avatarUrl">
          <p>头像</p>
          <sub>(小于1M)</sub>
        </span>
        <img
          :src="currentSpeaker.avatarUrl ? '/api'+currentSpeaker.avatarUrl : avatarDefaultSrc"
          ref="avatarImg"
        />
        <input @change="sendImg($event.target.files[0])" type="file" />
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    avatarDefaultSrc: String
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapState("regist_login", ["currentSpeaker"])
  },
  mounted() {//为了防止用户刷新,在mounted回调里再次执行
    this.setImgWidthAndHeigh();
  },

  methods: {
    ...mapActions("regist_login", ["sendAvatar"]),
    getSrc() {
      console.log(this.avatarDefaultSrc);
      return this.avatarDefaultSrc;
    },
    setImgWidthAndHeigh() {
      this.$refs.avatarImg.onload = () => {
        var height = this.$refs.avatarImg.height,
          width = this.$refs.avatarImg.width;
        if (width > height) {
          this.$refs.avatarImg.style.height = "100%";
          this.$refs.avatarImg.style.width = "auto";
        } else {
          this.$refs.avatarImg.style.width = "100%";
          this.$refs.avatarImg.style.height = "auto";
        }
      };
    },
    sendImg(file) {
      if (file.size > 1048576) {
        //小于1M
        alert("照片应该小于1M");
        return;
      } else if (!/^image/.test(file.type)) {
        alert("请上传图片文件");
        return;
      } else {
        this.sendAvatar(file); //发送头像图片到后端
        this.setImgWidthAndHeigh();//设置头像宽长
      }
    }
  }
};
</script>

<style scoped lang="less">
.cover {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: #666;
  z-index: 100;
}
.avatar {
  @height: 12vh;
  .fileinput-button {
    position: relative;
    display: inline-block;
    height: @height;
    width: @height;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #ccc;
    // background: url("~@/assets/default_avatar.jpg");
    background-size: 100% 100%;

    span {
      position: absolute;
      width: 100%;
      height: @height;
      text-align: center;
      p {
        font-size: 14px;
        margin-top: 30%;
      }
      sub {
        font-size: 10px;
      }
    }
    input {
      position: absolute;
      display: line-block;
      width: 100%;
      height: @height;
      left: 0px;
      top: 0px;
      opacity: 0;
      border-radius: 50%;
    }
    img {
      display: inline-block;
    }
  }
}
</style>
