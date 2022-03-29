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

      <!-- <v-row>
        <v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>sj_div</th>
                  <th>sj_nm</th>
                  <th>account_nm</th>
                  <th>thstrm_amount</th>
                  <th>thstrm_add_amount</th>
                </tr>
              </thead>
              <tbody v-for="data in lists" :key="data.id">
                <tr v-for="d in data" :key="d.id">
                  <td>{{ d.sj_div }}</td>
                  <td>{{ d.sj_nm }}</td>
                  <td>{{ d.account_nm }}</td>
                  <td>{{ d.thstrm_amount }}</td>
                  <td>
                    {{ d.thstrm_add_amount }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$http.get("/api/stock").then((response) => {
    //   this.fnlData = response.data;
    //   for (let index = 0; index < this.fnlData.length; index++) {
    //     this.lists.push(response.data[index].list);
    //   }
    // });
  },
  data() {
    return {
      stocks: [],
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
    //단일회사 주요계정
    getfnlttSinlgAcnt() {
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
          corp_code: "01391103",
          bsns_year: "2020",
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
