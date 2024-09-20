document.getElementById("BVer").addEventListener('click', function() {
    document.getElementById("resultado").style.display = "block";
})

document.getElementById("BotonCerrar").addEventListener('click', function() {
    document.getElementById("resultado").style.display = "none";
    document.querySelector(".Contenedor-Binicio").style.display = "none";
    document.querySelector(".Con-2").style.display = "block";
})


// Botón para regresar a index.html
function MostrarBotonRegresar() {
    const ContenedorRegresar = document.getElementById('ContenedorRegresar');
    ContenedorRegresar.style.display = "block"; // Mostrar el botón cuando las flores hayan sido dibujadas
}

document.getElementById("BotonRegresar").addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirigir a index.html
});

// Modificar la función CrearVarias para mostrar el botón de regreso al final
function CrearVarias() {
    const numFlores = 12;
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;
    const TamañoFlor = 130;

    let floresDibujadas = 0;  // Contador de flores dibujadas

    for (let i = 0; i < numFlores; i++) { 
        const fila = Math.floor(i / 4);
        const columna = i % 4;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * fila + espacioY / 2;

        DibujarFlor(x, y, 8, 30, 80, TamañoFlor);

        floresDibujadas++;

        // Si ya se han dibujado todas las flores, mostrar el botón de regresar
        if (floresDibujadas === numFlores) {
            setTimeout(MostrarBotonRegresar, 500); // Mostrar el botón después de un pequeño retraso
        }
    }
}
// Botón para regresar a index.html
function MostrarBotonRegresar() {
    const ContenedorRegresar = document.getElementById('ContenedorRegresar');
    ContenedorRegresar.style.display = "block"; // Mostrar el botón
}

document.getElementById("BotonRegresar").addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirigir a index.html
});

// Modificar la función DibujarFlor para mostrar el botón después de dibujar
function DibujarFlor(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
    // Tallo
    const PasosTallo = 50;
    const AltoTallo = AltoTrazo / PasosTallo;
    let NuevaY = y;

    const DibujarTallo = () => {
        if (NuevaY < y + AltoTrazo) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, NuevaY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'green'; // Color del tallo
            ctx.stroke();
            NuevaY += AltoTallo;
            setTimeout(DibujarTallo, 100);
        } else {
            DibujarHojas(x, y + AltoTrazo / 2); // Dibujar hojas en el tallo

            const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
            let contadorPetalos = 0;

            function dibujarSiguientePetalo() {
                if (contadorPetalos < NumeroPetalos) {
                    const Angulo = contadorPetalos * AnguloIncrement;
                    DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
                    contadorPetalos++;
                    setTimeout(dibujarSiguientePetalo, 500); 
                } else {
                    // Dibuja el centro de la flor
                    ctx.beginPath();
                    ctx.arc(x, y, 20, 0, Math.PI * 2);
                    const centroGradient = ctx.createRadialGradient(x, y, 5, x, y, 20);
                    centroGradient.addColorStop(0, 'rgba(255, 255, 153, 1)'); // Amarillo pálido
                    centroGradient.addColorStop(1, 'rgba(204, 153, 0, 1)'); // Dorado

                    ctx.fillStyle = centroGradient;
                    ctx.fill();

                    // Mostrar el botón "Regresar" cuando la flor se ha dibujado completamente
                    setTimeout(MostrarBotonRegresar, 0.6); // Muestra el botón después de 300 ms

                }
            }
            dibujarSiguientePetalo();
        }
    };
    DibujarTallo();
}
