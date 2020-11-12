/**
 * The cat class contains mood, hunger and energy fields. Also it has a private meow method and public play, sleep and feed methods.
 */
class Cat {
    // cat fields
    private mood: number;
    private hunger: number;
    private energy: number;
    private maxMood: number;
    private maxHunger: number;
    private maxEnergy: number;

    private lowMood: boolean;
    private highHunger: boolean;
    private lowEnergy: boolean;
    private badState: boolean;

    private moodPage: HTMLElement;
    private hungerPage: HTMLElement;
    private energyPage: HTMLElement;
    private catDiv: HTMLElement;
    private img: HTMLElement;

    public dead: boolean;

    /**
     * construct cat
     * 
     */
    public constructor() {
        this.dead = false;
        this.maxMood = 100;
        this.maxHunger = 0;
        this.maxEnergy = 100;
        this.mood = this.maxMood;
        this.hunger = this.maxHunger;
        this.energy = this.maxEnergy;

        this.lowMood = false;
        this.highHunger = false;
        this.lowEnergy = false;
        this.badState = false;

        this.moodPage = document.getElementById('mood');
        this.hungerPage = document.getElementById('hunger');
        this.energyPage = document.getElementById('energy');
        this.catDiv = document.getElementById('catDiv');

        this.moodPage.innerText = this.mood.toString();
        this.hungerPage.innerText = this.hunger.toString();
        this.energyPage.innerText = this.energy.toString();
        
        this.createCatImg();
    }

    /**
     * meows
     */
    private meow() {
        console.log("meow!");
        if (this.badState == false) {
            new Audio('./meow.mp3').play()
        } else {
            new Audio('./sadmeow.mp3').play()
        }
    }

    /**
     * creates the starting img of the cat and sets it to the standard image
     */
    private createCatImg() {
        this.img = document.createElement("img");
        this.badState = false;
        this.img.setAttribute("width", "500");
        this.catNormal();
    }

    /**
     * changes the img of the cat to the standard one
     */
    private catNormal() {
        this.img.setAttribute("src", "cat.png");
        this.catDiv.innerHTML = "";
        this.catDiv.appendChild(this.img);
    }

    /**
     * changes the img of the cat to a more exhausted one
     */
    private catHurt() {
        this.badState = true;
        this.img.setAttribute("src", "hurtcat.png");
        this.catDiv.innerHTML = "";
        this.catDiv.appendChild(this.img);
    }

    /**
     * kills the cat
     */
    private kill() {
        console.log("Rethink your life choices and never get a pet or a kid because your cat fucking died!");
        this.img.setAttribute("src", "deadcat.png");
        this.catDiv.innerHTML = "";
        this.catDiv.appendChild(this.img);
        this.moodPage.innerText = "-";
        this.hungerPage.innerText = "-";
        this.energyPage.innerText = "-";
        this.dead = true;
    }

    /**
     * reset values
     */
    public reset() {
        this.dead = false;
        this.mood = 100;
        this.hunger = 0;
        this.energy = 100;
        this.lowMood = false;
        this.lowEnergy = false;
        this.highHunger = false;
    }

    /**
     * updates all cat info on the page
     */
    public update() {
        // shows a warning message and updates the look of the cat if the energy, mood and hunger are at dangerous levels
        if (this.energy <= 25) {
            console.log("let the cat sleep or it will die of exhaustion");
            this.lowEnergy = true;
            this.catHurt();
        }
        if (this.mood <= 25) {
            console.log("play with the cat or it will die of boredom");
            this.lowMood = true;
            this.catHurt();
        }
        if (this.hunger >= 75) {
            console.log("feed the cat or it will die of hunger");
            this.highHunger = true;
            this.catHurt();
        }
        // removes the warning message and updates the look of the cat if the energy, mood and hunger are no longer at dangerous levels
        if (this.lowEnergy == true && this.energy >= this.maxEnergy*0.25) {
            console.log("the cat is no longer tired");
            this.lowEnergy = false;
            this.catNormal();
        }
        if (this.lowMood == true && this.mood >= this.maxMood*0.25) {
            console.log("the cat is no longer bored");
            this.lowMood = false;
            this.catNormal();
        }
        if (this.highHunger == true && this.hunger <= this.maxHunger*0.75) {
            console.log("the cat is no longer hungry");
            this.highHunger = false;
            this.catNormal();
        }
        // kills the cat if the energy or mood are 0 or lower and if the hunger is 100 or higher
        if (this.energy <= this.maxEnergy) {
            console.log("you let your cat die of exhaustion you idiot!");
            this.kill();
        }
        else if (this.mood <= this.maxMood) {
            console.log("you let your cat die of boredom you idiot!");
            this.kill();
        }
        else if (this.hunger >= this.maxHunger) {
            console.log("you let your cat die of hunger you idiot!");
            this.kill();
        } else {
            this.moodPage.innerText = this.mood.toString();
            this.hungerPage.innerText = this.hunger.toString();
            this.energyPage.innerText = this.energy.toString();
        }
    }

    /**
     * per tick change the cat values and update the site
     */
    public timeTick() {
        console.log("Tick")
        this.hunger += 4;
        this.mood -= 3;
        this.energy -= 3;
        this.update();
    }

    /**
     * hunger+ mood+ energy-
     * meows and updates site info
     */
    public play() {
        console.log("now playing with cat")
        this.mood += 8;
        this.energy -= 5;
        this.hunger += 5;
        this.meow();
        // updates the info on the page
        this.update()
    }

    /**
     * energy+ hunger+
     * updates site info
     */
    public sleep() {
        console.log("cat is now sleeping")
        this.energy += 10;
        this.hunger += 5;
        // updates the info on the page
        this.update()
    }

    /**
     * mood+ energy+ hunger-
     * meows and updates site info
     */
    public feed() {
        console.log("now feeding cat")
        this.mood += 8;
        this.energy += 8;
        this.hunger -= 15;
        this.meow()
        // updates the info on the page
        this.update()
    }
}