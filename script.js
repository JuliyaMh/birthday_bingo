const facts = [
    { id: 1, text: "Вместе ели неприлично много сыра?" },
    { id: 2, text: "Познакомились в интернете?" },
    { id: 3, text: "Учились вместе в вузе?" },
    { id: 4, text: "Часто вместе играют в шахматы?" },
    { id: 5, text: "Настин партнёр по научпоп-лекциям и форумам?" },
    { id: 6, text: "Познакомились через общего друга/подругу?" },
    { id: 7, text: "Были дома у Насти?" },
    { id: 8, text: "Настя была дома у них?" },
    { id: 9, text: "Ночевали вместе в одной комнате?" },
    { id: 10, text: "Вместе катались на коньках?" },
    { id: 11, text: "Катались вместе на тюбинге?" },
    { id: 12, text: "Любят ту же музыкальную группу?" },
    { id: 13, text: "Были вместе на тематической костюмированной вечеринке?" },
    { id: 14, text: "Катались вместе на сноуборде/горных лыжах?" },
    { id: 15, text: "Любят тот же фандом?" },
    { id: 16, text: "Подвозили Настю в своей машине?" },
    { id: 17, text: "Учили один и тот же иностранный язык (кроме английского)?" },
    { id: 18, text: "Учили вместе один и тот же язык программирования? " },
    { id: 19, text: "Вместе играли в лото?" },
    { id: 20, text: "Жили вместе больше, чем пару дней?" },
    { id: 21, text: "Одалживали/примеряли одежду/аксессуары друг друга?" },
    { id: 22, text: "Вместе играли в настолки?" },
    { id: 23, text: "Вместе были на пикнике?" },
    { id: 24, text: "Вместе играли в Mortal Combat?" },
    { id: 25, text: "Вместе смотрели Властелина Колец? " },
    { id: 26, text: "Ходили с Настей и её партнёром на парное свидание?" },
    { id: 27, text: "Были на Дне Рождения Насти, но Настя НЕ была на их праздновании? " },
    { id: 28, text: "Ходили вместе на квесты?" },
    { id: 29, text: "Часто ходят вместе в кино?" },
    { id: 30, text: "Одновременно с Настей носили брекеты?" },
    { id: 31, text: "Вместе были в другом городе?" },
    { id: 32, text: "Их, как и Настю, «принимали менты за безбилетный проезд»?" },
    { id: 33, text: "Они, как и Настя Любезнова, когда-то учились вместе с Настей Некоз? " },
    { id: 34, text: "Вместе увлекаются Древней Грецией?" },
    { id: 35, text: "Тот же цветотип, что и у Насти, но совершенно разные стили?" },
    { id: 36, text: "Часто пикируются с Настей в книжном клубе?" },
    { id: 37, text: "Не были на Настином Дне Рождения в 2025? " },
    { id: 38, text: "Тоже не любят Монеточку?" },
    { id: 39, text: "Есть одинаковые футболки с Depeche Mode?" },
    { id: 40, text: "Вместе плавали на сапах?" },
    { id: 41, text: "Вместе опаздывали куда-то на 4 часа?" },
    { id: 42, text: "Были вместе на футбольном матче?" },
    { id: 43, text: "Тоже любят известную космическую сагу, но другую?" },
    { id: 44, text: "Очень часто вместе возмущаются на тему капитализма и патриархата?" },
    { id: 45, text: "Вместе жарили шашлыки?" },
    { id: 46, text: "Вместе были на кладбище?" },
    { id: 47, text: "Вместе ходили на бизнес-ланчи?" },
    { id: 48, text: "Устраивали кино-ночи / кино-вечера?" },
    { id: 49, text: "Вместе ходили на тренировки? " },
    { id: 50, text: "Настя лично знакома с их питомцем / они были лично знакомы с Настиным питомцем?" },
    { id: 51, text: "Знакомы 5 и больше лет?" },
];

const factElement = document.querySelector('#fact .big.text');
const submitBtn = document.getElementById('submitGuess');
const input = document.getElementById('guestName');
const scoreElement = document.getElementById('score_num');

let score = 0;
let shownFacts = [];

function loadGameState() {
    const savedScore = localStorage.getItem('bingoScore');
    const savedShownFacts = localStorage.getItem('bingoShownFacts');

    if (savedScore) {
        score = parseInt(savedScore);
        scoreElement.textContent = `Очки: ${score}`;
    }

    if (savedShownFacts) {
        shownFacts = JSON.parse(savedShownFacts);
    }
}

function saveGameState() {
    localStorage.setItem('bingoScore', score);

    localStorage.setItem('bingoShownFacts', JSON.stringify(shownFacts));
}

function getRandomFact() {
    const unshownFacts = facts.filter(fact => !shownFacts.includes(fact.id));

    if (unshownFacts.length === 0) {
        shownFacts = [];
        saveGameState();
        return facts[Math.floor(Math.random() * facts.length)];
    }

    const randomIndex = Math.floor(Math.random() * unshownFacts.length);
    const selectedFact = unshownFacts[randomIndex];

    shownFacts.push(selectedFact.id);

    return selectedFact;
}

function displayRandomFact() {
    const randomFact = getRandomFact();
    factElement.textContent = randomFact.text;
    saveGameState();
}

submitBtn.addEventListener('click', function() {
    const guessedName = input.value;

    if (guessedName.trim() !== '') {
        score++;
        scoreElement.textContent = `Очки: ${score}`;

        input.value = '';

        displayRandomFact();

        saveGameState();
    }
});


input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        submitBtn.click();
    }
});

loadGameState();
displayRandomFact();
