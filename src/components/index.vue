<template>
  <v-container fluid>
    <v-row style="background: #654ed9; color: white" :height="windowSize.y">
      <v-app-bar flat color="#654ed9">
        <v-app-bar-title>KCH</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-tab>Item One</v-tab>
        <v-tab>Item Two</v-tab>
        <v-tab>Item Three</v-tab>
      </v-app-bar>

      <v-col cols="12" align="center" justify-center class="pa-8">
        <p>김찬희 안녕하세요 {{ windowSize.y }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-card>
          <v-img src="../assets/sample1.jpg" contain> </v-img>
          <v-card-title> 프로젝트 1 </v-card-title>
          <v-card-text align="center">
            프로젝트 1에 대한 설명 주절주절</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-img src="../assets/sample1.jpg" contain> </v-img>
          <v-card-title> 프로젝트 1 </v-card-title>
          <v-card-text align="center">
            프로젝트 1에 대한 설명 주절주절</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-img src="../assets/sample1.jpg" contain> </v-img>
          <v-card-title> 프로젝트 1 </v-card-title>
          <v-card-text align="center">
            프로젝트 1에 대한 설명 주절주절</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-img src="../assets/sample1.jpg" contain> </v-img>
          <v-card-title> 프로젝트 1 </v-card-title>
          <v-card-text align="center">
            프로젝트 1에 대한 설명 주절주절</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center">
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
      <v-col cols="4"
        ><router-link :to="{ name: 'Health' }"
          ><v-btn color="success">Health</v-btn></router-link
        >
      </v-col>
      <v-col cols="4"
        ><router-link :to="{ name: 'Climbing' }"
          ><v-btn color="success">Climbing</v-btn></router-link
        >
      </v-col>
      <v-col cols="4"
        ><router-link :to="{ path: '/coding' }"
          ><v-btn color="success">Coding</v-btn></router-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>

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
};
</script>
