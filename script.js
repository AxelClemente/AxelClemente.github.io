const song = document.getElementById('song');

window.addEventListener('keydown', () => {
    song.play();
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Pumpkings
const numberOfParticles = 10;
let particlesArray = [];

//Candy
const numberOfCandys = 10;
let candyArray = [];


//Sprit candy img
const candy = new Image();
candy.src = 'Images/Images/candyback.png'


//Sprit pumpkin img
const pumpkins = new Image();
pumpkins.src = 'Images/Images/pumpkings.png'

class Candy{
    constructor(){
        this.x = Math.random() * canvas.width; //LAS PARTICULAS APARECERAN DE FORMA ALEATORIA EN TODO EL EJE X DEL CANVAS
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 150 + 50;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1; // LAS PARTICULAS GIRAN A LA IZQUIERDA SI EL NUMERO RANDOM ES NEGATIVO Y VICEVERSA
         // SPRITE IMG
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 900/3;
    }

    draw(){
        
        ctx.save(); 
        ctx.translate(this.x,this.y); 
        ctx.rotate(this.angle * Math.PI/360 * this.spin);
        ctx.drawImage(candy, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
        ctx.restore(); 
    }

    update(){
        this.angle += 2;
        if (this.y - this.size > canvas.height){
            this.y = 0 - this.size; //<---------------CHECK NO SE QUE HACE REALMENTE
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 150 + 50;
            this.speed = Math.random() * 2 + 1;
           
        }
        this.y += this.speed; // UPDATE CREAMOS EL EFECTO DE CAIDA
    }

}

const candysL = new Candy();




class Particle{
    constructor(){
        this.x = Math.random() * canvas.width; //LAS PARTICULAS APARECERAN DE FORMA ALEATORIA EN TODO EL EJE X DEL CANVAS
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 150 + 50;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1; // LAS PARTICULAS GIRAN A LA IZQUIERDA SI EL NUMERO RANDOM ES NEGATIVO Y VICEVERSA
         // SPRITE IMG
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 900/3;
    }

    draw(){
        // ctx.fillRect(this.x, this.y, this.size, this.size); // DIBUJAMOS EN EL CANVAS TOMANDO ALGUNAS PROPIEDADES DEL CANVAS
        ctx.save(); // *** PARA PODER TRABAJAR CON EL TRANSLATE *** // IMPORTANTE
        ctx.translate(this.x,this.y); // MUEVE EL CANVAS DE POSICION
        ctx.rotate(this.angle * Math.PI/360 * this.spin);
        // ctx.fillStyle = 'red'
        // ctx.fillRect(0,0, canvas.width, canvas.height); 
        // ctx.drawImage(pumpkin, 0 - this.size/2, 0 - this.size/2, this.size, this.size)
        ctx.drawImage(pumpkins, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
        ctx.restore(); // *** PARA PODER TRABAJAR CON EL TRANSLATE *** // IMPORTANTE
    }

    update(){
        this.angle += 2;
        if (this.y - this.size > canvas.height){
            this.y = 0 - this.size; //<---------------CHECK NO SE QUE HACE REALMENTE
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 150 + 50;
            this.speed = Math.random() * 2 + 1;
           
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

    for (let i=0; i < numberOfCandys; i++){
        candyArray.push(new Candy());
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

    // Draw candy
      for (let i = 0; i < candyArray.length; i++) {
        candyArray[i].draw();
        candyArray[i].update();
    }

    // Draw Character
    monsterCharacter.draw();
           
    requestAnimationFrame(animate); // *** Esto creara el animation loop *** // IMPORTANTE
}
animate()

