const MAX_WEEKS = 24;

const statMeta = {
  knowledge: { label: "📚 지식", ending: "과학자" },
  stamina: { label: "🏊 체력", ending: "수영선수" },
  creativity: { label: "🎨 창의력", ending: "디자이너" },
  kindness: { label: "💛 친절", ending: "선생님" },
  charm: { label: "✨ 매력", ending: "크리에이터" },
};

const actions = [
  {
    id: "study", emoji: "📚", title: "공부하기", desc: "새로운 걸 배우며 지식과 집중력을 키워요.", cost: 0,
    effects: { knowledge: [4, 7], mood: [-5, -1] },
    lines: ["문제를 끝까지 풀어내며 뿌듯함을 느꼈어요.", "새로운 단어와 개념을 배웠어요.", "헷갈리던 문제의 규칙을 스스로 찾아냈어요."]
  },
  {
    id: "swim", emoji: "🏊", title: "수영하기", desc: "물속에서 씩씩하게 움직이며 체력을 길러요.", cost: 2500,
    effects: { stamina: [5, 8], mood: [1, 5], money: [-2500, -2500] },
    lines: ["처음보다 훨씬 오래 쉬지 않고 수영했어요.", "힘들었지만 마지막 한 바퀴까지 해냈어요.", "오늘은 물이 유난히 가볍게 느껴졌어요."]
  },
  {
    id: "draw", emoji: "🎨", title: "그림 그리기", desc: "상상한 세계를 그림으로 표현해 봐요.", cost: 1500,
    effects: { creativity: [5, 8], charm: [1, 3], mood: [2, 5], money: [-1500, -1500] },
    lines: ["세상에 하나뿐인 캐릭터를 만들었어요.", "평범한 풍경을 아주 색다르게 그렸어요.", "마음에 꼭 드는 그림이 나와 책상 앞에 붙였어요."]
  },
  {
    id: "friends", emoji: "🫶", title: "친구 만나기", desc: "친구와 이야기하며 배려와 매력을 키워요.", cost: 2000,
    effects: { kindness: [4, 7], charm: [3, 6], mood: [4, 8], money: [-2000, -2000] },
    lines: ["친구의 이야기를 끝까지 들어줬어요.", "재미있는 놀이를 제안해 모두 함께 웃었어요.", "친구가 어려워하는 일을 자연스럽게 도와줬어요."]
  },
  {
    id: "cook", emoji: "🥐", title: "요리하기", desc: "간단한 요리를 만들며 창의력과 생활력을 키워요.", cost: 3000,
    effects: { creativity: [3, 6], kindness: [2, 4], mood: [2, 5], money: [-3000, -3000] },
    lines: ["재료를 조합해 새로운 간식을 만들었어요.", "가족에게 직접 만든 음식을 나눠줬어요.", "모양은 조금 삐뚤어도 맛은 아주 좋았어요."]
  },
  {
    id: "rest", emoji: "🌙", title: "푹 쉬기", desc: "잘 쉬는 것도 성장! 기분과 에너지를 회복해요.", cost: 0,
    effects: { mood: [8, 14], stamina: [1, 3] },
    lines: ["좋아하는 책을 읽으며 느긋하게 쉬었어요.", "평소보다 일찍 자고 개운하게 일어났어요.", "아무것도 서두르지 않는 하루를 보냈어요."]
  },
];

