// Variables globales
let players = [];
let playerCount = 0;
let pointsToWin = 0;
let currentPlayerIndex = 0;
let usedLetters = [];
let timerInterval;
let timeLeft = 10;
let currentTheme = '';
let turnsInCurrentRound = 0; // Variable para contar turnos en la ronda

let gameThemes = [
    "Películas",
    "Cantante solista masculino",
    "Cantante solista femenino",
    "Banda de música",
    "Algo que tenga ruedas",
    "Canciones famosas",
    "Presidentes del mundo",
    "Ciudades con playa",
    "Algo que encuentres en un museo",
    "Una comida",
    "Sabor de helado",
    "Algo hecho de plástico",
    "Algo que puedas comprar en una farmacia",
    "Nombre de una canción",
    "País, cuidad o pueblo",
    "Algo que encuentres en una ferretería",
    "Algo que encuentres en una fiesta",
    "Algo que encuentres en un supermercado",
    "Parte del cuerpo humano",
    "Algo que encuentres en un cine",
    "Personaje de dibujo animado",
    "Algo relacionado con la tecnología",
    "Algo que encuentres en el baño",
    "Un postre",
    "Una fruta",
    "Flor o planta",
    "Algo que encuentres en un hospital",
    "Apodo",
    "Algo que encuentres en una farmacia",
    "Un animal",
    "Algo relacionado con los deportes",
    "Algo salado",
    "Destino turístico en Argentina",
    "Jueguetes",
    "Algo de sabor ácido",
    "Nombre masculino",
    "Nombre femenino",
    "Algo que encuentres en una escuela",
    "Algo que encuentres en la cocina",
    "Prenda de vestir o calzado",
    "Algo de sabor dulce",
    "Instrumentos musicales",
    "nombre prócer de América",
    "Algo que encuentres en una librería",
    "Algo que encuentres en una granja",
    "Algo que encuentres en la calle",
    "Algo que encuentres en un kiosko",
    "Algo que encuentres en un restaurant",
    "Una bebida",
    "Palabra que contenga la letra R",
    "Elije tema",
    "Algo que funcione con combustible",
    "Muebles",
    "Algo que encuentres en una estación de servicio",
    "Partes de una bicicleta",
    "Materiales de construcción",
    "Película animada",
    "Actor masculino",
    "Actriz femenina",
    "Algo hecho de madera",
    "Animales",
    "Algo relacionado a bebés",
    "Halagos",
    "Especias",
    "Colores",
    "Palabras de seis letras o 3 sílabas",
    "Ríos",
    "Algo que utilice electricidad",
    "Cosas en un aeropuerto",
    "Marcas de bebidas",
    "Productos en una fiambrería",
    "Monedas del mundo",
    "Insultos",
    "Jugadores de fútbol",
    "Algo representativo de Argentina",
    "Palabras en inglés",
    "Palabras que terminan con la letra A",
    "Golosinas",
    "Países",
    "Comidas",
    "Deportes",
    "Profesiones",
    "Frutas",
    "Marcas",
    "Objetos de la casa",
    "Ropa",
    "Ciudades",
    "Verduras",
    "Palabras de cuatro letras",
    "Algo que encuentres en una oficina",
    "Algo que encuentres en una plaza",
    "Electrodomésticos",
    "Aplicaciones móviles",
    "Programas de televisión"
];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

