<template>
  <div class="shade">
    <div class="mian">
      <div class="content" :style="{background:getColor()}">
        <span :style="{color:type == 'default'? 'black' : 'white'}">{{ message }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "alert",
  data() {
    color: return {
      message: "this a alert",
      type: "default",
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
      return this.colorData[this.type];
    }
  }
};
</script>

<style scoped>
.shade {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shade .mian {
  width: 50%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}

.shade .mian .content {
  padding: 20px 30px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
</style>