const events = [
  {
    emoji: "🧁", title: "친구의 생일 파티", text: "친구가 생일 파티에 초대했어요. 어떤 선물을 준비할까요?",
    choices: [
      { text: "직접 카드와 그림을 만든다", effects: { creativity: 4, kindness: 3, mood: 3 }, result: "정성 가득한 카드에 친구가 활짝 웃었어요." },
      { text: "용돈으로 작은 선물을 산다", effects: { charm: 2, kindness: 2, money: -3000, mood: 2 }, result: "친구가 취향을 잘 기억해줘서 고맙다고 했어요." },
      { text: "친구에게 원하는 걸 물어본다", effects: { knowledge: 1, kindness: 4 }, result: "친구의 말을 잘 듣는 것도 멋진 배려라는 걸 배웠어요." },
    ]
  },
  {
    emoji: "🏅", title: "작은 수영 대회", text: "갑자기 반 친구들과 기록 대결을 하게 됐어요!",
    choices: [
      { text: "기록을 목표로 끝까지 힘껏 수영한다", effects: { stamina: 5, mood: 1 }, result: "끝까지 포기하지 않고 기록을 줄였어요!" },
      { text: "친구들을 응원하며 즐겁게 참여한다", effects: { kindness: 4, charm: 3, mood: 4 }, result: "기록도 좋았지만 모두 함께 웃어서 더 기억에 남았어요." },
    ]
  },
  {
    emoji: "🧪", title: "교실의 과학 상자", text: "선생님이 자유롭게 실험해 볼 수 있는 재료를 꺼내 주셨어요.",
    choices: [
      { text: "원리를 찾아 실험 노트를 쓴다", effects: { knowledge: 5, creativity: 2 }, result: "궁금한 점을 직접 확인하니 공부가 훨씬 재미있어졌어요." },
      { text: "친구들과 새로운 실험을 만들어 본다", effects: { creativity: 4, kindness: 2, charm: 2 }, result: "엉뚱한 아이디어가 멋진 실험으로 이어졌어요." },
    ]
  },
  {
    emoji: "🎤", title: "학급 발표 시간", text: "갑자기 앞에 나가 짧게 발표할 기회가 생겼어요.",
    choices: [
      { text: "용기 내서 먼저 발표한다", effects: { charm: 5, knowledge: 2, mood: 2 }, result: "조금 떨렸지만 끝나고 나니 자신감이 생겼어요." },
      { text: "친구의 발표를 도와준다", effects: { kindness: 5, charm: 1 }, result: "친구가 큰 도움을 받았다며 고마워했어요." },
    ]
  },
  {
    emoji: "🌧️", title: "계획이 꼬인 날", text: "하려던 일이 자꾸 늦어지고 마음도 살짝 답답해졌어요.",
    choices: [
      { text: "할 일을 세 개만 정해서 하나씩 한다", effects: { knowledge: 3, mood: 1 }, result: "전부 하진 못했지만 꼭 필요한 건 해냈어요." },
      { text: "오늘은 잠깐 쉬고 다시 시작한다", effects: { mood: 6, stamina: 2 }, result: "쉬고 나니 머릿속이 훨씬 맑아졌어요." },
    ]
  },
  {
    emoji: "🌟", title: "나만의 작은 무대", text: "가족 앞에서 이번 달에 가장 재미있었던 걸 보여주기로 했어요.",
    choices: [
      { text: "내가 배운 걸 설명한다", effects: { knowledge: 4, charm: 3 }, result: "설명하다 보니 내가 정말 많이 배웠다는 걸 알게 됐어요." },
      { text: "그림과 이야기로 꾸며 보여준다", effects: { creativity: 5, charm: 2 }, result: "가족들이 이야기의 다음 편도 듣고 싶다고 했어요." },
      { text: "다 같이 참여하는 놀이로 만든다", effects: { kindness: 3, charm: 4, mood: 3 }, result: "혼자 빛나는 것보다 함께 즐기는 무대가 더 신났어요." },
    ]
  },
];

const endings = [
  { key: "balanced", emoji: "🌈", title: "무지개 탐험가", desc: "한 가지에만 머물지 않고 여러 재능을 골고루 키웠어요. 앞으로 무엇이든 새롭게 도전할 수 있는 멋진 탐험가예요." },
  { key: "knowledge", emoji: "🔬", title: "호기심 많은 과학자", desc: "궁금한 건 그냥 지나치지 않고 이유를 찾아보는 힘이 커졌어요. 질문을 멈추지 않는 멋진 과학자가 되었어요." },
  { key: "stamina", emoji: "🏊‍♀️", title: "끝까지 해내는 수영선수", desc: "꾸준히 연습하며 체력과 끈기를 길렀어요. 힘든 순간에도 끝까지 가는 멋진 선수가 되었어요." },
  { key: "creativity", emoji: "🎨", title: "상상력이 반짝이는 디자이너", desc: "평범한 것도 새로운 시선으로 바라보는 힘이 커졌어요. 자기만의 세계를 만드는 디자이너가 되었어요." },
  { key: "kindness", emoji: "💛", title: "사람 마음을 잘 아는 선생님", desc: "친구의 마음을 살피고 함께하는 힘이 가장 크게 자랐어요. 사람을 따뜻하게 성장시키는 선생님이 되었어요." },
  { key: "charm", emoji: "🎬", title: "사람을 즐겁게 하는 크리에이터", desc: "자신의 생각을 표현하고 다른 사람과 즐겁게 소통하는 힘이 커졌어요. 보는 사람까지 기분 좋아지는 크리에이터가 되었어요." },
];

