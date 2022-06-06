<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-chip-group
          multiple
          column
          active-class="deep-purple--text text--accent-4"
        >
          <v-chip>전체보기</v-chip>
          <v-chip v-for="item in codingList" :key="item.id">
            {{ item.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="12">
        <v-text-field
          required
          hide-details
          single-line
          filled
          rounded
          prepend-inner-icon="mdi-magnify"
          clear-icon="mdi-close"
          clearable
        ></v-text-field>
      </v-col>
      <v-card flat to="/" style="text-decoration: none" class="black--text">
        <v-divider></v-divider>
        <div v-for="i in 9" :key="i">
          <v-col cols="12">
            <v-hover v-slot="{ hover }">
              <v-list-item
                three-line
                :class="({ 'on-hover': hover }, hover ? 'blue--text' : '')"
              >
                <v-list-item-content>
                  <v-list-item-title>이거 어떻게 하는건가요?</v-list-item-title>
                  <v-list-item-subtitle>
                    Secondary line text Lorem ipsum dolor siㄹㄴ랴ㅐ ㅈㄷ러
                    재ㅑㄷ러 재ㅑ러 ㅐijfw oiefjl ;kfj owief j;oeifj ;wEifj
                    ;oWifj wlkefj t amet,
                  </v-list-item-subtitle>

                  <v-list-item-subtitle>
                    2022-04-03 | 조회수 : 390
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar tile size="100">
                  <v-img
                    :src="require('@/assets/coding_images/swift.png')"
                    aspect-ratio="1"
                    class="rounded-xl"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-hover>
          </v-col>

          <v-divider></v-divider>
        </div>
      </v-card>

      <v-col cols="12">
        <v-pagination v-model="page" :length="6" circle></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const codingListJson = require("../../assets/json/codingList.json");

export default {
  data() {
    return {
      page: 1,
      codingList: codingListJson,
    };
  },
};
</script>

<style></style>
