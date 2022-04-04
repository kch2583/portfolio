<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" rounded="pill" vertical>{{
      text
    }}</v-snackbar>
    <v-row>
      <v-col>
        <v-card>
          <v-form ref="mealForm" @submit.prevent="saveMeal">
            <v-card-title> 오늘의 식단 </v-card-title>
            <v-row>
              <v-col cols="6">
                <v-card-text>
                  <v-date-picker
                    v-model="date"
                    class="mt-4 rounded-xl"
                    full-width
                    :max="new Date().toISOString().slice(0, 10)"
                    elevation="3"
                    scrollable
                    :events="dietEvents"
                    event-color="blue"
                  ></v-date-picker>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <v-chip-group
                    column
                    active-class="primary--text"
                    v-model="selection"
                  >
                    <v-chip
                      v-for="meal in meals"
                      :key="meal"
                      :value="meal"
                      aria-required="true"
                    >
                      {{ meal }}
                    </v-chip>
                  </v-chip-group>

                  <v-file-input
                    label="이미지 파일 찾기"
                    accept="image/*"
                    filled
                    prepend-icon="mdi-camera"
                    v-model="currentImage"
                    required
                    rounded
                  ></v-file-input>
                  <v-img
                    aspect-ratio="1"
                    :src="previewImage"
                    class="rounded-xl"
                    position="center center"
                  >
                    <v-fade-transition>
                      <v-row
                        v-show="loading"
                        class="fill-height ma-0 grey lighten-2"
                        align="center"
                        justify="center"
                      >
                        <p>이미지 미리보기</p>
                      </v-row>
                    </v-fade-transition>
                  </v-img>
                  <v-textarea
                    color="black"
                    label="식단 메모"
                    rows="6"
                    no-resize
                    background-color="amber lighten-4"
                    rounded
                    :value="memo"
                  >
                  </v-textarea>
                  <v-btn type="submit" @click="saveMeal()" rounded block>
                    저장하기
                  </v-btn>
                </v-card-text>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    currentImage: undefined,
    previewImage: undefined,
    data: [],
    dietEvents: ["22.03.02"],
    date: new Date().toISOString().slice(0, 10),
    meals: ["아침", "아점", "점심", "점저", "저녁", "야식", "간식", "보충제"],
    memo: "",
    selection: "",
    loading: true,
    snackbar: false,
    text: "My timeout is set to 2000.",
    timeout: 2000,
  }),
  created() {
    this.showMeal();
  },
  watch: {
    currentImage: function () {
      this.preview_image();
    },
  },
  methods: {
    preview_image() {
      if (!this.currentImage) {
        this.loading = !this.loading;
        return (this.previewImage = undefined);
      }
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.loading = !this.loading;
    },
    saveMeal() {
      if (!this.selection) {
        this.snackbar = true;
        this.text = "무슨 식사였는지 선택해주세요.";
        return;
      }
      if (!this.currentImage) {
        this.snackbar = true;
        this.text = "식사 이미지를 선택해주세요.";
        return;
      }

      this.$http
        .post("/api/health/saveMeal", {
          date: this.date,
          meal: this.selection,
          image: this.currentImage,
          memo: this.memo,
        })
        .then((response) => {
          this.$refs.mealForm.reset();
        });
    },
    showMeal() {
      // this.$http.get("/api/health/meal").then((response) => {
      //   this.data = response.data;
      // });
    },
  },
};
</script>
<style lang=""></style>
