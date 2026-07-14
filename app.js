/* ============ 데이터 정의 ============ */
/* item: [평가문구, 확인유형, 상담질문/관찰포인트]
   확인유형: Q=질문(원에 물어봄) · O=관찰(눈으로 확인) · R=후기/사전조사 */
const CATEGORIES = [
  { id:"philosophy", name:"교육철학", weight:20, items:[
    ["자유놀이 시간이 충분하다 (하루 일과 중 비중)", "Q", "하루 일과 중 자유놀이 시간이 몇 분 정도 되나요?"],
    ["선행학습보다 경험·과정을 중시한다", "Q", "한글·숫자 학습지 같은 선행학습은 어느 정도 진행하시나요?"],
    ["아이가 싫어하는 활동일 때 자율성을 존중한다", "Q", "아이가 하기 싫어하는 활동이 있으면 어떻게 하시나요?"],
    ["원장의 교육철학이 우리 가족과 잘 맞는다", "R", "원장님이 생각하는 좋은 유아교육이 뭔지 들어보고, 후기와 함께 판단"],
  ]},
  { id:"teacher", name:"선생님", weight:25, star:true, items:[
    ["아이 이름 부르는 태도·말투가 따뜻하다", "O", "상담 중 선생님이 아이를 대하는 표정·말투를 관찰"],
    ["아이를 재촉하지 않고 기다려준다", "O", "아이가 느리게 할 때 재촉하는지, 기다려주는지 관찰"],
    ["만3세 교사 1명당 아이 수가 적절하다", "Q", "만3세 반은 선생님 1명당 아이 몇 명을 보시나요?"],
    ["교사 평균 근속연수가 긴 편이다 (이직률 낮음)", "R", "유치원알리미 공시 또는 '선생님들 평균 근무 연차가 어느 정도인가요?'"],
  ]},
  { id:"play", name:"놀이·자연환경", weight:20, items:[
    ["아이 작품이 제각각이다 (똑같은 틀이 아님)", "O", "복도·교실 작품이 다 비슷한 모양인지, 제각각인지 관찰 (핵심)"],
    ["블록·역할놀이 등 놀이공간이 잘 구성돼 있다", "O", "교실 놀이영역이 실제로 잘 꾸며져 있는지 관찰"],
    ["숲체험 등 자연활동이 정기적이다", "Q", "숲체험은 얼마나 자주, 어디로 가나요?"],
    ["날씨 나쁜 날 실내 대체활동이 잘 돼 있다", "Q", "미세먼지·비 오는 날은 바깥활동을 어떻게 대체하나요?"],
  ]},
  { id:"safety", name:"안전·적응", weight:20, items:[
    ["만3세 입학 적응 프로그램이 있다 (단축수업 등)", "Q", "처음 오는 만3세 아이 적응 프로그램이 따로 있나요?"],
    ["배변실수 대응이 세심하다", "Q", "배변 실수하면 어떻게 대응해주시나요? 여벌옷은 저희가 보내나요?"],
    ["낮잠·휴식 운영이 아이에게 맞다", "Q", "낮잠이나 휴식 시간은 어떻게 운영되나요?"],
    ["안전훈련을 정기적으로 한다", "Q", "화재·지진 등 안전훈련은 얼마나 자주 하나요?"],
  ]},
  { id:"practical", name:"현실 조건", weight:15, items:[
    ["통학버스 노선·편도 시간이 적당하다", "Q", "저희 집(단지명) 쪽으로 버스가 오나요? 편도 몇 분 걸리나요?"],
    ["급식·간식이 만족스럽다 (원내조리·죽·대체식)", "Q", "급식은 원내 조리인가요? 오전 죽·알레르기 대체식이 되나요?"],
    ["원비 외 추가비용이 부담 없다", "Q", "원비 외에 특별활동비·원복비 등 추가로 얼마나 드나요?"],
  ]},
];
const TOTAL_ITEMS = CATEGORIES.reduce((n,c)=>n+c.items.length,0);
/* 결격체크: 거의 모든 원이 기본으로 갖추거나, 물어보면 '예'가 나오는 항목 → 점수 대신 O/X */
const DISQ = [
  ["통학차량에 동승교사가 상시 탑승한다", "차량에 기사님 외 동승 선생님이 항상 타시나요?"],
  ["시설이 안전하고 청결하다", "참관 시 교실·화장실·급식실 청결 상태를 직접 관찰"],
  ["키즈노트 등 소통 수단을 운영한다", "하원 후 그날 활동을 어떻게 알려주시나요?"],
  ["원장·교사가 부모 질문을 불편해하지 않는다", "상담 중 질문에 성의 있게 답하는지 관찰"],
  ["CCTV 설치·안전점검에 문제가 없다", "유치원알리미 공시 또는 참관 시 확인"],
];
const TYPE_META = {
  Q: { label:"질문", color:"#2F7D5B", bg:"#EAF4EE" },
  O: { label:"관찰", color:"#B07A00", bg:"#FFF6DC" },
  R: { label:"후기", color:"#5A6ACF", bg:"#ECEEFB" },
};
const INFO_GROUPS = [
  { name:"사전조사 (유치원알리미·후기)", fields:[
    ["설립유형","예: 사립(법인)"],["월 원비 총액","예: 28만원"],
    ["입학금·초기비용","예: 입학금 10만, 원복 15만"],
    ["학급당 인원 / 교사 비율","예: 16명 / 교사1+보조1"],
    ["교사 평균 근속연수","예: 4.2년"],["만3세 모집인원","예: 32명 (2학급)"],
    ["방과후(돌봄) 운영시간","예: ~17:30"],["후기 요약","맘카페 등에서 본 평"],
  ]},
  { name:"통학", fields:[
    ["버스 등원/하원 시간","예: 08:50 / 15:10"],["우리 아파트 정차","O / X, 위치"],
    ["버스 탑승시간(편도)","예: 약 15분"],["차량 동승교사","O / X"],
  ]},
  { name:"식사", fields:[
    ["오전 간식 (죽 제공)","예: 죽 제공 O"],["원내 조리 여부","예: O, 영양사 상주"],
    ["급식 특이사항","예: 알레르기 대체식"],
  ]},
  { name:"활동", fields:[
    ["바깥놀이 빈도/시간","예: 매일 40분"],["숲체험 주기","예: 주 1회"],
    ["특별활동 / 비용","예: 영어 별도 5만원"],
  ]},
  { name:"생활·적응", fields:[
    ["낮잠/휴식 운영","예: 낮잠 없음, 휴식 30분"],["입학 초 적응 프로그램","예: 첫 2주 단축수업"],
    ["배변실수 등 생활지도","예: 여벌옷 보관"],
  ]},
  { name:"소통·입학", fields:[
    ["키즈노트/사진 빈도","예: 주 2~3회"],["모집 방식 / 일정","예: 처음학교로, 11월 초"],
    ["작년 경쟁률","예: 약 1.5:1"],
  ]},
];
const FINAL_Q = [
  { v:3, label:"망설임 없이 “네!”" },
  { v:2, label:"조금 더 고민해 보고 싶다" },
  { v:1, label:"다른 유치원이 더 끌린다" },
];
const APP_ID = "dojun-kg-notebook";
const DATA_VERSION = 3;
const STORAGE_KEY = "dojun-kg-notebook-v2";
const SCORE_KEYS = new Set(CATEGORIES.flatMap(cat =>
  cat.items.map((_, index) => `${cat.id}-${index}`)
));
const INFO_KEYS = new Set(INFO_GROUPS.flatMap(group =>
  group.fields.map(([label]) => label)
));
const FINAL_VALUES = new Set(FINAL_Q.map(item => item.v));

