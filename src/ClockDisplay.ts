/**
 * The ClockDisplay class implements a digital clock display for a
 * European-style 24 hour clock. The clock shows hours, minutes and seconds. 
 * The range of the clock is 00:00:00 (midnight) to 23:59:59 (one second before 
 * midnight).
 * 
 * The clock display receives "ticks" (via the timeTick method) every second
 * and reacts by incrementing the display. This is done in the usual clock
 * fashion: the hour increments when the minutes roll over to zero.
 * 
 * @author Michael Kölling and David J. Barnes and BugSlayer
 */
class ClockDisplay {

    private hours : NumberDisplay;
    private minutes : NumberDisplay;
    private seconds : NumberDisplay;

    private output: HTMLElement;

    /**
     * Construct clockdisplay
     * 
     * @param output 
     * @param ticker 
     */
    public constructor(output: HTMLElement) {
        this.output = output;
        this.hours = new NumberDisplay(24);
        this.minutes = new NumberDisplay(60);
        this.seconds = new NumberDisplay(60);
        this.updateDisplay();
    }
    
    /**
     * This method should get called once every minute - it makes
     * the clock display go one minute forward.
     */
    public timeTick() {
        this.seconds.increment();
        this.updateDisplay();
    }

    /**
     * Set the time of the display to the specified hour and
     * minute.
     * 
     * @param hours the Hours value as a `string`
     * @param minutes the Minutes value as a `string`
     * @param seconds optional the Seconds value as a `string`
     */
    public setTime(hours: string, minutes: string, seconds?: string) {
        // Try to update the hours value
        this.hours.setStringValue(hours);
        // Try to update the minutes value
        this.minutes.setStringValue(minutes);
        if (seconds) {
            // Try to update the seconds value if this value is given
            this.seconds.setStringValue(seconds);
        }

        // Update the display
        this.updateDisplay();
    }

    /**
     * Update the display element in the DOM.
     */
    private updateDisplay() {
        const displayString = `${this.hours.getStringValue()}:${this.minutes.getStringValue()}:${this.seconds.getStringValue()}`;
        this.output.innerText = displayString;
    }

}
