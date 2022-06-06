<template>
  <v-app id="app">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
@font-face {
  font-family: "BMJUA";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Mongdol";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mongdol.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: "BMJUA" !important;
  * {
    font-family: "BMJUA" !important;
  }
}

$body-font-family: "BMJUA" !important;
$heading-font-family: "BMJUA" !important;
</style>