// Elementos DOM
const instructionsScreen = document.getElementById('instructionsScreen');
const setupScreen = document.getElementById('setupScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const playerCountInput = document.getElementById('playerCount');
const playerNamesDiv = document.getElementById('playerNames');
const pointsToWinInput = document.getElementById('pointsToWin');
const startButton = document.getElementById('startButton');
const startGameBtn = document.getElementById('startGame');
const backToInstructionsBtn = document.getElementById('backToInstructions');
const backToSetupBtn = document.getElementById('backToSetup');
const backToSetupFromResultsBtn = document.getElementById('backToSetupFromResults');
const currentThemeDiv = document.getElementById('currentTheme');
const currentLetterDiv = document.getElementById('currentLetter');
const timerDiv = document.getElementById('timer');
const currentPlayerDiv = document.getElementById('currentPlayer');
const correctBtn = document.getElementById('correctBtn');
const incorrectBtn = document.getElementById('incorrectBtn');
const scoreListDiv = document.getElementById('scoreList');
const winnerMessageDiv = document.getElementById('winnerMessage');
const finalScoreListDiv = document.getElementById('finalScoreList');
const playAgainBtn = document.getElementById('playAgain');
const playerCountError = document.getElementById('playerCountError');
const pointsError = document.getElementById('pointsError');
const roundCompleteModal = document.getElementById('roundCompleteModal');
const continueButton = document.getElementById('continueButton');

// Elementos de audio
const startSound = new Audio('src/sounds/start.mp3');
const timeoutSound = new Audio('src/sounds/timeout.mp3');
const correctSound = new Audio('src/sounds/correct.mp3');
const tickingSound = new Audio('src/sounds/ticking.mp3');
const winSound = new Audio('src/sounds/win.mp3');
const roundCompleteSound = new Audio('src/sounds/round_complete.mp3');

// Event Listeners
startButton.addEventListener('click', showSetupScreen);
backToInstructionsBtn.addEventListener('click', showInstructionsScreen);
backToSetupBtn.addEventListener('click', showSetupScreenFromGame);
backToSetupFromResultsBtn.addEventListener('click', showSetupScreenFromResults);
playerCountInput.addEventListener('change', generatePlayerInputs);
startGameBtn.addEventListener('click', startGame);
correctBtn.addEventListener('click', handleCorrectAnswer);
incorrectBtn.addEventListener('click', handleIncorrectAnswer);
playAgainBtn.addEventListener('click', restartGame); // Cambiado a restartGame
continueButton.addEventListener('click', hideRoundCompleteModal);

// Mostrar pantalla de configuración
function showSetupScreen() {
    instructionsScreen.classList.remove('active');
    setupScreen.classList.add('active');
}

// Mostrar pantalla de instrucciones
function showInstructionsScreen() {
    setupScreen.classList.remove('active');
    instructionsScreen.classList.add('active');
}

// Mostrar pantalla de configuración desde el juego
function showSetupScreenFromGame() {
    clearInterval(timerInterval);
    tickingSound.pause();
    tickingSound.currentTime = 0;
    gameScreen.classList.remove('active');
    setupScreen.classList.add('active');
}

// Mostrar pantalla de configuración desde resultados
function showSetupScreenFromResults() {
    resultScreen.classList.remove('active');
    setupScreen.classList.add('active');
}

// Generar inputs para nombres de jugadores
function generatePlayerInputs() {
    const count = parseInt(playerCountInput.value);
    playerCountError.textContent = '';
    
    if (isNaN(count) || count < 2) {
        playerCountError.textContent = 'Debe haber al menos 2 jugadores';
        return;
    }
    
    playerNamesDiv.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'player-input';
        div.innerHTML = `
            <label for="player${i}">Jugador ${i + 1}:</label>
            <input type="text" id="player${i}" required>
            <div id="player${i}Error" class="error"></div>
        `;
        playerNamesDiv.appendChild(div);
    }
}

// Iniciar el juego
function startGame() {
    // Limpiar errores previos
    playerCountError.textContent = '';
    pointsError.textContent = '';
    
    // Validar número de jugadores
    playerCount = parseInt(playerCountInput.value);
    if (isNaN(playerCount) || playerCount < 2) {
        playerCountError.textContent = 'Debe haber al menos 2 jugadores';
        return;
    }
    
    // Validar puntos para ganar
    pointsToWin = parseInt(pointsToWinInput.value);
    if (isNaN(pointsToWin) || pointsToWin <= 0) {
        pointsError.textContent = 'Los puntos deben ser mayor a cero';
        return;
    }
    
    // Obtener nombres de jugadores y validar
    players = [];
    let hasError = false;
    
    for (let i = 0; i < playerCount; i++) {
        const nameInput = document.getElementById(`player${i}`);
        const errorDiv = document.getElementById(`player${i}Error`);
        const name = nameInput.value.trim();
        
        if (name === '') {
            errorDiv.textContent = 'Por favor ingresa un nombre para el jugador';
            hasError = true;
        } else {
            errorDiv.textContent = '';
            players.push({
                name: name,
                score: 0
            });
        }
    }
    
    if (hasError) return;
    
    // Reproducir sonido de inicio
    playSound(startSound);
    
    // Cambiar a pantalla de juego
    setupScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Inicializar juego
    usedLetters = [];
    currentPlayerIndex = 0;
    turnsInCurrentRound = 0;
    startNewRound();
}

// Iniciar una nueva ronda
function startNewRound() {
    // Reiniciar contador de turnos si es nuevo ciclo
    if (currentPlayerIndex === 0) {
        turnsInCurrentRound = 0;
    }
    
    // Seleccionar un tema aleatorio (solo si es necesario)
    if (usedLetters.length === 0) {
        currentTheme = gameThemes[Math.floor(Math.random() * gameThemes.length)];
    }
    
    currentThemeDiv.textContent = `Tema: ${currentTheme}`;
    
    // Reiniciar letras usadas si es necesario
    if (usedLetters.length >= alphabet.length) {
        showRoundCompleteModal();
        return;
    }
    
    // Seleccionar una letra aleatoria que no se haya usado
    let availableLetters = alphabet.filter(letter => !usedLetters.includes(letter));
    const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    usedLetters.push(randomLetter);
    currentLetterDiv.textContent = randomLetter;
    
    // Actualizar información del jugador actual
    currentPlayerDiv.textContent = `Turno de: ${players[currentPlayerIndex].name}`;
    
    // Iniciar temporizador
    timeLeft = 10;
    timerDiv.textContent = timeLeft;
    
    // Reproducir sonido de temporizador en bucle
    tickingSound.loop = true;
    playSound(tickingSound);
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Detener sonido de ticking
            tickingSound.pause();
            tickingSound.currentTime = 0;
            
            // Tiempo agotado - cambiar tema
            currentTheme = gameThemes[Math.floor(Math.random() * gameThemes.length)];
            playSound(timeoutSound);
            
            // Verificar si hay ganadores antes de pasar al siguiente turno
            if (!checkForWinner()) {
                nextTurn();
            }
        }
    }, 1000);
    
    // Actualizar marcador
    updateScoreboard();
}

