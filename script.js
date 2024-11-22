class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class juego {
    constructor() {
        this.choices = ['piedra', 'papel', 'tijera'];
        this.emojis = {
            piedra: '✊',
            papel: '✋',
            tijera: '✌️'
        };
        this.currentUser = null;
    }

    registrarUsuario(username, password) {
        const user = new User(username, password);
        localStorage.setItem(username, JSON.stringify(user));
        alert('Registro exitoso');
        window.location.href = "index.html"; 
    }

    inicioValidacion(username, password) {
        const storedUser = localStorage.getItem(username);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.password === password) {
                this.currentUser = username;
                localStorage.setItem("currentUser", username);
                alert('Inicio de sesión exitoso');
                window.location.href = "juego.html"; 
            } else {
                alert('Usuario o Contraseña Incorrecta');
            }
        } else {
            alert('Usuario no registrado');
        }
    }

    cerrarSesion() {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    }

    jugar(userChoice) {
        const computerChoice = this.choices[Math.floor(Math.random() * 3)];
        let result = '';

        if (userChoice === computerChoice) {
            result = 'Empate';
        } else if (
            (userChoice === 'piedra' && computerChoice === 'tijera') ||
            (userChoice === 'papel' && computerChoice === 'piedra') ||
            (userChoice === 'tijera' && computerChoice === 'papel')
        ) {
            result = 'Ganaste';
        } else {
            result = 'Perdiste';
        }

        return `
            Jugador: ${this.emojis[userChoice]} <b>${userChoice}</b>, 
            Cortana: ${this.emojis[computerChoice]} <b>${computerChoice}</b>. 
            <strong>¡${result}!</strong>
        `;
    }
}

const game = new juego();

function inicioValidacion() {
    const username = document.getElementById('inicio').value;
    const password = document.getElementById('contraseña').value;
    game.inicioValidacion(username, password);
}

function registroValidacion() {
    const username = document.getElementById('registroUser').value;
    const password = document.getElementById('registroContraseña').value;
    game.registrarUsuario(username, password); 
}

function play(button) {
    const userChoice = button.getAttribute('data-choice'); 
    const resultDiv = document.getElementById('result');
    const result = game.jugar(userChoice); 
    resultDiv.innerHTML = result; 
}

function cerrarSesion() {
    game.cerrarSesion();
}

if (document.querySelectorAll('.choice').length > 0) {
    const choices = document.querySelectorAll('.choice');
    const resultDiv = document.getElementById('result');
    
    choices.forEach(choice => {
        choice.addEventListener('click', function () {
            const userChoice = this.getAttribute('data-choice');
            const result = game.jugar(userChoice);
            resultDiv.innerHTML = result;
        });
    });
}
