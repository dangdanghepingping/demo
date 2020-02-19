<template>
  <div class="rigisertwq">
    <input type="file" ref="input" download @change="change" />
    <img :src="href">
    <a :href="href" :download="name">下载</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      href: "#",
      name:''
    };
  },
  methods: {
    async change() {
      const file = this.$refs.input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const data = await this.http.postFile(formData);
      this.name = data.data.originalname
      this.href = "/api/getFile?path=" + data.data.destination + data.data.filename;
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped lang="less">
</style>
