<template>
  <div class="friends"></div>
</template>

<script>
// import Search from "@/components/friends/Search.vue";
// import FriendsFrame from "@/components/friends/FriendsFrame.vue";
//可以共同的样式;可以写一个共同的style样式引用他们
export default {
  components: {
    Search:()=> import('@/components/friends/Search.vue'),
    FriendsFrame:()=> import('@/components/friends/FriendsFrame.vue'),
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {}
};
</script>

<style scoped lang="less">
</style>

