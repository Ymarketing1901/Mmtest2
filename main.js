
document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    const startScreen = `
        <h1>🎩 Math Magic</h1>
        <h2>Select Your Grade</h2>
        <select id="gradeSelect" class="input">
            <option value="K">Kindergarten</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
        </select>

        <h2>Select Your Avatar</h2>
        <select id="avatarSelect" class="input">
            <option value="cat-yellow">Cat - Yellow</option>
            <option value="dog-blue">Dog - Blue</option>
            <option value="mouse-pink">Mouse - Pink</option>
        </select>

        <br/><br/>
        <button class="button" onclick="startGame()">Start Game</button>
    `;

    app.innerHTML = startScreen;
});

function startGame() {
    const grade = document.getElementById("gradeSelect").value;
    const avatar = document.getElementById("avatarSelect").value;
    localStorage.setItem("mathMagicGrade", grade);
    localStorage.setItem("mathMagicAvatar", avatar);

    document.getElementById("app").innerHTML = `
        <h2>Welcome, ${avatar.replace('-', ' ')}!</h2>
        <p>Your chosen grade: ${grade}</p>
        <p>Let's explore the world map next...</p>
        <button class="button" onclick="goToWorldMap()">Continue</button>
    `;
}

function goToWorldMap() {
    document.getElementById("app").innerHTML = `
        <h2>🌍 World Map</h2>
        <p>Choose your land to begin:</p>
        <button class="button" onclick="enterLand(1)">Land 1: Wooden Village</button>
        <button class="button" disabled>Land 2: Ice Village (Locked)</button>
        <button class="button" disabled>Land 3: Caribbean Island (Locked)</button>
        <button class="button" disabled>Land 4: Savanna (Locked)</button>
        <button class="button" disabled>Land 5: Capital City (Locked)</button>
    `;
}

function enterLand(landNumber) {
    document.getElementById("app").innerHTML = `
        <h2>🏡 Welcome to Land ${landNumber}</h2>
        <p>Select a building:</p>
        <button class="button" onclick="openBuilding('home')">Player Home</button>
        <button class="button" onclick="openBuilding('workshop')">Workshop</button>
        <button class="button" onclick="openBuilding('townhall')">Townhall</button>
        <button class="button" onclick="openBuilding('store')">Convenience Store</button>
        <button class="button" onclick="openBuilding('hospital')">Hospital</button>
    `;
}

function openBuilding(name) {
    alert("This is a placeholder for the " + name + " building. Coming soon!");
}

function openBuilding(name) {
    if (name === 'hospital') {
        renderHospital();
    } else {
        alert("This is a placeholder for the " + name + " building. Coming soon!");
    }
}

function renderHospital() {
    const question = {
        text: "What is 5 + 3?",
        options: [
            { text: "6", correct: false },
            { text: "7", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false },
        ]
    };

    let optionsHTML = question.options.map((opt, index) => 
        `<button class='button' onclick='checkHospitalAnswer(${opt.correct})'>${opt.text}</button>`
    ).join("");

    document.getElementById("app").innerHTML = `
        <h2>🏥 Hospital</h2>
        <p>Solve the problem to help the patient:</p>
        <h3>${question.text}</h3>
        ${optionsHTML}
        <p><button class='button' onclick='enterLand(1)'>Back to Village</button></p>
    `;
}

function checkHospitalAnswer(isCorrect) {
    if (isCorrect) {
        alert("Correct! 🎉 You earned 2 coins.");
        let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0");
        coins += 2;
        localStorage.setItem("mathMagicCoins", coins);
    } else {
        alert("Oops! That's not correct.");
    }
    renderHospital();
}

let correctHospitalAnswers = 0;
let scienceLabUnlocked = false;

function checkHospitalAnswer(isCorrect) {
    if (isCorrect) {
        alert("Correct! 🎉 You earned 2 coins.");
        let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0");
        coins += 2;
        localStorage.setItem("mathMagicCoins", coins);
        correctHospitalAnswers += 1;
        if (correctHospitalAnswers >= 1 && !scienceLabUnlocked) {
            scienceLabUnlocked = true;
            alert("🔬 Science Lab is now unlocked!");
        }
    } else {
        alert("Oops! That's not correct.");
    }
    renderHospital();
}

function renderHospital() {
    const question = {
        text: "What is 5 + 3?",
        options: [
            { text: "6", correct: false },
            { text: "7", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false },
        ]
    };

    let optionsHTML = question.options.map((opt, index) => 
        `<button class='button' onclick='checkHospitalAnswer(${opt.correct})'>${opt.text}</button>`
    ).join("");

    let labButton = scienceLabUnlocked 
        ? "<button class='button' onclick='renderScienceLab()'>Enter Science Lab 🔬</button>" 
        : "";

    document.getElementById("app").innerHTML = `
        <h2>🏥 Hospital</h2>
        <p>Solve the problem to help the patient:</p>
        <h3>${question.text}</h3>
        ${optionsHTML}
        ${labButton}
        <p><button class='button' onclick='enterLand(1)'>Back to Village</button></p>
    `;
}

