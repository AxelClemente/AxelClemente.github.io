const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

//DIBUJAMOS NUESTRO OBJECTO USANDO JAVASCRIPT
const character = new Image();
character.src = 'Images/Images/monster.png'

class Character{
    constructor(){
        this.x = 500;
        this.y = 830;
        this.width = 392/3;
        this.height = 510/3;
    }

    draw(){
        ctx.drawImage(character,this.x,this.y,this.width,this.height)
    }

}

 const monsterCharacter = new Character();