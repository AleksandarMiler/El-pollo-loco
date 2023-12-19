/** Class representing the StatusBarEndBoss, as a subcategorie/subclass of drawableObject */

class StatusBarEndBoss extends drawableObject {


    /**
     * arrays containing images of statusBar
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];


     /**
     * variable who has been set to 100
     */

    helthEndBoss = 100;


    /**
     * constructor function incharge of loading and showing images of statusBar
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 50;
        this.width = 200;
        this.height = 40;
        this.setHealthPercentageEndBoss(100);
        this.otherDirection = true;
    }


    /**
     * the procentage of the boss energy will be shown depending on the number that is 
     * comming as a result of the function below
     * @param {string} healthEndBoss - the value of the variable which is changing 
     * every time the function has been executed
     */
    setHealthPercentageEndBoss(healthEndBoss) {
        this.healthEndBoss = healthEndBoss; // 0..5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * returning the value 0 to 5 which consists with the numbers or images in an array
     * @returns boolean
     */
    resolveImageIndex() {
        if (this.healthEndBoss == 100) {
            return 5;
        }
        else if (this.healthEndBoss == 80) {
            return 4;
        }
        else if (this.healthEndBoss == 60) {
            return 3;
        }
        else if (this.healthEndBoss == 40) {
            return 2;
        }
        else if (this.healthEndBoss == 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
    }