function renderScienceLab() {
    const question = {
        text: "Type the answer: What is 9 + 6?",
        answer: "15"
    };

    document.getElementById("app").innerHTML = `
        <h2>🔬 Science Lab</h2>
        <p>${question.text}</p>
        <input type="number" id="labAnswer" style="font-size: 20px; padding: 10px;" />
        <br/><br/>
        <button class='button' onclick='submitLabAnswer("${question.answer}")'>Submit</button>
        <p><button class='button' onclick='renderHospital()'>Back to Hospital</button></p>
    `;

    // Start timer gauge (simple timeout version)
    window.scienceLabStartTime = Date.now();
}

function submitLabAnswer(correctAnswer) {
    const userAnswer = document.getElementById("labAnswer").value.trim();
    const timeTaken = (Date.now() - window.scienceLabStartTime) / 1000;

    let coinsEarned = 0;
    if (userAnswer === correctAnswer) {
        if (timeTaken <= 5) {
            coinsEarned = 5;
        } else if (timeTaken <= 10) {
            coinsEarned = 3;
        } else {
            coinsEarned = 2;
        }
        alert(`✅ Correct! You answered in ${timeTaken.toFixed(1)}s and earned ${coinsEarned} coins.`);
        let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0");
        coins += coinsEarned;
        localStorage.setItem("mathMagicCoins", coins);
    } else {
        alert("❌ Incorrect or no answer. No coins awarded.");
    }

    renderScienceLab();
}

document.addEventListener("DOMContentLoaded", () => {
    renderProfileHeader();
});

function renderProfileHeader() {
    const app = document.getElementById("app");
    const profileBar = document.createElement("div");
    profileBar.style.position = "fixed";
    profileBar.style.top = "0";
    profileBar.style.left = "0";
    profileBar.style.right = "0";
    profileBar.style.backgroundColor = "#ffeaa7";
    profileBar.style.padding = "10px";
    profileBar.style.fontSize = "16px";
    profileBar.style.display = "flex";
    profileBar.style.justifyContent = "space-between";
    profileBar.style.alignItems = "center";
    profileBar.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    profileBar.innerHTML = `
        <span>🎒 Avatar: ${localStorage.getItem("mathMagicAvatar") || "?"}</span>
        <span>🧠 Grade: ${localStorage.getItem("mathMagicGrade") || "?"}</span>
        <span>💰 Coins: <span id="coinDisplay">${localStorage.getItem("mathMagicCoins") || 0}</span></span>
    `;
    document.body.insertBefore(profileBar, app);
}

function updateCoinDisplay() {
    document.getElementById("coinDisplay").innerText = localStorage.getItem("mathMagicCoins") || 0;
}

function openBuilding(name) {
    if (name === 'hospital') {
        renderHospital();
    } else if (name === 'store') {
        renderStore();
    } else {
        alert("This is a placeholder for the " + name + " building. Coming soon!");
    }
}

function renderStore() {
    const items = [
        { name: "Hat 🎩", cost: 10 },
        { name: "Sunglasses 🕶", cost: 10 },
        { name: "Necklace 📿", cost: 15 },
        { name: "Outfit 👗", cost: 20 },
        { name: "Shoes 👟", cost: 10 }
    ];

    let storeItems = items.map((item, i) => 
        `<div style="margin: 10px;">
            <span>${item.name} - ${item.cost} coins</span><br/>
            <button class="button" onclick="buyItem(${item.cost}, '${item.name}')">Buy</button>
        </div>`
    ).join("");

    document.getElementById("app").innerHTML = `
        <h2>🛒 Convenience Store</h2>
        ${storeItems}
        <p><button class="button" onclick="enterLand(1)">Back to Village</button></p>
    `;
}

function buyItem(cost, itemName) {
    let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0");
    if (coins >= cost) {
        coins -= cost;
        localStorage.setItem("mathMagicCoins", coins);
        alert(`✅ You bought ${itemName}!`);
    } else {
        alert("❌ Not enough coins.");
    }
    updateCoinDisplay();
    renderStore();
}

function openBuilding(name) {
    if (name === 'hospital') {
        renderHospital();
    } else if (name === 'store') {
        renderStore();
    } else if (name === 'workshop') {
        renderWorkshop();
    } else if (name === 'townhall') {
        renderTownhall();
    } else {
        alert("This is a placeholder for the " + name + " building. Coming soon!");
    }
}