// Pasar al siguiente turno
function nextTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    turnsInCurrentRound++;
    
    // Verificar si se completó una ronda (todos jugaron)
    if (turnsInCurrentRound >= players.length) {
        checkForWinner();
    }
    
    startNewRound();
}

// Función para verificar si hay ganadores
function checkForWinner() {
    const maxScore = Math.max(...players.map(p => p.score));
    if (maxScore >= pointsToWin) {
        endGame();
        return true;
    }
    return false;
}

// Mostrar modal de ronda completada
function showRoundCompleteModal() {
    clearInterval(timerInterval);
    // Detener sonido de ticking
    tickingSound.pause();
    tickingSound.currentTime = 0;
    
    playSound(roundCompleteSound);
    roundCompleteModal.style.display = 'block';
    
    // Cambiar tema cuando se completan todas las letras
    currentTheme = gameThemes[Math.floor(Math.random() * gameThemes.length)];
}

// Ocultar modal de ronda completada
function hideRoundCompleteModal() {
    roundCompleteModal.style.display = 'none';
    usedLetters = [];
    startNewRound();
}

// Manejar respuesta correcta
function handleCorrectAnswer() {
    clearInterval(timerInterval);
    
    // Detener sonido de ticking
    tickingSound.pause();
    tickingSound.currentTime = 0;
    
    // Reproducir sonido de respuesta correcta
    playSound(correctSound);
    
    // Sumar punto al jugador actual
    players[currentPlayerIndex].score++;
    
    // Verificar si alguien ha ganado
    if (!checkForWinner()) {
        nextTurn();
    }
}

// Manejar respuesta incorrecta (con índice seguro)
function handleIncorrectAnswer() {
    clearInterval(timerInterval);
    tickingSound.pause();
    tickingSound.currentTime = 0;
    playSound(timeoutSound);
    
    // Calcular índice del jugador anterior de forma segura
    const previousPlayerIndex = (currentPlayerIndex - 1 + players.length) % players.length;
    
    if (players[previousPlayerIndex].score > 0) {
        players[previousPlayerIndex].score--;
    }
    
    currentTheme = gameThemes[Math.floor(Math.random() * gameThemes.length)];
    
    // Verificar si hay ganadores después de restar punto
    if (!checkForWinner()) {
        nextTurn();
    }
}

// Actualizar el marcador
function updateScoreboard() {
    scoreListDiv.innerHTML = '';
    players.forEach(player => {
        const div = document.createElement('div');
        div.className = 'score-item';
        div.innerHTML = `<span>${player.name}</span><span>${player.score}</span>`;
        scoreListDiv.appendChild(div);
    });
}

// Terminar el juego
function endGame() {
    clearInterval(timerInterval);
    
    // Detener sonido de ticking
    tickingSound.pause();
    tickingSound.currentTime = 0;
    
    // Reproducir sonido de victoria
    playSound(winSound);
    
    // Encontrar al/los ganador(es)
    const maxScore = Math.max(...players.map(p => p.score));
    const winners = players.filter(p => p.score === maxScore);
    
    // Mostrar mensaje de ganador(es)
    if (winners.length === 1) {
        winnerMessageDiv.textContent = `¡${winners[0].name} gana el juego!`;
    } else {
        const winnerNames = winners.map(w => w.name).join(' y ');
        winnerMessageDiv.textContent = `¡Empate entre ${winnerNames}!`;
    }
    
    // Mostrar puntuaciones finales
    finalScoreListDiv.innerHTML = '';
    players.sort((a, b) => b.score - a.score).forEach(player => {
        const div = document.createElement('div');
        div.className = 'score-item';
        div.innerHTML = `<span>${player.name}</span><span>${player.score}</span>`;
        finalScoreListDiv.appendChild(div);
    });
    
    // Cambiar a pantalla de resultados
    gameScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

// Reiniciar el juego con la misma configuración
function restartGame() {
    // Reiniciar todas las variables del juego
    players.forEach(player => player.score = 0);
    usedLetters = [];
    currentPlayerIndex = 0;
    turnsInCurrentRound = 0;
    
    // Cambiar a pantalla de juego
    resultScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Iniciar nueva ronda
    startNewRound();
}

// Volver a la configuración (función original)
function resetGame() {
    resultScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    setupScreen.classList.add('active');
}

// Reproducir sonido
function playSound(soundElement) {
    try {
        soundElement.currentTime = 0;
        soundElement.play().catch(e => {
            console.log("No se pudo reproducir el sonido:", e);
        });
    } catch (e) {
        console.log("Error reproduciendo sonido:", e);
    }
}

// Inicializar inputs de jugadores
generatePlayerInputs();