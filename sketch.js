let hero,lvl,maps;
let i = 0;

function setup(){
    // createCanvas(600, 400);
    frameRate(60);
    maps = new Map(600,400);
    hero = new Hero(35,35,300,200,100,0);
    lvl = new Level(0,0,0);
    maps.init();
}

function draw(){
    
    background(220);
    fill(0);
    noStroke();
    text(frameCount,20,20);
    text(hero.life,20,40);

    hero.show();
    hero.move();
    hero.HeroAttack();

    for(let i of maps.monsters){
        i.show()

        
        if(dist(i.x,i.y,hero.x,hero.y) < 75 && frameCount % 30 == 0 ){
            i.life -=2;
            if(i.life < 0 ){
            maps.monsters.splice(maps.monsters.indexOf(i),1);

            }
        }

        if(dist(i.x,i.y,hero.x,hero.y) < 20){
            hero.life --;
        }
    }

    if(maps.monsters.length < 1){
        maps.init();
    }
      
    if(hero.life < 0){
        maps.init();
        hero.life = 100;
    }
}

class Entity{
    constructor(height, width, x, y){
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }

    attack(){
        noFill();
        stroke(0);
        do{
        i+= 10;
        circle(this.x+15 ,this.y+15,i);
        // fill(200);
        fill(200);
        if(i>100){
            i = 0;
        }
    }while(i<-1)
    
    }
    moveRight(){
            this.x += 2;
        }
    moveLeft(){
            this.x -= 2;
    }
    moveDown(){
            this.y += 2;
    }
    moveUp(){
            this.y -= 2;
    }
}

class Level{
    constructor(currentLevel, latestLevel, maxLevel){
        this.currentLevel = currentLevel;
        this.latestLevel = latestLevel;
        this.maxLevel = maxLevel;
    }

    setLevel(){

    }

    getCurrentLevel(){
        
    }
}

class Monster extends Entity{
    constructor(x, y, width, height){
        super(x,y,width,height);
        this.life = 2;
        this.color = 0;
        this.effect = 0;
        this.type = 0;
    }

    show(){
        if(this.x < hero.x){
            this.x+=1;
        }else{
            this.x-=1;
        }

        if(this.y < hero.y){
            this.y+=1;
        }else{
            this.y-=1;
        }

        
        noStroke()
        fill(200);
        square(this.x,this.y,this.width);
        
    }

    moveRandom(){

    }

    saveScore(){

    }
}

class Hero extends Entity{
    constructor(height, width, x, y, life, score){
        super(height, width, x, y);
        this.life = life;
        this.score = score;
    }
    show(){
        square(this.x,this.y,30);
        
    }

    HeroAttack(){
        if(frameCount % 2 == 0){
            this.attack();
        }
    }

    move(){
        if(keyIsDown(UP_ARROW)){
            this.moveUp();
        }
        if(keyIsDown(DOWN_ARROW)){
            this.moveDown();
        }
        if(keyIsDown(LEFT_ARROW)){
            this.moveLeft();
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.moveRight();
        }
    }

    increaseScore(){

    }

    calculateLife(){

    }

    saveScore(){

    }
}
