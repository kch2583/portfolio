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
                    :event-color="getEventColor"
                  ></v-date-picker>
                </v-card-text>

                <v-card-text>
                  <v-row>
                    <v-col
                      cols="4"
                      class="d-flex child-flex"
                      v-for="(src, index) in images"
                      :key="index"
                    >
                      <v-img
                        :src="src[0]"
                        aspect-ratio="1"
                        class="rounded-xl"
                        width="100px"
                      ></v-img>
                    </v-col>
                  </v-row>
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
                    name="memo"
                    v-model="memo"
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
    dietEvents: {},
    date: new Date().toISOString().slice(0, 10),
    meals: ["아침", "아점", "점심", "점저", "저녁", "야식", "간식", "보충제"],
    memo: "",
    selection: "",
    loading: true,
    snackbar: false,
    text: "My timeout is set to 2000.",
    timeout: 2000,
    colors: {
      아침: "#f54c4c",
      아점: "#f7a960",
      점심: "#f7eb60",
      점저: "#4e8dcc",
      저녁: "#534bbd",
      야식: "#252126",
      간식: "#6dcc4e",
      보충제: "#c2c2cc",
    },
    images: [],
  }),
  created() {
    this.showMealEvent();
  },
  watch: {
    currentImage: function () {
      this.preview_image();
    },
    date: function () {
      this.showMealImages();
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
    getEventColor(meal) {
      return colors[meal];
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
      var formData = new FormData();
      formData.append("date", this.date);
      formData.append("meal", this.selection);
      formData.append("image", this.currentImage);
      formData.append("memo", this.memo);

      this.$http
        .post("/api/health/saveMeal", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$refs.mealForm.reset();
        });
    },
    showMealEvent() {
      this.$http.get("/api/health/showMealEvent").then((response) => {
        // this.dietEvents = response.data.date;
        for (let index = 0; index < response.data.date.length; index++) {
          var mealArr = Object.keys(response.data.result[index]); // 한 날짜의 식단 종류
          var resultColors = [];
          mealArr.forEach((meal) => {
            resultColors.push(this.colors[meal]);
          });
          this.dietEvents[response.data.date[index]] = resultColors;
        }
        this.data = response.data.result;
      });
    },
    showMealImages() {
      this.$http
        .post("/api/health/showMealImages", { selectedDate: this.date })
        .then((response) => {
          this.images = response.data;
          console.log(response.data);
        });
    },
  },
};
</script>
<style lang="css">
.v-date-picker-table__events div {
  margin: 1px;
  height: 5px;
  width: 5px;
}
</style>