/* ============ 상태 ============ */
let data = { kindergartens: [] };
let view = "list";
let selId = null;
let detailTab = "score";
let openInfoGroup = 0;
let confirmDel = false;
let saveTimer = null;

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    data = normalizeData(raw ? JSON.parse(raw) : null);
  }catch(e){
    data = normalizeData(null);
    console.warn("load failed", e);
  }
}
function save(immediate = false){
  const el = document.getElementById("saveState");
  if(el) el.textContent = "저장 중…";
  clearTimeout(saveTimer);
  saveTimer = null;
  if(immediate){
    persistData();
    return;
  }
  saveTimer = setTimeout(persistData, 300);
}

function persistData(){
  const el = document.getElementById("saveState");
  saveTimer = null;
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if(el){
      el.textContent = "✓ 저장됨";
      setTimeout(()=>{ el.textContent = ""; }, 1500);
    }
  }catch(e){
    if(el) el.textContent = "저장 실패";
    console.warn("save failed", e);
  }
}

function createId(){
  if(window.crypto && typeof window.crypto.randomUUID === "function"){
    return window.crypto.randomUUID();
  }
  return Date.now().toString(36)+Math.random().toString(36).slice(2,10);
}

function newKg(){
  return {
    id: createId(),
    name:"", scores:{}, disq:{}, info:{},
    firstImpression:0, finalQ:0, memo:"",
    updatedAt: Date.now(),
  };
}

function isRecord(value){
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value, maxLength){
  return typeof value === "string" ? value.slice(0, maxLength) : "";
}

function normalizeKg(raw, usedIds){
  const source = isRecord(raw) ? raw : {};
  const safeId = typeof source.id === "string"
    ? source.id.trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80)
    : "";
  let id = safeId || createId();
  while(usedIds && usedIds.has(id)) id = createId();
  if(usedIds) usedIds.add(id);

  const scores = {};
  if(isRecord(source.scores)){
    Object.entries(source.scores).forEach(([key, value])=>{
      const score = Number(value);
      if(SCORE_KEYS.has(key) && Number.isInteger(score) && score >= 1 && score <= 5){
        scores[key] = score;
      }
    });
  }

  const disq = {};
  if(isRecord(source.disq)){
    Object.entries(source.disq).forEach(([key, value])=>{
      const index = Number(key);
      if(Number.isInteger(index) && index >= 0 && index < DISQ.length && (value === "O" || value === "X")){
        disq[index] = value;
      }
    });
  }

  const info = {};
  if(isRecord(source.info)){
    Object.entries(source.info).forEach(([key, value])=>{
      if(INFO_KEYS.has(key) && typeof value === "string") info[key] = value.slice(0, 2000);
    });
  }

  const firstImpression = Number(source.firstImpression);
  const finalQ = Number(source.finalQ);
  const updatedAt = Number(source.updatedAt);
  return {
    id,
    name: normalizeText(source.name, 40),
    scores,
    disq,
    info,
    firstImpression: Number.isInteger(firstImpression) && firstImpression >= 0 && firstImpression <= 5 ? firstImpression : 0,
    finalQ: FINAL_VALUES.has(finalQ) ? finalQ : 0,
    memo: normalizeText(source.memo, 20000),
    updatedAt: Number.isFinite(updatedAt) && updatedAt > 0 ? updatedAt : Date.now(),
  };
}

function normalizeData(raw){
  const usedIds = new Set();
  const source = isRecord(raw) && Array.isArray(raw.kindergartens) ? raw.kindergartens : [];
  return {
    version: DATA_VERSION,
    kindergartens: source.filter(isRecord).map(kg => normalizeKg(kg, usedIds)),
  };
}

function getKg(id){ return data.kindergartens.find(k=>k.id===id); }
function touch(kg){ if(kg) kg.updatedAt = Date.now(); }
function updateKg(id, patch){
  const kg = getKg(id);
  if(!kg) return;
  Object.assign(kg, patch);
  touch(kg);
  save(); render();
}
function catScore(kg, cat){
  const vals = cat.items.map((_,i)=>kg.scores[cat.id+"-"+i]).filter(v=>v>=1);
  if(!vals.length) return null;
  return Math.round((vals.reduce((a,b)=>a+b,0)/vals.length/5)*cat.weight*10)/10;
}
function totalScore(kg){
  let sum=0, any=false;
  for(const c of CATEGORIES){ const s=catScore(kg,c); if(s!==null){ sum+=s; any=true; } }
  return any ? Math.round(sum*10)/10 : null;
}
function filledCount(kg){ return Object.values(kg.scores).filter(v=>v>=1).length; }
function disqCount(kg){ return DISQ.filter((_,i)=>kg.disq[i]==="X").length; }
function esc(s){ return (s||"").replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }

function icon(name, sizeClass){
  const paths = {
    leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 2 17 2c0 7-2 12-7 13"/><path d="M2 21c0-3 1.85-5.36 5.08-6.94C9.05 13.1 12 12 16 12"/>',
    notebook:'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3Z"/><path d="M21 18a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2h-5a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3Z"/>',
    scale:'<path d="m16 16 3-8 3 8a5 5 0 0 1-6 0"/><path d="m2 16 3-8 3 8a5 5 0 0 1-6 0"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  };
  const safeSize = sizeClass === "icon-md" ? "icon-md" : "icon-sm";
  return `<svg class="app-icon ${safeSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || ""}</svg>`;
}

/* ============ 렌더링 ============ */
function stampHtml(score, size){
  size = size||64;
  const has = score!==null && score!==undefined;
  return `<div class="stamp ${has?'filled':'empty'}" style="width:${size}px;height:${size}px;">
    <span class="num" style="font-size:${size*0.34}px;">${has?score:'—'}</span>
    <span class="den" style="font-size:${size*0.15}px; color:${has?'var(--ink)':'var(--sub)'};">/ 100</span>
  </div>`;
}

function renderList(){
  const kgs = data.kindergartens;
  let html = "";

  html += `<div class="toolbar">
    <button class="tool-btn" id="exportBtn">내보내기</button>
    <button class="tool-btn" id="importBtn">📂 불러오기</button>
  </div>`;
  if(kgs.length===0){
    html += `<div class="empty-state">
      <div class="emoji">🌱</div>
      <p class="jua lead">첫 유치원을 등록해 보세요</p>
      <p>설명회·상담을 다녀온 뒤 녹음을 들으며<br>점수를 매기면 자동으로 저장돼요.</p>
    </div>`;
  }
  kgs.forEach(kg=>{
    const total = totalScore(kg);
    const dq = disqCount(kg);
    const filled = filledCount(kg);
    const isBlank = !kg.name && filled===0 && !kg.memo && Object.keys(kg.info||{}).length===0 && Object.values(kg.disq||{}).every(v=>!v);
    html += `<article class="card kg-card kg-card-shell">
      <button class="kg-card-open" data-open="${kg.id}" aria-label="${esc(kg.name)||'이름 미입력'} 기록 열기">
        ${stampHtml(total,64)}
        <div class="kg-card-main">
          <div class="jua kg-name" style="color:${kg.name?'var(--ink)':'var(--sub)'}">${esc(kg.name)||'이름 미입력'}</div>
          <div class="kg-meta">
            <span>평가 ${filled}/${TOTAL_ITEMS}</span>
            ${kg.firstImpression>0?`<span style="color:#C9971C">${'★'.repeat(kg.firstImpression)}</span>`:''}
            ${dq>0?`<span style="color:var(--coral); font-weight:700;">결격 ${dq}건</span>`:''}
            ${kg.finalQ===3?`<span style="color:var(--green); font-weight:700;">바로 선택</span>`:''}
            ${isBlank?`<span style="color:var(--coral); font-weight:800;">미작성</span>`:''}
          </div>
        </div>
        <span class="chev">${icon("chevron","icon-sm")}</span>
      </button>
      <div class="kg-card-actions">
        <button class="kg-action-btn" data-rename="${kg.id}">${icon("notebook","icon-sm")} 이름 수정</button>
        <button class="kg-action-btn danger" data-delete-list="${kg.id}">${icon("trash","icon-sm")} 삭제</button>
      </div>
    </article>`;
  });
  html += `<button class="add-btn jua" id="addKgBtn">유치원 추가</button>`;
  html += `<p class="hint">방문 전엔 <b>유치원알리미</b>에서 원비·학급 인원·교사 근속을 미리 확인하고,
    11월 <b>처음학교로</b> 접수 때 1·2·3지망을 정해야 하니 3곳 이상 비교해 두면 좋아요.</p>`;


  html += `<section class="usage-guide" aria-labelledby="usageGuideTitle">
    <h2 id="usageGuideTitle">📱 처음 사용하는 분을 위한 안내</h2>
    <p class="guide-lead">회원가입 없이 바로 사용할 수 있고, 기록은 현재 기기의 브라우저에만 저장됩니다.</p>
    <div class="guide-grid">

      <details class="guide-item">
        <summary>백업하기</summary>
        <div class="guide-body">
          <p><b>내보내기</b>를 누르면 현재 기록 전체가 JSON 파일로 저장됩니다.</p>
          <ul>
            <li>아이폰: 파일 앱 또는 iCloud Drive에 저장</li>
            <li>안드로이드: 다운로드 폴더 또는 Google Drive에 저장</li>
            <li>기기 교체 전에는 반드시 한 번 백업하는 것을 권장</li>
          </ul>
        </div>
      </details>

      <details class="guide-item">
        <summary>다른 기기에서 복원하기</summary>
        <div class="guide-body">
          <ol>
            <li>새 기기에서 같은 페이지를 엽니다.</li>
            <li><b>불러오기</b>를 누릅니다.</li>
            <li>이전에 저장한 JSON 백업 파일을 선택합니다.</li>
            <li><b>병합하기</b> 또는 <b>전체 교체</b>를 선택합니다.</li>
          </ol>
          <div class="guide-note"><b>병합하기</b>는 기존 기록과 합치고, <b>전체 교체</b>는 현재 기록을 백업 내용으로 바꿉니다.</div>
        </div>
      </details>

      <details class="guide-item">
        <summary>데이터는 어디에 저장되나요?</summary>
        <div class="guide-body">
          <p>입력한 기록은 GitHub나 외부 서버가 아니라 <b>현재 브라우저의 localStorage</b>에 저장됩니다.</p>
          <ul>
            <li>사용자끼리 기록이 서로 보이지 않습니다.</li>
            <li>다른 기기에는 자동으로 동기화되지 않습니다.</li>
            <li>브라우저 데이터 삭제 시 기록이 사라질 수 있으므로 정기 백업이 필요합니다.</li>
          </ul>
        </div>
      </details>
    </div>
  </section>`;

  if(!isStandaloneMode()){
    html += `<section class="install-card" id="installCard">
      <div class="install-card-icon">📲</div>
      <div class="install-card-copy">
        <h2 class="install-card-title">홈 화면에 추가</h2>
        <p class="install-card-desc">유치원 기록을 확인한 뒤, 자주 사용한다면 홈 화면에 추가해 앱처럼 바로 열 수 있어요.</p>
      </div>
      <button class="install-btn" id="installGuideBtn">추가 방법</button>
    </section>`;
  }
  return html;
}

function renderDetail(kg){
  const total = totalScore(kg);
  const dq = disqCount(kg);

  let head = `<div class="card detail-head">
    ${stampHtml(total,72)}
    <div style="flex:1;">
      <label class="small">유치원 이름</label>
      <input class="name-input jua" id="kgNameInput" value="${esc(kg.name)}" placeholder="예: 푸른숲유치원">
      ${dq>0?`<div class="disq-warn">결격 ${dq}건 — 총점과 무관하게 보류 권장</div>`:''}
    </div>
  </div>`;

  let tabs = `<div class="tabbar">
    <button class="tab-btn ${detailTab==='score'?'active':''}" data-tab="score">평가</button>
    <button class="tab-btn ${detailTab==='questions'?'active':''}" data-tab="questions">질문지</button>
    <button class="tab-btn ${detailTab==='info'?'active':''}" data-tab="info">메모</button>
  </div>`;

  let body = "";
  if(detailTab==="score"){
    body += `<p class="hint" style="margin-top:10px;">녹음을 들으며 한 항목씩 눌러 주세요. <b>1=아니다 · 3=보통 · 5=매우 그렇다</b>. 확인 못 한 건 비워둬도 돼요.</p>`;
    CATEGORIES.forEach(cat=>{
      const cs = catScore(kg, cat);
      body += `<div class="section-title">
        <span class="dot"></span>
        <h3 class="jua">${cat.name}${cat.star?' ⭐':''}</h3>
        <span class="badge" style="color:${cs!==null?'var(--greenDark)':'var(--sub)'}; background:${cs!==null?'var(--greenTint)':'transparent'};">${cs!==null?cs:'—'} / ${cat.weight}점</span>
      </div>`;
      body += `<div class="card" style="overflow:hidden;">`;
      cat.items.forEach((item,i)=>{
        const [label, type, question] = item;
        const tm = TYPE_META[type];
        const val = kg.scores[cat.id+"-"+i] || 0;
        body += `<div class="item-row">
          <div class="item-label">
            <span class="type-badge" style="color:${tm.color}; background:${tm.bg};">${tm.label}</span>
            <span>${esc(label)}</span>
          </div>
          <div class="item-q"><span class="qmark">${type==='O'?'👀':type==='R'?'📄':'💬'}</span>${esc(question)}</div>
          <div class="chips">`;
        for(let n=1;n<=5;n++){
          body += `<button class="chip ${val===n?'on':''}" data-score-cat="${cat.id}" data-score-idx="${i}" data-score-val="${n}">${n}</button>`;
        }
        body += `</div></div>`;
      });
      body += `</div>`;
    });

    body += `<div class="section-title"><span class="dot"></span><h3 class="jua">결격 체크 (기본 조건)</h3></div>`;
    body += `<div class="card" style="overflow:hidden; border:1.5px solid ${dq>0?'var(--coral)':'var(--line)'};">
      <div class="disq-hdr">대부분 원이 기본으로 갖춘 항목이에요. 하나라도 X면 점수와 무관하게 보류!</div>`;
    DISQ.forEach((item,i)=>{
      const [label, how] = item;
      const v = kg.disq[i]||"";
      body += `<div class="disq-row">
        <span class="label">${esc(label)}<div class="q-sub" style="margin-top:3px;">${esc(how)}</div></span>
        <button class="ox-btn ${v==='O'?'on-o':''}" data-disq-idx="${i}" data-disq-val="O">O</button>
        <button class="ox-btn ${v==='X'?'on-x':''}" data-disq-idx="${i}" data-disq-val="X">X</button>
      </div>`;
    });
    body += `</div>`;

    body += `<div class="section-title"><span class="dot"></span><h3 class="jua">첫인상</h3></div>
    <div class="card" style="padding:16px;">
      <div style="font-size:14px; margin-bottom:10px;">집에 오는 길에도 계속 생각나는 유치원이었다</div>
      <div class="stars">`;
    for(let n=1;n<=5;n++){
      body += `<button class="${n<=kg.firstImpression?'on':''}" data-star="${n}">${n<=kg.firstImpression?'★':'☆'}</button>`;
    }
    body += `</div></div>`;

    body += `<div class="section-title"><span class="dot"></span><h3 class="jua">마지막 질문</h3></div>
    <div class="final-box">
      <div class="final-q">“오늘 바로 입학을 결정해야 한다면,<br>나는 이 유치원을 선택할까?”</div>`;
    FINAL_Q.forEach(o=>{
      const on = kg.finalQ===o.v;
      body += `<button class="final-opt ${on?'on':''}" data-finalq="${o.v}">${on?'✓ ':''}${o.label}</button>`;
    });
    body += `</div>`;

    body += `<div class="section-title"><span class="dot"></span><h3 class="jua">메모</h3></div>
    <textarea class="memo" id="memoInput" placeholder="녹음 들으며 느낀 점, 기억할 것…">${esc(kg.memo)}</textarea>`;
  } else if(detailTab==="questions"){
    body += `<p class="q-intro">상담 때 그대로 물어보거나 관찰하시면 돼요. <b style="color:var(--green);">질문</b>은 원에 묻는 것, <b style="color:#B07A00;">관찰</b>은 눈으로 볼 것, <b style="color:#5A6ACF;">후기</b>는 유치원알리미·맘카페로 미리 확인할 것이에요.</p>`;
    let copyText = "🩵 유치원 상담 질문 리스트 🩵\\n";
    CATEGORIES.forEach(cat=>{
      body += `<div class="q-cat">
        <div class="q-cat-title">${cat.name}${cat.star?' ⭐':''}</div>
        <div class="q-list">`;
      copyText += `\\n■ ${cat.name}\\n`;
      cat.items.forEach(item=>{
        const [label, type, question] = item;
        const tm = TYPE_META[type];
        const icon = type==='O'?'👀':type==='R'?'📄':'💬';
        body += `<div class="q-item">
          <span class="type-badge" style="color:${tm.color}; background:${tm.bg};">${tm.label}</span>
          <div>
            <div class="q-text">${icon} ${esc(question)}</div>
            <div class="q-sub">→ 평가: ${esc(label)}</div>
          </div>
        </div>`;
        copyText += `${icon} ${question}\\n`;
      });
      body += `</div></div>`;
    });
    // 결격 확인 질문
    body += `<div class="q-cat">
      <div class="q-cat-title">결격 확인</div>
      <div class="q-list">`;
    copyText += `\\n■ 결격 확인 (하나라도 아니면 보류)\\n`;
    DISQ.forEach(item=>{
      const [label, how] = item;
      body += `<div class="q-item">
        <span class="type-badge" style="color:var(--coral); background:var(--coralTint);">필수</span>
        <div><div class="q-text">${esc(how)}</div><div class="q-sub">→ ${esc(label)}</div></div>
      </div>`;
      copyText += `• ${how}\\n`;
    });
    body += `</div></div>`;
    // 마지막 필수 질문
    body += `<div class="q-cat">
      <div class="q-cat-title">마지막에 꼭</div>
      <div class="q-list">
        <div class="q-item"><span class="type-badge" style="color:var(--green); background:var(--greenTint);">질문</span><div class="q-text">만3세 모집 정원과 학급 수는 어떻게 되나요?</div></div>
        <div class="q-item"><span class="type-badge" style="color:var(--green); background:var(--greenTint);">질문</span><div class="q-text">지금 대기 인원이 있나요? 작년 경쟁률은 어느 정도였나요?</div></div>
      </div>
    </div>`;
    copyText += `\\n■ 마지막에 꼭\\n만3세 모집 정원과 학급 수는?\\n대기 인원·작년 경쟁률은?\\n`;
    body += `<button class="copy-btn" id="copyQBtn" data-copy="${esc(copyText)}">질문 리스트 전체 복사</button>`;
  } else {
    body += `<p class="hint" style="margin-top:10px;">윗부분은 방문 전 <b>유치원알리미·후기</b>로, 아랫부분은 상담 후 녹음을 들으며 채워 주세요.</p>`;
    INFO_GROUPS.forEach((g, gi)=>{
      const open = openInfoGroup===gi;
      const filledN = g.fields.filter(([label])=>(kg.info[label]||"").trim()).length;
      body += `<div class="card info-group">
        <button class="info-hdr ${open?'open':''}" data-infogroup="${gi}">
          <span class="jua gname">${g.name}</span>
          <span class="count">${filledN}/${g.fields.length}</span>
          <span class="arrow">›</span>
        </button>`;
      if(open){
        g.fields.forEach(([label,ph],fi)=>{
          body += `<div class="info-field">
            <label class="small" style="display:block; margin-bottom:4px;">${label}</label>
            <input data-info-label="${esc(label)}" value="${esc(kg.info[label]||'')}" placeholder="${esc(ph)}">
          </div>`;
        });
      }
      body += `</div>`;
    });
  }

  let delZone = `<div class="del-zone">`;
  if(!confirmDel){
    delZone += `<button class="del-link" id="delAskBtn">이 유치원 기록 삭제</button>`;
  } else {
    delZone += `<div class="del-confirm">
      <div class="msg">기록을 완전히 삭제할까요?</div>
      <button class="btn-danger" id="delConfirmBtn">삭제</button>
      <button class="btn-cancel" id="delCancelBtn">취소</button>
    </div>`;
  }
  delZone += `</div>`;

  return head + tabs + body + delZone;
}

function renderCompare(){
  const kgs = [...data.kindergartens].sort((a,b)=>(totalScore(b)??-1)-(totalScore(a)??-1));
  if(kgs.length===0){
    return `<div style="text-align:center; padding:60px 20px; color:var(--sub); font-size:14px; line-height:1.7;">
      아직 등록된 유치원이 없어요.<br>목록에서 유치원을 추가하고 점수를 매겨 보세요.
    </div>`;
  }
  const best = kgs.find(k=>totalScore(k)!==null && disqCount(k)===0);
  let html = "";
  if(best){
    html += `<div class="card best-card">
      ${stampHtml(totalScore(best),68)}
      <div>
        <div class="best-label">현재 1순위</div>
        <div class="jua best-name">${esc(best.name)||'이름 미입력'}</div>
        ${best.firstImpression>0?`<div style="color:var(--yellow); font-size:14px;">${'★'.repeat(best.firstImpression)}<span style="color:var(--line)">${'★'.repeat(5-best.firstImpression)}</span></div>`:''}
      </div>
    </div>`;
  }

  html += `<div class="card table-wrap"><table>
    <thead><tr><th class="label-col">항목</th>
    ${kgs.map(k=>`<th><button class="link-btn" data-open="${k.id}">${esc(k.name)||'미입력'}</button></th>`).join('')}
    </tr></thead><tbody>
    <tr class="total-row"><td class="label-col" style="font-weight:800;">총점</td>
    ${kgs.map(k=>`<td class="big">${totalScore(k)??'—'}</td>`).join('')}
    </tr>`;
  CATEGORIES.forEach(c=>{
    html += `<tr><td class="label-col">${c.name} <span style="color:var(--sub); font-size:11px;">/${c.weight}</span></td>
    ${kgs.map(k=>`<td>${catScore(k,c)??'—'}</td>`).join('')}
    </tr>`;
  });
  html += `<tr><td class="label-col" style="color:var(--coral); font-weight:700;">결격(X)</td>
    ${kgs.map(k=>{ const d=disqCount(k); return `<td style="color:${d?'var(--coral)':'var(--sub)'}; font-weight:${d?800:400};">${d?d+'건':'없음'}</td>`; }).join('')}
    </tr>
    <tr><td class="label-col">첫인상</td>
    ${kgs.map(k=>`<td style="color:#C9971C;">${k.firstImpression?'★'.repeat(k.firstImpression):'—'}</td>`).join('')}
    </tr>
    <tr><td class="label-col">바로 결정?</td>
    ${kgs.map(k=>`<td style="font-size:12px;">${k.finalQ===3?'네!':k.finalQ===2?'고민':k.finalQ===1?'다른 곳':'—'}</td>`).join('')}
    </tr>
    <tr><td class="label-col">평가 진행</td>
    ${kgs.map(k=>`<td style="color:var(--sub); font-size:12px;">${filledCount(k)}/${TOTAL_ITEMS}</td>`).join('')}
    </tr>
    </tbody></table></div>`;

  html += `<p class="hint">총점 순으로 정렬돼요. <b>처음학교로</b> 접수 땐 1·2·3지망이 필요하니
    총점 + 첫인상 + 결격 여부를 함께 보고 순위를 정하세요. 점수가 비슷하면 첫인상이 답인 경우가 많아요.</p>`;

  return html;
}


function injectStaticIcons(){
  const map = {
    eyebrowIcon:["leaf","icon-sm"],
    navListIcon:["notebook","icon-md"],
    navCompareIcon:["scale","icon-md"]
  };
  Object.entries(map).forEach(([id,args])=>{
    const el=document.getElementById(id);
    if(el) el.innerHTML=icon(args[0],args[1]);
  });
}

function render(){
  const main = document.getElementById("main");
  const backBtn = document.getElementById("backBtn");
  const subtitle = document.getElementById("subtitleText");

  document.querySelectorAll(".nav-tab").forEach(btn=>{
    const v = btn.dataset.view;
    btn.classList.toggle("active", view===v || (v==="list" && view==="detail"));
  });

  if(view==="list"){
    backBtn.style.display = "none";
    subtitle.textContent = "2027학년도 입학 준비";
    main.innerHTML = renderList();
  } else if(view==="detail"){
    backBtn.style.display = "inline-block";
    subtitle.textContent = "상담 기록하기";
    const kg = getKg(selId);
    if(!kg){ view="list"; render(); return; }
    main.innerHTML = renderDetail(kg);
  } else {
    backBtn.style.display = "inline-block";
    subtitle.textContent = "한눈에 비교하기";
    main.innerHTML = renderCompare();
  }
  bindEvents();
  injectStaticIcons();
}

function bindEvents(){
  const main = document.getElementById("main");

  main.querySelectorAll("[data-open]").forEach(el=>{
    el.addEventListener("click", ()=>{
      selId = el.dataset.open; view="detail"; detailTab="score"; confirmDel=false; render();
    });
  });

  main.querySelectorAll("[data-rename]").forEach(el=>{
    el.addEventListener("click", (e)=>{
      e.stopPropagation();
      showKgNameModal({ mode:"rename", id:el.dataset.rename });
    });
  });

  main.querySelectorAll("[data-delete-list]").forEach(el=>{
    el.addEventListener("click", (e)=>{
      e.stopPropagation();
      showListDeleteModal(el.dataset.deleteList);
    });
  });

  const installGuideBtn = document.getElementById("installGuideBtn");
  if(installGuideBtn) installGuideBtn.addEventListener("click", handleInstallAction);

  const exportBtn = document.getElementById("exportBtn");
  if(exportBtn) exportBtn.addEventListener("click", exportData);
  const importBtn = document.getElementById("importBtn");
  if(importBtn) importBtn.addEventListener("click", ()=>{ document.getElementById("importFileInput").click(); });

  const addBtn = document.getElementById("addKgBtn");
  if(addBtn) addBtn.addEventListener("click", ()=>{
    showKgNameModal({ mode:"add" });
  });

  const nameInput = document.getElementById("kgNameInput");
  if(nameInput) nameInput.addEventListener("input", (e)=>{
    const kg = getKg(selId); kg.name = e.target.value; touch(kg); save();
    // 헤더 재계산 없이 목록/비교에 반영되도록만 저장 (입력 중 재렌더 방지)
  });
  if(nameInput) nameInput.addEventListener("blur", render);

  main.querySelectorAll(".tab-btn").forEach(el=>{
    el.addEventListener("click", ()=>{ detailTab = el.dataset.tab; render(); });
  });

  const copyBtn = document.getElementById("copyQBtn");
  if(copyBtn) copyBtn.addEventListener("click", ()=>{
    const text = copyBtn.dataset.copy;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(()=>toast("질문 리스트를 복사했어요")).catch(()=>fallbackCopy(text));
    } else { fallbackCopy(text); }
  });

  main.querySelectorAll("[data-score-cat]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const kg = getKg(selId);
      const key = el.dataset.scoreCat+"-"+el.dataset.scoreIdx;
      const v = parseInt(el.dataset.scoreVal,10);
      if(kg.scores[key] === v) delete kg.scores[key];
      else kg.scores[key] = v;
      touch(kg); save(); render();
    });
  });

  main.querySelectorAll("[data-disq-idx]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const kg = getKg(selId);
      const i = el.dataset.disqIdx;
      const v = el.dataset.disqVal;
      if(kg.disq[i] === v) delete kg.disq[i];
      else kg.disq[i] = v;
      touch(kg); save(); render();
    });
  });

  main.querySelectorAll("[data-star]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const kg = getKg(selId);
      const v = parseInt(el.dataset.star,10);
      kg.firstImpression = (kg.firstImpression===v) ? 0 : v;
      touch(kg); save(); render();
    });
  });

  main.querySelectorAll("[data-finalq]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const kg = getKg(selId);
      const v = parseInt(el.dataset.finalq,10);
      kg.finalQ = (kg.finalQ===v) ? 0 : v;
      touch(kg); save(); render();
    });
  });

  const memoInput = document.getElementById("memoInput");
  if(memoInput) memoInput.addEventListener("input", (e)=>{
    const kg = getKg(selId); kg.memo = e.target.value; touch(kg); save();
  });

  main.querySelectorAll("[data-infogroup]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const gi = parseInt(el.dataset.infogroup,10);
      openInfoGroup = (openInfoGroup===gi) ? -1 : gi;
      render();
    });
  });

  main.querySelectorAll("[data-info-label]").forEach(el=>{
    el.addEventListener("input", (e)=>{
      const kg = getKg(selId);
      kg.info[el.dataset.infoLabel] = e.target.value;
      touch(kg); save();
    });
  });

  const delAsk = document.getElementById("delAskBtn");
  if(delAsk) delAsk.addEventListener("click", ()=>{ confirmDel=true; render(); });
  const delCancel = document.getElementById("delCancelBtn");
  if(delCancel) delCancel.addEventListener("click", ()=>{ confirmDel=false; render(); });
  const delConfirm = document.getElementById("delConfirmBtn");
  if(delConfirm) delConfirm.addEventListener("click", ()=>{
    data.kindergartens = data.kindergartens.filter(k=>k.id!==selId);
    view="list"; confirmDel=false;
    save(true); render();
  });
}


