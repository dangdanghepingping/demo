<template>
  <div class="searchComp">
    <div class="searchWrapper">
      <img src="@/assets/搜索.png" alt />
      <input
        type="text"
        placeholder="搜索"
        @focus="changeBackground(true)"
        @blur="changeBackground(false)"
      />
      <span v-show='show' class="icon iconfont icon-delete2"></span>
    </div>
    <div class="addwrapper">
      <span class="add">+</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      show: false,
      background: ""
    };
  },
  methods: {
    changeBackground(boolean) {
      if (boolean) {
        this.background = "#fff";
      }
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped lang="less">
// @import '@/assets/iconfont/iconfont.css';
.searchComp {
  // width: 250px;
  width: 100%;
  display: flex;
  @fontsize: 14px;
  @imgw: 12px;
  @bg: #ccc;
  @padding:5px;
  padding-bottom: 12px;
  .searchWrapper {
    display: flex;
    border-radius: 5px;
    background: @bg;
    width: 70%;
    margin-left:  @fontsize;
    box-sizing: border-box;
    padding: @padding;
    overflow: hidden;
    flex: 1;

    img {
      width: @imgw;
      height: @imgw;
      margin-top: 1px;
      margin-left: 2px;
      // float: left;
      vertical-align: middle;
    }
    input {
      // float: left;
      width: 50%;
      background: transparent;
      height: @fontsize;
      font-size: @imgw;
      padding-left: 6px;
      flex: 1;
    }
    .icon-delete2{
      width: @imgw;
      height: @imgw;
      font-size: 10px;
      display: inline-block;
      border-radius: 50%;
      background: #bbb;
      text-align: center;
      line-height: 12px;
    }
  }
  .addwrapper {
    border-radius: 5px;
    background: @bg;
    margin: 0 15px;
    width: 15px;
    height: @fontsize;
    font-size: @imgw;
    padding: @padding;
    text-align: center;
    line-height: 14px;
    .add {
      display: inline-block;
      width: @imgw;
      height: 100%;
      font-size: 14px;
      font-weight: bold;
      line-height: 10px;
      text-align: center;
    }
  }
}
</style>