function renderWorkshop() {
    const upgrades = [
        { name: "Wallpaper 🖼️", cost: 5 },
        { name: "Table 🪑", cost: 10 },
        { name: "Chair 💺", cost: 5 },
        { name: "Wall Frame 🖼", cost: 5 },
        { name: "Couch 🛋️", cost: 10 },
        { name: "Video Game 🎮", cost: 20 }
    ];

    const upgradeOptions = upgrades.map((item) =>
        `<div style="margin: 10px;">
            <span>${item.name} - ${item.cost} coins</span><br/>
            <button class="button" onclick="buyItem(${item.cost}, '${item.name}')">Buy</button>
        </div>`
    ).join("");

    document.getElementById("app").innerHTML = `
        <h2>🔧 Workshop</h2>
        ${upgradeOptions}
        <p><button class="button" onclick="enterLand(1)">Back to Village</button></p>
    `;
}

// Track total coins per land for progression (Land 1 in this case)
function checkHospitalAnswer(isCorrect) {
    if (isCorrect) {
        alert("Correct! 🎉 You earned 2 coins.");
        let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0");
        coins += 2;
        localStorage.setItem("mathMagicCoins", coins);

        // Track coins for Land 1
        let land1Coins = parseInt(localStorage.getItem("land1Coins") || "0");
        land1Coins += 2;
        localStorage.setItem("land1Coins", land1Coins);

        correctHospitalAnswers += 1;
        if (correctHospitalAnswers >= 1 && !scienceLabUnlocked) {
            scienceLabUnlocked = true;
            alert("🔬 Science Lab is now unlocked!");
        }
    } else {
        alert("Oops! That's not correct.");
    }
    updateCoinDisplay();
    renderHospital();
}

function renderTownhall() {
    const land1Coins = parseInt(localStorage.getItem("land1Coins") || "0");
    const unlocked = land1Coins >= 200;

    document.getElementById("app").innerHTML = `
        <h2>🏛️ Townhall</h2>
        <p>Total coins collected in Land 1: ${land1Coins}</p>
        <p>${unlocked ? "✅ You have unlocked the next land!" : "🔒 Earn 200 coins in this land to unlock the next land."}</p>
        <p><button class="button" onclick="enterLand(1)">Back to Village</button></p>
    `;
}

function goToWorldMap() {
    const land1Unlocked = true;
    const land2Unlocked = parseInt(localStorage.getItem("land1Coins") || "0") >= 200;

    document.getElementById("app").innerHTML = `
        <h2>🌍 World Map</h2>
        <p>Choose your land to begin:</p>
        <button class="button" onclick="enterLand(1)">Land 1: Wooden Village</button>
        <button class="button" ${land2Unlocked ? "" : "disabled"} onclick="enterLand(2)">Land 2: Ice Village</button>
        <button class="button" disabled>Land 3: Caribbean Island (Locked)</button>
        <button class="button" disabled>Land 4: Savanna (Locked)</button>
        <button class="button" disabled>Land 5: Capital City (Locked)</button>
    `;
}

function enterLand(landNumber) {
    let buildingsHTML = `
        <h2>🏡 Welcome to Land ${landNumber === 1 ? "Wooden Village" : landNumber === 2 ? "Ice Village" : "?"}</h2>
        <p>Select a building:</p>
        <button class="button" onclick="openBuilding('home')">Player Home</button>
        <button class="button" onclick="openBuilding('workshop')">Workshop</button>
        <button class="button" onclick="openBuilding('townhall', ${landNumber})">Townhall</button>
        <button class="button" onclick="openBuilding('store')">Convenience Store</button>
        <button class="button" onclick="openBuilding('hospital', ${landNumber})">Hospital</button>
    `;
    document.getElementById("app").innerHTML = buildingsHTML;
}

function openBuilding(name, land = 1) {
    if (name === 'hospital') {
        renderHospital(land);
    } else if (name === 'store') {
        renderStore();
    } else if (name === 'workshop') {
        renderWorkshop();
    } else if (name === 'townhall') {
        renderTownhall(land);
    } else {
        alert("This is a placeholder for the " + name + " building. Coming soon!");
    }
}

function renderHospital(land = 1) {
    const question = land === 2
        ? {
            text: "How many legs does a polar bear have?",
            options: [
                { text: "2", correct: false },
                { text: "4", correct: true },
                { text: "6", correct: false },
                { text: "8", correct: false }
            ]
        }
        : {
            text: "What is 5 + 3?",
            options: [
                { text: "6", correct: false },
                { text: "7", correct: false },
                { text: "8", correct: true },
                { text: "9", correct: false }
            ]
        };

    let optionsHTML = question.options.map((opt) => 
        `<button class='button' onclick='checkHospitalAnswer(${opt.correct}, ${land})'>${opt.text}</button>`
    ).join("");

    let labButton = scienceLabUnlocked 
        ? "<button class='button' onclick='renderScienceLab()'>Enter Science Lab 🔬</button>" 
        : "";

    document.getElementById("app").innerHTML = `
        <h2>🏥 Hospital (Land ${land})</h2>
        <p>Solve the problem to help the patient:</p>
        <h3>${question.text}</h3>
        ${optionsHTML}
        ${labButton}
        <p><button class='button' onclick='enterLand(${land})'>Back to Village</button></p>
    `;
}

