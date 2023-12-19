/** Class representing the movableObject, as a subcategorie/subclass of drawableObject */

class movableobject extends drawableObject {

    /**
     * values defined needed for every moving object such is speed, acceleration etc
     * in order that it can  move at the right way we want
     */
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastMove = 0;
    endBossEnergy = 100;
    lastHitEndBoss = 0;


    /**
     * the values of offset defined inside of an array
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    /**
     * function in charge of the objects that are above the ground
     */
    applyGravity() {
        setInterval(() => {
            if (pause === false) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }
        }, 1000 / 25);

    }


    /**
     * function that tells us whether the object is above the ground or not
     * @returns boolean
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {  //Throwable Object soll immer hinfallen
            return this.y < 360;
        }
        else if (this instanceof Chicken) {
            return this.y < 350;
        }
        else {
            return this.y < 170;
        }
    }



    /**
     * function that is checking if one movable is colliding with another one
     * @param {string} mo - the value of movable object
     * @returns boolean
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * function that is checking if one movable object is colliding with another one 2nd version
     * @param {object} mo - the value of movable object
     * @returns boolean
     */

    isColliding3(mo) {
        return this.x + this.offset.left > mo.x &&
            this.x + this.offset.left < mo.x + mo.width &&
            this.y + this.height - this.offset.bottom === mo.y + mo.height - mo.offset.bottom
            ||
            this.x + this.width - this.offset.right > mo.x &&
            this.x + this.width - this.offset.right < mo.x + mo.width &&
            this.y + this.height - this.offset.bottom === mo.y + mo.height - mo.offset.bottom
            ||
            this.x + this.offset.left > mo.x &&
            this.x + this.width - this.offset.right < mo.x + mo.width &&
            this.y + this.height - this.offset.bottom === mo.y + mo.height - mo.offset.bottom

    }


    /**
     * function that is making deference if the character or the endboss have been hit
     * @param {string} id - unique id that belongs aither character or endBoss
     */

    hit(id) {
        if (id instanceof Endboss) {
            this.energy -= 50;
            this.checkEnergyLevel();
        } else {
            this.energy -= 10;
            this.checkEnergyLevel();
        }
    }


    /**
     * the energy level of the character will be checked and depending on the condition 
     * will be aither dead or hurt
     */
    checkEnergyLevel() {
        if (this.energy <= 0) {
            this.energy = 0;
            this.showEndscreenAndRestart();
            this.world.gameOver = true;
            this.world.playBackgroundMusic();
            this.world.checkIfItIsSupposedToPlay(11);
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * function that manages what happens when the endBoss has been hit
     */
    endBossIsHit() {
        this.endBossEnergy -= 20;
        if (this.endBossEnergy == 0) {
            this.endBossEnergy == 0;
            this.showGameOverAndRestart();
            this.world.gameOver = true;
            this.world.checkIfItIsSupposedToPlay(10);
        }
    }


    /**
     * at the gameover the Endscreen and a button will be shown
     */
    showEndscreenAndRestart() {
        document.getElementById('endScreenLose').style = 'display: block';
        document.getElementById('restartGameLose').style = 'display: block';
    }


    /**
     * /**
     * at the gameover the Endscreen and a button will be shown
     */
    showGameOverAndRestart() {
        document.getElementById('endScreenGameOver').style = 'display: block';
        document.getElementById('restartGameWin').style = 'display: block';
    }


    /**
     * the amount of the bottles will we increased by one
     */
    bottleCollected() {
        this.bottleNumber++;
    }


    /**
     * the amount of the coins will we increased by one
     */
    coinCollected() {
        this.coinNumber++;
    }


    /**
     * the variable will be set at the given time
     */

    setInactiveTime() {
        this.lastMove = new Date().getTime();
    }


    /**
     * the point from last move will be calculated
     * @returns boolean
     */
    isInactive() {
        let idle = new Date().getTime() - this.lastMove;
        idle = idle / 500;
        return idle;
    }


    /**
     * the time from the last time being hurt will be calculated
     * @returns boolean
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //Difference in milliseconds
        timePassed = timePassed / 1000;  //Difference in seconds
        return timePassed < 1;
    }


    /**
     * the time from the last time being hurt will be calculated
     * @returns boolean
     */
    endBossisHurt() {
        let timePassed = new Date().getTime() - this.lastHitEndBoss; //Difference in milliseconds
        timePassed = timePassed / 1000;  //Difference in seconds
        console.log('u funkciji je lastHit:', timePassed);
        return timePassed < 1;
    }


    /**
     * confirmation if the character is dead or not
     * @returns boolean
     */
    isDead() {
        return this.energy == 0;
    }


    /**
    * confirmation if the endboss is dead
    * @returns boolean
    */
    endBossIsDead() {
        return this.endBossEnergy == 0;
    }


    /**
     * the images from the array will be loaded and shown one by one up to sertain point
     * @param {array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * function in charge for moving left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * function in charge for moving right
     */
    moveRight() {
        this.x += this.speed;
    }

    
    /**
     * function in charge for moving up/jumping
     */
    jump() {
        this.speedY = 26;
    }
}