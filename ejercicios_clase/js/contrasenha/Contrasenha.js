function generarContra() {
    const numPalabras = document.getElementById('numPalabras').value;
    const mayus = document.getElementById('mayus').checked;
    const noRepetir = document.getElementById('noRepetir').checked;
    let randPSWD = "";
    const diccionario = [
        "casa", "árbol", "mar", "cielo", "montaña", "río", "perro", "gato", "ratón", "ciudad",
        "pájaro", "sol", "luna", "estrella", "flor", "libro", "agua", "fuego", "aire", "tierra",
        "rojo", "azul", "verde", "amarillo", "blanco", "negro", "grande", "pequeño", "nuevo", "viejo",
        "rápido", "lento", "caliente", "frío", "duro", "suave", "dulce", "salado", "fuerte", "débil",
        "alto", "bajo", "largo", "corto", "ancho", "estrecho", "pesado", "ligero", "fácil", "difícil",
        "bueno", "malo", "feliz", "triste", "joven", "viejo", "amable", "grosero", "inteligente", "tonto",
        "guapo", "feo", "contento", "enfadado", "abierto", "cerrado", "lleno", "vacío", "claro", "oscuro",
        "rico", "pobre", "limpio", "sucio", "importante", "insignificante", "seguro", "peligroso", "famoso", "desconocido",
        "amigo", "enemigo", "padre", "madre", "hermano", "hermana", "hijo", "hija", "maestro", "alumno",
        "jefe", "empleado", "doctor", "enfermero", "policía", "bombero", "abogado", "juez", "arquitecto", "ingeniero",
        "carpintero", "pintor", "escritor", "músico", "actor", "cantante", "cocinero", "panadero", "conductor", "piloto",
        "profesor", "científico", "estudiante", "deportista", "artista", "soldado", "marinero", "viajero", "turista", "habitante",
        "aventura", "descanso", "trabajo", "juego", "película", "música", "canción", "poema", "pintura", "escultura",
        "invierno", "primavera", "verano", "otoño", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo",
        "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    

    for (let i = 0; i < numPalabras; i++) {
        let randIndex;
        do {
            randIndex = Math.floor(Math.random() * diccionario.length);
        } while (noRepetir && diccionario.includes(randIndex));
        
        let word = diccionario[randIndex];
        if (mayus) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }

        randPSWD += word;
        diccionario.push(randIndex);
    }
    
    document.getElementById("password").value = randPSWD
}
 