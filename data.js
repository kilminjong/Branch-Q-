/**
 * 하나은행 통합 CMS — 데모 데이터 (data.js)
 *
 * [구조 설명]
 * 통합 CMS는 한 기업 고객이 보유한 여러 계좌(사업장/용도별)를 하나로 묶어
 * 자금을 일원화 관리하는 시스템입니다.
 *
 * 핵심 데이터 구성:
 *  - meta            : 고객사 기본 정보 및 CMS 계약 정보
 *  - master_account  : CMS 마스터 계좌 (자금 집중 계좌)
 *  - sub_accounts    : 사업장별 하위 계좌 8개 (집금·지급 전용)
 *  - collections     : 집금 내역 (매출 대금 수금) 40건
 *  - payments        : 지급 내역 (급여·매입·운영비 등) 35건
 *  - transfers       : 계좌 간 자금 이동 (스윕) 15건
 *  - balance_daily   : 마스터 계좌 일별 잔액 추이 (3월)
 *  - monthly_summary : 최근 6개월 월별 집계
 *  - anomalies       : 이상 징후 7건
 *
 * 기준일: 2026년 3월 18일 (데모 데이터 — 거래내역은 샘플 기간 기준)
 * 고객사: (주)서울식품 — 식음료 제조·유통 중소기업
 */

