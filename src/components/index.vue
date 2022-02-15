<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="display-1 font-weight-bold">CH</div>
      </v-col>
      <v-col cols="4"
        ><router-link :to="{ name: 'Stock' }"
          ><v-btn color="success">Stock</v-btn></router-link
        >
      </v-col>
      <v-col cols="4"
        ><router-link :to="{ name: 'p5' }"
          ><v-btn color="success">p5.js</v-btn></router-link
        >
      </v-col>

      <v-col cols="4"><v-btn color="success">Health</v-btn> </v-col>
      <v-col cols="4"><v-btn color="success">Health</v-btn> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>
