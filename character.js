let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');

//DIBUJAMOS NUESTRO OBJECTO USANDO JAVASCRIPT
const character = new Image();
character.src = 'Images/Images/monster.png'

class Character{
    constructor(){
        this.x = window.innerWidth/2 + 200;
        this.y = window.innerHeight - 90;
        this.width = 392/3;
        this.height = 510/3;
        this.speed = 10;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
      switch (event.keyCode) {
        case 37: // left arrow key
          this.x -= this.speed *8;
          if (this.x < -this.width/2) {
            this.x = canvas.width + this.width/2;
          }
          break;
          case 39: // right arrow key
          if (this.x + this.speed * 8 + this.width / 2 < canvas.width) { // check if the character is within the canvas width
            this.x += this.speed * 8;
          }
          break;
        case 32: // spacebar
          this.x -= this.speed * 18;
          break;
      }
    }


    

    destroy() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }

    draw(){
        ctx.drawImage(character,this.x - this.width/2,this.y - this.height/2,this.width,this.height);
      }
    }

 const monsterCharacter = new Character();