// const song = document.getElementById('song');

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


function circleCollision(x1, y1, r1, x2, y2, r2) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance < r1 + r2;
}

const maxParticleCollisions = 3; // maximum number of particle collisions allowed
let lives = 3;
let numCollisions = 0; // current number of particle collisions

let hasCollided = false; // add this variable

function checkCollisions(monsterCharacter, animationId) {
    let collidedWithParticle = false;
    
    for (let i = 0; i < particlesArray.length; i++) {
      const particle = particlesArray[i];
      if (circleCollision(
        monsterCharacter.x, monsterCharacter.y, monsterCharacter.width / 2,
        particle.x, particle.y, particle.size / 2
      )) {
        collidedWithParticle = true;
      }
      
      // Check for collisions between the particle and the monsterCharacter
      if (circleCollision(
        monsterCharacter.x, monsterCharacter.y, monsterCharacter.width / 2,
        particle.x, particle.y, particle.size / 2
      )) {
        particlesArray.splice(i, 1);
        i--;
      }
    }
    
    if (collidedWithParticle && !hasCollided) {
      hasCollided = true;
      lives--;
      document.getElementById("lives").innerHTML = "Lives: " + lives;
    
      if (lives <= 0) {
        cancelAnimationFrame(animationId);
        alert("Game Over! You collected " + numCollisions + " candies.");
        document.location.reload(); // reload the page to start a new game
      }
    } else if (!collidedWithParticle && hasCollided) { // check if the character has stopped colliding with the particle
      hasCollided = false;
    }
    
    for (let i = 0; i < candyArray.length; i++) {
      const candy = candyArray[i];
      if (circleCollision(
        monsterCharacter.x, monsterCharacter.y, monsterCharacter.width / 2,
        candy.x, candy.y, candy.size / 2
      )) {
        candyArray.splice(i, 1);
        i--;
        numCollisions++;
        document.getElementById("count").innerHTML = "Candys: " + numCollisions;
        
        // Check if the candy count is a multiple of 5
        if (numCollisions % 5 === 0) {
          // Increase the speed of the falling particles
          particlesArray.forEach((particle) => {
            particle.speed += 0.02;
          });
        }
      }
    }
  }

  
  
  


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
            this.y = 0 - this.size; 
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 150 + 50;
            if (candyArray.length % 3 === 0) { // update speed if the candyArray length is a multiple of 3
                this.speed *= 1.015;
            }
        }
        this.y += this.speed;
    
        // add new candy to candyArray if it's length is less than the desired number of candies
        if (candyArray.length < numberOfCandys) {
            candyArray.push(new Candy());
        }
    }
    
    

}

const candysL = new Candy();




class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 150 + 50;
      this.speed = Math.random() * 2 + 1;
      this.initialSpeed = this.speed; // add this property to store the initial speed
      this.angle = Math.random() * 360;
      this.spin = Math.random() < 0.5 ? -1 : 1;
      this.frameX = Math.floor(Math.random() * 3);
      this.frameY = Math.floor(Math.random() * 3);
      this.spriteSize = 900 / 3;
    }
  
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 360 * this.spin);
      ctx.drawImage(
        pumpkins,
        this.frameX * this.spriteSize,
        this.frameY * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        0 - this.size / 2,
        0 - this.size / 2,
        this.size,
        this.size
      );
      ctx.restore();
    }
  
    update() {
        this.angle += 2;
        if (this.y - this.size > canvas.height) {
          this.y = 0 - this.size;
          this.x = Math.random() * canvas.width;
          this.size = Math.random() * 150 + 50;
          this.speed = this.initialSpeed; // reset the speed to the initial value
        }
      
        // check if the candy count is a multiple of 5
        if (numCollisions > 0 && numCollisions % 3 === 0) {
          // temporarily increase the speed by 2%
          this.speed *= 1.015;
        }
        
        console.log('Particle speed:', this.speed);
        this.y += this.speed;
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

let animationId;

function animate(){       //ESTO CREARE UN ANIMATION LOOP
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // BORRA EL RASTRO DEL DIBUJO Y EVITAR EL EFECTO ARRASTRE O "ALARGAMIENTO"
    // (no es necesario, ahora creamos la particula dentro del loop en la funcion init)! 
    // particle1.update();
    // particle1.draw();
    for (let i=0; i < particlesArray.length; i++){
        particlesArray[i].draw();
        particlesArray[i].update();
        console.log("calabaza",particlesArray)
    }

    // Draw candy
      for (let i = 0; i < candyArray.length; i++) {
        candyArray[i].draw();
        candyArray[i].update();
        console.log("joderrrrrrrrrrr",candyArray)
        
    }

    // Draw Character
    monsterCharacter.draw();

    // Check for collisions
    checkCollisions(monsterCharacter,animationId);
           
    animationId = requestAnimationFrame(animate); // *** Esto creara el animation loop *** // IMPORTANTE
}
animationId = requestAnimationFrame(animate);

