# 인수인계

## 1. 현재 상태

- 버전: 데이터 스키마 `DATA_VERSION = 5`
- 빌드/배포: 정적 웹앱, 소개 문구 변경 커밋·푸시 예정
- 실행 URL: https://stonesilver0417.github.io/kindergarten-notebook/
- 점검: `node scripts/check-basic.cjs` 통과

## 2. 최근 작업

- 앱 소개에서 용도와 맞지 않는 `성장 기록` 문구를 제거하고 유치원 선택·상담·비교 중심으로 변경함.

## 3. 알려진 이슈

- PowerShell 실행 정책으로 `npm run check`가 차단될 수 있어 `node scripts/check-basic.cjs`로 동일 점검 가능.

## 4. 다음 TODO

- 실제 모바일 화면에서 `관찰 못함` 버튼의 줄바꿈과 조작성을 확인.
- 필요하면 상담 현장에서 바로 볼 ‘핵심 질문만 보기’ 필터를 추가.
- 푸시 후 GitHub Pages 소개 문구 반영 여부 확인.
