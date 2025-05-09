document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.innerHTML = "<h1>Hello, the game is working!</h1><button id='testBtn'>Click me</button>";
  document.getElementById("testBtn").onclick = () => {
    app.innerHTML += "<p>Button clicked. Everything's running fine.</p>";
  };
  console.log("JS Loaded Successfully");
});
