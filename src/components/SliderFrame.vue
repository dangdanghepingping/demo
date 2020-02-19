<template>
  <div
    class="frFrame"
    @mouseenter="showBar"
    @mouseleave="disShowBar"
    @DOMMouseScroll="mouseWheel"
    @mousewheel="mouseWheel"
  >
    <div class="demo" ref="demo" :id="id" v-bind:style="{top: -demoTop + 'px'}">
      <keep-alive>
      <slot></slot>
      </keep-alive>
    </div>
    <div class="bar" ref="bar" :style="{width:sliderWidth}">
      <span
        class="dragPoint"
        :style="{ opacity:opacity, height: h + 'px', top: barTop + 'px' } "
        @mousedown="dragBar"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sliderWidth: {
      type: String,
      default: "10px"
    },
    setDemoTop: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    
  },
  data() {
    return {
      demoHeight: 0,
      barHeight: 0,
      h: 0,
      opacity: 0,
      barTop: 0,
      demoTop: 0
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
      }else{
        this.h = 0;
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
      this.setDemoTop ? (window.demoTop = this.demoTop) : "";
      this.moveBar(this.demoTop);
    },
    mouseWheel(e) {
      //1 让demo滚动起来 (每次假设20px)2 让bar滚动起来 bar的滚动位置和demo的滚动位置关联
      this.opacity = 1;
      const dt = e.detail ? -e.detail : e.wheelDelta;
      // var direction= e.detail && (e.detail > 0 ? "mousedown" : "mouseup");
      var step = dt > 0 ? -20 : 20;
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
    },
    moveToBottom() {
      this.moveDemo(0)
      this.showBar();
      setTimeout(() => {
        this.opacity = 0;
      }, 1000);
      if (this.h > 0) {
        this.demoTop = this.demoHeight - this.barHeight;
        window.demoTop = this.demoTop
        this.moveBar(this.demoTop);
      }
    }
  }
};
</script>

<style scoped lang="less">
.frFrame {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  .demo {
    position: absolute;
    width: 100%;

    // background: #eee;
    z-index: 0;
    // padding: 0 20px;
    box-sizing: border-box;
  }
  .bar {
    height: 100%;
    position: absolute;
    z-index: 1;
    right: 0;
    .dragPoint {
      position: absolute;
      width: 100%;
      // height: 20px;
      border-radius: 10px;
      background: #ccc;
    }
  }
}
</style>