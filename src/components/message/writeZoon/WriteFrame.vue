<template>
  <div class="wiriteFrame" @mouseenter="showBar" @mouseleave="disShowBar" @mousewheel="mouseWheel">
    <div class="demo" ref="demo" v-bind:style="{top: -demoTop + 'px'}">
     <TextAreaZoon></TextAreaZoon>
    </div>
    <div class="bar" ref="bar">
      <span
        class="dragPoint"
        v-bind:style="{ opacity:opacity, height: h + 'px', top: barTop + 'px' } "
        @mousedown="dragBar"
      ></span>
    </div>
  </div>
</template>

<script>
import TextAreaZoon from "./TextAreaZoon";
export default {
  data() {
    return {
      demoHeight: 0,
      barHeight: 0,
      h: 0,
      opacity: 0,
      barTop: 0,
      demoTop: 0,
     
    };
  },
  methods: {
    showBar() {
      this.opacity = 1;
      this.compH();
    },
    disShowBar() {
      this.opacity = 0;
    },
    compH() {
      this.demoHeight = this.$refs.demo.offsetHeight;
      this.barHeight = this.$refs.bar.offsetHeight;
      if (this.demoHeight > this.barHeight) {
        let h = (this.barHeight * this.barHeight) / this.demoHeight;
        this.h = h;
      }
    },
    moveBar(demoTop) {
      var temp1 = this.demoHeight - this.barHeight;
      var temp2 = this.barHeight - this.h;
      this.barTop = (temp2 * demoTop) / temp1;
    },
    moveDemo(step) {
      var demotop = this.demoTop;
      this.demoTop = demotop + step;
      if (this.demoTop > this.demoHeight - this.barHeight) {
        this.demoTop = this.demoHeight - this.barHeight;
      }
      if (this.demoTop < 0) {
        this.demoTop = 0;
      }
      this.moveBar(this.demoTop);
    },
    mouseWheel(e) {
      //1 让demo滚动起来 (每次假设20px)2 让bar滚动起来 bar的滚动位置和demo的滚动位置关联
      var step = e.wheelDelta > 0 ? -20 : 20;
      this.moveDemo(step);
    },
    dragBar(e) {
      this.opacity = 1;
      var comp = this;
      var y = e.clientY;
      var top = this.barTop;
      document.onmousemove = e1 => {
        var y1 = e1.clientY;
        var distance = y1 - y;
        var step =
          ((comp.demoHeight - comp.barHeight) / (comp.barHeight - comp.h)) *
          distance;
        comp.moveDemo(step);
        y = y1;
      };
      document.onmouseup = function(e2) {
        document.onmousemove = false;
        document.onmouseup = false;
      };
    }
  },
  components: {
    TextAreaZoon
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.wiriteFrame {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  // background: #ddd;
  .demo {
    position: absolute;
    width: 100%;
    // height: 1000px;
    z-index: 0;
    // background: red;
  }
  .bar {
    width: 7px;
    height: 100%;
    position: absolute;
    z-index: 1;
    right: 0;
    .dragPoint {
      position: absolute;
      width: 7px;
      height: 20px;
      border-radius: 10px;
      background: #aaa;
    }
  }
}
</style>
