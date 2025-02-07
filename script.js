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

// Логика отображения модальных окон
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


// Локальное хранилище для пользователей
let users = JSON.parse(localStorage.getItem('users')) || [];

// Функция регистрации
document.getElementById('register-submit').addEventListener('click', () => {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (username && password) {
        // Проверка на существование пользователя
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert('Пользователь с таким именем уже существует');
        } else {
            // Сохраняем пользователя в LocalStorage
            users.push({ username, password, points: 0 });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Регистрация успешна');
            registerModal.style.display = 'none';
        }
    } else {
        alert('Заполните все поля');
    }
});

// Функция входа
document.getElementById('login-submit').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Вход успешен');
        // Сохранить текущего пользователя в sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        loginModal.style.display = 'none';
    } else {
        alert('Неверное имя пользователя или пароль');
    }
});

