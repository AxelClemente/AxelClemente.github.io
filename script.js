const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberOfParticles = 200;
let particlesArray = [];

//DIBUJAMOS NUESTRO OBJECTO USANDO JAVASCRIPT
const pumpkin = new Image();
pumpkin.src = 'Images/Images/monster.png'




class Particle{
    constructor(){
        this.x = Math.random() * canvas.width; //LAS PARTICULAS APARECERAN DE FORMA ALEATORIA EN TODO EL EJE X DEL CANVAS
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 50;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1; // LAS PARTICULAS GIRAN A LA IZQUIERDA SI EL NUMERO RANDOM ES NEGATIVO Y VICEVERSA
    }

    draw(){
        // ctx.fillRect(this.x, this.y, this.size, this.size); // DIBUJAMOS EN EL CANVAS TOMANDO ALGUNAS PROPIEDADES DEL CANVAS
        ctx.save(); // *** PARA PODER TRABAJAR CON EL TRANSLATE *** // IMPORTANTE
        ctx.translate(this.x,this.y); // MUEVE EL CANVAS DE POSICION
        ctx.rotate(this.angle * Math.PI/360 * this.spin);
        // ctx.fillStyle = 'red'
        // ctx.fillRect(0,0, canvas.width, canvas.height); 
        ctx.drawImage(pumpkin, 0 - this.size/2, 0 - this.size/2, this.size, this.size)
        ctx.restore(); // *** PARA PODER TRABAJAR CON EL TRANSLATE *** // IMPORTANTE
    }

    update(){
        this.angle += 2;
        if (this.y > canvas.height){
            this.y = 0 - this.size; //<---------------CHECK NO SE QUE HACE REALMENTE
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 20 + 50;
            this.speed = Math.random() * 3 + 1;
        }
        this.y += this.speed; // UPDATE CREAMOS EL EFECTO DE CAIDA
    }
}


// const particle1 = new Particle(); // CREAMOS NUESTRO PRIMER OBJETO, SE LE AÑADARAN LAS PROPIEDADES DEL CONSTRUCTOR AUTOMATICAMENTE
// (no es necesario, ahora creamos la particula dentro del loop en la funcion init)! 

function init(){
    for (let i=0; i < numberOfParticles; i++){
        particlesArray.push(new Particle());
    }
}
init();

function animate(){       //ESTO CREARE UN ANIMATION LOOP
    ctx.clearRect(0, 0, canvas.width, canvas.height); // BORRA EL RASTRO DEL DIBUJO Y EVITAR EL EFECTO ARRASTRE O "ALARGAMIENTO"
    // (no es necesario, ahora creamos la particula dentro del loop en la funcion init)! 
    // particle1.update();
    // particle1.draw();
    for (let i=0; i < particlesArray.length; i++){
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate); // *** Esto creara el animation loop *** // IMPORTANTE
}
animate()

