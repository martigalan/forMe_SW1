// Obtenemos el canvas y el contexto para dibujar
const canvas = document.getElementById('pelota');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2; 
let dy = -2; 
const radioPelota = 5;
let fueraDePantalla = false;

function dibujarPelota() {
    ctx.beginPath();
    ctx.arc(x, y, radioPelota, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function actualizarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarPelota();

    if (x + dx > canvas.width - radioPelota || x + dx < radioPelota) {
        dx = -dx;
    }
    if (y + dy > canvas.height - radioPelota || y + dy < radioPelota) {
        dy = -dy;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(actualizarCanvas);
}

// Escuchamos el evento del teclado para mover la pelota hacia la derecha
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        x += 10; //al presionar tecla dcha
    }
    if (event.key === "ArrowLeft") {
        y += 10; //al presionar tecla izq
    }
    // Si la pelota se mueve fuera del canvas, marcarla como fuera de pantalla
    if (x - radioPelota > canvas.width) {
        fueraDePantalla = true;
        // Esperamos 2 segundos y luego la regresamos al centro
        setTimeout(() => {
            x = canvas.width / 2;
            fueraDePantalla = false;
        }, 2000);
    }
});

actualizarCanvas();