const initialState = () => ({
  name: "다인이",
  week: 1,
  money: 12000,
  mood: 70,
  stats: { knowledge: 20, stamina: 20, creativity: 20, kindness: 20, charm: 20 },
  log: [{ week: 1, text: "새로운 24주가 시작됐어요. 어떤 꿈을 키워볼까요?" }],
  ended: false,
});

let state = loadState() || initialState();

const $ = (id) => document.getElementById(id);
const statsGrid = $("statsGrid");
const actionsGrid = $("actionsGrid");
const storyLog = $("storyLog");

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function clamp(v, min = 0, max = 100) { return Math.max(min, Math.min(max, v)); }
function won(n) { return `${Math.max(0, n).toLocaleString("ko-KR")}원`; }

function render() {
  $("heroName").textContent = state.name;
  $("nameInput").value = state.name;
  $("weekText").textContent = Math.min(state.week, MAX_WEEKS);
  $("moneyText").textContent = won(state.money);
  $("moodText").textContent = state.mood;
  $("progressBar").style.width = `${Math.min(100, (state.week / MAX_WEEKS) * 100)}%`;
  $("statusBadge").textContent = moodLabel(state.mood);

  statsGrid.innerHTML = Object.entries(statMeta).map(([key, meta]) => `
    <div class="stat-row">
      <div class="stat-label">${meta.label}</div>
      <div class="stat-track"><div class="stat-fill" style="width:${state.stats[key]}%"></div></div>
      <div class="stat-value">${state.stats[key]}</div>
    </div>
  `).join("");

  actionsGrid.innerHTML = actions.map(a => {
    const disabled = state.ended || (a.cost > 0 && state.money < a.cost);
    return `
      <button class="action-card" data-action="${a.id}" ${disabled ? "disabled" : ""}>
        <div class="action-emoji">${a.emoji}</div>
        <div class="action-title">${a.title}</div>
        <div class="action-desc">${a.desc}</div>
        <div class="action-cost">${a.cost ? `비용 ${won(a.cost)}` : "무료"}</div>
      </button>
    `;
  }).join("");

  storyLog.innerHTML = [...state.log].reverse().slice(0, 12).map(item => `
    <div class="story-item"><div class="story-week">${item.week}주차</div><div class="story-text">${item.text}</div></div>
  `).join("");

  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => playAction(btn.dataset.action));
  });
}

function moodLabel(mood) {
  if (mood >= 85) return "완전 신나요!";
  if (mood >= 65) return "기분 좋아요";
  if (mood >= 45) return "괜찮아요";
  if (mood >= 25) return "조금 지쳤어요";
  return "휴식이 필요해요";
}

function applyEffects(effects) {
  Object.entries(effects).forEach(([key, value]) => {
    const amount = Array.isArray(value) ? rand(value[0], value[1]) : value;
    if (key === "mood") state.mood = clamp(state.mood + amount);
    else if (key === "money") state.money = Math.max(0, state.money + amount);
    else if (state.stats[key] !== undefined) state.stats[key] = clamp(state.stats[key] + amount);
  });
}

