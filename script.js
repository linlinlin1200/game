// Модальные окна
const registerModal = document.getElementById('register-modal');
const loginModal = document.getElementById('login-modal');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const closeRegisterBtn = document.getElementById('close-register');
const closeLoginBtn = document.getElementById('close-login');
const playBtn = document.getElementById('play-btn');
const playModal = document.getElementById('play-modal');
const cancelPlayBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const questionModal = document.getElementById('question-modal');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
let score = 0;
let currentQuestionIndex = 0;
let questions = [];

const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (currentUser) {
    score = currentUser.points;
    document.getElementById('score').textContent = ` ${score}`;
}

function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = ` ${score}`;
}

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        shuffleQuestions();
    })
    .catch(error => console.error('Error loading questions:', error));

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

confirmBtn.addEventListener('click', () => {
    playModal.style.display = 'none';
    questionModal.style.display = 'flex';
    loadQuestion();
});

answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (index === questions[currentQuestionIndex].correct_answer) {
            alert('Correct!');
            updateScore(1); 
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                alert('Quiz finished!');
                questionModal.style.display = 'none';
            }
        } else {
            alert('Wrong! Game Over.');
            questionModal.style.display = 'none';
        }
    });
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
    });
}


registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'flex';
});
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});
closeRegisterBtn.addEventListener('click', () => {
    registerModal.style.display = 'none';
});
closeLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});
playBtn.addEventListener('click', () => {
    playModal.style.display = 'flex';
});
cancelPlayBtn.addEventListener('click', () => {
    playModal.style.display = 'none';
});


let users = JSON.parse(localStorage.getItem('users')) || [];


document.getElementById('register-submit').addEventListener('click', () => {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (username && password) {
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert('Пользователь с таким именем уже существует');
        } else {
            users.push({ username, password, points: 0 });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Регистрация успешна');
            registerModal.style.display = 'none';
        }
    } else {
        alert('Заполните все поля');
    }
});

document.getElementById('login-submit').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        loginModal.style.display = 'none';
    } else {
        alert('Неверное имя пользователя или пароль');
    }
});