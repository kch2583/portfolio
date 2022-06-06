<template>
  <v-container
    fluid
    pa-0
    :style="$vuetify.breakpoint.smAndDown ? '' : 'height:100%'"
  >
    <v-row
      hide-details
      justify="end"
      :style="$vuetify.breakpoint.smAndDown ? '' : 'height:100%;'"
    >
      <v-col
        cols="12"
        md="4"
        id="left-main-col"
        class="d-inline-flex justify-center align-center"
        :style="
          $vuetify.breakpoint.smAndDown
            ? 'height: 400px'
            : 'height:100%;position:fixed; top:0;right:0;left:0'
        "
      >
        <p class="text-center white--text text-h4">
          안녕하세sdkfjslk djflsdkfj lsksdfs dlfkjeowifjwo eifj wefij wpefi jwpe
          요
          <v-btn icon :to="{ path: '/coding/create_post' }">
            <v-icon>mdi-pencil-plus-outline</v-icon></v-btn
          >
        </p>
      </v-col>

      <v-col cols="12" md="8">
        <v-container>
          <v-row>
            <v-col cols="12">
              <router-view></router-view>
            </v-col>
            <v-col cols="12">
              <!-- <codingList />
              <postToTalTable /> -->
              <router-view name="second"></router-view>
            </v-col>
          </v-row>
        </v-container>
        <router-link :to="{ path: '/coding' }"
          ><v-btn color="success">Coding</v-btn></router-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import codingList from "./codingList.vue";
import postToTalTable from "./postTotalTable.vue";
export default {
  components: {
    codingList,
    postToTalTable,
  },
};
</script>

<style>
#left-main-col {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(55, 55, 135, 1) 40%,
    rgba(235, 133, 153, 1) 100%
  );

  /* height: 100%; */
}
</style>
>
