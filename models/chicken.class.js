/** Class representing the Chicken, as a subcategorie/subclass of movableObject */

class Chicken extends movableobject {

    /**
     * values defined needed for Chicken to be shown, move etc..
     */
    y = 350;
    height = 60;
    width = 90;
    time;
    chickDead = false;


    /**
     * the values of offset defined inside of an array
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 20
    };


    /**
     * arrays containing images of Walking and being dead 
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];


    /**
     * constructor function incharge of loading and showing images of chicken
     * @param {number} x -the value of x
     * @param {string} time  - the value of variable represented in seconds
     */
    constructor(x, time) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.25 + Math.random() * 0.4;
        this.time = time;
        this.x = x;
        this.animate();
    }


    /**
     * function incharge of moving and animating the chicken by showing 
     * diferent set of images depending on various conditions
     */
    animate() {
        setInterval(() => {
           if (pause === false) {
            this.moveLeft();
           }
        }, 1000 / 60);

        setInterval(() => {
           if (pause === false) {
           this.walkOrDie();
        }
        }, 400);  
    }


    /**
     * set of images to animate walking or dead depending on condition
     */
    walkOrDie() {
        if (this.chickDead == false) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.chickDead == true){
        this.showAnimationChickenIsDead();
        
        }
    }


    /**
     * animation chicken is dead will be shwn when the condition has been fullfilled
     */
    showAnimationChickenIsDead() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.chickDead == false;
        }, 1000);
    
    }
    

    /**
     * initiating the animation of chicken jumping
     */
    chickenJump() {
        this.speed = 2;
        if (!this.isAboveGround()) {
            this.speedY = 20;
            this.chickenFall();
        }
    }


    /**
     * function that is making sure that the chicken after jumping fall on the ground again
     */
    chickenFall() {
        setInterval(() => {
           if (pause === false) {
          if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        } 
        }, 800);
    }
}