let hero,lvl,maps;
let i = 0;

function setup(){
    frameRate(60);//set the frameRate 
    maps = new Map(600,400);//instatiate the Map class
    hero = new Hero(35,35,300,200,100,0);//instatiate the Hero class
    lvl = new Level(0,0,0);////instatiate the Level class
    lvl.setLevel(0);//set the current floor level 0
    maps.init();
}

function draw(){ 
    background(220);//grey background
    fill(0);
    noStroke();
    text(`Score : ${hero.score}`,20,20);//show current score
    text(`Health : ${hero.life}`,20,40);//show current health
    text(`Floor : ${lvl.showCurrentLevel()}`,20,60);//show current level

    hero.show();//show player rectangle
    hero.move();//move player rectangle
    hero.HeroAttack();//attack continuously

    for(let i of maps.monsters){//loop for main program
   
        if(dist(i.x,i.y,hero.x,hero.y) < 75 && frameCount % 30 == 0 ){//if player attacked a monster
            i.life -=1; // monster life decreased
            if(i.life < 0 ){// if monster health depleted
            maps.monsters.splice(maps.monsters.indexOf(i),1);//remove from object array
            hero.increaseScore();//increase player score
            }else{
                i.type ++;//if monster health decreased but not depleted
            }
        }

        if(dist(i.x,i.y,hero.x,hero.y) < 15){//iff monster attacked player
            hero.life --;//player health decreased
        }

        i.show()//show monster from object array
    }

    if(maps.monsters.length < 1){//if no more monster left in the area
        maps.init();//reset the map
        lvl.increaseLevel();//increase player level counter
        hero.life += 10;//increase player health
        if(hero.life >= 100){//if player heatlh more than 100
            hero.life = 100;//set to 100
        }
    }
      
    if(hero.life < 0){//if hero health not depleted
        
        noLoop()//stop the draw function loop
        background(0);//set the background black
        fill(255);//set text font to white (255)
        text('GAME OVER',245,200);//write
        text(`Highest Level : ${lvl.showCurrentLevel()}`,235,240);//write
        text(`Highest Score : ${hero.score}`,235,220);//write
        text('press any key to restart',215,270);//write
        
    }
}

function keyPressed(){
    if(isLooping()){//if the draw function still looping
        //do nothing
    }else{
    setup();//reset the whole game
    loop();//resume the loop
    }
}

class Entity{//parent class for both hero and monster
    constructor(height, width, x, y){//attributes 
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }

    attack(){//hero attack method
        noFill();
        stroke(0);
        do{
        i+= 10;
        circle(this.x+15 ,this.y+15,i);// create a circle with no fill
        fill(200);
        if(i>100){//player attack range
            i = 0;
        }
    }while(i<-1)//infinite loop for continious attack
    
    }
    moveRight(){
            this.x += 2;//move hero
        }
    moveLeft(){
            this.x -= 2;//move hero
    }
    moveDown(){
            this.y += 2;//move hero
    }
    moveUp(){
            this.y -= 2;//move hero
    }
}

class Level{
    constructor(currentLevel, latestLevel, maxLevel){//attributes
        this.currentLevel = currentLevel;
        this.latestLevel = latestLevel;
        this.maxLevel = maxLevel;
    }

    setLevel(level){
        this.currentLevel = level;//set the current player floor level 
    }

    showCurrentLevel(){
        return this.currentLevel;//return the player current level
    }

    increaseLevel(){
        this.currentLevel+=1;//increment current level
    }
}

class Monster extends Entity{//child class of entity
    constructor(x, y, width, height){//attributes
        super(x,y,width,height);
        this.life = 2;
        this.color = 0;
        this.effect = 0;
        this.type = 0;
    }

    show(){//show monster rectangle
        if(this.x < hero.x){//chase the hero
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

class Hero extends Entity{//child class from entity
    constructor(height, width, x, y, life){//attributes
        super(height, width, x, y);
        this.life = life;
        this.score = 0;
    }
    show(){//show hero rectangle
        square(this.x,this.y,30);
    }
    HeroAttack(){//attack continiously
        if(frameCount % 3 == 0){//use the frame counter as attack timing
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
    constructor(width, height){//attributes
        this.width = width;
        this.height = height;
        this.monsters = [];
    }
    init(){
        createCanvas(this.width,this.height);
        for(let i = 0; i<10;i++){//show 10 enemies per level
        var posX = random(-200,800);
        var posY = random(-200,600);
        var mon = new Monster(10, 20, posX, posY);
        this.monsters.push(mon)//push mon to monsters object array
        }
    }
    move(){
    }
}
