let contador = 0;
let boton  = document.getElementById("boton");
let displayContador = document.getElementById("contador");
    
boton.addEventListener('click',click);
function click(boton) {
    contador++;
    displayContador.innerText = contador; // Actualiza el texto en la página
}

