<template>
  <div class="avatar">
    <img :src='asrc' alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      asrc: require('../assets/avatar.jpg') //此处注意: 将assets里的资源视为模块,必须用require引入
    }
  },
  methods: {

  },
}
</script>

<style scoped lang="less">
.avatar{
  img{
    height: 35px;
    width:35px;
  }
}

</style>