function playAction(actionId) {
  if (state.ended) return;
  const action = actions.find(a => a.id === actionId);
  if (!action || state.money < action.cost) return;

  applyEffects(action.effects);
  const line = action.lines[rand(0, action.lines.length - 1)];
  state.log.push({ week: state.week, text: `${action.emoji} ${action.title}: ${line}` });

  // 작은 주간 랜덤 변화
  if (Math.random() < 0.22) {
    const bonus = rand(500, 1800);
    state.money += bonus;
    state.log.push({ week: state.week, text: `🪙 집안일 보너스로 용돈 ${won(bonus)}을 받았어요.` });
  }

  if (state.mood < 30 && Math.random() < 0.55) {
    state.stats.knowledge = clamp(state.stats.knowledge - 1);
    state.stats.creativity = clamp(state.stats.creativity - 1);
    state.log.push({ week: state.week, text: "😵 기분이 너무 떨어져서 집중력이 살짝 줄었어요. 다음 주엔 쉬어도 좋아요." });
  }

  const shouldEvent = state.week % 4 === 0;
  if (shouldEvent) {
    saveState();
    render();
    showEvent(events[(state.week / 4 - 1) % events.length]);
    return;
  }

  advanceWeek();
}

function advanceWeek() {
  if (state.week >= MAX_WEEKS) {
    state.ended = true;
    saveState();
    render();
    showEnding();
    return;
  }
  state.week += 1;
  saveState();
  render();
}

function showEvent(event) {
  $("modalEmoji").textContent = event.emoji;
  $("modalTitle").textContent = event.title;
  $("modalText").textContent = event.text;
  $("modalChoices").innerHTML = "";
  event.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.text;
    btn.addEventListener("click", () => {
      applyEffects(choice.effects);
      state.log.push({ week: state.week, text: `${event.emoji} ${event.title}: ${choice.result}` });
      $("modalBackdrop").classList.add("hidden");
      advanceWeek();
    });
    $("modalChoices").appendChild(btn);
  });
  $("modalBackdrop").classList.remove("hidden");
}

function getEnding() {
  const values = Object.values(state.stats);
  const max = Math.max(...values);
  const min = Math.min(...values);
  if (max - min <= 14 && values.reduce((a,b) => a+b, 0) >= 220) {
    return endings.find(e => e.key === "balanced");
  }
  const topKey = Object.entries(state.stats).sort((a,b) => b[1] - a[1])[0][0];
  return endings.find(e => e.key === topKey) || endings[0];
}

function showEnding() {
  const ending = getEnding();
  const tpl = $("endingTemplate");
  const fragment = tpl.content.cloneNode(true);
  fragment.querySelector(".ending-emoji").textContent = ending.emoji;
  fragment.querySelector(".ending-title").textContent = `${state.name}, ${ending.title}!`;
  fragment.querySelector(".ending-description").textContent = ending.desc;
  fragment.querySelector(".ending-summary").innerHTML = Object.entries(statMeta).map(([key, meta]) => `
    <div><strong>${meta.label}</strong><br>${state.stats[key]}점</div>
  `).join("");
  fragment.querySelector(".restart-primary").addEventListener("click", resetGame);

  $("modalEmoji").textContent = "";
  $("modalTitle").textContent = "";
  $("modalText").textContent = "";
  $("modalChoices").innerHTML = "";
  $("modalChoices").appendChild(fragment);
  $("modalBackdrop").classList.remove("hidden");
}

function saveState() {
  localStorage.setItem("dreamMakerSave", JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem("dreamMakerSave");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.stats || typeof parsed.week !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function resetGame() {
  const currentName = state.name || "다인이";
  state = initialState();
  state.name = currentName;
  localStorage.removeItem("dreamMakerSave");
  $("modalBackdrop").classList.add("hidden");
  saveState();
  render();
}

$("saveNameBtn").addEventListener("click", () => {
  const next = $("nameInput").value.trim();
  if (!next) return;
  state.name = next.slice(0, 10);
  state.log.push({ week: state.week, text: `✍️ 주인공 이름을 '${state.name}'(으)로 정했어요.` });
  saveState();
  render();
});

$("saveBtn").addEventListener("click", () => {
  saveState();
  const original = $("saveBtn").textContent;
  $("saveBtn").textContent = "저장됨 ✓";
  setTimeout(() => $("saveBtn").textContent = original, 900);
});

$("resetBtn").addEventListener("click", () => {
  if (confirm("지금까지의 기록을 지우고 처음부터 시작할까요?")) resetGame();
});

render();
if (state.ended) setTimeout(showEnding, 100);