function checkHospitalAnswer(isCorrect, land = 1) {
    if (isCorrect) {
        alert("Correct! 🎉 You earned 2 coins.");
        let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0") + 2;
        localStorage.setItem("mathMagicCoins", coins);

        let landKey = land === 2 ? "land2Coins" : "land1Coins";
        let landCoins = parseInt(localStorage.getItem(landKey) || "0") + 2;
        localStorage.setItem(landKey, landCoins);

        correctHospitalAnswers += 1;
        if (correctHospitalAnswers >= 1 && !scienceLabUnlocked) {
            scienceLabUnlocked = true;
            alert("🔬 Science Lab is now unlocked!");
        }
    } else {
        alert("Oops! That's not correct.");
    }
    updateCoinDisplay();
    renderHospital(land);
}

function renderTownhall(land = 1) {
    const key = land === 2 ? "land2Coins" : "land1Coins";
    const coins = parseInt(localStorage.getItem(key) || "0");
    const nextUnlocked = coins >= 200;

    document.getElementById("app").innerHTML = `
        <h2>🏛️ Townhall (Land ${land})</h2>
        <p>Total coins collected in Land ${land}: ${coins}</p>
        <p>${nextUnlocked ? "✅ You have unlocked the next land!" : "🔒 Earn 200 coins to unlock the next land."}</p>
        <p><button class="button" onclick="enterLand(${land})">Back to Village</button></p>
    `;
}

function renderScienceLab() {
    const currentLand = (parseInt(localStorage.getItem("land2Coins") || "0") >= 200) ? 3 :
                        (parseInt(localStorage.getItem("land1Coins") || "0") >= 200) ? 2 : 1;

    let question;
    if (currentLand === 3) {
        question = {
            text: "Type the answer: A parrot eats 4 seeds in the morning and 5 at night. How many seeds total?",
            answer: "9"
        };
    } else if (currentLand === 2) {
        question = {
            text: "Type the answer: A penguin slides 6 meters and then 7 more. How far total?",
            answer: "13"
        };
    } else {
        question = {
            text: "Type the answer: What is 9 + 6?",
            answer: "15"
        };
    }

    document.getElementById("app").innerHTML = `
        <h2>🔬 Science Lab (Land ${currentLand})</h2>
        <p>${question.text}</p>
        <input type="number" id="labAnswer" style="font-size: 20px; padding: 10px;" />
        <br/><br/>
        <button class='button' onclick='submitLabAnswer("${question.answer}", ${currentLand})'>Submit</button>
        <p><button class='button' onclick='renderHospital(${currentLand})'>Back to Hospital</button></p>
    `;

    window.scienceLabStartTime = Date.now();
}

function submitLabAnswer(correctAnswer, land = 1) {
    const userAnswer = document.getElementById("labAnswer").value.trim();
    const timeTaken = (Date.now() - window.scienceLabStartTime) / 1000;

    let coinsEarned = 0;
    if (userAnswer === correctAnswer) {
        if (timeTaken <= 5) {
            coinsEarned = 5;
        } else if (timeTaken <= 10) {
            coinsEarned = 3;
        } else {
            coinsEarned = 2;
        }
        alert(`✅ Correct! You answered in ${timeTaken.toFixed(1)}s and earned ${coinsEarned} coins.`);
        let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0") + coinsEarned;
        localStorage.setItem("mathMagicCoins", coins);

        const key = land === 3 ? "land3Coins" : land === 2 ? "land2Coins" : "land1Coins";
        let landCoins = parseInt(localStorage.getItem(key) || "0") + coinsEarned;
        localStorage.setItem(key, landCoins);
    } else {
        alert("❌ Incorrect or no answer. No coins awarded.");
    }

    updateCoinDisplay();
    renderScienceLab();
}

// Add Land 3: Caribbean Island

function goToWorldMap() {
    const land1Unlocked = true;
    const land2Unlocked = parseInt(localStorage.getItem("land1Coins") || "0") >= 200;
    const land3Unlocked = parseInt(localStorage.getItem("land2Coins") || "0") >= 200;

    document.getElementById("app").innerHTML = `
        <h2>🌍 World Map</h2>
        <p>Choose your land to begin:</p>
        <button class="button" onclick="enterLand(1)">Land 1: Wooden Village</button>
        <button class="button" ${land2Unlocked ? "" : "disabled"} onclick="enterLand(2)">Land 2: Ice Village</button>
        <button class="button" ${land3Unlocked ? "" : "disabled"} onclick="enterLand(3)">Land 3: Caribbean Island</button>
        <button class="button" disabled>Land 4: Savanna (Locked)</button>
        <button class="button" disabled>Land 5: Capital City (Locked)</button>
    `;
}

