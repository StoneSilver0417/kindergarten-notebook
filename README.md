<div align="center">

# 🌿 유치원 수첩

### 우리 아이에게 맞는 유치원 선택 기록

![HTML](https://img.shields.io/badge/HTML-Vanilla-FFD66B?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Mobile-Responsive-6BBF8A?style=for-the-badge)
![Storage](https://img.shields.io/badge/Storage-LocalStorage-5FAF7B?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-222222?style=for-the-badge)

유치원 상담 내용과 평가 결과를 기록하고 여러 유치원을 한눈에 비교할 수 있는 모바일 우선 웹앱입니다.

### 🚀 바로 사용하기

https://stonesilver0417.github.io/kindergarten-notebook/

</div>

---

## 📖 소개

유치원 설명회나 상담 후 기억해야 할 내용을 체계적으로 정리할 수 있도록 만든 웹앱입니다.

- 회원가입 없이 바로 사용
- 설치 없이 브라우저에서 실행
- 아이폰·안드로이드·PC 지원
- 입력 즉시 자동 저장
- 사용자별 데이터 분리
- JSON 파일로 백업 및 복원

---

## ✨ 주요 기능

### 📒 유치원 관리
- 여러 유치원 등록
- 이름 수정
- 기록 삭제
- 자동 저장

### ⭐ 평가
- 5점 척도 평가
- 영역별 점수 자동 계산
- 총점 자동 계산
- 첫인상 기록
- 최종 선택 질문

### 🧸 상담 질문지
- 교육철학
- 선생님
- 놀이·자연환경
- 안전·적응
- 현실 조건
- 결격 확인 질문

### ⚖️ 비교
- 총점 순 정렬
- 영역별 점수 비교
- 결격 여부 비교
- 첫인상 및 최종 선택 비교

### 🎨 메모
- 사전 조사
- 통학
- 식사
- 활동
- 생활·적응
- 소통·입학
- 자유 메모

---

## 💾 데이터 저장 방식

모든 기록은 사용 중인 브라우저의 `localStorage`에 저장됩니다.

같은 GitHub Pages 주소를 여러 사람이 사용해도 각 사용자의 데이터는 서로 분리됩니다.

```text
같은 사이트 주소
├─ 사용자 A의 아이폰 Safari → 사용자 A 데이터
├─ 사용자 B의 안드로이드 Chrome → 사용자 B 데이터
└─ 사용자 C의 PC Chrome → 사용자 C 데이터
```

입력한 평가 내용은 GitHub 저장소나 외부 서버로 전송되지 않습니다.

### 주의사항

다음 경우 데이터가 사라지거나 다른 기기에서 보이지 않을 수 있습니다.

- Safari 또는 Chrome의 사이트 데이터 삭제
- 비공개 브라우징 사용
- 다른 브라우저로 접속
- 다른 기기에서 접속
- GitHub Pages 주소 변경

중요한 기록은 정기적으로 내보내기 기능으로 백업하는 것을 권장합니다.

---

## 📤 백업하기

앱의 **내보내기** 버튼을 누르면 현재 기록 전체가 JSON 파일로 저장됩니다.

파일명 예시:

```text
유치원_수첩_데이터_20260714_1530.json
```

백업 파일에는 다음 내용이 포함됩니다.

- 유치원 목록
- 평가 점수
- 결격 체크
- 첫인상
- 최종 선택
- 상담 정보
- 메모

### 아이폰

1. Safari에서 앱 실행
2. `내보내기` 선택
3. 다운로드된 파일을 파일 앱 또는 iCloud Drive에 보관

### 안드로이드

1. Chrome에서 앱 실행
2. `내보내기` 선택
3. 다운로드 폴더 또는 Google Drive에 보관

---

## 📥 다른 기기에서 복원하기

1. 새 기기에서 같은 GitHub Pages 주소 접속
2. `불러오기` 선택
3. 저장해 둔 JSON 파일 선택
4. 복원 방식 선택

### 병합하기

현재 기기의 기록과 백업 파일을 합칩니다.

- 새로운 유치원은 추가
- 같은 기록은 더 최근 수정본으로 반영

### 전체 교체

현재 브라우저의 기록을 삭제하고 백업 파일 내용으로 완전히 교체합니다.

---

## 🍎 아이폰에서 홈 화면에 추가

1. Safari에서 GitHub Pages 주소를 엽니다.
2. 화면 아래의 공유 버튼을 누릅니다.
3. `홈 화면에 추가`를 선택합니다.
4. 오른쪽 위의 `추가`를 누릅니다.

아이폰에서는 Safari 사용을 권장합니다.

---

## 🤖 안드로이드에서 홈 화면에 추가

1. Chrome에서 GitHub Pages 주소를 엽니다.
2. 오른쪽 위의 점 3개 메뉴를 누릅니다.
3. `홈 화면에 추가` 또는 `앱 설치`를 선택합니다.
4. 이름을 확인하고 `추가`를 누릅니다.

---


## 📲 PWA 설치 및 오프라인 사용

이 프로젝트는 Progressive Web App(PWA)으로 구성되어 있습니다.

- 홈 화면 설치 지원
- 독립 실행 화면
- 오프라인 실행 지원
- 새 버전 감지 및 업데이트 안내
- 기존 `localStorage` 평가 데이터 유지

### 설치 방법

**아이폰 Safari**

1. 사이트 접속
2. 공유 버튼 선택
3. `홈 화면에 추가` 선택
4. 오른쪽 위 `추가` 선택

**안드로이드 Chrome**

1. 사이트 접속
2. 화면의 `홈 화면에 추가` 버튼 선택
3. 설치 안내에 따라 추가

> 아이폰은 iOS 정책상 웹페이지가 홈 화면 아이콘을 자동 생성할 수 없으므로 사용자가 한 번 직접 `홈 화면에 추가`를 선택해야 합니다.

### 업데이트

새 버전이 배포되면 화면 아래에 `새 버전이 준비됐어요` 안내가 표시됩니다.  
`업데이트`를 누르면 입력한 기록은 유지되고 앱 파일만 최신 버전으로 교체됩니다.

### PWA 파일 구성

```text
.
├── index.html
├── styles.css
├── app.js
├── manifest.webmanifest
├── sw.js
├── icon-192.png
├── icon-512.png
├── icon-maskable-512.png
├── apple-touch-icon.png
└── README.md
```

## 🛠 기술 구성

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- GitHub Pages

외부 프레임워크나 서버 없이 정적 파일만으로 실행됩니다.

---

## 📂 프로젝트 구조

```text
.
├── index.html               # 앱 화면 뼈대
├── styles.css              # 반응형 화면 스타일
├── app.js                  # 평가·저장·백업 기능
├── manifest.webmanifest    # PWA 설치 정보
├── sw.js                   # 오프라인 캐시와 업데이트
├── scripts/
│   └── check-basic.cjs     # 기본 구조·문법 검사
├── package.json
└── README.md
```

기본 점검은 별도 패키지 설치 없이 실행할 수 있습니다.

```bash
npm run check
```

---

## 🚀 GitHub Pages 배포

저장소의 다음 메뉴에서 설정합니다.

```text
Settings
→ Pages
→ Deploy from a branch
→ main
→ /(root)
```

배포 주소:

```text
https://stonesilver0417.github.io/kindergarten-notebook/
```

---

## 🔒 개인정보

이 프로젝트는 별도의 계정, 데이터베이스, 서버를 사용하지 않습니다.

사용자가 입력한 데이터는 각자의 브라우저에만 저장되며 개발자나 다른 사용자에게 전송되지 않습니다.

---

<div align="center">

Made with 🌿 for a thoughtful kindergarten choice

</div>
