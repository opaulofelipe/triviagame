let questions = [];
let current = 0;
let revealed = false;
const card = document.getElementById("card");

fetch("dados.csv")
  .then(res => res.text())
  .then(text => {
    const lines = text.trim().split("\n").slice(1);

    questions = lines.map(line => {
      const parts = line.split(",");
      return {
        nome: parts[0],
        regiao: parts[1],
        descricao: parts.slice(2).join(",") || "Descrição indisponível."
      };
    });

    shuffleArray(questions);
    loadQuestion();
  });

function loadQuestion(){
  const q = questions[current];

  document.getElementById("question").innerText =
    `Qual a região associada a: ${q.nome}?`;

  document.getElementById("answer").innerText = q.regiao;
  document.getElementById("description").innerText = q.descricao;
}

card.addEventListener("click", () => {

  // PRIMEIRO TOQUE → REVELA
  if (!revealed) {
    card.classList.add("flip");
    revealed = true;
    return;
  }

  // SEGUNDO TOQUE → VOLTA O CARD
  card.classList.remove("flip");
  revealed = false;

  // ESPERA A ANIMAÇÃO TERMINAR ANTES DE TROCAR O CONTEÚDO
  card.addEventListener("transitionend", handleNext, { once: true });
});

function handleNext(){
  current++;

  if (current >= questions.length) {
    shuffleArray(questions);
    current = 0;
  }

  loadQuestion();
}

function shuffleArray(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