function renderHospital(land = 1) {
    const question = land === 3
        ? {
            text: "How many legs does a crab have?",
            options: [
                { text: "6", correct: false },
                { text: "8", correct: false },
                { text: "10", correct: true },
                { text: "12", correct: false }
            ]
        }
        : land === 2
        ? {
            text: "How many legs does a polar bear have?",
            options: [
                { text: "2", correct: false },
                { text: "4", correct: true },
                { text: "6", correct: false },
                { text: "8", correct: false }
            ]
        }
        : {
            text: "What is 5 + 3?",
            options: [
                { text: "6", correct: false },
                { text: "7", correct: false },
                { text: "8", correct: true },
                { text: "9", correct: false }
            ]
        };

    let optionsHTML = question.options.map((opt) => 
        `<button class='button' onclick='checkHospitalAnswer(${opt.correct}, ${land})'>${opt.text}</button>`
    ).join("");

    let labButton = scienceLabUnlocked 
        ? "<button class='button' onclick='renderScienceLab()'>Enter Science Lab 🔬</button>" 
        : "";

    document.getElementById("app").innerHTML = `
        <h2>🏥 Hospital (Land ${land})</h2>
        <p>Solve the problem to help the patient:</p>
        <h3>${question.text}</h3>
        ${optionsHTML}
        ${labButton}
        <p><button class='button' onclick='enterLand(${land})'>Back to Village</button></p>
    `;
}

function goToWorldMap() {
    const land1Unlocked = true;
    const land2Unlocked = parseInt(localStorage.getItem("land1Coins") || "0") >= 200;
    const land3Unlocked = parseInt(localStorage.getItem("land2Coins") || "0") >= 200;
    const land4Unlocked = parseInt(localStorage.getItem("land3Coins") || "0") >= 200;
    const land5Unlocked = parseInt(localStorage.getItem("land4Coins") || "0") >= 200;

    document.getElementById("app").innerHTML = `
        <h2>🌍 World Map</h2>
        <p>Choose your land to begin:</p>
        <button class="button" onclick="enterLand(1)">Land 1: Wooden Village</button>
        <button class="button" ${land2Unlocked ? "" : "disabled"} onclick="enterLand(2)">Land 2: Ice Village</button>
        <button class="button" ${land3Unlocked ? "" : "disabled"} onclick="enterLand(3)">Land 3: Caribbean Island</button>
        <button class="button" ${land4Unlocked ? "" : "disabled"} onclick="enterLand(4)">Land 4: Savanna</button>
        <button class="button" ${land5Unlocked ? "" : "disabled"} onclick="enterLand(5)">Land 5: Capital City</button>
    `;
}

function renderHospital(land = 1) {
    const question = land === 5
        ? {
            text: "What is 20% of 80?",
            options: [
                { text: "12", correct: false },
                { text: "16", correct: true },
                { text: "20", correct: false },
                { text: "18", correct: false }
            ]
        }
        : land === 4
        ? {
            text: "A lion has 4 paws. How many paws do 3 lions have?",
            options: [
                { text: "12", correct: true },
                { text: "9", correct: false },
                { text: "8", correct: false },
                { text: "14", correct: false }
            ]
        }
        : land === 3
        ? {
            text: "How many legs does a crab have?",
            options: [
                { text: "6", correct: false },
                { text: "8", correct: false },
                { text: "10", correct: true },
                { text: "12", correct: false }
            ]
        }
        : land === 2
        ? {
            text: "How many legs does a polar bear have?",
            options: [
                { text: "2", correct: false },
                { text: "4", correct: true },
                { text: "6", correct: false },
                { text: "8", correct: false }
            ]
        }
        : {
            text: "What is 5 + 3?",
            options: [
                { text: "6", correct: false },
                { text: "7", correct: false },
                { text: "8", correct: true },
                { text: "9", correct: false }
            ]
        };

    let optionsHTML = question.options.map((opt) => 
        `<button class='button' onclick='checkHospitalAnswer(${opt.correct}, ${land})'>${opt.text}</button>`
    ).join("");

    let labButton = scienceLabUnlocked 
        ? "<button class='button' onclick='renderScienceLab()'>Enter Science Lab 🔬</button>" 
        : "";

    document.getElementById("app").innerHTML = `
        <h2>🏥 Hospital (Land ${land})</h2>
        <p>Solve the problem to help the patient:</p>
        <h3>${question.text}</h3>
        ${optionsHTML}
        ${labButton}
        <p><button class='button' onclick='enterLand(${land})'>Back to Village</button></p>
    `;
}

