/* =========================
   quiz.js – 안정화 + 대칭 채점 + 동점 처리
   ========================= */

// ===== Element refs =====
const pages = document.querySelectorAll('.page');
const $ = (id) => document.getElementById(id);

const startBtn   = $('startBtn');
const endBtn     = $('endBtn');
const restartBtn = $('restartBtn');

const questionText = $('questionText');
const progressText = $('progress-text');
const progressBar  = $('progressBar');
const btnYes = $('btnYes');
const btnNo  = $('btnNo');
const btnPrev = $('btnPrev');

const resultTitle = $('resultTitle');
const resultDesc  = $('resultDesc');
const resultImg   = $('resultImg');

// ===== Guard =====
if (!startBtn || !btnYes || !btnNo || !btnPrev) {
  console.error('필수 요소를 찾지 못했습니다. HTML의 id를 확인하세요.');
}

// ===== Data =====
const questions = [
  // wealth
  { text: '돈을 벌기 위해서라면\n야근도 괜찮다', type: 'wealth', icon: '💰' },
  { text: '적당히 벌고 여유롭게\n사는 게 낫다', type: 'wealth', reverse: true, icon: '🌸' },
  { text: '투자 손실을 감수하더라도\n큰 수익을 노린다', type: 'wealth', icon: '📈' },
  { text: '안정적인 적금이\n투자보다 낫다', type: 'wealth', reverse: true, icon: '🏦' },
  { text: '명품이나 비싼 물건을\n사고 싶다', type: 'wealth', icon: '👜' },
  { text: '가성비가 브랜드보다\n중요하다', type: 'wealth', reverse: true, icon: '🏷️' },

  // love
  { text: '연애를 위해 시간과\n에너지를 투자하고 싶다', type: 'love', icon: '💕' },
  { text: '지금은 자기계발이\n연애보다 우선이다', type: 'love', reverse: true, icon: '📚' },
  { text: '소개팅이나 미팅을\n적극적으로 나간다', type: 'love', icon: '🥂' },
  { text: '자연스러운 만남을\n기다리는 편이다', type: 'love', reverse: true, icon: '🌙' },
  { text: '소개팅 앱을 사용해볼\n의향이 있다', type: 'love', icon: '📱' },
  { text: '혼자만의 시간이\n더 소중하다', type: 'love', reverse: true, icon: '🧘‍♀️' },

  // career (학생·직장인 공용)
  { text: '성공을 위해 경쟁하는 상황도\n즐길 수 있다', type: 'career', icon: '🏆' },
  { text: '눈에 띄지 않게\n조용히 지내는 게 편하다', type: 'career', reverse: true, icon: '🤫' },
  { text: '더 좋은 기회가 있다면\n도전해보고 싶다', type: 'career', icon: '🚀' },
  { text: '지금 있는 자리에서\n꾸준히 머무르고 싶다', type: 'career', reverse: true, icon: '🏢' },
  { text: '새로운 프로젝트나 활동에\n관심이 많다', type: 'career', icon: '💡' },
  { text: '평범하고 안정적인 길이\n가장 이상적이다', type: 'career', reverse: true, icon: '⚓' },

  // health
  { text: '건강을 위해 운동을\n꾸준히 하고 있다', type: 'health', icon: '🏃‍♀️' },
  { text: '운동보다는 충분한\n휴식이 중요하다', type: 'health', reverse: true, icon: '😴' },
  { text: '건강한 식단을 유지하려고\n노력한다', type: 'health', icon: '🥗' },
  { text: '맛있는 음식이 건강식보다\n우선이다', type: 'health', reverse: true, icon: '🍕' },
  { text: '스트레스 관리를 위해\n취미활동을 한다', type: 'health', icon: '🎨' },
  { text: '바쁘면 건강관리는\n뒷전이 된다', type: 'health', reverse: true, icon: '⏰' },
];

const results = {
  wealth: {
    title: '💰 재물',
    desc: "오호! 너의 눈빛에서 보이는 건 바로 '재물운'이야. 열심히 노력했는데도 성과가 잘 안 보였던 순간도 있었지? 하지만 이제 걱정 마! 이 키링에는 기회를 끌어당기고 풍요를 불러오는 힘이 담겨 있어. 앞으로 네 앞에 새로운 가능성과 선택지가 활짝 열릴 거야 ✨",
    img: 'assets/wealth.jpg'
  },
  love: {
    title: '💖 사랑',
    desc: '아~ 누군가와 함께하는 마음을 바라고 있구나? 설레는 인연이든 따뜻한 우정이든, 네가 원하는 연결이 다가올 거야. 이 키링은 좋은 관계와 인연을 끌어당기는 힘을 지니고 있어. 우연처럼 찾아온 만남이 너의 하루를 반짝이게 만들 거야 💖',
    img: 'assets/love.jpg'
  },
  career: {
    title: '🔥 성장·성공',
    desc: "흐음, 네 마음속에는 '성장'에 대한 간절함이 보이는걸? 학업이든 일상이든 노력한 만큼의 성과가 반드시 다가올 거야. 이 키링은 기회를 붙잡고 성취를 이루는 힘을 담고 있어. 시험이든 프로젝트든, 네가 가진 잠재력을 마음껏 발휘할 순간이 곧 찾아올 거야 🔥",
    img: 'assets/career.jpg'
  },
  health: {
    title: '🌱 건강',
    desc: '아이고, 네가 많이 지쳐 있구나. 하지만 다행이야! 이 키링은 회복과 균형의 기운을 담고 있거든. 작은 습관들이 쌓여서 몸과 마음에 큰 힘이 되어줄 거야. 앞으로는 더 가볍고 건강한 걸음으로 하루하루를 살아갈 수 있을 거야 🌱',
    img: 'assets/health.jpg'
  },
};