/* ============ 유치원 추가·수정·삭제 모달 ============ */
function showKgNameModal({mode, id}){
  const isAdd = mode === "add";
  const kg = id ? getKg(id) : null;
  const currentName = kg ? kg.name : "";
  const title = isAdd ? "유치원 추가" : "유치원 이름 수정";
  const desc = isAdd
    ? "이름을 입력한 뒤 추가하면 목록에 저장됩니다. 취소하면 빈 기록이 생기지 않습니다."
    : "목록과 비교 화면에 표시될 이름을 수정합니다.";

  document.getElementById("modalRoot").innerHTML = `
  <div class="modal-backdrop" id="nameModalBackdrop">
    <div class="modal-box">
      <div class="modal-title jua">${title}</div>
      <div class="modal-body">${desc}</div>
      <input class="name-modal-input" id="nameModalInput" value="${esc(currentName)}" placeholder="예: 푸른숲유치원" maxlength="40">
      <div class="modal-actions" style="margin-top:16px;">
        <button class="confirm" id="nameModalSave">${isAdd ? "추가" : "저장"}</button>
        <button class="cancel" id="nameModalCancel">취소</button>
      </div>
    </div>
  </div>`;

  const input = document.getElementById("nameModalInput");
  const saveBtn = document.getElementById("nameModalSave");
  input.focus();
  input.select();

  function submit(){
    const name = input.value.trim();
    if(!name){
      toast("이름을 입력해 주세요.");
      input.focus();
      return;
    }
    if(isAdd){
      const newItem = newKg();
      newItem.name = name;
      touch(newItem);
      data.kindergartens.push(newItem);
      selId = newItem.id;
      view = "detail";
      detailTab = "score";
      confirmDel = false;
      save(true);
      closeModal();
      render();
    }else if(kg){
      kg.name = name;
      touch(kg);
      save(true);
      closeModal();
      render();
    }
  }

  saveBtn.addEventListener("click", submit);
  input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter") submit();
    if(e.key === "Escape") closeModal();
  });
  document.getElementById("nameModalCancel").addEventListener("click", closeModal);
  document.getElementById("nameModalBackdrop").addEventListener("click", (e)=>{
    if(e.target.id === "nameModalBackdrop") closeModal();
  });
}

