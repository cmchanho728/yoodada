# 다인이의 꿈 키우기 🌱

아이와 함께 즐기는 **프린세스 메이커 스타일의 미니 육성 웹게임**입니다.

- 설치 없이 웹브라우저에서 실행
- 24주 동안 매주 한 가지 활동 선택
- 지식 / 체력 / 창의력 / 친절 / 매력 능력치 성장
- 4주마다 선택형 특별 이벤트
- 용돈과 기분 시스템
- 선택 결과에 따라 여러 엔딩
- 브라우저 자동 저장(localStorage)
- 모바일/태블릿/PC 반응형

## 바로 실행하기

폴더 안의 `index.html`을 더블클릭하면 실행됩니다.

## GitHub Pages에 올리기

1. GitHub에서 새 저장소(repository)를 만듭니다. 예: `dream-maker-game`
2. 이 폴더의 파일 3개를 저장소 최상단에 업로드합니다.
   - `index.html`
   - `style.css`
   - `game.js`
3. GitHub 저장소의 **Settings → Pages**로 이동합니다.
4. **Build and deployment**에서 `Deploy from a branch`를 선택합니다.
5. Branch를 `main`, 폴더를 `/ (root)`로 선택하고 저장합니다.
6. 잠시 후 GitHub Pages 주소가 생성됩니다.

## 아이와 같이 바꿔보기 좋은 부분

`game.js`에서 다음 내용을 바꾸면 게임이 달라집니다.

- `actions`: 매주 할 수 있는 활동
- `events`: 4주마다 등장하는 선택형 사건
- `endings`: 마지막 직업/꿈 엔딩
- `initialState`: 처음 시작하는 용돈과 능력치

예를 들어 `피아노 연습`, `독서`, `강아지 산책`, `여행`, `발레`, `코딩` 같은 활동을 자유롭게 추가할 수 있습니다.

## 파일 구조

```text
dream-maker-game/
├─ index.html
├─ style.css
├─ game.js
└─ README.md
```

즐겁게 수정하면서 우리 가족만의 게임으로 키워보세요! 🎀
