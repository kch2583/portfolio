<template>
  <v-container>
    <v-row>
      <v-col v-for="item in codingLists" :key="item.name">
        <router-link
          :to="{ path: `/coding/${item.name}` }"
          class="text-center black--text"
          style="text-decoration: none"
        >
          <v-hover v-slot="{ hover }">
            <v-img
              :src="getImageUrl(item.src)"
              :alt="item.name"
              aspect-ratio="1"
              class="rounded-circle"
              :class="
                ({ 'on-hover': hover }, hover ? 'elevation-24' : 'elevation-3')
              "
            ></v-img>
          </v-hover>
          <p>{{ item.name }}</p>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const codingListJson = require("../../assets/json/codingList.json");

export default {
  data: () => ({
    codingLists: codingListJson,
    // [
    //   {
    //     id: 0,
    //     name: "Mysql",
    //     src: require("@/assets/coding_images/mysql.png"),
    //   },
    //   {
    //     id: 1,
    //     name: "Vue",
    //     src: require("@/assets/coding_images/vuejs.jpeg"),
    //   },
    //   {
    //     id: 2,
    //     name: "Vuetify",
    //     src: require("@/assets/coding_images/vuetify.jpeg"),
    //   },
    //   {
    //     id: 3,
    //     name: "Node.js",
    //     src: require("@/assets/coding_images/nodejs.png"),
    //   },
    //   {
    //     id: 4,
    //     name: "Javascript",
    //     src: require("@/assets/coding_images/javascript.png"),
    //   },
    //   {
    //     id: 5,
    //     name: "Flutter",
    //     src: require("@/assets/coding_images/flutter.png"),
    //   },
    //   {
    //     id: 6,
    //     name: "Swift",
    //     src: require("@/assets/coding_images/swift.png"),
    //   },
    // ],
  }),
  methods: {
    getImageUrl(image) {
      return require("@/assets/coding_images/" + image);
    },
  },
};
</script>

<style></style>