window.CMS_DATA = {

  /* ══════════════════════════════════════
     1. META — 고객사 및 CMS 계약 정보
  ══════════════════════════════════════ */
  meta: {
    company_name:        "(주)서울식품",
    company_reg_no:      "114-81-23456",
    industry:            "식음료 제조·도소매",
    cms_customer_no:     "CMS-2019-004821",
    contract_date:       "2019-07-01",
    base_date:           "2026-03-18",
    base_month:          "2026-03",
    manager_name:        "정자금 과장",
    manager_tel:         "02-3456-7890",
    manager_email:       "cashflow@seoulfood.co.kr",
    rm_name:             "김하나 팀장",
    rm_tel:              "02-1234-5678",
    hana_branch:         "하나은행 을지로기업금융센터",
    sweep_enabled:       true,
    sweep_time:          "18:00",
    reserve_ratio_min:   10,
    overdraft_limit:     500_000_000,
    total_sub_accounts:  8,
  },

  /* ══════════════════════════════════════
     2. MASTER_ACCOUNT — CMS 마스터 계좌
  ══════════════════════════════════════ */
  master_account: {
    account_no:          "138-910001-00001",
    account_name:        "(주)서울식품 CMS 마스터",
    bank:                "하나은행",
    balance:             8_342_000_000,
    prev_month_end:      7_918_000_000,
    balance_change:        424_000_000,
    balance_change_pct:          5.36,
    monthly_inflow:      5_621_000_000,
    monthly_outflow:     5_197_000_000,
    net_cashflow:          424_000_000,
    ytd_inflow:         16_843_000_000,
    ytd_outflow:        16_023_000_000,
    overdraft_limit:     500_000_000,
    overdraft_used:      0,
  },

  /* ══════════════════════════════════════
     3. SUB_ACCOUNTS — 사업장별 하위 계좌 8개
  ══════════════════════════════════════ */
  sub_accounts: [
    {
      id: "SA-01", account_no: "138-910001-10001",
      name: "강남사업장", purpose: "집금전용", location: "서울 강남구",
      manager: "박현수 부장",
      balance: 42_000_000,
      balance_before_sweep: 380_000_000,
      monthly_collection: 1_240_000_000,
      monthly_payment:      320_000_000,
      sweep_out:            918_000_000,
      sweep_in:                       0,
      reserve_ratio: 10.5,
      status: "정상", open_date: "2019-07-01",
    },
    {
      id: "SA-02", account_no: "138-910001-10002",
      name: "강서사업장", purpose: "집금·지급", location: "서울 강서구",
      manager: "이수정 차장",
      balance: 18_500_000,
      balance_before_sweep: 210_000_000,
      monthly_collection:   680_000_000,
      monthly_payment:      510_000_000,
      sweep_out:            170_000_000,
      sweep_in:                       0,
      reserve_ratio: 8.81,
      status: "주의", open_date: "2019-09-01",
      note: "예비자금 기준(10%) 미달. 강서 권역 거래처 결제 Net60일로 연장됨",
    },
    {
      id: "SA-03", account_no: "138-910001-10003",
      name: "경기남부사업장", purpose: "집금전용", location: "경기 수원시",
      manager: "최준혁 과장",
      balance: 55_000_000,
      balance_before_sweep: 490_000_000,
      monthly_collection: 1_510_000_000,
      monthly_payment:      280_000_000,
      sweep_out:          1_175_000_000,
      sweep_in:                       0,
      reserve_ratio: 11.22,
      status: "정상", open_date: "2020-02-01",
    },
    {
      id: "SA-04", account_no: "138-910001-10004",
      name: "경기북부사업장", purpose: "집금·지급", location: "경기 의정부시",
      manager: "장민규 대리",
      balance: 9_200_000,
      balance_before_sweep: 105_000_000,
      monthly_collection:   290_000_000,
      monthly_payment:      340_000_000,
      sweep_out:                      0,
      sweep_in:              54_000_000,
      reserve_ratio: 6.31,
      status: "위험", open_date: "2021-04-01",
      note: "2개월 연속 집금 < 지급. 마스터 역스윕으로 충당 중. 이상거래 2건 발생",
    },
    {
      id: "SA-05", account_no: "138-910001-10005",
      name: "부산사업장", purpose: "집금·지급", location: "부산 해운대구",
      manager: "김태린 과장",
      balance: 38_000_000,
      balance_before_sweep: 295_000_000,
      monthly_collection:   890_000_000,
      monthly_payment:      620_000_000,
      sweep_out:            257_000_000,
      sweep_in:                       0,
      reserve_ratio: 12.88,
      status: "정상", open_date: "2020-08-01",
    },
    {
      id: "SA-06", account_no: "138-910001-10006",
      name: "대구사업장", purpose: "집금·지급", location: "대구 달서구",
      manager: "황보람 대리",
      balance: 24_000_000,
      balance_before_sweep: 180_000_000,
      monthly_collection:   540_000_000,
      monthly_payment:      470_000_000,
      sweep_out:            156_000_000,
      sweep_in:                       0,
      reserve_ratio: 11.33,
      status: "정상", open_date: "2021-01-01",
    },
    {
      id: "SA-07", account_no: "138-910001-10007",
      name: "온라인유통계좌", purpose: "집금전용", location: "본사(온라인)",
      manager: "오지현 과장",
      balance: 71_000_000,
      balance_before_sweep: 610_000_000,
      monthly_collection: 1_820_000_000,
      monthly_payment:              0,
      sweep_out:          1_749_000_000,
      sweep_in:                       0,
      reserve_ratio: 11.64,
      status: "정상", open_date: "2022-03-01",
      note: "온라인(쿠팡·네이버) 매출 급성장. 3월 역대 최고 집금. 물류비 수익성 모니터링 필요",
    },
    {
      id: "SA-08", account_no: "138-910001-10008",
      name: "급여·세금 전용계좌", purpose: "지급전용", location: "본사",
      manager: "노재무 과장",
      balance: 12_000_000,
      balance_before_sweep: 620_000_000,
      monthly_collection:           0,
      monthly_payment:    1_650_000_000,
      sweep_out:                      0,
      sweep_in:           1_638_000_000,
      reserve_ratio: 0.73,
      status: "정상", open_date: "2019-07-01",
      note: "지급 완료 후 잔액 거의 0 — 정상 (지급전용 계좌 특성)",
    },
  ],

  /* ══════════════════════════════════════
     4. COLLECTIONS — 집금 내역 40건
  ══════════════════════════════════════ */
  collections: [
    // 강남사업장 (8건)
    { id:"CL-001", date:"2025-03-04", account_id:"SA-01", account_name:"강남사업장", amount:185_000_000, payer:"(주)현대마트",    method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-001", note:"2월분 납품 대금 정산" },
    { id:"CL-002", date:"2025-03-07", account_id:"SA-01", account_name:"강남사업장", amount:143_000_000, payer:"GS리테일(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-002", note:"3월 1차 납품" },
    { id:"CL-003", date:"2025-03-11", account_id:"SA-01", account_name:"강남사업장", amount:210_000_000, payer:"롯데쇼핑(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-003", note:"3월 정기 납품" },
    { id:"CL-004", date:"2025-03-14", account_id:"SA-01", account_name:"강남사업장", amount:98_000_000,  payer:"이마트(주)",    method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-004", note:"PB 소용량 납품" },
    { id:"CL-005", date:"2025-03-18", account_id:"SA-01", account_name:"강남사업장", amount:175_000_000, payer:"홈플러스(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-005", note:"3월 2차 납품" },
    { id:"CL-006", date:"2025-03-21", account_id:"SA-01", account_name:"강남사업장", amount:162_000_000, payer:"(주)현대마트",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-006", note:"3월 정기" },
    { id:"CL-007", date:"2025-03-25", account_id:"SA-01", account_name:"강남사업장", amount:138_000_000, payer:"GS리테일(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-007", note:"소스류 추가 납품" },
    { id:"CL-008", date:"2025-03-28", account_id:"SA-01", account_name:"강남사업장", amount:129_000_000, payer:"CU편의점",      method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-008", note:"3월 말 편의점 정산" },

    // 강서사업장 (5건)
    { id:"CL-009", date:"2025-03-05", account_id:"SA-02", account_name:"강서사업장", amount:125_000_000, payer:"(주)한국유통",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-009", note:"2월분 잔여 대금" },
    { id:"CL-010", date:"2025-03-12", account_id:"SA-02", account_name:"강서사업장", amount:148_000_000, payer:"이마트(주)",    method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-010", note:"3월 정기 납품" },
    { id:"CL-011", date:"2025-03-18", account_id:"SA-02", account_name:"강서사업장", amount:132_000_000, payer:"홈플러스(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-011", note:"신제품 첫 납품" },
    { id:"CL-012", date:"2025-03-24", account_id:"SA-02", account_name:"강서사업장", amount:158_000_000, payer:"롯데마트(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-012", note:"3월 말 정산" },
    { id:"CL-013", date:"2025-03-28", account_id:"SA-02", account_name:"강서사업장", amount:117_000_000, payer:"GS25(주)",     method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-013", note:"편의점 채널 정산" },

    // 경기남부사업장 (7건)
    { id:"CL-014", date:"2025-03-04", account_id:"SA-03", account_name:"경기남부사업장", amount:225_000_000, payer:"이마트(주)",    method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-014", note:"수원·안양 납품" },
    { id:"CL-015", date:"2025-03-07", account_id:"SA-03", account_name:"경기남부사업장", amount:198_000_000, payer:"롯데마트(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-015", note:"경기남부 권역" },
    { id:"CL-016", date:"2025-03-12", account_id:"SA-03", account_name:"경기남부사업장", amount:178_000_000, payer:"홈플러스(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-016", note:"3월 정기" },
    { id:"CL-017", date:"2025-03-17", account_id:"SA-03", account_name:"경기남부사업장", amount:215_000_000, payer:"(주)현대마트",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-017", note:"분당·판교 납품" },
    { id:"CL-018", date:"2025-03-21", account_id:"SA-03", account_name:"경기남부사업장", amount:192_000_000, payer:"GS리테일(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-018", note:"수원 권역 정산" },
    { id:"CL-019", date:"2025-03-25", account_id:"SA-03", account_name:"경기남부사업장", amount:248_000_000, payer:"이마트(주)",    method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-019", note:"신규 SKU 추가 — 최고 입금" },
    { id:"CL-020", date:"2025-03-28", account_id:"SA-03", account_name:"경기남부사업장", amount:254_000_000, payer:"롯데쇼핑(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-020", note:"월말 대량 정산" },

    // 경기북부사업장 (3건 — 지급보다 적음)
    { id:"CL-021", date:"2025-03-06", account_id:"SA-04", account_name:"경기북부사업장", amount:95_000_000,  payer:"CU편의점",     method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-021", note:"의정부·포천 편의점" },
    { id:"CL-022", date:"2025-03-14", account_id:"SA-04", account_name:"경기북부사업장", amount:98_000_000,  payer:"이마트(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-022", note:"3월 정기 납품" },
    { id:"CL-023", date:"2025-03-24", account_id:"SA-04", account_name:"경기북부사업장", amount:97_000_000,  payer:"홈플러스(주)", method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-023", note:"월말 정산" },

    // 부산사업장 (5건)
    { id:"CL-024", date:"2025-03-05", account_id:"SA-05", account_name:"부산사업장", amount:168_000_000, payer:"롯데마트(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-024", note:"부산 권역" },
    { id:"CL-025", date:"2025-03-11", account_id:"SA-05", account_name:"부산사업장", amount:192_000_000, payer:"이마트(주)",    method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-025", note:"3월 정기" },
    { id:"CL-026", date:"2025-03-17", account_id:"SA-05", account_name:"부산사업장", amount:175_000_000, payer:"홈플러스(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-026", note:"부산·경남" },
    { id:"CL-027", date:"2025-03-24", account_id:"SA-05", account_name:"부산사업장", amount:188_000_000, payer:"GS리테일(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-027", note:"3월 2차" },
    { id:"CL-028", date:"2025-03-28", account_id:"SA-05", account_name:"부산사업장", amount:167_000_000, payer:"(주)현대마트",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-028", note:"월말 정산" },

    // 대구사업장 (4건)
    { id:"CL-029", date:"2025-03-06", account_id:"SA-06", account_name:"대구사업장", amount:128_000_000, payer:"이마트(주)",    method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-029", note:"대구 권역" },
    { id:"CL-030", date:"2025-03-14", account_id:"SA-06", account_name:"대구사업장", amount:138_000_000, payer:"롯데마트(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-030", note:"3월 정기" },
    { id:"CL-031", date:"2025-03-21", account_id:"SA-06", account_name:"대구사업장", amount:142_000_000, payer:"홈플러스(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-031", note:"3월 2차" },
    { id:"CL-032", date:"2025-03-27", account_id:"SA-06", account_name:"대구사업장", amount:132_000_000, payer:"GS리테일(주)",   method:"계좌이체", category:"도매 매출", invoice_no:"INV-2503-032", note:"월말" },

    // 온라인유통계좌 (8건 — 최고 집금)
    { id:"CL-033", date:"2025-03-03", account_id:"SA-07", account_name:"온라인유통계좌", amount:198_000_000, payer:"쿠팡(주)",       method:"가상계좌", category:"온라인 매출", invoice_no:"INV-2503-033", note:"쿠팡 2월 최종 정산" },
    { id:"CL-034", date:"2025-03-07", account_id:"SA-07", account_name:"온라인유통계좌", amount:215_000_000, payer:"쿠팡(주)",       method:"가상계좌", category:"온라인 매출", invoice_no:"INV-2503-034", note:"쿠팡 로켓배송 3월 1차" },
    { id:"CL-035", date:"2025-03-11", account_id:"SA-07", account_name:"온라인유통계좌", amount:178_000_000, payer:"네이버파이낸셜",  method:"가상계좌", category:"온라인 매출", invoice_no:"INV-2503-035", note:"스마트스토어 1차 정산" },
    { id:"CL-036", date:"2025-03-14", account_id:"SA-07", account_name:"온라인유통계좌", amount:235_000_000, payer:"쿠팡(주)",       method:"가상계좌", category:"온라인 매출", invoice_no:"INV-2503-036", note:"쿠팡 3월 2차 — 전월비 +18%" },
    { id:"CL-037", date:"2025-03-18", account_id:"SA-07", account_name:"온라인유통계좌", amount:192_000_000, payer:"카카오커머스",    method:"가상계좌", category:"온라인 매출", invoice_no:"INV-2503-037", note:"카카오쇼핑 정산" },
    { id:"CL-038", date:"2025-03-21", account_id:"SA-07", account_name:"온라인유통계좌", amount:248_000_000, payer:"쿠팡(주)",       method:"가상계좌", category:"온라인 매출", invoice_no:"INV-2503-038", note:"쿠팡 3월 3차 — 신제품 기획전 효과" },
    { id:"CL-039", date:"2025-03-25", account_id:"SA-07", account_name:"온라인유통계좌", amount:285_000_000, payer:"네이버파이낸셜",  method:"가상계좌", category:"온라인 매출", invoice_no:"INV-2503-039", note:"스마트스토어 2차 — 역대 최고" },
    { id:"CL-040", date:"2025-03-28", account_id:"SA-07", account_name:"온라인유통계좌", amount:269_000_000, payer:"쿠팡(주)",       method:"가상계좌", category:"온라인 매출", invoice_no:"INV-2503-040", note:"쿠팡 3월 최종 정산" },
  ],

  /* ══════════════════════════════════════
     5. PAYMENTS — 지급 내역 35건
  ══════════════════════════════════════ */
  payments: [
    // 급여·4대보험·세금 (SA-08, 5건)
    { id:"PY-001", date:"2025-03-10", account_id:"SA-08", account_name:"급여·세금 전용계좌", amount:985_000_000, payee:"임직원 급여 일괄",     method:"급여이체(CMS)", category:"급여",    note:"3월 급여 — 248명" },
    { id:"PY-002", date:"2025-03-10", account_id:"SA-08", account_name:"급여·세금 전용계좌", amount:218_000_000, payee:"국민건강보험공단",      method:"자동이체",      category:"4대보험", note:"건강·장기요양보험" },
    { id:"PY-003", date:"2025-03-10", account_id:"SA-08", account_name:"급여·세금 전용계좌", amount:145_000_000, payee:"국민연금공단",          method:"자동이체",      category:"4대보험", note:"국민연금(사용자)" },
    { id:"PY-004", date:"2025-03-17", account_id:"SA-08", account_name:"급여·세금 전용계좌", amount:178_000_000, payee:"국세청",               method:"전자납부",      category:"세금",    note:"법인세 중간예납" },
    { id:"PY-005", date:"2025-03-25", account_id:"SA-08", account_name:"급여·세금 전용계좌", amount:124_000_000, payee:"서울시",               method:"전자납부",      category:"세금",    note:"3월 지방소득세" },

    // 원재료·포장재 매입 (SA-01/03/05, 12건)
    { id:"PY-006", date:"2025-03-06", account_id:"SA-01", account_name:"강남사업장", amount:142_000_000, payee:"(주)농협식품원료", method:"계좌이체", category:"원재료 매입", note:"소맥분·전분 3월 1차" },
    { id:"PY-007", date:"2025-03-10", account_id:"SA-01", account_name:"강남사업장", amount:88_000_000,  payee:"(주)대상",        method:"계좌이체", category:"원재료 매입", note:"조미료·소스 원료" },
    { id:"PY-008", date:"2025-03-17", account_id:"SA-01", account_name:"강남사업장", amount:115_000_000, payee:"(주)한국포장재",  method:"계좌이체", category:"포장재 매입", note:"PET·PP 포장재" },
    { id:"PY-009", date:"2025-03-24", account_id:"SA-01", account_name:"강남사업장", amount:132_000_000, payee:"(주)농협식품원료", method:"계좌이체", category:"원재료 매입", note:"3월 2차 원료" },
    { id:"PY-010", date:"2025-03-05", account_id:"SA-03", account_name:"경기남부사업장", amount:168_000_000, payee:"(주)CJ제일제당",  method:"계좌이체", category:"원재료 매입", note:"설탕·유지류 대량" },
    { id:"PY-011", date:"2025-03-12", account_id:"SA-03", account_name:"경기남부사업장", amount:195_000_000, payee:"(주)풀무원",      method:"계좌이체", category:"원재료 매입", note:"두부·콩 원료" },
    { id:"PY-012", date:"2025-03-19", account_id:"SA-03", account_name:"경기남부사업장", amount:155_000_000, payee:"(주)오리온",      method:"계좌이체", category:"원재료 매입", note:"초콜릿·코코아 원료" },
    { id:"PY-013", date:"2025-03-26", account_id:"SA-03", account_name:"경기남부사업장", amount:178_000_000, payee:"(주)농협식품원료", method:"계좌이체", category:"원재료 매입", note:"3월 3차 — 신제품 원료 포함" },
    { id:"PY-014", date:"2025-03-07", account_id:"SA-05", account_name:"부산사업장", amount:98_000_000,  payee:"(주)부산수산물가공", method:"계좌이체", category:"원재료 매입", note:"수산 원료 정기" },
    { id:"PY-015", date:"2025-03-14", account_id:"SA-05", account_name:"부산사업장", amount:125_000_000, payee:"(주)경남농산물",    method:"계좌이체", category:"원재료 매입", note:"채소류 대량 매입" },
    { id:"PY-016", date:"2025-03-21", account_id:"SA-05", account_name:"부산사업장", amount:112_000_000, payee:"(주)부산수산물가공", method:"계좌이체", category:"원재료 매입", note:"2차 수산 원료" },
    { id:"PY-017", date:"2025-03-28", account_id:"SA-05", account_name:"부산사업장", amount:148_000_000, payee:"(주)경남농산물",    method:"계좌이체", category:"원재료 매입", note:"4월 생산 선재고 매입" },

    // 물류·배송비 (7건 — 온라인 급증 이슈 포함)
    { id:"PY-018", date:"2025-03-07", account_id:"SA-01", account_name:"강남사업장",    amount:68_000_000,  payee:"(주)한진물류",     method:"계좌이체", category:"물류비", note:"3월 1차 물류비" },
    { id:"PY-019", date:"2025-03-14", account_id:"SA-01", account_name:"강남사업장",    amount:72_000_000,  payee:"(주)한진물류",     method:"계좌이체", category:"물류비", note:"3월 2차 — 전월비 +5.9%" },
    { id:"PY-020", date:"2025-03-21", account_id:"SA-03", account_name:"경기남부사업장", amount:85_000_000,  payee:"(주)CJ대한통운",  method:"계좌이체", category:"물류비", note:"경기 권역 배송비" },
    { id:"PY-021", date:"2025-03-10", account_id:"SA-07", account_name:"온라인유통계좌", amount:245_000_000, payee:"쿠팡로지스틱스",   method:"계좌이체", category:"물류비", note:"쿠팡 풀필먼트 3월 1차 — 전월비 +22%", flag:"anomaly_watch" },
    { id:"PY-022", date:"2025-03-17", account_id:"SA-07", account_name:"온라인유통계좌", amount:198_000_000, payee:"쿠팡로지스틱스",   method:"계좌이체", category:"물류비", note:"3월 2차 풀필먼트" },
    { id:"PY-023", date:"2025-03-24", account_id:"SA-07", account_name:"온라인유통계좌", amount:225_000_000, payee:"쿠팡로지스틱스",   method:"계좌이체", category:"물류비", note:"3월 3차 — 매출 대비 비용 비율 점검 필요", flag:"anomaly_watch" },
    { id:"PY-024", date:"2025-03-28", account_id:"SA-05", account_name:"부산사업장",    amount:58_000_000,  payee:"(주)대신물류",     method:"계좌이체", category:"물류비", note:"부산·경남 배송비" },

    // 임차료·관리비·유틸리티 (5건)
    { id:"PY-025", date:"2025-03-05", account_id:"SA-01", account_name:"강남사업장",    amount:38_000_000, payee:"강남빌딩관리(주)",      method:"자동이체", category:"임차·관리비", note:"3월 임차·관리비" },
    { id:"PY-026", date:"2025-03-05", account_id:"SA-02", account_name:"강서사업장",    amount:22_000_000, payee:"강서물류센터(주)",      method:"자동이체", category:"임차·관리비", note:"강서 창고 임차료" },
    { id:"PY-027", date:"2025-03-05", account_id:"SA-03", account_name:"경기남부사업장", amount:45_000_000, payee:"수원산업단지관리",      method:"자동이체", category:"임차·관리비", note:"생산시설 임차+관리비" },
    { id:"PY-028", date:"2025-03-05", account_id:"SA-05", account_name:"부산사업장",    amount:28_000_000, payee:"부산신항물류(주)",      method:"자동이체", category:"임차·관리비", note:"부산 창고·사무소" },
    { id:"PY-029", date:"2025-03-10", account_id:"SA-03", account_name:"경기남부사업장", amount:32_000_000, payee:"한국전력공사",          method:"자동이체", category:"유틸리티",   note:"전기료 — 생산 증가로 전월비 +8.1%" },

    // 마케팅·판촉비 (3건)
    { id:"PY-030", date:"2025-03-12", account_id:"SA-07", account_name:"온라인유통계좌", amount:85_000_000, payee:"쿠팡광고",      method:"계좌이체", category:"마케팅비", note:"쿠팡 로켓그로스 광고비" },
    { id:"PY-031", date:"2025-03-14", account_id:"SA-07", account_name:"온라인유통계좌", amount:42_000_000, payee:"네이버(주)",    method:"계좌이체", category:"마케팅비", note:"네이버 쇼핑 광고·프리미엄 노출" },
    { id:"PY-032", date:"2025-03-20", account_id:"SA-01", account_name:"강남사업장",    amount:55_000_000, payee:"(주)제일기획",  method:"계좌이체", category:"마케팅비", note:"오프라인 판촉 행사비" },

    // 이상거래 포함 기타 (3건)
    { id:"PY-033", date:"2025-03-19", account_id:"SA-04", account_name:"경기북부사업장", amount:185_000_000, payee:"(주)경기북부물류", method:"계좌이체", category:"외주용역비", note:"외주 물류 용역비 — 전분기비 31% 증가. 계약 단가 검토 필요", flag:"anomaly" },
    { id:"PY-034", date:"2025-03-26", account_id:"SA-04", account_name:"경기북부사업장", amount:92_000_000,  payee:"미확인",         method:"계좌이체", category:"기타 지출", note:"수취인 계좌 확인 불가 — 감사 대기중",                         flag:"anomaly" },
    { id:"PY-035", date:"2025-03-28", account_id:"SA-02", account_name:"강서사업장",    amount:148_000_000, payee:"(주)강서산업",    method:"계좌이체", category:"외주용역비", note:"외주 가공비 — 계약 만료 후 재발주. 내부 결재 확인 필요",     flag:"anomaly_watch" },
  ],

  /* ══════════════════════════════════════
     6. TRANSFERS — 계좌간 자금이동 (스윕) 15건
  ══════════════════════════════════════ */
  transfers: [
    // 하위→마스터 자동 스윕
    { id:"TR-001", date:"2025-03-07", from_id:"SA-01", from_name:"강남사업장",     to_id:"MASTER", to_name:"마스터계좌", amount:312_000_000,   type:"자동스윕",    note:"7일 영업일 스윕" },
    { id:"TR-002", date:"2025-03-07", from_id:"SA-03", from_name:"경기남부사업장", to_id:"MASTER", to_name:"마스터계좌", amount:385_000_000,   type:"자동스윕",    note:"7일 영업일 스윕" },
    { id:"TR-003", date:"2025-03-07", from_id:"SA-05", from_name:"부산사업장",     to_id:"MASTER", to_name:"마스터계좌", amount:148_000_000,   type:"자동스윕",    note:"7일 영업일 스윕" },
    { id:"TR-004", date:"2025-03-07", from_id:"SA-07", from_name:"온라인유통계좌", to_id:"MASTER", to_name:"마스터계좌", amount:198_000_000,   type:"자동스윕",    note:"쿠팡 1차 정산 스윕" },
    { id:"TR-005", date:"2025-03-14", from_id:"SA-01", from_name:"강남사업장",     to_id:"MASTER", to_name:"마스터계좌", amount:298_000_000,   type:"자동스윕",    note:"14일 영업일 스윕" },
    { id:"TR-006", date:"2025-03-14", from_id:"SA-03", from_name:"경기남부사업장", to_id:"MASTER", to_name:"마스터계좌", amount:356_000_000,   type:"자동스윕",    note:"14일 영업일 스윕" },
    { id:"TR-007", date:"2025-03-14", from_id:"SA-07", from_name:"온라인유통계좌", to_id:"MASTER", to_name:"마스터계좌", amount:412_000_000,   type:"자동스윕",    note:"온라인 2차 스윕" },
    { id:"TR-008", date:"2025-03-21", from_id:"SA-01", from_name:"강남사업장",     to_id:"MASTER", to_name:"마스터계좌", amount:168_000_000,   type:"자동스윕",    note:"21일 영업일 스윕" },
    { id:"TR-009", date:"2025-03-21", from_id:"SA-05", from_name:"부산사업장",     to_id:"MASTER", to_name:"마스터계좌", amount:109_000_000,   type:"자동스윕",    note:"21일 영업일 스윕" },
    { id:"TR-010", date:"2025-03-21", from_id:"SA-07", from_name:"온라인유통계좌", to_id:"MASTER", to_name:"마스터계좌", amount:440_000_000,   type:"자동스윕",    note:"온라인 3차 스윕 — 이달 최대" },
    { id:"TR-011", date:"2025-03-28", from_id:"SA-01", from_name:"강남사업장",     to_id:"MASTER", to_name:"마스터계좌", amount:140_000_000,   type:"자동스윕",    note:"28일 영업일 스윕" },
    { id:"TR-012", date:"2025-03-28", from_id:"SA-03", from_name:"경기남부사업장", to_id:"MASTER", to_name:"마스터계좌", amount:434_000_000,   type:"자동스윕",    note:"월말 대규모 스윕" },
    { id:"TR-013", date:"2025-03-28", from_id:"SA-07", from_name:"온라인유통계좌", to_id:"MASTER", to_name:"마스터계좌", amount:699_000_000,   type:"자동스윕",    note:"월말 최종 스윕 — 역대 최고" },
    // 마스터→하위 역스윕 (자금 충전)
    { id:"TR-014", date:"2025-03-09", from_id:"MASTER", from_name:"마스터계좌", to_id:"SA-08", to_name:"급여·세금 전용계좌", amount:1_638_000_000, type:"지급충전",   note:"급여일 전날 지급 계좌 충전" },
    { id:"TR-015", date:"2025-03-19", from_id:"MASTER", from_name:"마스터계좌", to_id:"SA-04", to_name:"경기북부사업장",   amount:54_000_000,    type:"부족분충전",  note:"경기북부 잔액 부족 긴급 충전" },
  ],

  /* ══════════════════════════════════════
     7. BALANCE_DAILY — 마스터 계좌 일별 잔액
  ══════════════════════════════════════ */
  balance_daily: [
    { date:"2025-03-03", balance:7_918_000_000, daily_in:198_000_000,   daily_out:0 },
    { date:"2025-03-04", balance:8_065_000_000, daily_in:410_000_000,   daily_out:263_000_000 },
    { date:"2025-03-05", balance:7_892_000_000, daily_in:168_000_000,   daily_out:341_000_000 },
    { date:"2025-03-06", balance:8_155_000_000, daily_in:421_000_000,   daily_out:158_000_000 },
    { date:"2025-03-07", balance:8_882_000_000, daily_in:1_043_000_000, daily_out:316_000_000 },
    { date:"2025-03-10", balance:8_196_000_000, daily_in:572_000_000,   daily_out:1_258_000_000 },
    { date:"2025-03-11", balance:8_488_000_000, daily_in:485_000_000,   daily_out:193_000_000 },
    { date:"2025-03-12", balance:8_652_000_000, daily_in:523_000_000,   daily_out:359_000_000 },
    { date:"2025-03-13", balance:8_720_000_000, daily_in:310_000_000,   daily_out:242_000_000 },
    { date:"2025-03-14", balance:9_258_000_000, daily_in:1_066_000_000, daily_out:528_000_000 },
    { date:"2025-03-17", balance:9_012_000_000, daily_in:315_000_000,   daily_out:561_000_000 },
    { date:"2025-03-18", balance:9_145_000_000, daily_in:498_000_000,   daily_out:365_000_000 },
    { date:"2025-03-19", balance:8_961_000_000, daily_in:248_000_000,   daily_out:432_000_000 },
    { date:"2025-03-20", balance:9_105_000_000, daily_in:399_000_000,   daily_out:255_000_000 },
    { date:"2025-03-21", balance:9_553_000_000, daily_in:1_007_000_000, daily_out:559_000_000 },
    { date:"2025-03-24", balance:9_321_000_000, daily_in:254_000_000,   daily_out:486_000_000 },
    { date:"2025-03-25", balance:9_025_000_000, daily_in:285_000_000,   daily_out:581_000_000 },
    { date:"2025-03-26", balance:9_117_000_000, daily_in:345_000_000,   daily_out:253_000_000 },
    { date:"2025-03-27", balance:9_281_000_000, daily_in:419_000_000,   daily_out:255_000_000 },
    { date:"2025-03-28", balance:9_642_000_000, daily_in:1_508_000_000, daily_out:1_147_000_000 },
    { date:"2025-03-31", balance:8_342_000_000, daily_in:124_000_000,   daily_out:1_424_000_000 },
  ],

  /* ══════════════════════════════════════
     8. MONTHLY_SUMMARY — 최근 6개월
  ══════════════════════════════════════ */
  monthly_summary: [
    // 최근 6개월 실적 (2025-10 ~ 2026-03, 기준일: 2026-03-18)
    // net_margin: 매출총이익률(%), yoy_growth: 전년 동월 대비 매출 성장률(%)
    { month:"2025-10", master_balance_end:7_125_000_000, total_collection:4_812_000_000, total_payment:4_589_000_000, net: 223_000_000, sweep_total:3_621_000_000, online_collection_ratio:28.4, anomaly_count:1, net_margin:8.2,  yoy_growth: 6.1  },
    { month:"2025-11", master_balance_end:7_412_000_000, total_collection:5_018_000_000, total_payment:4_731_000_000, net: 287_000_000, sweep_total:3_842_000_000, online_collection_ratio:29.8, anomaly_count:2, net_margin:8.7,  yoy_growth: 5.8  },
    { month:"2025-12", master_balance_end:7_681_000_000, total_collection:5_843_000_000, total_payment:5_412_000_000, net: 431_000_000, sweep_total:4_215_000_000, online_collection_ratio:31.2, anomaly_count:1, net_margin:9.1,  yoy_growth: 8.3  },
    { month:"2026-01", master_balance_end:7_498_000_000, total_collection:4_612_000_000, total_payment:4_795_000_000, net:-183_000_000, sweep_total:3_418_000_000, online_collection_ratio:32.1, anomaly_count:3, net_margin:5.4,  yoy_growth:-2.1  },
    { month:"2026-02", master_balance_end:7_918_000_000, total_collection:5_082_000_000, total_payment:4_662_000_000, net: 420_000_000, sweep_total:3_756_000_000, online_collection_ratio:33.5, anomaly_count:2, net_margin:8.4,  yoy_growth: 4.2  },
    { month:"2026-03", master_balance_end:8_342_000_000, total_collection:5_621_000_000, total_payment:5_197_000_000, net: 424_000_000, sweep_total:4_899_000_000, online_collection_ratio:35.1, anomaly_count:5, net_margin:8.6,  yoy_growth: 7.4  },
  ],

  /* ══════════════════════════════════════
     9. ANOMALIES — 이상 징후 7건
  ══════════════════════════════════════ */
  anomalies: [
    {
      id:"AN-001", date:"2025-03-26",
      account_id:"SA-04", account_name:"경기북부사업장", ref_id:"PY-034",
      type:"수취인 불명 출금", amount:92_000_000, risk_level:"HIGH", status:"감사 대기",
      description:"수취인 계좌 확인 불가. 거래 목적·근거 서류 미제출. 최근 2개월 내 동일 패턴 의심",
      recommended_action:"즉시 거래 경위 소명 요구. 수취인 계좌 금융거래 정보 조회 신청"
    },
    {
      id:"AN-002", date:"2025-03-19",
      account_id:"SA-04", account_name:"경기북부사업장", ref_id:"PY-033",
      type:"외주용역비 비정상 급증", amount:185_000_000, risk_level:"HIGH", status:"조사 중",
      description:"전분기 평균(141백만) 대비 31% 증가. (주)경기북부물류 — 단가 재협상 이력 없음. 계약 초과 지급 의심",
      recommended_action:"용역 계약서·세금계산서 대사. 실제 용역 수행 여부 현장 확인"
    },
    {
      id:"AN-003", date:"2025-03-28",
      account_id:"SA-02", account_name:"강서사업장", ref_id:"PY-035",
      type:"외주 가공비 사유 불분명", amount:148_000_000, risk_level:"MED", status:"서류 확인 중",
      description:"단기 계약 만료 후 갱신 없이 재발주. 내부 결재 완료 여부 미확인",
      recommended_action:"내부 품의서 및 계약 갱신 여부 확인. 미비 시 지급 보류"
    },
    {
      id:"AN-004", date:"2025-03-10",
      account_id:"SA-07", account_name:"온라인유통계좌", ref_id:"PY-021",
      type:"물류비 수익성 경고", amount:245_000_000, risk_level:"MED", status:"모니터링",
      description:"쿠팡 풀필먼트 비용 전월비 22% 증가. 매출 증가율(18%) 상회. 온라인 채널 물류비율 13.5%→14.8% 악화",
      recommended_action:"쿠팡 단가 협상 검토. SKU별 수익성 분석"
    },
    {
      id:"AN-005", date:"2025-03-31",
      account_id:"SA-04", account_name:"경기북부사업장", ref_id:null,
      type:"집금 < 지급 구조 고착", amount:null, risk_level:"HIGH", status:"즉시 조치 필요",
      description:"3월 집금 290백만 vs 지급 340백만. 2개월 연속 역전. 마스터 역스윕(54백만)으로 충당 중. 4월 자금 부족 확실시",
      recommended_action:"영업팀 매출 개선 방안 긴급 수립. 고정비(물류·임차) 절감 계획"
    },
    {
      id:"AN-006", date:"2025-03-31",
      account_id:"SA-02", account_name:"강서사업장", ref_id:null,
      type:"예비자금 기준 미달 지속", amount:null, risk_level:"MED", status:"모니터링",
      description:"스윕 후 예비자금 8.81%. 2개월 연속 기준(10%) 미달. 강서 거래처 결제 조건 Net45→Net60일 연장으로 집금 지연",
      recommended_action:"거래처 결제 조건 재협상. 마스터에서 일시 충전 후 단계적 회복"
    },
    {
      id:"AN-007", date:"2025-03-31",
      account_id:"SA-07", account_name:"온라인유통계좌", ref_id:null,
      type:"온라인 채널 수익성 하락", amount:null, risk_level:"MED", status:"분석 중",
      description:"3월 온라인 집금 1,820백만(전월비 +18%) vs 물류+광고비 668백만(전월비 +28%). 온라인 영업이익률 하락 추세",
      recommended_action:"채널별 수익성 분석. 광고비 ROI 재검토 및 물류비 절감 방안 수립"
    },
  ],


  /* ══════════════════════════════════════
     10. BUSINESS_INDICATORS — 경영 지표
     예측의 근거로 사용할 정성·정량 지표
  ══════════════════════════════════════ */
  business_indicators: {

    // ── 회사 성장성 진단 ──
    growth_status: {
      label:       "성장 단계",
      status:      "완만한 성장 (성숙기 진입)",
      summary:     "온라인 채널 급성장(YoY +35%) vs 오프라인 채널 정체(-2.1%). 전체 매출은 성장 중이나 수익성 개선 필요.",
      yoy_revenue_growth_avg_6m:  5.28,  // 최근 6개월 전년 동월 대비 평균 매출 성장률 (%)
      mom_collection_growth_avg:  3.1,   // 최근 6개월 월별 평균 집금 증가율 (%)
      mom_collection_volatility:  4.8,   // 집금 월별 변동성 (표준편차, %) — 높을수록 예측 신뢰도 낮음
      trend_direction:            "상승", // 상승 / 보합 / 하락
      online_growth_momentum:     "강함", // 온라인 채널 성장 모멘텀
    },

    // ── 계절성 인덱스 (월별 집금 계수) ──
    // 1.0 = 연평균, 1.2 = 연평균 대비 20% 높음
    seasonality_index: {
      "01": 0.82,  // 1월: 연초 비수기, 재고 소진 후 발주 지연
      "02": 0.88,  // 2월: 설 이후 완만한 회복
      "03": 1.05,  // 3월: 봄 성수기 시작, 유통 발주 증가
      "04": 1.08,  // 4월: 봄 성수기 지속
      "05": 1.12,  // 5월: 가정의 달 판촉 특수
      "06": 0.98,  // 6월: 여름 전환기 일시 둔화
      "07": 0.95,  // 7월: 여름 비수기
      "08": 0.93,  // 8월: 여름 비수기 심화
      "09": 1.03,  // 9월: 추석 선물세트 수요
      "10": 1.07,  // 10월: 가을 성수기
      "11": 1.10,  // 11월: 김장철 + 연말 수요 증가
      "12": 1.18,  // 12월: 연말 성수기 최대
    },

    // ── 주요 거래처 현황 ──
    key_customers: [
      { name:"쿠팡(주)",       channel:"온라인", share_pct:18.2, payment_days:7,  trend:"급성장", risk:"낮음",  note:"로켓배송 신규 SKU 5종 추가 협의 중. 4월 추가 매출 기대" },
      { name:"이마트(주)",     channel:"오프라인", share_pct:14.8, payment_days:45, trend:"보합",   risk:"낮음",  note:"기존 계약 유지. PB 상품 추가 협의 진행 중" },
      { name:"롯데쇼핑(주)",   channel:"오프라인", share_pct:12.1, payment_days:45, trend:"보합",   risk:"낮음",  note:"특이사항 없음" },
      { name:"홈플러스(주)",   channel:"오프라인", share_pct:11.3, payment_days:60, trend:"하락",   risk:"중간",  note:"구조조정 진행 중. 발주량 전년비 -8% 감소 추세" },
      { name:"네이버파이낸셜", channel:"온라인", share_pct: 9.6, payment_days:7,  trend:"급성장", risk:"낮음",  note:"스마트스토어 입점 브랜드 확대. 월 정산액 증가 추세" },
      { name:"GS리테일(주)",   channel:"오프라인", share_pct: 8.4, payment_days:30, trend:"보합",   risk:"낮음",  note:"편의점 채널 안정적" },
    ],

    // ── 비용 구조 분석 ──
    cost_structure: {
      cogs_ratio:          62.3,  // 매출원가율 (%)
      logistics_ratio:     14.8,  // 매출 대비 물류비 비율 (%) — 온라인 성장으로 상승 추세
      labor_ratio:         17.5,  // 매출 대비 인건비 비율 (%)
      marketing_ratio:      3.2,  // 매출 대비 마케팅비 비율 (%)
      logistics_trend:    "상승", // 물류비 추세 (온라인 채널 성장으로 증가)
      cost_pressure:      "중간", // 전반적 비용 압력
      note: "쿠팡 풀필먼트 비용 3월 기준 매출의 14.8%로 상승. 온라인 수익성 관리 필요."
    },

    // ── 리스크 평가 ──
    risk_factors: [
      { factor:"경기북부사업장 자금 구조", level:"HIGH",   impact:"집금 < 지급 구조 2개월 지속. 4월 마스터 역스윕 불가피. 월 50~60백만 지속 유출 예상.", forecast_adjustment: -60_000_000 },
      { factor:"홈플러스 발주 감소 추세", level:"MED",    impact:"전년비 -8% 감소 중. 4월 이후 월 40~50백만 집금 감소 가능성.", forecast_adjustment: -45_000_000 },
      { factor:"물류비 상승 (온라인)",    level:"MED",    impact:"풀필먼트 비용 매출 대비 14.8%. 온라인 성장에 따라 추가 상승 예상.", forecast_adjustment: -30_000_000 },
      { factor:"강서사업장 예비자금 미달",level:"MED",    impact:"Net60일 결제 조건으로 집금 지연. 단기 유동성 압박.", forecast_adjustment: -20_000_000 },
      { factor:"이상거래 미해결 2건",     level:"HIGH",   impact:"277백만 규모 감사 대기 중. 자금 회수 불확실성 존재.", forecast_adjustment: -50_000_000 },
    ],

    // ── 긍정적 요인 ──
    upside_factors: [
      { factor:"쿠팡 신규 SKU 추가",       impact:"4월 입점 예정 5종. 월 추가 집금 80~100백만 기대.", forecast_adjustment: +90_000_000 },
      { factor:"온라인 채널 성장 모멘텀",  impact:"6개월 연속 온라인 비중 상승(28.4→35.1%). 트렌드 지속 시 월 집금 추가 증가.", forecast_adjustment: +50_000_000 },
      { factor:"3월 집금 역대 최고",       impact:"5,621백만으로 직전 최고치 대비 +7.2%. 기저 효과 일부 포함.", forecast_adjustment: 0 },
    ],

    // ── 업계 동향 ──
    industry_context: {
      industry:        "식음료 제조·도소매",
      market_trend:    "온라인 식품 시장 연 15% 성장. 오프라인 대형마트 채널 정체.",
      inflation_rate:   2.8,   // 소비자물가 상승률 (%)
      raw_material_trend: "곡물·유지류 국제 가격 소폭 안정화. 원가 압력 완화 예상.",
      competitor_trend: "경쟁사 온라인 투자 확대 중. 쿠팡 입점 경쟁 심화.",
      regulatory_note:  "식품 위생법 강화로 검사 비용 증가 예상 (분기당 약 10백만).",
    },
  },

};
