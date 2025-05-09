

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  let selectedGrade = "1";
  let coins = 0;
  let questions = [];
  let currentQuestion = 0;

  function renderStart() {
    app.innerHTML = `
      <h1>Math Magic</h1>
      <label>Select Grade:</label>
      <select id="grade">
        <option value="0">K</option>
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select><br><br>
      <button onclick="startGame()">Start</button>
    `;
  }

  window.startGame = function () {
    selectedGrade = document.getElementById("grade").value;
    renderMap();
  };

  function renderMap() {
    app.innerHTML = `
      <h2>Woodland Village</h2>
      <p>Coins: <span id="coinCount">${coins}</span></p>
      <button onclick="enterBuilding('hospital')">Hospital</button>
      <button onclick="enterBuilding('lab')">Science Lab</button>
      <button onclick="renderStart()">Back</button>
    `;
  }

  function enterBuilding(type) {
    const file = `grade_${selectedGrade}_${type}.js`;
    const tag = document.createElement("script");
    tag.src = file;
    tag.onload = () => {
      const data = window[`grade_${selectedGrade}_${type}`];
      questions = data.easy;
      currentQuestion = 0;
      if (type === "hospital") {
        renderHospitalQuestion();
      } else {
        renderLabQuestion();
      }
    };
    document.body.appendChild(tag);
  }

  function renderHospitalQuestion() {
    if (currentQuestion >= questions.length) {
      app.innerHTML = `<h2>All patients cured!</h2><button onclick="renderMap()">Back</button>`;
      return;
    }
    const q = questions[currentQuestion];
    app.innerHTML = `<h2>Hospital</h2><p>${q.text}</p>`;
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        if (opt === q.answer) coins += 2;
        currentQuestion++;
        renderHospitalQuestion();
        document.getElementById("coinCount").textContent = coins;
      };
      app.appendChild(btn);
    });
  }

  function renderLabQuestion() {
    if (currentQuestion >= questions.length) {
      app.innerHTML = `<h2>Lab session done!</h2><button onclick="renderMap()">Back</button>`;
      return;
    }
    const q = questions[currentQuestion];
    app.innerHTML = `<h2>Science Lab</h2><p>${q.text}</p>`;
    const input = document.createElement("input");
    input.type = "text";
    app.appendChild(input);
    const submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.onclick = () => {
      if (input.value === q.answer) coins += 3;
      currentQuestion++;
      renderLabQuestion();
      document.getElementById("coinCount").textContent = coins;
    };
    app.appendChild(submit);
  }

  renderStart();
});
