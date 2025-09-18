const pages = document.querySelectorAll('.page');
const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('endBtn');
const restartBtn = document.getElementById('restartBtn');

const questionText = document.getElementById('questionText');
const progress = document.getElementById('progress');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');

const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');

// 질문 30개 (각 카테고리별 6개씩 균등 배분)
const questions = [
  // wealth (재물)
  { text: '열심히 노력한 만큼 성과를 얻고 싶다.', type: 'wealth' },
  { text: '나는 경제적으로 더 풍족해지고 싶다.', type: 'wealth' },
  { text: '투자나 저축에 관심이 많다.', type: 'wealth' },
  { text: '내 능력으로 부를 축적하고 싶다.', type: 'wealth' },
  { text: '앞으로 큰돈을 벌 기회를 잡고 싶다.', type: 'wealth' },
  { text: '성공해서 내 가치를 인정받고 싶다.', type: 'wealth' },

  // love (사랑)
  { text: '누군가와 특별한 인연을 만나고 싶다.', type: 'love' },
  { text: '요즘 외롭다, 마음이 허전하다.', type: 'love' },
  { text: '좋은 사람과의 만남을 기대하고 있다.', type: 'love' },
  { text: '연애에서 안정감을 얻고 싶다.', type: 'love' },
  { text: '운명 같은 사랑을 기다린다.', type: 'love' },
  { text: '나를 이해해주는 동반자가 필요하다.', type: 'love' },

  // career (취업/성공)
  { text: '합격/취업 준비로 스트레스를 받는다.', type: 'career' },
  { text: '인터뷰나 면접이 다가오고 있다.', type: 'career' },
  { text: '나는 지금보다 더 나은 직업을 원한다.', type: 'career' },
  { text: '직장에서 인정받고 싶다.', type: 'career' },
  { text: '노력한 만큼 성취를 이루고 싶다.', type: 'career' },
  { text: '앞으로 커리어 발전을 크게 이루고 싶다.', type: 'career' },

  // health (건강)
  { text: '건강을 위해 운동/휴식이 필요하다고 느낀다.', type: 'health' },
  { text: '최근 피곤하거나 컨디션이 좋지 않다.', type: 'health' },
  { text: '규칙적인 생활을 하고 싶다.', type: 'health' },
  { text: '스트레스 관리가 필요하다.', type: 'health' },
  { text: '건강한 습관을 만들고 싶다.', type: 'health' },
  { text: '몸과 마음의 균형을 이루고 싶다.', type: 'health' },
];

// 결과 데이터
const results = {
  wealth: {
    title: '재물',
    desc: "오호! 너의 눈빛에서 보이는 건 바로 '재물운'이야. 열심히 노력했는데도 성과가 눈에 잘 안 보였지? 하지만 이제 걱정 마! 이 키링 속에는 재물이 모이고 흘러넘치는 마법이 담겨 있어. 앞으로 네 곁에 기회의 문이 활짝 열릴 거야 ✨",
  },
  love: {
    title: '사랑',
    desc: '아~ 사랑을 찾고 있구나? 너의 마음이 외롭고 설레임을 기다리고 있어. 이 키링은 좋은 인연을 끌어당기는 마법을 담고 있어. 우연처럼 보이지만 사실은 운명이 될 만남이 찾아올 거야. 사랑의 불빛이 너를 따뜻하게 비출 거야 💖',
  },
  career: {
    title: '취업',
    desc: "흐음, 네 마음속에는 '성공'에 대한 간절함이 보이는걸? 노력한 만큼의 성과가 반드시 다가올 거야. 이 키링은 합격과 성취를 부르는 마법을 품고 있지. 면접관의 마음을 사로잡고, 너의 실력을 제대로 발휘할 기회를 줄 거야. 파이팅 🔥",
  },
  health: {
    title: '건강',
    desc: '아이고, 너 정말 지쳐있구나. 하지만 다행이야! 이 키링은 건강과 회복의 기운을 담고 있거든. 작은 습관이 모여 큰 힘을 만들고, 네 몸과 마음이 천천히 회복될 거야. 앞으로는 더 밝고 가벼운 걸음으로 나아갈 수 있을 거야 🌱',
  },
};

// 상태
let currentQ = 0;
let scores = { wealth: 0, love: 0, career: 0, health: 0, finance: 0 };

// 페이지 전환 함수
function showPage(id) {
  pages.forEach((p) => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// 질문 표시
function showQuestion() {
  if (currentQ < questions.length) {
    questionText.textContent = questions[currentQ].text;
    progress.textContent = `${currentQ + 1} / ${questions.length}`;
  } else {
    showResult();
  }
}

// 결과 표시
function showResult() {
  const best = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
  resultTitle.textContent = results[best].title;
  resultDesc.textContent = results[best].desc;
  showPage('result');
}

// 이벤트
startBtn.addEventListener('click', () => {
  currentQ = 0;
  scores = { wealth: 0, love: 0, career: 0, health: 0 };
  showPage('quiz');
  showQuestion();
});

btnYes.addEventListener('click', () => {
  const q = questions[currentQ];
  scores[q.type] += 1;
  currentQ++;
  showQuestion();
});

btnNo.addEventListener('click', () => {
  currentQ++;
  showQuestion();
});

endBtn.addEventListener('click', () => {
  showPage('ending');
});

restartBtn.addEventListener('click', () => {
  showPage('intro');
});