function submitLabAnswer(correctAnswer, land = 1) {
    const userAnswer = document.getElementById("labAnswer").value.trim();
    const timeTaken = (Date.now() - window.scienceLabStartTime) / 1000;

    let coinsEarned = 0;
    if (userAnswer === correctAnswer) {
        if (timeTaken <= 5) {
            coinsEarned = 5;
        } else if (timeTaken <= 10) {
            coinsEarned = 3;
        } else {
            coinsEarned = 2;
        }
        alert(`✅ Correct! You answered in ${timeTaken.toFixed(1)}s and earned ${coinsEarned} coins.`);
        let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0") + coinsEarned;
        localStorage.setItem("mathMagicCoins", coins);

        const key = "land" + land + "Coins";
        let landCoins = parseInt(localStorage.getItem(key) || "0") + coinsEarned;
        localStorage.setItem(key, landCoins);
    } else {
        alert("❌ Incorrect or no answer. No coins awarded.");
    }

    updateCoinDisplay();
    renderScienceLab();
}

function renderScienceLab() {
    const currentLand = (parseInt(localStorage.getItem("land4Coins") || "0") >= 200) ? 5 :
                        (parseInt(localStorage.getItem("land3Coins") || "0") >= 200) ? 4 :
                        (parseInt(localStorage.getItem("land2Coins") || "0") >= 200) ? 3 :
                        (parseInt(localStorage.getItem("land1Coins") || "0") >= 200) ? 2 : 1;

    let question;
    if (currentLand === 5) {
        question = {
            text: "What is 25% of 64?",
            answer: "16"
        };
    } else if (currentLand === 4) {
        question = {
            text: "An elephant drinks 6 liters in the morning and 8 in the afternoon. Total?",
            answer: "14"
        };
    } else if (currentLand === 3) {
        question = {
            text: "A parrot eats 4 seeds in the morning and 5 at night. How many seeds total?",
            answer: "9"
        };
    } else if (currentLand === 2) {
        question = {
            text: "A penguin slides 6 meters and then 7 more. How far total?",
            answer: "13"
        };
    } else {
        question = {
            text: "What is 9 + 6?",
            answer: "15"
        };
    }

    document.getElementById("app").innerHTML = `
        <h2>🔬 Science Lab (Land ${currentLand})</h2>
        <p>${question.text}</p>
        <input type="number" id="labAnswer" style="font-size: 20px; padding: 10px;" />
        <br/><br/>
        <button class='button' onclick='submitLabAnswer("${question.answer}", ${currentLand})'>Submit</button>
        <p><button class='button' onclick='renderHospital(${currentLand})'>Back to Hospital</button></p>
    `;

    window.scienceLabStartTime = Date.now();
}

function checkFinalChallengeUnlock() {
    const capCoins = parseInt(localStorage.getItem("land5Coins") || "0");
    return capCoins >= 1000;
}

function enterLand(landNumber) {
    let buildingsHTML = `
        <h2>🏡 Welcome to Land ${landNumber === 1 ? "Wooden Village" :
                              landNumber === 2 ? "Ice Village" :
                              landNumber === 3 ? "Caribbean Island" :
                              landNumber === 4 ? "Savanna" :
                              landNumber === 5 ? "Capital City" : "?"}</h2>
        <p>Select a building:</p>
        <button class="button" onclick="openBuilding('home')">Player Home</button>
        <button class="button" onclick="openBuilding('workshop')">Workshop</button>
        <button class="button" onclick="openBuilding('townhall', ${landNumber})">Townhall</button>
        <button class="button" onclick="openBuilding('store')">Convenience Store</button>
        <button class="button" onclick="openBuilding('hospital', ${landNumber})">Hospital</button>
    `;

    if (landNumber === 5 && checkFinalChallengeUnlock()) {
        buildingsHTML += `
            <button class="button" onclick="renderFinalChallenge()">🏁 Final Challenge</button>
        `;
    }

    document.getElementById("app").innerHTML = buildingsHTML;
}

function renderFinalChallenge() {
    const questions = [
        { q: "What is 7 x 6?", a: "42" },
        { q: "What is 12 / 3?", a: "4" },
        { q: "What is 15% of 60?", a: "9" },
        { q: "A triangle has how many sides?", a: "3" },
        { q: "What is 8 squared?", a: "64" },
        { q: "Solve: 2(x + 3) = 10", a: "2" },
        { q: "What is 100 - 37?", a: "63" },
        { q: "What is 3/4 of 20?", a: "15" },
        { q: "A rectangle with sides 5 and 4 has area?", a: "20" },
        { q: "Solve: x if x + 9 = 14", a: "5" }
    ];

    let content = questions.map((item, i) =>
        `<p>${i + 1}. ${item.q}<br/><input id="finalQ${i}" style="font-size: 16px; padding: 4px;" /></p>`
    ).join("");

    document.getElementById("app").innerHTML = `
        <h2>🏁 Final Challenge</h2>
        <p>Answer at least 6 out of 10 questions correctly to pass!</p>
        ${content}
        <button class="button" onclick="submitFinalChallenge()">Submit Answers</button>
        <p><button class="button" onclick="enterLand(5)">Back to Capital</button></p>
    `;

    window.finalAnswers = questions.map(q => q.a);
}

