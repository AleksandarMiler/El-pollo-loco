/** Class representing the StatusBar, as a subcategorie/subclass of drawableObject */


class StatusBar extends drawableObject {

    /**
     * arrays containing images of statusBar
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];


    /**
     * variable who has been set to 100
     */
    percentage = 100;


    /**
     * constructor function incharge of loading and showing images of statusBar
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_HEALTH[5]);
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 40;
    }


    /**
     * the procentage of the gcurrent energy of the character will be shown depending on the number that is 
     * comming as a result of the function below
     * @param {string} percentage - the value of the variable which is changing 
     * every time the function has been executed
     */
    setHealthPercentage(percentage) {
        this.percentage = percentage; // 0..5
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    
    /**
     * returning the value 0 to 5 which consists with the numbers or images in an array
     * @returns boolean
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }
        else if (this.percentage > 80) {
            return 4;
        }
        else if (this.percentage > 60) {
            return 3;
        }
        else if (this.percentage > 40) {
            return 2;
        }
        else if (this.percentage > 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}