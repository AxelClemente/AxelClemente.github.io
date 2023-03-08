const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberOfParticles = 200;
let particlesArray = [];

class Particle{
    constructor(){
        this.x = Math.random() * canvas.width; //LAS PARTICULAS APARECERAN DE FORMA ALEATORIA EN TODO EL EJE X DEL CANVAS
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1; // LAS PARTICULAS GIRAN A LA IZQUIERDA SI EL NUMERO RANDOM ES NEGATIVO Y VICEVERSA
    }

    draw(){
        ctx.fillRect(this.x, this.y, this.size, this.size); //DIBUJAMOS EN EL CANVAS TOMANDO ALGUNAS PROPIEDADES DEL CANVAS
    }

    update(){

        if (this.y > canvas.height){
            this.y = 0 - this.size; //<---------------CHECK NO SE QUE HACE REALMENTE
        }
        this.y += this.speed; // UPDATE CREAMOS EL EFECTO DE CAIDA
    }
}

const particle1 = new Particle(); // CREAMOS NUESTRO PRIMER OBJETO, SE LE AÑADARAN LAS PROPIEDADES DEL CONSTRUCTOR AUTOMATICAMENTE

function animate(){       //ESTO CREARE UN ANIMATION LOOP
    ctx.clearRect(0,0, canvas.width, canvas.height) // BORRA EL RASTRO DEL DIBUJO Y EVITAR EL EFECTO ARRASTRE O "ALARGAMIENTO"
    particle1.update();
    particle1.draw();
    requestAnimationFrame(animate); // *** Esto creara el animation loop *** // IMPORTANTE
}
animate()

