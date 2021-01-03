<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      num: 6,
    };
  },
  methods: {
    addNum() {
      this.num++;
      console.log("出发了+");
    },
    decNum() {
      this.num--;
      console.log("出发了-");
    },
  },
};
</script>
<style lang="less">
</style>
