const $form = document.getElementById('form')
const $clock = document.getElementById('clock')
const $date = document.getElementById('date')
const $clockTime = document.getElementById('clock-time')
const $clockTitle = document.getElementById('clock-title')
const $reset = document.getElementById('reset')

let timer

function dateChange(now, later) {
    const difference = later - now > 0 ? later - now : 0
    const dateFormat = (num) => num < 10 ? `0${num}` : num
    return {

        days: dateFormat(Math.floor(difference / 1000 / 60 / 60 / 24)),
        hours: dateFormat(Math.floor(difference / 1000 / 60 / 60 % 24)),
        minutes: dateFormat(Math.floor(difference / 1000 / 60 % 60)),
        seconds: dateFormat(Math.floor(difference / 1000 % 60))

    }
}

$form.addEventListener('submit', function countDown(e) {

    e.preventDefault()

    const title = $form.elements.title.value
    $clockTitle.textContent = `${title}`
    const enteredDate = $form.elements.date.value
    let finishTime = new Date(enteredDate)

    timer = setInterval(function () {

        finishTime = new Date(enteredDate)
        const currentTime = new Date()
        const timeChange = dateChange(currentTime, finishTime)
        $clockTime.innerHTML = `<div>
            <h2>${timeChange.days}</h2><h3>Days</h3>
        </div>
        <div>
            <h2>${timeChange.hours}</h2><h3>Hours</h3>
        </div>
        <div>
            <h2>${timeChange.minutes}</h2><h3>Minutes</h3>
        </div>
        <div>
            <h2>${timeChange.seconds}</h2><h3>Seconds</h3>
        </div>`

    }, 1000)

    localStorage.setItem('title', title)
    localStorage.setItem('finishTime', finishTime)
    $clock.style.display = 'block'
    $form.style.display = 'none'

})

const localFinishTime = localStorage.getItem('finishTime')
const localTitle = localStorage.getItem('title')

if (localTitle) {
    $clockTitle.textContent = `${localTitle}`
}

if (localFinishTime) {

    $clock.style.display = 'block'

    $form.style.display = 'none'

    timer = setInterval(function () {

        const lsFinishTime = new Date(localFinishTime)
        const now = new Date()
        const newTimeChange = dateChange(now, lsFinishTime)
        $clockTime.innerHTML = `<div>
            <h2>${newTimeChange.days}</h2><h3>Days
            </h3>
        </div>
        <div>
            <h2>${newTimeChange.hours}</h2><h3>Hours
            </h3>
        </div>
        <div>
            <h2>${newTimeChange.minutes}</h2><h3>Minutes
            </h3>
        </div>
        <div>
            <h2>${newTimeChange.seconds}</h2><h3>Seconds
            </h3>
        </div>`

    }, 1000)

}

$reset.addEventListener('click', function () {

    clearInterval(timer)
    localStorage.clear()
    $clock.style.display = 'none'
    $form.style.display = 'block'
    $form.reset()

})