
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  let selectedGrade = "1";
  let selectedAvatar = "cat-yellow";
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
      <label>Select Avatar:</label>
      <select id="animal">
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
        <option value="mouse">Mouse</option>
      </select>
      <select id="color">
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
        <option value="pink">Pink</option>
      </select>
      <div><img id="avatarPreview" src="spritesheet.png" width="64" height="64" style="margin-top:10px;"></div>
      <br><button onclick="startGame()">Start</button>
    `;

    document.getElementById("animal").onchange = updatePreview;
    document.getElementById("color").onchange = updatePreview;
    updatePreview();
  }

  function updatePreview() {
    const a = document.getElementById("animal").value;
    const c = document.getElementById("color").value;
    selectedAvatar = `${a}-${c}`;
    const spriteIndex = {
      "cat-yellow": 0,
      "dog-yellow": 1,
      "mouse-yellow": 2,
      "cat-blue": 3,
      "dog-blue": 4,
      "mouse-blue": 5,
      "cat-pink": 6,
      "dog-pink": 7,
      "mouse-pink": 8
    }[selectedAvatar];
    const preview = document.getElementById("avatarPreview");
    const x = (spriteIndex % 3) * 64;
    const y = Math.floor(spriteIndex / 3) * 64;
    preview.style.objectFit = "none";
    preview.style.objectPosition = `-${x}px -${y}px`;
    preview.style.width = "64px";
    preview.style.height = "64px";
  }

  window.startGame = function () {
    selectedGrade = document.getElementById("grade").value;
    renderMap();
  };

  function renderMap() {
    app.innerHTML = `
      <h2>Woodland Village</h2>
      <p>Coins: <span id="coinCount">${coins}</span></p>
      <p>Avatar: ${selectedAvatar}</p>
      <button onclick="enterBuilding('home')">Home</button>
      <button onclick="enterBuilding('workshop')">Workshop</button>
      <button onclick="enterBuilding('townhall')">Townhall</button>
      <button onclick="enterBuilding('store')">Store</button>
      <button onclick="enterBuilding('hospital')">Hospital</button>
      <button onclick="enterBuilding('lab')">Science Lab</button>
      <button onclick="renderStart()">Back</button>
    `;
  }

  function enterBuilding(type) {
    if (type === "home") {
      app.innerHTML = `<h2>Player Home</h2><p>Welcome home! Your avatar is: ${selectedAvatar}</p><button onclick="renderMap()">Back</button>`;
      return;
    }
    if (type === "workshop") {
      
    app.innerHTML = `<h2>Workshop</h2><p>Furniture Upgrades</p>`;
    addPurchaseButton("Wallpaper", 5);
    addPurchaseButton("Table", 10);
    addPurchaseButton("Chair", 5);
    const back = document.createElement("button");
    back.textContent = "Back";
    back.onclick = renderMap;
    app.appendChild(back);
    return;
    
      return;
    }
    if (type === "townhall") {
      app.innerHTML = `<h2>Townhall</h2><p>Total Coins: ${coins}<br>Collect 200 in this land to unlock the next one!</p><button onclick="renderMap()">Back</button>`;
      return;
    }
    if (type === "store") {
      
    app.innerHTML = `<h2>Convenience Store</h2><p>Avatar Accessories</p>`;
    addPurchaseButton("Hat", 10);
    addPurchaseButton("Shoes", 10);
    addPurchaseButton("Outfit", 20);
    const back = document.createElement("button");
    back.textContent = "Back";
    back.onclick = renderMap;
    app.appendChild(back);
    return;
    
      return;
    }

    const file = `grade_${selectedGrade}_${type}.js`;
    const tag = document.createElement("script");
    tag.src = file;
    tag.onload = () => {
      const data = window[`grade_${selectedGrade}_${type}`];
      questions = data.easy;
      currentQuestion = 0;
      if (type === "hospital") renderHospitalQuestion();
      else renderLabQuestion();
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

  function addPurchaseButton(name, cost) {
    const btn = document.createElement("button");
    btn.textContent = `${name} - ${cost} coins`;
    btn.onclick = () => {
      if (coins >= cost) {
        coins -= cost;
        alert(`You bought a ${name}!`);
      } else {
        alert(`Not enough coins for ${name}.`);
      }
      document.getElementById("coinCount").textContent = coins;
    };
    app.appendChild(btn);
  }
