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
    }

    draw(){
        ctx.drawImage(character,this.x - this.width/2,this.y - this.height/2,this.width,this.height);
      }
    }

 const monsterCharacter = new Character();