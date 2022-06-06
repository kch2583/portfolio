<template></template>

<script>
export default {
  data: () => ({
    windowSize: { x: 0, y: 0, mx: 0, my: 0 },
  }),
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
  },
  mounted() {
    this.onResize();
  },
  watch: {
    windowSize: function () {
      this.onResize();
    },
  },
};
</script>

<style></style>
