let hero,lvl,maps;
let i = 0;

function setup(){
    frameRate(60);
    maps = new Map(600,400);
    hero = new Hero(35,35,300,200,100,0);
    lvl = new Level(0,0,0);
    lvl.setLevel(0);
    maps.init();
}

function draw(){
    background(220);
    fill(0);
    noStroke();
    text(`Score : ${hero.score}`,20,20);
    text(`Health : ${hero.life}`,20,40);

    hero.show();
    hero.move();
    hero.HeroAttack();

    for(let i of maps.monsters){
       
        if(dist(i.x,i.y,hero.x,hero.y) < 75 && frameCount % 30 == 0 ){
            i.life -=1;
            if(i.life < 0 ){
            maps.monsters.splice(maps.monsters.indexOf(i),1);
            hero.increaseScore();
            }else{
                i.type ++;//if monster health decreased but not depleted
            }
        }

        if(dist(i.x,i.y,hero.x,hero.y) < 20){
            hero.life --;
        }
    }

    if(maps.monsters.length < 1){
        maps.init();
        lvl.increaseLevel();
        hero.life += 10;
        if(hero.life >= 100){
            hero.life = 100;
        }
    }
    
        i.show()
    
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

    setLevel(level){
        this.currentLevel = level;
    }

    getCurrentLevel(){
        return this.currentLevel;
    }
    
    increaseLevel(){
        this.currentLevel+=1;
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
        
        if(this.type == 0){//if enemies is not damaged
        noStroke()
        fill(0,255,0);
        square(this.x,this.y,this.width);
        }else{
        noStroke()
        fill(255,0,0);//if enemise is damaged but not dead
        square(this.x,this.y,this.width);   
        }
        
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
        this.score = 0;
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
        this.score++;
    }

    calculateLife(){

    }

    saveScore(){

    }
}

class Map{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.monsters = [];
    }

    init(){
        createCanvas(this.width,this.height);
        for(let i = 0; i<10;i++){
        var posX = random(-200,800);
        var posY = random(-200,400);
        var mon = new Monster(10, 20, posX, posY);
        this.monsters.push(mon)
        }
    }

    move(){
        
    }
}
