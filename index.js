const start = document.querySelector('#start'),
    input = document.querySelector('#input'),
    bestResult = document.querySelector('#bestResult'),
    bestResultAll = document.querySelector('#bestResultAll'),
    clear = document.querySelector('#clear'),
    clearAll = document.querySelector('#clearAll'),
    clickCircle = document.querySelector('#circle');

let count = 0;
let fiveSeconds = 5000;
let sumClicks = [];
let users = {};
let bestResultNumber = 0;

function oldUser(user) {
    if (!user) {
        sumClicks.length = 0;
        bestResultNumber = 0;
    }
}

function startGame() {
    setTimeout(() => {
        alert(`You clicked ${count} times`);
        sumClicks.push(count);
        count = 0;
        bestResultNumber = Math.max(...sumClicks);
        users[input.value] = bestResultNumber;
        localStorage.setItem('bestResult', bestResultNumber)
        localStorage.setItem('bestResultForAllTimes', JSON.stringify(users));
    }, fiveSeconds);
}

try {
    start.addEventListener('click', () => {
        if (input.value) {
            const isNewUser = Object.keys(users).includes(input.value);
            oldUser(isNewUser);
            startGame();
        } else {
            alert('Empty nickname');
        }
    })
} catch (e) {
    alert('Something wrong')
}

clickCircle.addEventListener('click', () => count++);

bestResult.addEventListener('click', () => {
    alert(`Best result is: ${localStorage.getItem('bestResult')}`)
});

bestResultAll.addEventListener('click', () => {
    const allRes = JSON.parse(localStorage.getItem('bestResultForAllTimes'));

    if (allRes === undefined || allRes === null) {
        alert(`Best result for the whole time is: 0 by null`)
    } else {
        const bestRes = Math.max(...Object.values(allRes))
        for (let user in allRes) {
            if (allRes[user] === bestRes) {
                alert(`Best result for the whole time is: ${allRes[user]} by ${user}`)
            }
        }
    }
})

clear.addEventListener('click', () => {
    localStorage.removeItem('bestResult')
    bestResultNumber = 0;
    alert('Best result is cleared')
})

clearAll.addEventListener('click', () => {
    localStorage.clear();
    alert('Best result for the whole time is cleared')
})