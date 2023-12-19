/** Class representing the World
*/

class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    //intervalIds = [];
    camera_x = 0;

    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndBoss = new StatusBarEndBoss();
    movableObject = new movableobject();
    bottles = new Bottle();
    coins = new Coin();
    sound = new Sounds();
    chicken = this.level.enemies;
    endBoss = this.level.endBoss[0];
    throwableObjects = [];
    gameOver = false;
    soundOn = true;
    chickIsDead = false;
   


    /**
     * constructor function incharge of loading and initiating all important functionen in order
     * for game to work
     * @param {*} canvas 
     * @param {*} keyboard 
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkAllCollisions()
        this.startSideTasks();
    }


    /**
     * connecting the character and endBoss to the game world
     */
    setWorld() {
        this.character.world = this;
        this.endBoss.world = this;
    }


    /**
     * starting alle functions that has to do with collision 
     */
    checkAllCollisions() {
        this.checkCollisions();
        this.checkCollisionBottle();
        this.checkCollisionCoin();
        this.checkThrowableObject();
        this.checkCollisionEndBoss();
        this.checkCollisionChickenWithBottle();
    }


    /**
    * intervals being startet, such as backgroundmusic, chicken jumping, etc
    */
    startSideTasks() {
        this.crossingTheEndBossLine();
        this.character.setInactiveTime();
        this.playBackgroundMusic();
        this.startJumping();
        this.stopTheGame();
    }


    /**
     * background music start if the condition is right
     */
    playBackgroundMusic() {
        if (this.gameOver === false) {
            this.checkIfItIsSupposedToPlay(3);
        }
    }


    /**
     * managing the sound controls from on to off
     */
    toggleSoundOff() {
        if (this.soundOn = true) {
            this.soundOn = false
        }
        this.checkIfItIsSupposedToPlay(3);
        document.getElementById('btnSoundOnOff').innerHTML = `
        <img onclick="world.toggleSoundOn()" class="icons" src="./img/icons_sound_off.png"></img>`;
    }



    /** 
     * managing the sound controls from off to on
    */
    toggleSoundOn() {
        this.soundOn = true;
        document.getElementById('btnSoundOnOff').innerHTML = `
        <img onclick="world.toggleSoundOff()" class="icons" src="./img/icons_sound_on.png" alt=""></img>`;
        this.checkIfItIsSupposedToPlay(3);
    }


    /**
     * function used to stop all the music playing 
     */
    stopMusic() {
        for (let i = 0; i < this.sound.audio.length; i++) {
            const element = this.sound.audio[i];
            element.path.pause();
        }
    }


    /**
     * every time sound is supposed to play will be checkt if it is granted at all 
     * @param {number} id - the unique value for every song out of the array
     */
    checkIfItIsSupposedToPlay(id) {
        if (this.soundOn === true) {
            this.sound.audio[id].path.play();
        } else {
            this.sound.audio[id].path.pause();
        }
    }


    /**
     * after the condition have been fullfiled, after 1.5 sec the game will be stoped
     */
    stopTheGame() {
        setInterval(() => {
            if (pause === false) {
                if (this.gameOver == true) {
                    this.clearAllIntervals();
                }
            }
        }, 1500);
    }


    /**
     * all intervals will be cleared
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
     * seting interval, in order to detect collision between character and chicken and endboss
     */
    checkCollisions() {
        setInterval(() => {
            if (pause === false) {
                this.checkCollisionChicken();
                this.checkCollisionEndBossWithCharacter();
            }
        }, 100);
    }


    /**
     * detecting collision between character and chicken 
     */
    checkCollisionChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.chickenIsDead(enemy)) {
                enemy.chickDead = true;
                this.afterTheChickenDies(enemy);
            }
            else if (this.chickenStrikes(enemy)) {
                this.character.hit(enemy);
                this.checkIfItIsSupposedToPlay(9);
                this.statusBar.setHealthPercentage(this.character.energy);
                this.isJumping = false;
            }
        });
    }


    /**
     * initialising set of action after the character killed chicken
     * @param {object} enemy - for every singe chicken
     */
    afterTheChickenDies(enemy) {
        this.checkIfItIsSupposedToPlay(2);
        this.character.shortJump();
        this.deleteChicken(enemy);
        this.character.isJumping = false;
    }


    /**
     * condition when the chicken can make damage on character
     * @param {object} enemy - for every singe chicken
     * @returns boolean
     */
    chickenStrikes(enemy) {
        return this.character.isColliding(enemy) &&
            !this.character.isAboveGround();
    }


    /**
     * condition under which the character can make damage on chicken
     * @param {object} enemy - for every singe chicken
     * @returns boolean
     */
    chickenIsDead(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.isAboveGround() &&
            !this.character.isHurt() &&
            this.character.speedY < 0;
        //  &&
        // this.character.isJumping === true;
    }


    /**
     * chicken will be deleted out of array after dying with some delay
     * @param {object} enemy - for every singe chicken
     */
    deleteChicken(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1)
        }, 400);
    }


    /**
     * detecting collision between character and endboss
     */
    checkCollisionEndBossWithCharacter() {
        if (this.character.isColliding(this.endBoss)) {
            this.character.hit(this.endBoss);
            this.statusBar.setHealthPercentage(this.character.energy);
        }
    }


    /**
     * seting a interval and condition in which the chicken may start jumping
     */
    startJumping() {
        setInterval(() => {
            if (pause === false) {
                this.level.enemies.forEach((enemy) => {
                    if (enemy.x - this.character.x <= 450) {
                        enemy.chickenJump();
                    }
                });
            }
        }, 50);
    }


    /**
     *seting interval in which we initialise throwing bottle under sertain condition 
     */
    checkThrowableObject() {
        setInterval(() => {
            if (pause === false) {
                if (this.keyboard.D && this.character.bottleNumber > 0) {
                    let bottle = new ThrowableObject(this.character.x + 100,
                        this.character.y + 100, this.character.otherDirection);
                    this.initiateThrowedBottleAnimation(bottle);
                }
            }
        }, 200);
    }


    /**
     * set of action that are happening after the bottle has been thrown
     * @param {object} bottle - for every bottle
     */
    initiateThrowedBottleAnimation(bottle) {
        this.breakBottle();
        this.throwableObjects.push(bottle);
        this.character.bottleNumber--;
        this.statusBarBottles.setBottlePercentage(this.character.bottleNumber);
        this.eraseThrowedBottle(bottle);
        this.stopGrill();
    }


    /**
     * after throwing the deleting of bottle will be initialised
     * @param {object} bottle - for every bottle
     */
    eraseThrowedBottle(bottle) {
        setTimeout(() => {
            this.deleteThrowableObject(bottle);
        }, 1100);
    }


    /**
     * seting timer in order to stop showing animation of endboss being hurt
     */
    stopGrill() {
        setTimeout(() => {
            this.endBoss.hit = false;
        }, 1100);
    }


    /**
     * the bottle will be erased from the array
     * @param {object} bottle - for every bottle
     */
    deleteThrowableObject(bottle) {
        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
    }


    /**
     * sound of the bottle splashing will be playing after some delay
     */
    breakBottle() {
        setTimeout(() => {
            this.checkIfItIsSupposedToPlay(8);
        }, 1100);
    }


    /**
     * detecting collision endboss with the throwed bottle
     */
    checkCollisionEndBoss() {
        setInterval(() => {
            if (pause === false) {
                this.throwableObjects.forEach((bottle) => {
                    if (this.endBoss.isColliding(bottle)) {
                        this.initiateEndBossHurting();
                    }
                },);
            }
        }, 600);
    }


    /**
     * collision bottle with the chicken will be registred and if the condition 
     * has been fullfiled the chicken dies
     */
    checkCollisionChickenWithBottle() {
        setInterval(() => {
            if (pause === false) {
                this.level.enemies.forEach((enemy) => {
                    this.throwableObjects.forEach((bottle) => {
                        if (bottle.isColliding(enemy)) {
                            enemy.chickDead = true;
                            this.checkIfItIsSupposedToPlay(2);
                            this.deleteChicken(enemy);
                        }
                    });
                });
            }
        }, 300);
    }


    /**
     * initialising set of action after the endboss is hit with the bottle
     */
    initiateEndBossHurting() {
        this.endBoss.endBossIsHit();
        this.endBoss.hit = true;
        this.checkIfItIsSupposedToPlay(5);
        this.statusBarEndBoss.setHealthPercentageEndBoss(this.endBoss.endBossEnergy)
    }


    /**
     * detecting collision between character and the bottle
     */
    checkCollisionBottle() {
        setInterval(() => {
            if (pause === false) {
                this.level.bottles.forEach((bottle) => {
                    if (this.character.isColliding(bottle)) {
                        this.initiateBottleAnimation(bottle);
                    }
                },);
            }
        }, 250);
    }


    /**
     * set of action if the character collided with the bottle
     * @param {object} bottle - for every bottle
     */
    initiateBottleAnimation(bottle) {
        this.character.bottleCollected();
        this.checkIfItIsSupposedToPlay(6);
        this.statusBarBottles.setBottlePercentage(this.character.bottleNumber);
        this.deleteBottle(bottle);
    }


    /**
     * collected bottle will be deleted from the array
     * @param {object} bottle - for every bottle
     */
    deleteBottle(bottle) {
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
    }


    /**
     * detecting collision between character and the coin
     */
    checkCollisionCoin() {
        setInterval(() => {
            if (pause === false) {
                this.level.coins.forEach((coin) => {
                    if (this.character.isColliding(coin)) {
                        this.initiateCoinAnimation(coin);
                    }
                },);
            }
        }, 250);
    }


    /**
     * set of action if the character collided with the coin
     * @param {object} coin - for every coin 
     */
    initiateCoinAnimation(coin) {
        this.character.coinCollected();
        this.checkIfItIsSupposedToPlay(7);
        this.statusBarCoins.setCoinPercentage(this.character.coinNumber);
        this.deleteCoin(coin);
    }


    /**
     * collected coin will be deleted from the array
     * @param {object} coin -for every coin
     */
    deleteCoin(coin) {
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
    }


    /**
     * setting the interval in which would be checkt when the character 
     * crosses the value of x
     */
    crossingTheEndBossLine() {
        setInterval(() => {
            if (pause === false) {
                if (this.character.x >= 2200) {
                    this.endBoss.breakPointEndBoss = true;
                }
            }
        }, 500);
    }


    /**
     * function incharge of drawing on the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //this clears the canvas
        this.cameraWithBackground();
        this.addFixedObjects();
        this.endBossBreakPoint();
        this.cameraWithMovable();
        this.drawingSelfFunction();
    }


    /**
     * background object from a level are being drawn on the canvas adjusting the camera
     */
    cameraWithBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * movable object from a level are being drawn on the canvas adjusting the camera
     */
    cameraWithMovable() {
        this.ctx.translate(this.camera_x, 0);
        this.addMovableObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * adding the status bar for the endboss when the condition has been fullfiled
     */
    endBossBreakPoint() {
        if (this.endBoss.breakPointEndBoss == true) {
            this.addToMap(this.statusBarEndBoss);
        }
    }


    /**
     * activating the requestAnimationFrame() function
     */
    drawingSelfFunction() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }


    /**
     * adding objects to the canvas that are not supposed to move
     */
    addFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
    }


    /**
     * adding objects to the canvas that are moving
     */
    addMovableObjectsToMap() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endBoss);
    }



    /**
     * loading objects to the canvas in order to be drawn
     * @param {object} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * adding/drawing image flipped to a one of its sides depending of the condition has been fullfiled
     * @param {object} mo - for every movable object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);          //object frame
        //mo.drawFrameOffset(this.ctx);  // offset frame
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * turning image on its right side
     * @param {object} mo -for every moovable object
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * turning image on its other side
     * @param {object} mo - for every movable object 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}