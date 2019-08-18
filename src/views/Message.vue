<template>
  <div class="message">

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "message",
  components: {
    Search:()=> import('@/components/friends/Search.vue'),
    
  }
};
</script>
<style lang="less" scoped>



</style>