// ===== State =====
let currentQ = 0;
let scores = { wealth: 0, love: 0, career: 0, health: 0 };
let answers = []; // true/false/undefined
let isAnimating = false;

// ===== Helpers =====
function showPage(id) {
  pages.forEach((p) => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
}

function updateProgress() {
  if (!progressBar || !progressText) return;
  const progress = (currentQ / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentQ} / ${questions.length}`;
}

function setButtonsVisual(state) {
  if (!btnYes || !btnNo) return;
  const on  = 'linear-gradient(135deg, #74b9ff, #0984e3)';
  const off = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
  if (state === 'yes') { btnYes.style.background = on; btnNo.style.background = off; }
  else if (state === 'no') { btnYes.style.background = off; btnNo.style.background = on; }
  else { btnYes.style.background = off; btnNo.style.background = off; }
}

/* 대칭 채점:
   - 일반문항: Yes=+1, No=0
   - 역문항(reverse): Yes=0, No=+1 */
function contribution(index, answerBool) {
  if (answerBool === undefined) return 0;
  const q = questions[index];
  const yes = answerBool ? 1 : 0;
  return q.reverse ? (1 - yes) : yes;
}

function applyAnswer(index, newAnswerBool) {
  const q = questions[index];
  const prev = answers[index];
  scores[q.type] -= contribution(index, prev);
  scores[q.type] += contribution(index, newAnswerBool);
  answers[index] = newAnswerBool;
}

function showQuestion() {
  if (currentQ >= questions.length) { showResult(); return; }
  const q = questions[currentQ];
  if (questionText) {
    questionText.innerHTML = `
      <div class="question-icon">${q.icon}</div>
      <div class="question-text">${q.text.replace(/\n/g, '<br>')}</div>
    `;
  }
  updateProgress();
  if (btnPrev) btnPrev.disabled = currentQ === 0;

  if (answers[currentQ] === true) setButtonsVisual('yes');
  else if (answers[currentQ] === false) setButtonsVisual('no');
  else setButtonsVisual('none');
}

// 응답 수(해당 타입 질문에 Yes/No 했던 횟수)
function answeredCountByType() {
  const counts = { wealth: 0, love: 0, career: 0, health: 0 };
  answers.forEach((ans, i) => {
    if (ans !== undefined) counts[questions[i].type] += 1;
  });
  return counts;
}

// 동점 처리: 점수 → 응답 수 → 최근 응답
function bestCategoryKey() {
  const counts = answeredCountByType();
  const maxScore = Math.max(...Object.values(scores));
  let candidates = Object.keys(scores).filter(k => scores[k] === maxScore);
  if (candidates.length === 1) return candidates[0];

  candidates.sort((a, b) => counts[b] - counts[a]);
  const topCount = counts[candidates[0]];
  const topByCount = candidates.filter(k => counts[k] === topCount);
  if (topByCount.length === 1) return topByCount[0];

  for (let i = answers.length - 1; i >= 0; i--) {
    if (answers[i] !== undefined) {
      const t = questions[i].type;
      if (topByCount.includes(t)) return t;
    }
  }
  return topByCount[0] || 'health';
}

function showResult() {
  if (progressBar && progressText) {
    progressBar.style.width = `100%`;
    progressText.textContent = `${questions.length} / ${questions.length}`;
  }
  const key = bestCategoryKey();
  const data = results[key];

  if (resultTitle) resultTitle.innerHTML = data.title;
  if (resultDesc)  resultDesc.innerHTML  = data.desc;

  if (resultImg) {
    if (data.img) {
      resultImg.src = data.img;
      resultImg.alt = data.title.replace(/<[^>]*>?/gm, '');
      resultImg.style.display = 'block';
      resultImg.onerror = () => { resultImg.style.display = 'none'; };
    } else {
      resultImg.style.display = 'none';
    }
  }
  isAnimating = false;
  showPage('result');
}

function disableButtonsBriefly() {
  if (!btnYes || !btnNo) return;
  if (isAnimating) return;
  isAnimating = true;
  btnYes.disabled = true; btnNo.disabled = true;
  setTimeout(() => { btnYes.disabled = false; btnNo.disabled = false; isAnimating = false; }, 200);
}

// ===== Events =====
startBtn?.addEventListener('click', () => {
  currentQ = 0;
  scores = { wealth: 0, love: 0, career: 0, health: 0 };
  answers = [];
  setButtonsVisual('none');
  showPage('quiz');
  showQuestion();
});

btnYes?.addEventListener('click', () => {
  if (isAnimating) return;
  disableButtonsBriefly();
  applyAnswer(currentQ, true);
  setButtonsVisual('yes');
  setTimeout(() => { currentQ += 1; showQuestion(); }, 200);
});

btnNo?.addEventListener('click', () => {
  if (isAnimating) return;
  disableButtonsBriefly();
  applyAnswer(currentQ, false);
  setButtonsVisual('no');
  setTimeout(() => { currentQ += 1; showQuestion(); }, 200);
});

btnPrev?.addEventListener('click', () => {
  if (currentQ > 0) { currentQ -= 1; showQuestion(); }
});

endBtn?.addEventListener('click', () => { showPage('ending'); });

restartBtn?.addEventListener('click', () => {
  currentQ = 0;
  scores = { wealth: 0, love: 0, career: 0, health: 0 };
  answers = [];
  setButtonsVisual('none');
  if (progressBar && progressText) {
    progressBar.style.width = '0%';
    progressText.textContent = `0 / ${questions.length}`;
  }
  showPage('intro');
});

// 첫 화면
if (document.getElementById('intro')) showPage('intro');
