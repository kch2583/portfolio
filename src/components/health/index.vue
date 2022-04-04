<template>
  <v-container>
    <!-- <weight /> -->
    <diet />
    <v-row> </v-row>
  </v-container>
</template>

<script>
import weight from "./weight.vue";
import diet from "./diet.vue";
export default {
  components: { weight, diet },

  data: () => ({}),
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
