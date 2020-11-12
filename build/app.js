class Animator {
    constructor(clock) {
        this.clock = clock;
        this.ticker = new Ticker(this);
        this.cat = new Cat;
    }
    step() {
        this.clock.timeTick();
        this.cat.timeTick();
        if (this.cat.dead == true) {
            this.toggleAnimation();
        }
    }
    toggleAnimation() {
        this.ticker.toggle();
    }
}
class Cat {
    constructor() {
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
    meow() {
        console.log("meow!");
        if (this.badState == false) {
            new Audio('./meow.mp3').play();
        }
        else {
            new Audio('./sadmeow.mp3').play();
        }
    }
    createCatImg() {
        this.img = document.createElement("img");
        this.badState = false;
        this.img.setAttribute("width", "500");
        this.catNormal();
    }
    catNormal() {
        this.img.setAttribute("src", "cat.png");
        this.catDiv.innerHTML = "";
        this.catDiv.appendChild(this.img);
    }
    catHurt() {
        this.badState = true;
        this.img.setAttribute("src", "hurtcat.png");
        this.catDiv.innerHTML = "";
        this.catDiv.appendChild(this.img);
    }
    kill() {
        console.log("Rethink your life choices and never get a pet or a kid because your cat fucking died!");
        this.img.setAttribute("src", "deadcat.png");
        this.catDiv.innerHTML = "";
        this.catDiv.appendChild(this.img);
        this.moodPage.innerText = "-";
        this.hungerPage.innerText = "-";
        this.energyPage.innerText = "-";
        this.dead = true;
    }
    reset() {
        this.dead = false;
        this.mood = 100;
        this.hunger = 0;
        this.energy = 100;
        this.lowMood = false;
        this.lowEnergy = false;
        this.highHunger = false;
    }
    update() {
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
        if (this.lowEnergy == true && this.energy >= this.maxEnergy * 0.25) {
            console.log("the cat is no longer tired");
            this.lowEnergy = false;
            this.catNormal();
        }
        if (this.lowMood == true && this.mood >= this.maxMood * 0.25) {
            console.log("the cat is no longer bored");
            this.lowMood = false;
            this.catNormal();
        }
        if (this.highHunger == true && this.hunger <= this.maxHunger * 0.75) {
            console.log("the cat is no longer hungry");
            this.highHunger = false;
            this.catNormal();
        }
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
        }
        else {
            this.moodPage.innerText = this.mood.toString();
            this.hungerPage.innerText = this.hunger.toString();
            this.energyPage.innerText = this.energy.toString();
        }
    }
    timeTick() {
        console.log("Tick");
        this.hunger += 4;
        this.mood -= 3;
        this.energy -= 3;
        this.update();
    }
    play() {
        console.log("now playing with cat");
        this.mood += 8;
        this.energy -= 5;
        this.hunger += 5;
        this.meow();
        this.update();
    }
    sleep() {
        console.log("cat is now sleeping");
        this.energy += 10;
        this.hunger += 5;
        this.update();
    }
    feed() {
        console.log("now feeding cat");
        this.mood += 8;
        this.energy += 8;
        this.hunger -= 15;
        this.meow();
        this.update();
    }
}
class ClockDisplay {
    constructor(output) {
        this.output = output;
        this.hours = new NumberDisplay(24);
        this.minutes = new NumberDisplay(60);
        this.seconds = new NumberDisplay(60);
        this.updateDisplay();
    }
    timeTick() {
        this.seconds.increment();
        this.updateDisplay();
    }
    setTime(hours, minutes, seconds) {
        this.hours.setStringValue(hours);
        this.minutes.setStringValue(minutes);
        if (seconds) {
            this.seconds.setStringValue(seconds);
        }
        this.updateDisplay();
    }
    updateDisplay() {
        const displayString = `${this.hours.getStringValue()}:${this.minutes.getStringValue()}:${this.seconds.getStringValue()}`;
        this.output.innerText = displayString;
    }
}
class NumberDisplay {
    constructor(rollOverLimit) {
        this.limit = rollOverLimit;
        this.value = 0;
    }
    getValue() {
        return this.value;
    }
    setValue(replacementValue) {
        if ((replacementValue >= 0) && (replacementValue < this.limit)) {
            this.value = replacementValue;
        }
    }
    getStringValue() {
        if (this.value < 10) {
            return "0" + this.value;
        }
        else {
            return "" + this.value;
        }
    }
    setStringValue(newValue) {
        this.setValue(Number(newValue));
    }
    increment() {
        this.value = (this.value + 1) % this.limit;
    }
}
class Ticker {
    constructor(animator, interval = 1000) {
        this.animator = animator;
        this.interval = interval;
    }
    isRunning() {
        return this.timerId != null;
    }
    toggle() {
        if (this.isRunning()) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        else {
            this.timerId = setInterval(() => {
                if (this.animator) {
                    this.animator.step();
                }
            }, this.interval);
        }
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const clock = new ClockDisplay(document.getElementById('output'));
    const animator = new Animator(clock);
    const tickerButton = document.getElementById('tickerButton');
    const resetButton = document.getElementById('resetButton');
    const feedButton = document.getElementById('feed');
    const playButton = document.getElementById('play');
    const sleepButton = document.getElementById('sleep');
    tickerButton.addEventListener("click", () => {
        console.log("User clicked ticker button");
        animator.toggleAnimation();
    });
    resetButton.addEventListener("click", () => {
        console.log("User clicked reset button");
        if (animator.ticker.isRunning()) {
            animator.toggleAnimation();
        }
        animator.cat.reset();
        new Animator(clock);
        clock.setTime("00", "00", "00");
    });
    feedButton.addEventListener("click", () => {
        console.log("User clicked feed button");
        animator.cat.feed();
    });
    playButton.addEventListener("click", () => {
        console.log("User clicked play button");
        animator.cat.play();
    });
    sleepButton.addEventListener("click", () => {
        console.log("User clicked sleep button");
        animator.cat.sleep();
    });
    document.getElementById('setTime').addEventListener("click", () => {
        console.log("User clicked setTime button");
        const hoursInput = document.getElementById('hoursInput');
        const minutesInput = document.getElementById('minutesInput');
        const secondsInput = document.getElementById('secondsInput');
        clock.setTime(hoursInput.value, minutesInput.value, secondsInput.value);
    });
});
//# sourceMappingURL=app.js.map