/** Class representing the Character, as a subcategorie/subclass of movableObject */

class Character extends movableobject {

    /**
     * values defined needed for Character to be shown, move etc..
     */
    height = 250;
    width = 120;
    y = 170;
    speed = 5;
    bottleNumber = 0;
    coinNumber = 0;
    isJumping = false;
    breakPoint = 2400;


    /**
     * the values of offset defined inside of an array
     */
    offset = {
        top: 120,
        left: 30,
        right: 30,
        bottom: 30
    };


    /**
     * arrays containing images of Jumping, Walking, short and long idle, being dead or hurt
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'

    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    /**
     * variable defined in order to connect character with the world 
     * being created in class world
     */
    world;


    /**
     * constructor function incharge of loading and showing images of character
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
    }


    /**
     * function incharge of animating and moving the character by showing 
     * diferent images depending on various conditions
     */
    animate() {
        setInterval(() => {
            if (pause === false) {
                this.CharacterMoving();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (pause === false) {
                this.characterAnimate();
            }
        }, 50);
    }


    /**
     * function incharge of moving the character left, right or up depending on the condition
     */
    CharacterMoving() {
        this.world.sound.audio[0].path.pause();
        if (this.isAbbleToMoveRight())
            this.movingRightGranted();
        if (this.isAbbleToMoveLeft())
            this.movingLeftGranted();
        if (this.isAbbleToJump())
            this.jumpGranted();
        this.world.camera_x = -this.x + 100;
    }


    /**
     * function incharge of loading the set of images depending on the condition
     */
    characterAnimate() {
        if (this.isDead())
            this.playAnimation(this.IMAGES_DEAD);
        else if (this.isHurt())
            this.playAnimation(this.IMAGES_HURT);
        else if (this.isAboveGround())
            this.playAnimation(this.IMAGES_JUMPING);
        else if (this.pressedLeftOrRight())
            //this.x += this.speed;
            this.playAnimation(this.IMAGES_WALKING);
        else if (this.isInactive() < 12)
            this.playAnimation(this.IMAGES_IDLE);
        else if (this.isInactive() > 12)
            this.playAnimation(this.IMAGES_LONGIDLE);
    }


    /**
     * checking if the left or right has been pressed
     * @returns boolean
     */
    pressedLeftOrRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    /**
     * set of actions after the moving to the right condition has been fullfilled
     */
    movingRightGranted() {
        //this.speed = 5;
        this.moveRight();
        this.setInactiveTime();
        this.otherDirection = false;
        this.world.checkIfItIsSupposedToPlay(0);
    }


    /**set of actions after the moving to the left condition has been fullfilled */
    movingLeftGranted() {
        //this.speed = 7.5;
        this.moveLeft();
        this.setInactiveTime();
        this.otherDirection = true;
        this.world.checkIfItIsSupposedToPlay(0);
    }


    /**
     * set of actions after the moving up condition has been fullfilled
     */
    jumpGranted() {
        this.isJumping = true;
        this.world.checkIfItIsSupposedToPlay(1);
        this.jump();
        this.setInactiveTime();
        this.check();
    }


    /**function that is preventing to varieble named isJUmping to stay active for longer than 
     * 1.7 sec after the character has jumped*/
    check() {
        if (!this.isColliding3(this.world.level.enemies) || !this.isColliding(this.world.level.enemies)) {
            setTimeout(() => {
                this.isJumping = false;
            }, 1700);
        }
    }


    /**
     * function is supposed to check if all the conditions to move left are satisfied
     * @returns boolean
     */
    isAbbleToMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * function is supposed to check if all the conditions to jump are satisfied
     * @returns boolean
     */
    isAbbleToJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * function is supposed to check if all the conditions to move right are satisfied
     * @returns boolean
     */
    isAbbleToMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.x < this.world.endBoss.x;
    }


    /**
    * short JUmp will be initiated
    */
    shortJump() {
        this.speedY = 20;
    }

}