let Titulo = document.title;

window.addEventListener('blur', () => {
    Titulo = document.title;
    document.title = "No te vayas, regresa :(";
});

window.addEventListener('focus', () => {
    document.title = Titulo;
});

let h1 = document.getElementById("Titulo");
let Boton1 = document.getElementById("B1");
Boton1.addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    document.querySelector(".Texto").style.display = "block";
    ContenedorBotones.style.display = "none";
    DibujarFlor(500, 100, 6, 30, 100, 200);
    h1.remove();
});

document.getElementById("B12").addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    ContenedorBotones.style.display = "none";
    document.querySelector(".Texto").style.display = "block";
    CrearVarias();
    h1.remove();
});

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
    const Numero = scala;

    const AnguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Rotacion);
    ctx.scale(1, Numero);
    ctx.beginPath();
    
    for (let i = 0; i <= pasos; i++) {
        const AnguloActual = i * AnguloIncrement;
        const currentRadius = Math.sin(AnguloActual) * RadioX;
        const PuntoY = Math.sin(AnguloActual) * currentRadius;
        const PuntoX = Math.cos(AnguloActual) * currentRadius;

        if (i === 0) {
          ctx.moveTo(PuntoX, PuntoY);
        } else {
          ctx.lineTo(PuntoX, PuntoY);
        }
    }

    // Gradiente para los pétalos
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, RadioX);
    gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');  // Amarillo brillante
    gradient.addColorStop(1, 'rgba(255, 204, 0, 1)');  // Amarillo más oscuro

    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

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
                }
                // Dibuja el centro de la flor
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                const centroGradient = ctx.createRadialGradient(x, y, 5, x, y, 20);
                centroGradient.addColorStop(0, 'rgba(255, 255, 153, 1)'); // Amarillo pálido
                centroGradient.addColorStop(1, 'rgba(204, 153, 0, 1)'); // Dorado

                ctx.fillStyle = centroGradient;
                ctx.fill();
            }
            dibujarSiguientePetalo();
        }
    };
    DibujarTallo();
}

// Función para dibujar hojas en el tallo, una hacia la derecha y otra hacia la izquierda
function DibujarHojas(x, y) {
  ctx.save();
  
  // Crear un gradiente radial para las hojas
  const gradienteHoja = ctx.createRadialGradient(x, y, 10, x, y, 50);
  gradienteHoja.addColorStop(0, 'rgba(34, 139, 34, 1)');  // Verde oscuro
  gradienteHoja.addColorStop(0.5, 'rgba(50, 205, 50, 1)');  // Verde más claro
  gradienteHoja.addColorStop(1, 'rgba(152, 251, 152, 1)');  // Verde claro

  // Hoja izquierda inclinada hacia la izquierda
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 30, y - 10, x - 60, y + 30, x - 30, y + 60); // Ajustar curva hacia la izquierda
  ctx.fillStyle = gradienteHoja;  // Aplicar el gradiente
  ctx.fill();

  // Agregar detalles de la nervadura central a la hoja izquierda
  ctx.beginPath();
  ctx.moveTo(x - 30, y + 30);  // Comienza en el medio de la hoja
  ctx.lineTo(x - 45, y + 50);  // Nervadura hacia la punta de la hoja
  ctx.strokeStyle = 'rgba(0, 100, 0, 0.8)';  // Verde oscuro para las nervaduras
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Hoja derecha inclinada hacia la derecha
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x + 30, y - 10, x + 60, y + 30, x + 30, y + 60); // Ajustar curva hacia la derecha
  ctx.fillStyle = gradienteHoja;  // Aplicar el mismo gradiente
  ctx.fill();

  // Agregar detalles de la nervadura central a la hoja derecha
  ctx.beginPath();
  ctx.moveTo(x + 30, y + 30);  // Comienza en el medio de la hoja
  ctx.lineTo(x + 45, y + 50);  // Nervadura hacia la punta de la hoja derecha
  ctx.strokeStyle = 'rgba(0, 100, 0, 0.8)';  // Nervadura en verde oscuro
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}


function DibujarFlorSinTallo(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
  
    // Dibuja los pétalos
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos < NumeroPetalos) {
            const Angulo = contadorPetalos * AnguloIncrement;
            DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
            contadorPetalos++;
            setTimeout(dibujarSiguientePetalo, 500); 
        }
        // Dibuja el centro de la flor
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        const centroGradient = ctx.createRadialGradient(x, y, 5, x, y, 20);
        centroGradient.addColorStop(0, 'rgba(255, 255, 153, 1)');
        centroGradient.addColorStop(1, 'rgba(204, 153, 0, 1)');

        ctx.fillStyle = centroGradient;
        ctx.fill();
    }
    dibujarSiguientePetalo();
}

function CrearVarias() {
    const numFlores = 12;
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;
    const TamañoFlor = 130;

    for (let i = 0; i < numFlores; i++) { // Cambiado a < para asegurar que sean exactamente 12 flores
        const fila = Math.floor(i / 4);
        const columna = i % 4;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * fila + espacioY / 2;

        DibujarFlor(x, y, 8, 30, 80, TamañoFlor); // Asegurarse de que las flores tengan su tallo
    }
}
