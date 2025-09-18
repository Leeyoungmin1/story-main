<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>소원 요정 키링 테스트</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
      @charset "UTF-8";
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      body {
        font-family: "Noto Sans KR", sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        background-attachment: fixed;
        margin: 0;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
        touch-action: manipulation;
      }

      /* 별빛 효과 */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(2px 2px at 20px 30px, #fff, transparent),
          radial-gradient(2px 2px at 40px 70px, #fff, transparent),
          radial-gradient(1px 1px at 90px 40px, #fff, transparent),
          radial-gradient(1px 1px at 130px 80px, #fff, transparent),
          radial-gradient(2px 2px at 160px 30px, #fff, transparent);
        background-size: 200px 100px;
        animation: sparkles 3s linear infinite;
        pointer-events: none;
        opacity: 0.6;
      }

      @keyframes sparkles {
        from { transform: translateY(0px); }
        to { transform: translateY(-100px); }
      }

      h1, h2 {
        font-size: 1.6rem;
        font-weight: 700;
        color: #2d3436;
        margin-bottom: 1.2rem;
        line-height: 1.3;
        text-align: center;
      }

      p {
        font-size: 0.9rem;
        color: #636e72;
        line-height: 1.6;
        font-weight: 400;
        margin-bottom: 1rem;
        text-align: center;
        word-break: keep-all;
      }

      .app {
        width: 100%;
        max-width: 340px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 25px;
        padding: 30px 25px;
        box-shadow: 
          0 20px 40px rgba(0, 0, 0, 0.1),
          0 0 0 1px rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }

      .page {
        display: none;
        text-align: center;
        position: relative;
        z-index: 1;
      }

      .page.active {
        display: block;
        animation: fadeInUp 0.5s ease-out;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(15px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 프로그레스 바 */
      .progress-container {
        width: 100%;
        height: 8px;
        background: rgba(108, 92, 231, 0.1);
        border-radius: 10px;
        margin-bottom: 20px;
        overflow: hidden;
      }

      .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #6c5ce7, #a29bfe);
        border-radius: 10px;
        transition: width 0.4s ease;
        width: 0%;
        position: relative;
      }

      .progress-bar::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shimmer 2s infinite;
      }

      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      button {
        margin: 8px 0;
        padding: 16px 24px;
        font-size: 0.95rem;
        font-weight: 600;
        border: none;
        border-radius: 25px;
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 6px 20px rgba(108, 92, 231, 0.25);
        position: relative;
        overflow: hidden;
        width: 100%;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        touch-action: manipulation;
        transform: scale(1);
      }

      button:active {
        transform: scale(0.98);
        box-shadow: 0 4px 15px rgba(108, 92, 231, 0.3);
        transition: all 0.1s ease;
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }

      button:not(:disabled):hover::before {
        left: 100%;
      }

      .options {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        margin: 1.5rem 0;
      }

      /* 네비게이션 버튼들 */
      .nav-buttons {
        display: flex;
        gap: 10px;
        margin-top: 1rem;
      }

      .nav-button {
        flex: 1;
        padding: 12px 16px;
        font-size: 0.85rem;
        background: rgba(108, 92, 231, 0.1);
        color: #6c5ce7;
        border: 1px solid rgba(108, 92, 231, 0.2);
        margin: 0;
      }

      .nav-button:disabled {
        background: rgba(150, 150, 150, 0.1);
        color: #999;
        border: 1px solid rgba(150, 150, 150, 0.2);
      }

      #progress-text {
        font-size: 0.85rem;
        color: #74b9ff;
        margin: 0.5rem 0;
        font-weight: 500;
      }

      /* 인트로 페이지 */
      #intro h1 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        background: linear-gradient(45deg, #6c5ce7, #a29bfe, #74b9ff);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: textShine 2s ease-in-out infinite alternate;
      }

      @keyframes textShine {
        from { background-position: 0% 50%; }
        to { background-position: 100% 50%; }
      }

      #intro p {
        color: #636e72;
        margin-bottom: 2rem;
        font-size: 0.9rem;
        line-height: 1.7;
      }

      /* 질문 텍스트 */
      #questionText {
        background: linear-gradient(135deg, rgba(116, 185, 255, 0.1), rgba(163, 155, 254, 0.1));
        padding: 20px;
        border-radius: 15px;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(116, 185, 255, 0.2);
        font-size: 1rem;
        line-height: 1.5;
        color: #2d3436;
        font-weight: 500;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
      }

      .question-icon {
        font-size: 2.5rem;
        margin-bottom: 8px;
        animation: bounce 2s infinite;
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-8px);
        }
        60% {
          transform: translateY(-4px);
        }
      }

      /* 결과 페이지 */
      #resultTitle {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: #6c5ce7;
      }

      #resultDesc {
        background: linear-gradient(135deg, rgba(108, 92, 231, 0.08), rgba(163, 155, 254, 0.08));
        padding: 20px;
        border-radius: 15px;
        margin: 1.5rem 0;
        border: 1px solid rgba(108, 92, 231, 0.15);
        line-height: 1.7;
        color: #636e72;
        font-size: 0.9rem;
      }

      #resultImg {
        display: none;
        max-width: 75%;
        margin: 1.5rem auto;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      /* 엔딩 페이지 */
      #ending {
        background: linear-gradient(135deg, rgba(116, 185, 255, 0.05), rgba(163, 155, 254, 0.05));
        padding: 20px;
        border-radius: 15px;
        border: 1px solid rgba(116, 185, 255, 0.1);
      }

      #ending h2 {
        color: #74b9ff;
        margin-bottom: 1rem;
      }

      #ending p {
        line-height: 1.7;
        margin-bottom: 1.5rem;
      }

      /* 로딩 상태 */
      .loading {
        pointer-events: none;
        opacity: 0.7;
      }

      /* 모바일 최적화 */
      @media (max-width: 380px) {
        .app {
          padding: 25px 20px;
          max-width: 320px;
        }
        
        h1, h2 {
          font-size: 1.5rem;
        }
        
        #intro h1 {
          font-size: 1.8rem;
        }
        
        p {
          font-size: 0.85rem;
        }
        
        button {
          padding: 14px 20px;
          font-size: 0.9rem;
        }

        #questionText {
          padding: 18px;
          font-size: 0.95rem;
        }

        .nav-button {
          font-size: 0.8rem;
          padding: 10px 12px;
        }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <!-- 인트로 -->
      <section id="intro" class="page active">
        <h1>✨ 소원 요정 키링 ✨</h1>
        <p>바쁘고 지친 하루 끝, 무거운 발걸음을 이끌고 집으로 돌아가는 길. 창문에 기대어 잠깐 눈을 붙이려던 순간 반짝이는 빛이 나타났다.</p>
        <p>작은 날개를 가진 소녀, 소원 요정!</p>
        <button id="startBtn">✨ 테스트 시작하기</button>
      </section>

              <!-- 질문 -->
      <section id="quiz" class="page">
        <div class="progress-container">
          <div class="progress-bar" id="progressBar"></div>
        </div>
        <p id="progress-text">1 / 24</p>
        
        <h2 id="questionText">질문이 여기에 표시됩니다</h2>
        
        <div class="options">
          <button id="btnYes">💫 네</button>
          <button id="btnNo">🌙 아니오</button>
        </div>

        <div class="nav-buttons">
          <button id="btnPrev" class="nav-button">← 이전</button>
        </div>
      </section>

      <!-- 결과 -->
      <section id="result" class="page">
        <h2 id="resultTitle">결과</h2>
        <p id="resultDesc">결과 설명이 여기에 표시됩니다</p>
        <img id="resultImg" alt="결과 이미지" />
        <button id="endBtn">🎁 엔딩 보기</button>
      </section>

      <!-- 엔딩 -->
      <section id="ending" class="page">
        <h2>소원 요정의 선물 🎁</h2>
        <p>짠! 이게 바로 너를 위한 소원 키링이야.</p>
        <p>소원이 이뤄지길 바라는 간절한 마음으로 키링을 만들어보는 건 어때? 앞으로의 하루하루가 행운 가득하길 바랄게 ✨</p>
        <button id="restartBtn">🔄 다시 하기</button>
      </section>
    </div>

    <script>
      const pages = document.querySelectorAll('.page');
      const startBtn = document.getElementById('startBtn');
      const endBtn = document.getElementById('endBtn');
      const restartBtn = document.getElementById('restartBtn');

      const questionText = document.getElementById('questionText');
      const progressText = document.getElementById('progress-text');
      const progressBar = document.getElementById('progressBar');
      const btnYes = document.getElementById('btnYes');
      const btnNo = document.getElementById('btnNo');
      const btnPrev = document.getElementById('btnPrev');


      const resultTitle = document.getElementById('resultTitle');
      const resultDesc = document.getElementById('resultDesc');
      const resultImg = document.getElementById('resultImg');

      // 질문 24개 (아이콘 포함)
      const questions = [
        // wealth (재물) - 실제 가치관과 우선순위를 묻는 질문
        { text: '돈을 벌기 위해서라면 야근도 괜찮다', type: 'wealth', icon: '💰' },
        { text: '적당히 벌고 여유롭게 사는 게 낫다', type: 'wealth', reverse: true, icon: '🌸' },
        { text: '투자 손실을 감수하더라도 큰 수익을 노린다', type: 'wealth', icon: '📈' },
        { text: '안정적인 적금이 투자보다 낫다', type: 'wealth', reverse: true, icon: '🏦' },
        { text: '명품이나 비싼 물건을 사고 싶다', type: 'wealth', icon: '👜' },
        { text: '가성비가 브랜드보다 중요하다', type: 'wealth', reverse: true, icon: '🏷️' },

        // love (사랑) - 연애에 대한 실제 관심도와 우선순위
        { text: '연애를 위해 시간과 에너지를 투자하고 싶다', type: 'love', icon: '💕' },
        { text: '지금은 자기계발이 연애보다 우선이다', type: 'love', reverse: true, icon: '📚' },
        { text: '소개팅이나 미팅을 적극적으로 나간다', type: 'love', icon: '🥂' },
        { text: '자연스러운 만남을 기다리는 편이다', type: 'love', reverse: true, icon: '🌙' },
        { text: '연애 앱을 사용해볼 의향이 있다', type: 'love', icon: '📱' },
        { text: '혼자만의 시간이 더 소중하다', type: 'love', reverse: true, icon: '🧘‍♀️' },

        // career (취업/성공) - 성공에 대한 의지와 야망
        { text: '승진을 위해 경쟁하는 걸 즐긴다', type: 'career', icon: '🏆' },
        { text: '직장에서 눈에 띄지 않게 조용히 일한다', type: 'career', reverse: true, icon: '🤫' },
        { text: '더 좋은 조건의 회사로 이직을 고려한다', type: 'career', icon: '🚀' },
        { text: '현재 직장에서 안정적으로 지내고 싶다', type: 'career', reverse: true, icon: '🏢' },
        { text: '창업이나 사업에 관심이 있다', type: 'career', icon: '💡' },
        { text: '평생 직장에서 일하는 게 이상적이다', type: 'career', reverse: true, icon: '⚓' },

        // health (건강) - 건강 관리에 대한 실제 노력과 관심
        { text: '건강을 위해 운동을 꾸준히 하고 있다', type: 'health', icon: '🏃‍♀️' },
        { text: '운동보다는 충분한 휴식이 중요하다', type: 'health', reverse: true, icon: '😴' },
        { text: '건강한 식단을 유지하려고 노력한다', type: 'health', icon: '🥗' },
        { text: '맛있는 음식이 건강식보다 우선이다', type: 'health', reverse: true, icon: '🍕' },
        { text: '스트레스 관리를 위해 취미활동을 한다', type: 'health', icon: '🎨' },
        { text: '바쁘면 건강관리는 뒷전이 된다', type: 'health', reverse: true, icon: '⏰' },
      ];

      // 결과 데이터
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

      let currentQ = 0;
      let scores = { wealth: 0, love: 0, career: 0, health: 0 };
      let answers = []; // 답변 기록
      let isAnimating = false;

      function showPage(id) {
        if (isAnimating) return;
        
        pages.forEach((p) => p.classList.remove('active'));
        document.getElementById(id).classList.add('active');
      }

      function updateProgress() {
        const progress = ((currentQ) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentQ} / ${questions.length}`;
      }

      function showQuestion() {
        if (currentQ < questions.length) {
          const question = questions[currentQ];
          
          // 아이콘과 텍스트를 함께 표시
          questionText.innerHTML = `
            <div class="question-icon">${question.icon}</div>
            <div>${question.text}</div>
          `;
          
          updateProgress();
          
          // 이전 버튼 상태 업데이트
          btnPrev.disabled = currentQ === 0;
          
          // 이전 답변이 있다면 버튼 활성화 상태 반영
          if (answers[currentQ] !== undefined) {
            if (answers[currentQ] === true) {
              btnYes.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
              btnNo.style.background = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
            } else {
              btnNo.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
              btnYes.style.background = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
            }
          } else {
            btnYes.style.background = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
            btnNo.style.background = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
          }
        } else {
          showResult();
        }
      }

      function showResult() {
        const best = Object.keys(scores).reduce((a, b) =>
          scores[a] > scores[b] ? a : b
        );
        resultTitle.textContent = results[best].title;
        resultDesc.textContent = results[best].desc;
        
        // 결과 이미지가 있다면 표시
        if (results[best].img) {
          resultImg.src = results[best].img;
          resultImg.style.display = 'block';
        }
        
        showPage('result');
      }

      function disableButtons() {
        if (isAnimating) return;
        
        isAnimating = true;
        btnYes.disabled = true;
        btnNo.disabled = true;
        
        setTimeout(() => {
          btnYes.disabled = false;
          btnNo.disabled = false;
          isAnimating = false;
        }, 300);
      }

      // 이벤트 리스너
      startBtn.addEventListener('click', () => {
        currentQ = 0;
        scores = { wealth: 0, love: 0, career: 0, health: 0 };
        answers = [];
        showPage('quiz');
        showQuestion();
      });

      btnYes.addEventListener('click', () => {
        if (isAnimating) return;
        disableButtons();
        
        const question = questions[currentQ];
        
        // 이전 답변이 있다면 점수에서 제거
        if (answers[currentQ] !== undefined) {
          if (answers[currentQ] === true) {
            return; // 이미 Yes였으면 변화 없음
          } else {
            // No에서 Yes로 바뀜 - 이전 점수 되돌리기
            if (question.reverse) {
              scores[question.type] += 1; // reverse 질문이었으면 다시 빼기
            } else {
              scores[question.type] += 1; // 일반 질문이면 더하기
            }
          }
        } else {
          // 새 답변
          if (question.reverse) {
            scores[question.type] -= 1; // reverse 질문은 "네"가 점수 감소
          } else {
            scores[question.type] += 1; // 일반 질문은 "네"가 점수 증가
          }
        }
        
        answers[currentQ] = true;
        btnYes.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
        btnNo.style.background = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
        
        // 자동으로 다음 질문으로
        setTimeout(() => {
          currentQ++;
          showQuestion();
        }, 250);
      });

      btnNo.addEventListener('click', () => {
        if (isAnimating) return;
        disableButtons();
        
        const question = questions[currentQ];
        
        // 이전 답변이 있다면 점수에서 제거
        if (answers[currentQ] !== undefined) {
          if (answers[currentQ] === false) {
            return; // 이미 No였으면 변화 없음
          } else {
            // Yes에서 No로 바뀜 - 이전 점수 되돌리기
            if (question.reverse) {
              scores[question.type] -= 1; // reverse 질문이었으면 다시 더하기
            } else {
              scores[question.type] -= 1; // 일반 질문이면 빼기
            }
          }
        } else {
          // 새 답변 - "아니오"는 아무 점수 변화 없음 (0점 처리)
        }
        
        answers[currentQ] = false;
        btnNo.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
        btnYes.style.background = 'linear-gradient(135deg, #6c5ce7, #a29bfe)';
        
        // 자동으로 다음 질문으로
        setTimeout(() => {
          currentQ++;
          showQuestion();
        }, 250);
      });

      btnPrev.addEventListener('click', () => {
        if (currentQ > 0) {
          currentQ--;
          showQuestion();
        }
      });

      endBtn.addEventListener('click', () => {
        showPage('ending');
      });

      restartBtn.addEventListener('click', () => {
        showPage('intro');
      });
    </script>
  </body>
</html>
