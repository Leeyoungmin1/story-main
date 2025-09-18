/* =========================
   quiz.js – 안정화 풀버전
   ========================= */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Element refs ----------
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

  // ---------- Data ----------
  const questions = [
    // wealth (재물)
    { text: '돈을 벌기 위해서라면\n야근도 괜찮다', type: 'wealth', icon: '💰' },
    { text: '적당히 벌고 여유롭게\n사는 게 낫다', type: 'wealth', reverse: true, icon: '🌸' },
    { text: '투자 손실을 감수하더라도\n큰 수익을 노린다', type: 'wealth', icon: '📈' },
    { text: '안정적인 적금이\n투자보다 낫다', type: 'wealth', reverse: true, icon: '🏦' },
    { text: '명품이나 비싼 물건을\n사고 싶다', type: 'wealth', icon: '👜' },
    { text: '가성비가 브랜드보다\n중요하다', type: 'wealth', reverse: true, icon: '🏷️' },

    // love (사랑)
    { text: '연애를 위해 시간과\n에너지를 투자하고 싶다', type: 'love', icon: '💕' },
    { text: '지금은 자기계발이\n연애보다 우선이다', type: 'love', reverse: true, icon: '📚' },
    { text: '소개팅이나 미팅을\n적극적으로 나간다', type: 'love', icon: '🥂' },
    { text: '자연스러운 만남을\n기다리는 편이다', type: 'love', reverse: true, icon: '🌙' },
    { text: '소개팅 앱을 사용해볼\n의향이 있다', type: 'love', icon: '📱' },
    { text: '혼자만의 시간이\n더 소중하다', type: 'love', reverse: true, icon: '🧘‍♀️' },

    // career (취업/성공)
    { text: '승진을 위해 경쟁하는 걸\n즐긴다', type: 'career', icon: '🏆' },
    { text: '직장에서 눈에 띄지 않게\n조용히 일한다', type: 'career', reverse: true, icon: '🤫' },
    { text: '더 좋은 조건의 회사로\n이직을 고려한다', type: 'career', icon: '🚀' },
    { text: '현재 직장에서 안정적으로\n지내고 싶다', type: 'career', reverse: true, icon: '🏢' },
    { text: '창업이나 사업에\n관심이 있다', type: 'career', icon: '💡' },
    { text: '평생 직장에서 일하는 게\n이상적이다', type: 'career', reverse: true, icon: '⚓' },

    // health (건강)
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
      desc: "오호! 너의 눈빛에서 보이는 건 바로 '재물운'이야. 열심히 노력했는데도 성과가 눈에 잘 안 보였지? 하지만 이제 걱정 마! 이 키링 속에는 재물이 모이고 흘러넘치는 마법이 담겨 있어. 앞으로 네 곁에 기회의 문이 활짝 열릴 거야 ✨",
      img: 'assets/wealth.jpg'
    },
    love: {
      title: '💖 사랑',
      desc: '아~ 사랑을 찾고 있구나? 너의 마음이 외롭고 설레임을 기다리고 있어. 이 키링은 좋은 인연을 끌어당기는 마법을 담고 있어. 우연처럼 보이지만 사실은 운명이 될 만남이 찾아올 거야. 사랑의 불빛이 너를 따뜻하게 비출 거야 💖',
      img: 'assets/love.jpg'
    },
    career: {
      title: '🔥 취업',
      desc: "흐음, 네 마음속에는 '성공'에 대한 간절함이 보이는걸? 노력한 만큼의 성과가 반드시 다가올 거야. 이 키링은 합격과 성취를 부르는 마법을 품고 있지. 면접관의 마음을 사로잡고, 너의 실력을 제대로 발휘할 기회를 줄 거야. 파이팅 🔥",
      img: 'assets/career.jpg'
    },
    health: {
      title: '🌱 건강',
      desc: '아이고, 너 정말 지쳐있구나. 하지만 다행이야! 이 키링은 건강과 회복의 기운을 담고 있거든. 작은 습관이 모여 큰 힘을 만들고, 네 몸과 마음이 천천히 회복될 거야. 앞으로는 더 밝고 가벼운 걸음으로 나아갈 수 있을 거야 🌱',
      img: 'assets/health.jpg'
    },
  };

  // ---------- State ----------
  let currentQ = 0;
  let scores = { wealth: 0, love: 0, career: 0, health: 0 };
  // answers[i] === true(Yes) / false(No) / undefined(미응답)
  let answers = [];
  let isAnimating = false;

  // ---------- Helpers ----------
  function showPage(id) {
    // 애니메이션 가드 제거로 전환 막힘 방지
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
    if (state === 'yes') {
      btnYes.style.background = on;
      btnNo.style.background  = off;
    } else if (state === 'no') {
      btnYes.style.background = off;
      btnNo.style.background  = on;
    } else {
      btnYes.style.background = off;
      btnNo.style.background  = off;
    }
  }

  // 답변 기여값 (Yes만 점수 변화 / 역문항은 -1)
  function contribution(index, answerBool) {
    if (answerBool === undefined) return 0;
    const q = questions[index];
    const weight = q.reverse ? -1 : 1;
    return answerBool ? weight : 0; // No는 0
  }

  function applyAnswer(index, newAnswerBool) {
    const q = questions[index];
    const prev = answers[index];
    const prevContrib = contribution(index, prev);
    const nextContrib = contribution(index, newAnswerBool);
    scores[q.type] -= prevContrib;
    scores[q.type] += nextContrib;
    answers[index] = newAnswerBool;
  }

  function showQuestion() {
    if (currentQ >= questions.length) {
      showResult();
      return;
    }
    const q = questions[currentQ];
    if (questionText) {
      questionText.innerHTML = `
        <div class="question-icon">${q.icon}</div>
        <div class="question-text">${q.text.replace(/\n/g, '<br>')}</div>
      `;
    }
    updateProgress();
    if (btnPrev) btnPrev.disabled = currentQ === 0;

    if (answers[currentQ] === true)      setButtonsVisual('yes');
    else if (answers[currentQ] === false) setButtonsVisual('no');
    else                                  setButtonsVisual('none');
  }

  function bestCategoryKey() {
    let bestKey = null;
    let bestVal = -Infinity;
    for (const [k, v] of Object.entries(scores)) {
      if (v > bestVal) { bestVal = v; bestKey = k; }
    }
    return bestKey || 'health';
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
      } else {
        resultImg.style.display = 'none';
      }
    }

    isAnimating = false; // 혹시 남아있던 쓰로틀 해제
    showPage('result');
  }

  function disableButtonsBriefly() {
    if (!btnYes || !btnNo) return;
    if (isAnimating) return;
    isAnimating = true;
    btnYes.disabled = true;
    btnNo.disabled  = true;
    setTimeout(() => {
      btnYes.disabled = false;
      btnNo.disabled  = false;
      isAnimating = false;
    }, 200);
  }

  // ---------- Events ----------
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

  // 첫 화면 고정
  if (document.getElementById('intro')) showPage('intro');
});