function showListDeleteModal(id){
  const kg = getKg(id);
  if(!kg) return;
  const name = esc(kg.name || "이름 미입력");
  document.getElementById("modalRoot").innerHTML = `
  <div class="modal-backdrop" id="listDeleteBackdrop">
    <div class="modal-box">
      <div class="modal-title jua">기록 삭제</div>
      <div class="modal-body"><b>${name}</b> 기록을 삭제할까요?<br>삭제한 기록은 복구할 수 없습니다.</div>
      <div class="modal-actions">
        <button class="confirm" id="listDeleteCancel">취소</button>
        <button class="cancel" id="listDeleteConfirm" style="color:var(--coral);">삭제</button>
      </div>
    </div>
  </div>`;
  document.getElementById("listDeleteCancel").addEventListener("click", closeModal);
  document.getElementById("listDeleteConfirm").addEventListener("click", ()=>{
    data.kindergartens = data.kindergartens.filter(k=>k.id!==id);
    if(selId === id){ selId = null; view = "list"; }
    save(true);
    closeModal();
    render();
  });
  document.getElementById("listDeleteBackdrop").addEventListener("click", (e)=>{
    if(e.target.id === "listDeleteBackdrop") closeModal();
  });
}

/* ============ 내보내기 / 불러오기 ============ */
function pad2(n){ return String(n).padStart(2,"0"); }

