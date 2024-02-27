const mainTemplate = document.querySelector('#race__main')
const gameTemplate = document.querySelector('#race__game')
const raceText = document.querySelector('#race__text')
const raceInput = document.querySelector('#race__input')
const raceAnswer = document.querySelector('#race__answer')
const raceBtn = document.querySelector('#btn')
const firework = document.querySelectorAll('.firework')
const progressBar = document.querySelector('.progress__bar')
const hint = document.querySelector('#hint')

const levels = [
	{
		level: 1,
		text: 'Печатаю короткое предложение'
	},
	{
		level: 2,
		text: 'Дефрагментация'
	},
	{
		level: 3,
		text: 'И прыгают скороговорки, как караси на сковородке'
	},
	{
		level: 4,
		text: 'Флюорографист флюорографировал флюорографистку'
	},
	{
		level: 5,
		text: 'Разнервничавшегося конституционалиста Пропроколокропенко нашли'
	},
	{
		level: 6,
		text: 'Четверть четверика гороха без червоточинки'
	},
	{
		level: 7,
		text: 'Шла Саша по шоссе и сосала сушку'
	},
]
let levelIndex = 0
let str = ''
let strArr = []
let pointProcent = 0
let animationPoint = 0
let gameStatus = false
const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя ,'
const alphabetArr = alphabet.split('')


clearPage()
function clearPage() {
	str = ''
	strArr = []
	raceBtn.style.display = 'block'
	firework.forEach(el => {
		el.style.display = 'none'
	})
	return
}

raceBtn.onclick = gameStart

function gameStart() {
	gameStatus = true
	progressBar.style.width = 0 + '%'
	raceBtn.style.display = 'none'
	gameTemplate.style.display = 'block'
	str = levels[levelIndex]['text']
	raceAnswer.innerHTML = ''
	strArr = str.split('')
	raceText.innerHTML = str

	pointProcent = 0
	animationPoint = 0
	pointProcent = 100 / strArr.length
}

document.addEventListener('keydown', function gameProgress(e) {
	let answer = strArr.slice(0, 1)

	if (gameStatus === true && e.key === strArr[0] && alphabetArr.includes(e.key)) {

		animationPoint += +pointProcent
		strArr.shift()
		raceAnswer.innerHTML += answer
		progressBar.style.width = animationPoint + '%'
		if (strArr.length == 0) {
			gameFinish()
		}
	} else if (gameStatus === true && alphabetArr.includes(e.key)) {
		setTimeout(() => {
			mainTemplate.classList.remove('error')
		}, 200)
		mainTemplate.classList.add('error')
	}
})

function gameFinish() {
	gameStatus = false
	levelIndex++
	if (levelIndex === levels.length) {
		firework.forEach(el => {
			el.style.display = 'block'
		})
		setTimeout(() => {
			levelIndex = 0
			hint.style.display = 'none'
			raceBtn.style.display = 'block'
			raceBtn.innerHTML = 'Начать заново'
			raceText.innerHTML = 'Поздравляю'
			raceAnswer.innerHTML = 'Игра пройдена!'
			raceBtn.onclick = () => history.go()
			firework.forEach(el => {
				el.style.display = 'none'
			})
		}, 1500)
	} else {
		firework.forEach(el => {
			el.style.display = 'block'
		})
		setTimeout(() => {
			raceBtn.style.display = 'block'
			raceBtn.innerHTML = 'Продолжить'
			clearPage()
		}, 1500)
	}
}
