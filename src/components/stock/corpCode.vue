<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> 단일회사 주요계정 조회하기 </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="getFnlttSinglAcnt">
              <v-select
                :items="yearList"
                placeholder="겁색할 연도를 선택해주세요"
                rounded
                filled
                v-model="selectedYear"
                :menu-props="{ rounded: 'xl', offsetY: true, bottom: true }"
              ></v-select>
              <v-autocomplete
                v-model="selectedCorp"
                placeholder="기업명을 검색해보세요"
                clearable
                filled
                rounded
                :menu-props="{ rounded: 'xl', offsetY: true, bottom: true }"
                :items="corpNameList"
                item-text="corp_name"
                item-value="corp_code"
              ></v-autocomplete>
              <v-select
                v-model="selectedReport"
                :items="reportList"
                item-text="report_name"
                item-value="report_code"
                placeholder="검색할 보고서 종류를 선택해주세요"
                rounded
                filled
                :menu-props="{ rounded: 'xl', offsetY: true, bottom: true }"
              ></v-select>
              <v-btn
                rounded
                block
                x-large
                type="submit"
                @click="getFnlttSinglAcnt()"
              >
                검색하기</v-btn
              >
            </v-form>
          </v-card-text>
          <v-card-text>
            {{ result }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    endYear: 2015,
    currentYear: new Date().getFullYear(),
    yearList: [],
    corpNameList: [],
    reportList: [
      { report_name: "사업보고서", report_code: "11011" },
      { report_name: "반기보고서", report_code: "11012" },
      { report_name: "1분기보고서", report_code: "11013" },
      { report_name: "3분기보고서", report_code: "11014" },
    ],
    selectedYear: null,
    selectedCorp: null,
    selectedReport: null,
    result: [],
  }),
  mounted() {
    this.calYearList();
    this.getCorpNameList();
  },
  methods: {
    calYearList() {
      for (let i = 0; i < this.currentYear - this.endYear + 1; i++) {
        this.yearList.push((this.endYear + i).toString());
      }
    },
    getCorpNameList() {
      this.$http.get("/api/stock/getCorpNameList").then((response) => {
        this.corpNameList = response.data;
      });
    },
    getFnlttSinglAcnt() {
      this.$http
        .post("/api/stock/getFnlttSinglAcnt", {
          corp_code: this.selectedCorp,
          bsns_year: this.selectedYear,
          reprt_code: this.selectedReport,
        })
        .then((response) => {
          this.result = response.data;
        });
    },
  },
};
</script>

<style></style>