function exportData(){
  const now = new Date();
  const stamp = `${now.getFullYear()}${pad2(now.getMonth()+1)}${pad2(now.getDate())}_${pad2(now.getHours())}${pad2(now.getMinutes())}`;
  const payload = { app:APP_ID, version:DATA_VERSION, exportedAt: Date.now(), kindergartens: data.kindergartens };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type:"application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `유치원_수첩_데이터_${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
  toast("파일로 내보냈어요. 카톡·메일로 보내보세요.");
}

function closeModal(){ document.getElementById("modalRoot").innerHTML = ""; }

function showImportModal(imported){
  if(!isRecord(imported) || imported.app !== APP_ID || !Array.isArray(imported.kindergartens)){
    toast("올바른 유치원 수첩 백업 파일이 아니에요.");
    return;
  }
  const incoming = normalizeData(imported).kindergartens;
  if(incoming.length===0){
    toast("불러올 유치원 기록이 없어요.");
    return;
  }
  const localIds = new Set(data.kindergartens.map(k=>k.id));
  const overlap = incoming.filter(k=>localIds.has(k.id)).length;
  const fresh = incoming.length - overlap;

  document.getElementById("modalRoot").innerHTML = `
  <div class="modal-backdrop" id="modalBackdrop">
    <div class="modal-box">
      <div class="modal-title jua">불러온 데이터 확인</div>
      <div class="modal-body">
        불러온 파일에 유치원 <b>${incoming.length}곳</b> 기록이 있어요.<br>
        · 새로운 유치원: <b>${fresh}곳</b><br>
        · 이미 있는 유치원과 겹침: <b>${overlap}곳</b> (겹치는 건 더 최근에 수정된 쪽으로 자동 반영돼요)
      </div>
      <div class="modal-actions" style="margin-bottom:8px;">
        <button class="confirm" id="mergeBtn">병합하기 (추천)</button>
      </div>
      <div class="modal-actions">
        <button class="cancel" id="replaceBtn" style="color:var(--coral);">전체 교체</button>
        <button class="cancel" id="cancelImportBtn">취소</button>
      </div>
    </div>
  </div>`;

  document.getElementById("mergeBtn").addEventListener("click", ()=>{
    mergeImport(incoming); closeModal();
  });
  document.getElementById("replaceBtn").addEventListener("click", ()=>{
    data = { version:DATA_VERSION, kindergartens:incoming };
    selId = null;
    view = "list";
    save(true); render(); closeModal();
    toast(`전체 교체 완료 (${incoming.length}곳)`);
  });
  document.getElementById("cancelImportBtn").addEventListener("click", closeModal);
  document.getElementById("modalBackdrop").addEventListener("click", (e)=>{
    if(e.target.id==="modalBackdrop") closeModal();
  });
}

