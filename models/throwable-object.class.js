/** Class representing the ThrowableObject, as a subcategorie/subclass of movableObject */

class ThrowableObject extends movableobject {


    /**
     * arrays containing images of Jumping, Walking, short and long idle, being dead or hurt
     */
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
     * values defined needed for Character to be shown, move etc..
     */
    otherDirection;


    /**
     * constructor function incharge of loading and showing images of throwableObject
     */
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;
        this.animate();
        this.throw();
    }


    /**
     * the throwing of an object will be initialised
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            if (pause === false) {
                if (this.otherDirection === false) {
                    this.x += 15;
                } else {
                    this.x -= 20;
                }
            }
        }, 50);
    }


    /**
     * animation of flying and splashing of an throwable object  will be shown
     */
    animate() {
        setInterval(() => {
            if (pause === false) {
                if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_ROTATION);
                }
            }
        }, 50);
        
        setInterval(() => {
            if (pause === false) {
                if (!this.isAboveGround()) {
                    setTimeout(this.playAnimation(this.IMAGES_SPLASH), 500);
                }
            }
        }, 500);
    }
}