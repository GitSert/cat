/**
 * The Animator class handles the animation. It holds a `Ticker` object that
 * calls the `animate()` method at regilar intervals.
 * 
 * @author BugSlayer
 */
class Animator {

    private clock: ClockDisplay;

    public ticker: Ticker;

    public cat: Cat;

    /**
     * Construct Animator.
     * 
     * @param clock 
     */
    public constructor(clock: ClockDisplay) {
        this.clock = clock;
        this.ticker = new Ticker(this);
        this.cat = new Cat
    }

    /**
     * Handles an interval. This method is called by the `Ticker` at regular
     * intervals when the ticker is running.
     */
    public step() {
        this.clock.timeTick();
        this.cat.timeTick();
        if (this.cat.dead == true) {
            this.toggleAnimation();
        }
    }

    /**
     * Toggles the automatic intervals of the ticker.
     */
    public toggleAnimation() {
        this.ticker.toggle();
    }

}