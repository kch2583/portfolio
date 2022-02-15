const opendart = require("opendart");

const accessToken = "9b257b4fb12885a879ef5975f5c4503245c75fca";
/*
요청인자 
corp_code  : 공시대상회사의 고유번호(8자리) string(8)
bgn_de : 검색시작 접수일자(YYYYMMDD) string(8) 1) 기본값 : 종료일(end_de)  2) 고유번호(corp_code)가 없는 경우 검색기간은 3개월로 제한
end_de : 검색종료 접수일자(YYYYMMDD) string(8) 1) 기본값 : 당일
last_reprt_at : 최종보고서만 검색여부(Y or N) string(1) 1) 기본값 : N(정정이 있는 경우 최종정정만 검색)
pblntf_ty : 공시유형 string(1)
            A : 정기공시
            B : 주요사항보고
            C : 발행공시
            D : 지분공시
            E : 기타공시
            F : 외부감사관련
            G : 펀드공시
            H : 자산유동화
            I : 거래소공시
            j : 공정위공시
pblntf_detail_ty : 공시 상세 유형 string(4)
corp_cls : string(1) 법인구분 : Y(유가), K(코스닥), N(코넥스), E(기타)  ※ 없으면 전체조회, 복수조건 불가
sort : 정렬 string(4) 
            접수일자: date
            회사명 : crp
            보고서명 : rpt
            ※ 기본값 : date
sort_mth : 정렬방법 string(4) 오름차순(asc), 내림차순(desc)  ※ 기본값 : desc
page_no : 페이지 번호(1~n) 기본값 : 1 string(5)
page_count : 페이지당 건수(1~100) 기본값 : 10, 최대값 : 100 string(3)

bsns_year : 사업연도 string(4) ※ 2015년 이후 부터 정보제공
reprt_code : 보고서 코드 string(5)
            1분기보고서 : 11013
            반기보고서 : 11012
            3분기보고서 : 11014
            사업보고서 : 11011
*/

// 기업개황
function company(corp_code) {
  var options = {
    corp_code: corp_code,
  };
  var result = opendart.disclosure
    .company(accessToken, options)
    .then(function (res) {
      return res.data;
    });
  return result;
}

// 공시검색
function list(
  corp_code = null,
  bgn_de,
  end_de,
  last_reprt_at = null,
  pblntf_ty = null,
  pblntf_detail_ty = null,
  corp_cls = null,
  sort = null,
  sort_mth = null,
  page_no = null,
  page_count = null
) {
  var options = {
    corp_code: corp_code,
    bgn_de: bgn_de,
    end_de: end_de,
    last_reprt_at: last_reprt_at,
    pblntf_ty: pblntf_ty,
    pblntf_detail_ty: pblntf_detail_ty,
    corp_cls: corp_cls,
    sort: sort,
    sort_mth: sort_mth,
    page_no: page_no,
    page_count: page_count,
  };
  var result = opendart.disclosure
    .list(accessToken, options)
    .then(function (res) {
      return res.data;
    });
  return result;
}

// 단일회사 주요계정
function fnlttSinglAcnt(corp_code, bsns_year, reprt_code) {
  var options = {
    corp_code: corp_code,
    bsns_year: bsns_year,
    reprt_code: reprt_code,
  };
  var result = opendart.statement
    .fnlttSinglAcnt(accessToken, options)
    .then(function (res) {
      return res.data;
    });
  return result;
}

//고유번호
function document() {
  var result = opendart.disclosure
    .document(accessToken, "/document.xml", options)
    .then(function (res) {
      console.log(res.data);
    });
  return result;
}

module.exports = { company, list, fnlttSinglAcnt, document };