function mergeImport(incoming){
  let added=0, updated=0;
  const normalized = normalizeData({ kindergartens:incoming }).kindergartens;
  normalized.forEach(inKg=>{
    const local = getKg(inKg.id);
    if(!local){
      data.kindergartens.push(inKg); added++;
    } else {
      const localTime = local.updatedAt||0, inTime = inKg.updatedAt||0;
      if(inTime >= localTime){
        Object.assign(local, inKg); updated++;
      }
    }
  });
  save(true); render();
  toast(`병합 완료 (신규 ${added}곳, 갱신 ${updated}곳)`);
}

function fallbackCopy(text){
  const ta = document.createElement("textarea");
  ta.value = text; ta.style.position="fixed"; ta.style.opacity="0";
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand("copy"); toast("질문 리스트를 복사했어요"); }
  catch(e){ toast("복사 실패 — 길게 눌러 직접 복사해주세요"); }
  document.body.removeChild(ta);
}

function toast(msg){
  const root = document.getElementById("toastRoot");
  root.innerHTML = `<div class="toast">${msg}</div>`;
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>{ root.innerHTML=""; }, 3000);
}


/* ============ 홈 화면 추가 안내 ============ */
let deferredInstallPrompt = null;

function isStandaloneMode(){
  return window.matchMedia("(display-mode: standalone)").matches ||
         window.navigator.standalone === true;
}

