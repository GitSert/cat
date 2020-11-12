console.log("Javascript is working!");

// Add EventListener to load the game whenever the browser is ready
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
        clock.setTime("00","00","00")
    });

    feedButton.addEventListener("click", () => {
        console.log("User clicked feed button");
        animator.cat.feed()
    });

    playButton.addEventListener("click", () => {
        console.log("User clicked play button");
        animator.cat.play()
    });

    sleepButton.addEventListener("click", () => {
        console.log("User clicked sleep button");
        animator.cat.sleep()
    });

    document.getElementById('setTime').addEventListener("click", () => {
        console.log("User clicked setTime button");
        const hoursInput = document.getElementById('hoursInput') as HTMLInputElement;
        const minutesInput = document.getElementById('minutesInput') as HTMLInputElement;
        const secondsInput = document.getElementById('secondsInput') as HTMLInputElement;
        clock.setTime(hoursInput.value, minutesInput.value, secondsInput.value);
    });

});