<template>
  <div class="avatar" :style='{height:size,width:size}'>
    <img :src="imgSrc" :style='{height:size,width:size}' alt />
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:{
    imgSrc:String,
    size:{
      default: '40px',
      type:String
    }
  },

  data() {
    return {
     
    };
  },

};
</script>

<style scoped lang="less">

</style>
