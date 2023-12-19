/** Class representing the Level*/

class Level {


    /**
     * values defined, from which our game world consists, needed for game to work properly
     */
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    endBoss;
    level_end_x = 2700;
    
    
    /**
     * 
     * @param {object} enemies - representing the value of enemies in the game
     * @param {object} clouds - representing the value of clouds in game
     * @param {object} backgroundObjects - representing the value of backgrounds in the game
     * @param {object} bottles - representing the value of bottles in the game
     * @param {object} coins - representing the value of coins in the game
     * @param {object} endBoss - representing the value of endBoss in the Game
     */

    constructor(enemies, clouds, backgroundObjects, bottles, coins, endBoss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endBoss = endBoss;
    }
}