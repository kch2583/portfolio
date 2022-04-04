<template>
  <v-container>
    <v-alert type="success" :value="alert">성공적으로 저장했습니다.</v-alert>
    <v-row>
      <v-col cols="12" md="8">
        <canvas ref="lineChart" id="canvas" />
      </v-col>
      <v-col cols="12" md="4">
        <v-form ref="form" lazy-validation>
          <v-card>
            <v-card-title> 몸무게 입력 </v-card-title>
            <v-card-text>
              <v-date-picker
                full-width
                v-model="date"
                class="mt-4 rounded-xl"
                :max="new Date().toISOString().slice(0, 10)"
                elevation="3"
                scrollable
                :events="arrayEvents"
                event-color="green lighten-1"
              ></v-date-picker>
              <v-text-field
                v-model="weight"
                hide-details
                single-line
                type="number"
                hide-spin-buttons
                oninput="javascript: this.value = this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' ); "
                :rules="[(v) => !!v]"
                required
              />
              <v-card-text>
                <v-btn type="submit" @click="saveWeight"> submit </v-btn>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
let chart;
export default {
  data: () => ({
    alert: false,
    weightArray: [],
    arrayEvents: [],
    date: new Date().toISOString().slice(0, 10),
    weight: null,
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "몸무게",
          data: [],
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 3,
        },
      ],
    },
    options: {},
  }),
  watch: {
    alert: function () {
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
  },
  mounted() {
    this.bodyWeight();
    this.createChart();
  },
  methods: {
    createChart() {
      if (chart !== undefined) {
        chart.destroy();
      }
      chart = new Chart(this.$refs.lineChart, {
        type: "line",
        data: this.data,
        options: this.options,
      });
      chart.update();
    },
    bodyWeight() {
      this.$http.get("/api/health/BodyWeight").then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          // this.data.labels.push(this.weightArray[index].date);
          this.arrayEvents.push(response.data[index].date.slice(0, 10));
          this.data["datasets"][0].data.push({
            x: response.data[index].date.slice(0, 10),
            y: response.data[index].weight,
          });
          // this.data["datasets"][0].data.push(this.weightArray[index].weight);
        }
        this.data["datasets"][0].data.sort(
          (a, b) => new Date(a.x) - new Date(b.x)
        );
        chart.update();
        return this.data;
        // this.weightArray.sort((a, b) => new Date(a.date) - new Date(b.date));
        // return this.weightArray;
      });
    },
    saveWeight() {
      const validate = this.$refs.form.validate();
      if (validate) {
        this.$http
          .post("/api/health/saveBodyWeight", {
            date: this.date,
            weight: parseFloat(this.weight),
          })
          .then((response) => {
            this.alert = true;
            this.data["datasets"][0].data.push({
              x: this.date.slice(0, 10),
              y: parseFloat(this.weight),
            });
            this.data["datasets"][0].data.sort(
              (a, b) => new Date(a.x) - new Date(b.x)
            );
          });

        this.$refs.form.reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
