<template>
  <div>
    <!-- // stock 메인 화면 이미지 -->
    <v-container fluid fill-height>
      <v-row>
        <v-img
          :src="require('/src/assets/stock_images/stock-g039ad4bb1_1920.jpg')"
          :height="windowSize.y"
        >
          <v-container fill-height>
            <v-row align="center" justify="center">
              <p class="white--text text-center text-h1">Stock Analysis Page</p>
            </v-row>
          </v-container>
        </v-img>
      </v-row>
    </v-container>
    <stockDataTable />
    <v-container>
      1mEyUz08F8OrQ5DLaOszo_MtOjhwo_jxBGzZDH0-g_DM
      1mEyUz08F8OrQ5DLaOszo_MtOjhwo_jxBGzZDH0-g_DM
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
          <v-btn color="success" @click="saveFnlttSinlgAcnt()"
            >단일회사 주요계정
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="success" @click="getfnlttSinlgAcntFirebase()"
            >22222단일회사 주요계정22222
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="success" @click="readMongodb()">몽고디비 읽기 </v-btn>
        </v-col>
        <v-col> <v-btn color="success">다중회사 주요계정 </v-btn> </v-col>

        <v-col>
          <v-btn color="success" @click="getfnlttSinlgAcntAll()"
            >단일회사 전체 재무제표
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="success">XBRL 택사노미재무제표양식</v-btn>
        </v-col>
        <v-col> <v-btn color="success">재무제표 원본파일(XBRL) </v-btn> </v-col>

        <v-col> {{ stocks }}</v-col>
      </v-row>

      <!-- 다이얼로그 임시 -->
      <v-row>
        <v-col cols="12"> 임시 기업 평가 페이지 </v-col>
        <v-col>
          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                  Click Me
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Privacy Policy
                </v-card-title>

                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    I accept
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <th>목록</th>
                <th>정보</th>
              </thead>
              <!-- <tbody v-for="([key, value], i) of fnlData" :key="i">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tbody> -->
              <v-divider></v-divider>
            </template>
          </v-simple-table>
        </v-col>
        <v-col>
          자기자본비율 :
          {{ equityRatio }} ->

          <v-icon
            :color="
              equityRatio > 55 ? 'green' : equityRatio > 45 ? 'yellow' : 'red'
            "
          >
            {{
              equityRatio > 55
                ? "mdi-emoticon-happy"
                : equityRatio > 45
                ? "mdi-emoticon-neutral"
                : "mdi-emoticon-angry"
            }}
          </v-icon>
        </v-col>
        <v-col>
          부채비율 : {{ debtRatio }} ->
          <v-icon
            :color="
              debtRatio < 100 ? 'green' : debtRatio < 150 ? 'yellow' : 'red'
            "
          >
            {{
              100 > debtRatio
                ? "mdi-emoticon-happy"
                : 150 > debtRatio
                ? "mdi-emoticon-neutral"
                : "mdi-emoticon-angry"
            }}
          </v-icon></v-col
        >
        <v-col
          >영업이익 : {{ operatingIncome.toLocaleString("ko-KR") }} ->

          <v-icon :color="operatingIncome > 0 ? 'green' : 'red'">
            {{
              operatingIncome > 0 ? "mdi-emoticon-happy" : "mdi-emoticon-angry"
            }}
          </v-icon>
        </v-col>
        <v-col v-if="operatingIncome">
          영업이익, 당기순이익 차이
          {{ (operatingIncome - netIncome).toLocaleString("ko-KR") }}

          <v-icon :color="operatingIncome > netIncome ? 'yellow' : 'red'">
            {{
              operatingIncome > netIncome
                ? "mdi-emoticon-neutral"
                : "mdi-emoticon-angry"
            }}
          </v-icon></v-col
        >
        <v-col>
          {{ fnlData }}
        </v-col>
      </v-row>
      <!-- <corpCode /> -->
    </v-container>
  </div>
</template>

<script>
import corpCode from "./corpCode.vue";
import stockDataTable from "./stockDataTable.vue";
export default {
  components: {
    corpCode,
    stockDataTable,
  },
  mounted() {
    this.onResize();

    // this.$http.get("/api/stock").then((response) => {
    //   this.fnlData = Object.entries(response.data[0]);
    //   this.fnlData = response.data[0];
    //   this.equityRatio = (
    //     (parseInt(this.fnlData.total_stockholders_equity.replace(/\,/g, "")) /
    //       parseInt(this.fnlData.total_assets.replace(/\,/g, ""))) *
    //     100
    //   ).toFixed(2);
    //   this.debtRatio = (
    //     (parseInt(this.fnlData.total_liabilities.replace(/\,/g, "")) /
    //       parseInt(this.fnlData.total_stockholders_equity.replace(/\,/g, ""))) *
    //     100
    //   ).toFixed(2);
    //   this.operatingIncome = parseInt(
    //     this.fnlData.operating_income.replace(/\,/g, "")
    //   );
    //   this.netIncome = parseInt(this.fnlData.net_income.replace(/\,/g, ""));

    // for (let index = 0; index < this.fnlData.length; index++) {
    //   this.lists.push(response.data[index].list);
    // }
    // });
  },
  data() {
    return {
      windowSize: { x: 0, y: 0, mx: 0, my: 0 },
      netIncome: 0,
      operatingIncome: 0,
      debtRatio: 0,
      equityRatio: 0,
      result: {},
      stocks: {},
      dialog: false,
      fnlData: {},
      headers: [],
      lists: [],
    };
  },

  methods: {
    getList() {
      this.$http.get("/api/stock/list").then((response) => {
        this.stocks = response.data;
      });
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      console.log(this.windowSize);
    },

    //단일회사 주요계정 저장
    saveFnlttSinlgAcnt() {
      this.$http
        .post("/api/stock/fnlttSinglAcnt", {
          corp_code: "01391103",
          bsns_year: "2021",
          reprt_code: "11012",
        })
        .then((response) => {
          this.stocks = response.data;
        });
    },
    // 단일회사 전체 재무제표
    getfnlttSinlgAcntAll() {
      this.$http
        .post("/api/stock/fnlttSinglAcntAll", {
          corp_code: "00126380",
          bsns_year: "2018",
          reprt_code: "11011",
          fs_div: "CFS",
        })
        .then((response) => {
          this.stocks = response.data;
        });
    },
    getDocument() {
      this.$http.get("/api/stock/document").then((response) => {
        // var xml = response.data;
        // var json = convert.xml2json(xml, { compact: true });
        // this.stocks = JSON.parse(json);
        this.stocks = response.data;
      });
    },
    getfnlttSinlgAcntFirebase() {
      this.$http
        .post("/api/stock/mongodbcreate", {
          name: "mike",
          email: "ddjfje@jfje.com",
          password: "123456",
        })
        .then((response) => {
          this.stocks = response.data;
        });
    },
    readMongodb() {
      this.$http.get("/api/stock/mongodbread").then((response) => {
        this.stocks = response.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
