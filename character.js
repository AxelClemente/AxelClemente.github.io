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
          this.x -= this.speed;
          break;
        case 39: // right arrow key
          this.x += this.speed;
          break;
        case 32: // spacebar
          this.x -= this.speed * 12     ;
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