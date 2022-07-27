const watchSeconds = document.querySelector('.stopwatch__seconds')
const watchMinutes = document.querySelector('.stopwatch__minutes')
const watchHours = document.querySelector('.stopwatch__hours')
const runButton = document.querySelector('.stopwatch__controls button:first-of-type')
const restartButton = document.querySelector('.stopwatch__controls button:last-of-type')

let time = {
    seconds: 0,
    minutes: 0,
    hours: 0
}

class Stopwatch {
    constructor(seconds, minutes, hours) {
        this.time = {
            seconds,
            minutes,
            hours
        }

        this.watchInterval
        this.isPaused = true
        this.isRestart = false
    }

    // Starting the stopwatch
    start() {
        this.isRestart = false
        this.isPaused = false
        this.changeButtonFunc()
        this.watchInterval = setInterval(() => this.addDigit(), 1000)

        restartButton.removeAttribute('disabled')
    }

    // Pausing the stopwatch
    pause() {
        this.isPaused = true
        this.changeButtonFunc()
        
        clearInterval(this.watchInterval)
    }

    // Changing the functionality of the main button
    changeButtonFunc() {
        // Checking if the main button text is "Start" or if the text is "continue" while "isRestart" is "false".
        // If yes, the button functionality will change to "pause", else it will revert to "start"
        if(runButton.innerText == 'Start' || (runButton.innerText == 'Continue' && !this.isRestart)) {
            runButton.setAttribute('onclick', 'stopwatch.pause()')
            runButton.innerText = 'Pause'
        } else {
            runButton.setAttribute('onclick', 'stopwatch.start()')
            
            // Checking if "isRestarting" is "false", if yes, the main button text will be "Continue",
            // else "Start"
            !this.isRestart ? runButton.innerText = 'Continue' : runButton.innerText = 'Start'
        }
    }

    // Restarting the counter
    restart() {
        this.isRestart = true

        clearInterval(this.watchInterval)

        for(let measure in time) {
            this.resetPlaces(measure)
        }

        this.pause()
        
        restartButton.setAttribute('disabled', '')
    }

    // Resetting a specific time measurement
    resetPlaces(place) {
        time[place] = 0
        this.time[place].innerText = '00'
    }

    // Handle 2 digits
    checkDigits(measure) {
        // If any measure is less than 9, it will add a 0 before
        if(time[measure] <= 9) time[measure] = '0' + time[measure]
    }

    // Adding the digits
    addDigit() {
        // When it reaches 60 seconds, it will add 1 minute and the second will reset. When it reaches 60
        // minutes, it will add 1 hour and the seconds and minutes will reset. Upon reaching 24 hours the
        // timer will completely reset
        if(time.seconds < 59) {
            time.seconds++

            this.checkDigits('seconds')
            this.time['seconds'].innerText = time.seconds
        } else if(time.minutes < 59) {
            time.minutes++

            this.resetPlaces('seconds')
            this.checkDigits('minutes')
            this.time['minutes'].innerText = time.minutes
        } else if(hours < 23) {
            time.hours++

            this.resetPlaces('seconds')
            this.resetPlaces('minutes')
            this.checkDigits('hours')
            this.time['hours'].innerText = time.hours
        } else {
            this.restart()
        }
    }
}

// Instantiating the object "Stopwatch"
const stopwatch = new Stopwatch(watchSeconds, watchMinutes, watchHours)