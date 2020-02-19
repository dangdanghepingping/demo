<template>
  <div class="errToast" v-if="show">
    <div class="mask">
      <div class="contentBox">
        <h3 :style="{color:getColor()}">{{title}}</h3>
        <p :style="{color:getColor()}">{{text}}</p>
        <footer v-if="hasConfirmBtn">
          <button class="btn" @click="noShow">确定</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      //根据type类型,可以变换颜色
      validator: function(value) {
        return ["err", "default", "success", "warn"].indexOf(value) !== -1;
      }
    },
    show: Boolean,
    title: String,
    text: String,
    hasConfirmBtn: { type: Boolean, default: true }
  },
  data() {
    return {
      colorData: {
        err: "#FF0000",
        warn: "#FF9900",
        default: "white",
        success: "#33FF00"
      }
    };
  },
  methods: {
    getColor() {
      console.log(this.type);
      return this.colorData[this.type];
    },
    noShow() {
      this.$emit("dispair");
    }
  },
  mounted() {
    console.log(this.hasConfirmBtn);
  }
};
</script>

<style scoped lang="less">
.errToast {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .mask {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99;
    .contentBox {
      position: absolute;
      height: 30%;
      width: 30%;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      background: #ccc;
      display: flex;
      flex-direction: column;
      h3 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      p {
        flex: 1;
        text-align: center;
      }
      footer {
        position: absolute;
        bottom: 10px;
        height: 30px;
        width: 100%;

        .btn {
          position: absolute;
          right: 30px;
          padding: 10px 20px;
          background: #fff !important;
          color: #000;
          border-radius: 5px;
          letter-spacing: 3px;
          cursor: default;
          &:hover {
            background: #4dd52b !important;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
