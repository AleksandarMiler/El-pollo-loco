/** Class representing the Endboss, as a subcategorie/subclass of movableObject */


class Endboss extends movableobject {

    /**
     * values defined needed for Endboss to be shown, move etc..
     */
    height = 300;
    width = 300;
    y = 130;
    speed = 4;
    testVariable;
    breakPointEndBoss = false;
    hit = false;
    periodCount = 0;


    /**
     * the values of offset defined inside of an array
     */
    offset = {
        top: 20,
        left: 10,
        right: 10,
        bottom: 10
    };


    /**
     * arrays containing images of Jumping, Walking, attacking, being dead or hurt
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [

        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /**
     * variable defined in order to connect endboss with the world 
     * being created in class world
     */
    world;


    /**
     * constructor function incharge of loading and showing images of endboss
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2800;
        this.animate();
    }


    /**
     * seting interval of function incharge of animating the endboss by showing 
     * diferent images depending on various conditions
     */
    animate() {
        setInterval(() => {
            if (pause === false) {
                this.endBossAnimate();
            }
        }, 300);
    }


    /**
     * animating the endboss by showing 
     * diferent images depending on various conditions
     */
    endBossAnimate() {
        if (this.breakPointEndBoss === false)
            this.playAnimation(this.IMAGES_ALERT);
        else if (this.checkIfEndBossIsHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.periodCount = 0;
        }
        else if (this.endBossIsDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        }
        else if (this.readyToAttack()){
            this.attackAndWalk();
        }
        else {
            this.endBossWellcomes();
        }
    }


    /**
     * function that is making enboss going forward and attacking the character if the conditions are right 
     */
    attackAndWalk() {
        if (this.periodCount < 10) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.periodCount++;
        } else {
            this.periodCount++;
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
            this.speed = 20;
            if (this.periodCount > 20) {
                this.periodCount = 0;
            }
        }
    }


    /**
     * function that is checking if the condition for attack are fullfiled
     * @returns boolean
     */
    readyToAttack() {
        return this.breakPointEndBoss === true && this.x <= 2400 || this.endBossEnergy <= 80;
    }


    /**
     * set of action after the endBoss starts to move
     */
    endBossWellcomes() {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
        this.playWellcomeMusic();
    }


    /**
     * function that is checking if the endboss is hurt
     * @returns boolean
     */
    checkIfEndBossIsHurt() {
        return this.breakPointEndBoss === true && this.endBossEnergy <= 80 && this.hit === true;
    }


    /**
     * if the conditions are fullfiled the greetings music will be played
     */
    playWellcomeMusic() {
        if (this.world.character.x >= 2100 && this.x > 2780) {
            this.world.checkIfItIsSupposedToPlay(4);
        }
    }
}

