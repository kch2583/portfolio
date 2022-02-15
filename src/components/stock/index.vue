<template>
  <div>
    <v-container grid-list-xs>
      <v-row>
        <v-col>
          <v-btn color="success" @click="getList()"> 공시검색 </v-btn>
        </v-col>
        <v-col> <v-btn color="success"> 기업개황 </v-btn> </v-col>

        <v-col>
          <v-btn color="success"> 공시서류 원본파일 </v-btn>
        </v-col>
        <v-col>
          <v-btn color="error" @click="getDocument()"> 고유번호 </v-btn>
        </v-col>

        <v-col> <v-btn color="success"> 증자(감자)현황 </v-btn> </v-col>
        <v-col>
          <v-btn color="success" @click="getfnlttSinlgAcnt()"
            >단일회사 주요계정
          </v-btn>
        </v-col>
        <v-col> <v-btn color="success">다중회사 주요계정 </v-btn> </v-col>
        <v-col> <v-btn color="success">단일회사 전체 재무제표 </v-btn> </v-col>
        <v-col>
          <v-btn color="success">XBRL 택사노미재무제표양식</v-btn>
        </v-col>
        <v-col> <v-btn color="success">재무제표 원본파일(XBRL) </v-btn> </v-col>

        <v-col> {{ stocks }}</v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      stocks: {},
    };
  },
  methods: {
    getList() {
      this.$http.get("/api/stock/list").then((response) => {
        this.stocks = response.data;
      });
    },
    getfnlttSinlgAcnt() {
      this.$http.get("/api/stock/fnlttSinglAcnt").then((response) => {
        this.stocks = response.data;
      });
    },
    getDocument() {
      this.$http.get("/api/stock/document").then((response) => {
        // var xml = response.data;
        // var json = convert.xml2json(xml, { compact: true });
        // this.stocks = JSON.parse(json);
        console.log("hi");
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