function getDeviceType(){
  const ua = navigator.userAgent || "";
  if(/iPad|iPhone|iPod/.test(ua) || (navigator.platform==="MacIntel" && navigator.maxTouchPoints>1)) return "ios";
  if(/Android/i.test(ua)) return "android";
  return "other";
}

window.addEventListener("beforeinstallprompt", (e)=>{
  e.preventDefault();
  deferredInstallPrompt = e;
});

async function handleInstallAction(){
  if(deferredInstallPrompt){
    deferredInstallPrompt.prompt();
    try{ await deferredInstallPrompt.userChoice; }catch(e){}
    deferredInstallPrompt = null;
    return;
  }
  showInstallGuide();
}

function showInstallGuide(){
  const device = getDeviceType();
  let title = "홈 화면에 추가하는 방법";
  let text = "사용 중인 브라우저 메뉴에서 홈 화면 추가 기능을 선택해 주세요.";
  let steps = [];

  if(device==="ios"){
    title = "아이폰 홈 화면에 추가";
    text = "아이폰은 보안상 자동 설치가 불가능해 Safari에서 아래 순서로 한 번만 추가해야 합니다.";
    steps = [
      ["1","Safari에서 열기","카카오톡 안 브라우저가 아니라 Safari로 이 페이지를 열어 주세요."],
      ["2","공유 버튼 누르기","화면 아래의 네모 위로 화살표 모양 공유 버튼을 누르세요."],
      ["3","홈 화면에 추가","메뉴에서 ‘홈 화면에 추가’를 선택한 뒤 오른쪽 위 ‘추가’를 누르세요."]
    ];
  }else if(device==="android"){
    title = "안드로이드 홈 화면에 추가";
    text = "Chrome에서 아래 순서로 추가하면 앱처럼 바로 실행할 수 있습니다.";
    steps = [
      ["1","Chrome에서 열기","현재 페이지를 Chrome 브라우저에서 열어 주세요."],
      ["2","점 3개 메뉴","오른쪽 위 점 3개 메뉴를 누르세요."],
      ["3","홈 화면에 추가","‘홈 화면에 추가’ 또는 ‘앱 설치’를 누른 뒤 확인하세요."]
    ];
  }else{
    steps = [
      ["1","브라우저 메뉴 열기","Chrome, Edge 또는 Safari의 공유·설정 메뉴를 여세요."],
      ["2","홈 화면 또는 앱 설치","‘홈 화면에 추가’나 ‘앱 설치’ 항목을 선택하세요."]
    ];
  }

  const root = document.getElementById("modalRoot");
  root.innerHTML = `<div class="install-sheet" id="installSheet">
    <div class="install-sheet-box" role="dialog" aria-modal="true" aria-labelledby="installSheetTitle">
      <div class="install-sheet-handle"></div>
      <h2 class="install-sheet-title" id="installSheetTitle">${title}</h2>
      <p class="install-sheet-text">${text}</p>
      <div class="install-steps">
        ${steps.map(s=>`<div class="install-step">
          <div class="install-step-num">${s[0]}</div>
          <div><b>${s[1]}</b><span>${s[2]}</span></div>
        </div>`).join("")}
      </div>
      <button class="install-close" id="installCloseBtn">확인</button>
    </div>
  </div>`;

  document.getElementById("installCloseBtn").addEventListener("click", closeModal);
  document.getElementById("installSheet").addEventListener("click",(e)=>{
    if(e.target.id==="installSheet") closeModal();
  });
}

window.addEventListener("appinstalled", ()=>{
  deferredInstallPrompt = null;
  toast("홈 화면에 추가됐어요.");
  render();
});


document.getElementById("importFileInput").addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  if(file.size > 5 * 1024 * 1024){
    toast("백업 파일이 너무 커요. 5MB 이하 파일을 선택해 주세요.");
    e.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = (ev)=>{
    try{
      const imported = JSON.parse(ev.target.result);
      showImportModal(imported);
    }catch(err){
      toast("파일을 읽을 수 없어요. 올바른 JSON 파일인지 확인해주세요.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

window.addEventListener("pagehide", ()=>{
  if(saveTimer){
    clearTimeout(saveTimer);
    persistData();
  }
});

document.getElementById("backBtn").addEventListener("click", ()=>{ view="list"; render(); });
document.querySelectorAll(".nav-tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{ view = btn.dataset.view; render(); });
});


/* ============ PWA 등록 및 자동 업데이트 ============ */
let pwaRefreshing = false;

function showPwaUpdateBanner(registration){
  if(document.getElementById("pwaUpdateBanner")) return;

  const banner = document.createElement("div");
  banner.className = "update-banner";
  banner.id = "pwaUpdateBanner";
  banner.innerHTML = `
    <div class="update-banner-copy">
      <div class="update-banner-title">새 버전이 준비됐어요</div>
      <div class="update-banner-desc">기록은 유지되고 화면과 기능만 업데이트됩니다.</div>
    </div>
    <button type="button" id="pwaUpdateBtn">업데이트</button>
  `;
  document.body.appendChild(banner);

  document.getElementById("pwaUpdateBtn").addEventListener("click", ()=>{
    if(registration.waiting){
      registration.waiting.postMessage({type:"SKIP_WAITING"});
    }
  });
}

if("serviceWorker" in navigator){
  window.addEventListener("load", async ()=>{
    try{
      const registration = await navigator.serviceWorker.register("./sw.js", {scope:"./"});

      if(registration.waiting){
        showPwaUpdateBanner(registration);
      }

      registration.addEventListener("updatefound", ()=>{
        const worker = registration.installing;
        if(!worker) return;
        worker.addEventListener("statechange", ()=>{
          if(worker.state==="installed" && navigator.serviceWorker.controller){
            showPwaUpdateBanner(registration);
          }
        });
      });

      setInterval(()=>registration.update(), 60 * 60 * 1000);
    }catch(error){
      console.warn("Service Worker registration failed:", error);
    }
  });

  navigator.serviceWorker.addEventListener("controllerchange", ()=>{
    if(pwaRefreshing) return;
    pwaRefreshing = true;
    window.location.reload();
  });
}

load();
render();