function submitFinalChallenge() {
    let correct = 0;
    window.finalAnswers.forEach((ans, i) => {
        const userAns = document.getElementById(`finalQ${i}`).value.trim();
        if (userAns === ans) correct++;
    });

    if (correct >= 6) {
        document.getElementById("app").innerHTML = `
            <h2>🎉 You Passed the Final Challenge!</h2>
            <p>You got ${correct}/10 correct.</p>
            <p>🌟 Your grade level ending: ${localStorage.getItem("mathMagicGrade")}</p>
            <p><strong>Congratulations!</strong> You’ve completed Math Magic.</p>
            <p><button class="button" onclick="goToWorldMap()">Return to Map</button></p>
        `;
    } else {
        alert(`You got ${correct}/10 correct. Try again!`);
    }
}

function enterLand(landNumber) {
    let buildingsHTML = `
        <h2>🏡 Welcome to Land ${landNumber === 5 ? "Capital City" : "Land " + landNumber}</h2>
        <p>Select a building:</p>
        <button class="button" onclick="openBuilding('home')">Player Home</button>
        <button class="button" onclick="openBuilding('workshop')">Workshop</button>
        <button class="button" onclick="openBuilding('townhall', ${landNumber})">Townhall</button>
        <button class="button" onclick="openBuilding('store')">Convenience Store</button>
        <button class="button" onclick="openBuilding('hospital', ${landNumber})">Hospital</button>
    `;

    if (landNumber === 5) {
        if (checkFinalChallengeUnlock()) {
            buildingsHTML += `<button class="button" onclick="renderFinalChallenge()">🏁 Final Challenge</button>`;
        }
        buildingsHTML += `
            <button class="button" onclick="openSpecialBuilding('eiffel')">🗼 Eiffel Tower</button>
            <button class="button" onclick="openSpecialBuilding('louvre')">🖼️ Louvres Museum</button>
            <button class="button" onclick="openSpecialBuilding('icecream')">🍦 Ice Cream Shop</button>
            <button class="button" onclick="openSpecialBuilding('palace')">🏰 Palace of Math</button>
            <button class="button" onclick="openSpecialBuilding('arc')">🎆 Arc de Triomphe</button>
        `;
    }

    document.getElementById("app").innerHTML = buildingsHTML;
}

function openSpecialBuilding(name) {
    if (name === 'eiffel') {
        renderSpecialChallenge("Eiffel Tower - Geometry", "What is the perimeter of a triangle with sides 3, 4, 5?", "12");
    } else if (name === 'louvre') {
        renderSpecialChallenge("Louvres Museum - Word Problem", "A painting is 6 ft tall and 4 ft wide. What is the area?", "24");
    } else if (name === 'icecream') {
        renderIceCreamShop();
    } else if (name === 'palace') {
        renderPalaceOfMath();
    } else if (name === 'arc') {
        renderArcDeTriomphe();
    }
}

function renderSpecialChallenge(title, questionText, correctAnswer) {
    document.getElementById("app").innerHTML = `
        <h2>${title}</h2>
        <p>${questionText}</p>
        <input type="number" id="specialAnswer" style="font-size: 20px; padding: 10px;" />
        <br/><br/>
        <button class="button" onclick="submitSpecialAnswer('${correctAnswer}')">Submit</button>
        <p><button class="button" onclick="enterLand(5)">Back to Capital</button></p>
    `;
    window.specialStartTime = Date.now();
}

function submitSpecialAnswer(correctAnswer) {
    const answer = document.getElementById("specialAnswer").value.trim();
    const timeTaken = (Date.now() - window.specialStartTime) / 1000;
    let coins = 0;

    if (answer === correctAnswer) {
        if (timeTaken <= 5) {
            coins = 5;
        } else if (timeTaken <= 10) {
            coins = 3;
        } else {
            coins = 2;
        }
        alert(`✅ Correct! +${coins} coins`);
    } else {
        alert("❌ Incorrect! No coins awarded.");
    }

    const total = parseInt(localStorage.getItem("mathMagicCoins") || "0") + coins;
    const capCoins = parseInt(localStorage.getItem("land5Coins") || "0") + coins;
    localStorage.setItem("mathMagicCoins", total);
    localStorage.setItem("land5Coins", capCoins);
    updateCoinDisplay();
    enterLand(5);
}

function renderIceCreamShop() {
    document.getElementById("app").innerHTML = `
        <h2>🍦 Fancy Ice Cream Shop</h2>
        <p>Select one of 10 delicious combinations (10 coins each)</p>
        <button class="button" onclick="buyIceCream()">Buy Random Ice Cream</button>
        <p><button class="button" onclick="enterLand(5)">Back to Capital</button></p>
    `;
}

function buyIceCream() {
    let coins = parseInt(localStorage.getItem("mathMagicCoins") || "0");
    if (coins >= 10) {
        coins -= 10;
        localStorage.setItem("mathMagicCoins", coins);
        updateCoinDisplay();
        alert("🍨 You bought a delicious ice cream!");
    } else {
        alert("❌ Not enough coins!");
    }
}

