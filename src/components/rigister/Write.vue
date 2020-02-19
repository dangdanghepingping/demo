<template>
  <div class="write flex flex_col fontSize_13">
    <div class="content flex">
      <div class="left flex flex_al_center flex_ju_aroud">{{item}}</div>
      <div class="right flex_1 flex flex_col flex_al_left flex_ju_aroud">
        <input :type="inputType" :placeholder="placeholder" @input="setpro" v-model="profile" />
      </div>
    </div>
    <div class="err fontSize_10 flex flex_ju_aroud" v-show="errorShow">{{errMsg}}</div>
  </div>
</template>

<script>
export default {
  props: {
    inputType: {
      default: "text",
      type: String
    },
    errorShow: {
      type: Boolean,
      default: false
    },
    item: String,
    placeholder: String,
    errMsg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      profile: ""
    };
  },
  methods: {
    setpro() {//防抖
     clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit("setProfiles", this.profile);
      }, 500);
    }
  }
};
</script>

<style scoped lang="less">
.write {
  height: 10vh;
  width: 90%;
  // background: yellow;
  .content {
    height: 7vh;

    .left {
      width: 30%;
      text-align: center !important;
    }
    .right {
      input {
        height: 70%;
        width:100%;
        border-radius: 3px;
        padding: 2px 10px;
      }
    }
  }
  .err {
    color: red;
  }
}
</style>
