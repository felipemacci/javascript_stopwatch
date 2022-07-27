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

    initialize() {
        this.isRestart = false
        this.isPaused = false
        this.changeButtonFunc()
        this.watchInterval = setInterval(() => this.addDigit(), 1000)

        restartButton.removeAttribute('disabled')
    }

    pause() {
        this.isPaused = true
        this.changeButtonFunc()
        
        clearInterval(this.watchInterval)
    }

    changeButtonFunc() {
        if(runButton.innerText == 'Start' || (runButton.innerText == 'Continue' && !this.isRestart)) {
            runButton.setAttribute('onclick', 'stopwatch.pause()')
            runButton.innerText = 'Pause'
        } else {
            runButton.setAttribute('onclick', 'stopwatch.initialize()')
            
            !this.isRestart ? runButton.innerText = 'Continue' : runButton.innerText = 'Start'
        }
    }

    restart() {
        this.isRestart = true

        clearInterval(this.watchInterval)

        for(let measure in time) {
            this.resetPlaces(measure)
        }

        this.pause()
        
        restartButton.setAttribute('disabled', '')
    }

    resetPlaces(place) {
        time[place] = 0
        this.time[place].innerText = '00'
    }

    checkDigits(measure) {
        if(time[measure] <= 9) time[measure] = '0' + time[measure]
    }

    addDigit() {
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

const stopwatch = new Stopwatch(watchSeconds, watchMinutes, watchHours)