function renderPalaceOfMath() {
    const capitalCoins = parseInt(localStorage.getItem("land5Coins") || "0");
    const tipsUnlocked = Math.floor(capitalCoins / 100);
    let tips = [
        "Tip 1: To multiply by 5, multiply by 10 then divide by 2.",
        "Tip 2: Percent means 'per 100' – so 25% is 25 out of 100.",
        "Tip 3: Area of triangle = (base x height) / 2.",
        "Tip 4: A square root is the opposite of squaring a number.",
        "Tip 5: The order of operations: PEMDAS (Parentheses, Exponents, etc.)"
    ];
    let displayTips = tips.slice(0, tipsUnlocked).map(t => `<li>${t}</li>`).join("");

    document.getElementById("app").innerHTML = `
        <h2>🏰 Palace of Math</h2>
        <p>Capital Coins: ${capitalCoins} — Tips Unlocked: ${tipsUnlocked}</p>
        <ul>${displayTips || "<li>No tips unlocked yet. Earn more coins!</li>"}</ul>
        <p><button class="button" onclick="enterLand(5)">Back to Capital</button></p>
    `;
}

function renderArcDeTriomphe() {
    const capitalCoins = parseInt(localStorage.getItem("land5Coins") || "0");
    if (capitalCoins >= 500) {
        document.getElementById("app").innerHTML = `
            <h2>🎆 Arc de Triomphe</h2>
            <p>Celebration unlocked! You’ve collected over 500 Capital Coins!</p>
            <p>🎇 Enjoy a 30-second fireworks show...</p>
            <div style="height: 200px; background: black; color: white; margin: 20px 0;">
                <p style="padding-top: 90px;">🎆🎇✨ BOOM! 💥🎆🎇</p>
            </div>
            <p><button class="button" onclick="enterLand(5)">Back to Capital</button></p>
        `;
    } else {
        alert("❌ You need 500 Capital Coins to unlock this celebration!");
    }
}

function startGame() {
    const grade = document.getElementById("gradeSelect").value;
    const avatar = document.getElementById("avatarSelect").value;
    const slot = document.getElementById("saveSlotSelect").value;

    localStorage.setItem(`slot${slot}_mathMagicGrade`, grade);
    localStorage.setItem(`slot${slot}_mathMagicAvatar`, avatar);
    localStorage.setItem("activeSlot", slot);

    loadProfile(slot);
    goToWorldMap();
}

function loadProfile(slot) {
    const grade = localStorage.getItem(`slot${slot}_mathMagicGrade`);
    const avatar = localStorage.getItem(`slot${slot}_mathMagicAvatar`);
    const coins = localStorage.getItem(`slot${slot}_mathMagicCoins`) || "0";

    localStorage.setItem("mathMagicGrade", grade);
    localStorage.setItem("mathMagicAvatar", avatar);
    localStorage.setItem("mathMagicCoins", coins);

    for (let i = 1; i <= 5; i++) {
        const key = `slot${slot}_land${i}Coins`;
        localStorage.setItem(`land${i}Coins`, localStorage.getItem(key) || "0");
    }

    updateCoinDisplay();
    renderProfileHeader();
}

function updateSaveSlotCoins() {
    const slot = localStorage.getItem("activeSlot");
    if (!slot) return;

    localStorage.setItem(`slot${slot}_mathMagicCoins`, localStorage.getItem("mathMagicCoins"));
    for (let i = 1; i <= 5; i++) {
        localStorage.setItem(`slot${slot}_land${i}Coins`, localStorage.getItem(`land${i}Coins`));
    }
}

function updateCoinDisplay() {
    const coinEl = document.getElementById("coinDisplay");
    if (coinEl) {
        coinEl.innerText = localStorage.getItem("mathMagicCoins") || "0";
    }
    updateSaveSlotCoins();
}

document.addEventListener("DOMContentLoaded", () => {
    renderProfileHeader();

    const app = document.getElementById("app");
    app.innerHTML = `
        <h1>🎩 Math Magic</h1>
        <h2>Select Save Slot</h2>
        <select id="saveSlotSelect" class="input">
            <option value="1">Profile 1</option>
            <option value="2">Profile 2</option>
            <option value="3">Profile 3</option>
        </select>

        <h2>Select Your Grade</h2>
        <select id="gradeSelect" class="input">
            <option value="K">Kindergarten</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
        </select>

        <h2>Select Your Avatar</h2>
        <select id="avatarSelect" class="input">
            <option value="cat-yellow">Cat - Yellow</option>
            <option value="dog-blue">Dog - Blue</option>
            <option value="mouse-pink">Mouse - Pink</option>
        </select>
        <br/><br/>
        <button class="button" onclick="startGame()">Start Game</button>
    `;
});
