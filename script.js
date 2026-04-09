const answers = {
    1: "The tuition fee per semester is approximately ₱15,000 excluding miscellaneous and other fees.",
    2: "The Registrar's office hours are Monday to Friday, 8:00 AM to 5:00 PM.",
    3: "Required documents for enrollment: Form 138, PSA Birth Certificate, Good Moral Certificate, 2x2 ID pictures, and Certificate of Transfer (for transferees)."
};

let answered = [];

function showAnswer(num) {
    const div = document.getElementById('answer' + num);
    if (!div) return;

    if (div.style.display === 'block') return;

    div.style.display = 'block';
    div.innerText = answers[num];

    if (!answered.includes(num)) {
        answered.push(num);
    }

    const progress = document.getElementById('progress');
    if (progress) {
        progress.innerText = `Progress: ${answered.length} / 3 answered`;
    }
}


const correctAnswers = {
    q1: 'a',
    q2: 'a',
    q3: 'b',
    q4: 'a',
    q5: 'b'
};

let timerInterval = null;
let timeLeft = 60;
let quizSubmitted = false;

function startTimer() {
    const timerEl = document.getElementById('time');
    if (!timerEl) return;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;

        if (timeLeft <= 10) {
            timerEl.style.color = '#e53935';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!quizSubmitted) {
                checkQuiz(true);
            }
        }
    }, 1000);
}

function checkQuiz(timeUp = false) {
    if (quizSubmitted) return;
    quizSubmitted = true;
    clearInterval(timerInterval);

    let score = 0;
    const total = Object.keys(correctAnswers).length;

    for (const [q, correct] of Object.entries(correctAnswers)) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === correct) {
            score++;
        }
    }

    const result = document.getElementById('result');
    if (!result) return;

    const percent = Math.round((score / total) * 100);
    let emoji = percent >= 80 ? '🎉' : percent >= 60 ? '👍' : '📚';

    result.innerHTML = `
        ${emoji} ${timeUp ? '<span style="color:#e53935;">Time\'s up!</span> — ' : ''}
        Your Score: <strong>${score} / ${total}</strong> (${percent}%)
        <br><small style="font-weight:normal; color:#555;">${
            percent >= 80 ? 'Excellent work!' : percent >= 60 ? 'Good job, keep studying!' : 'Keep practicing!'
        }</small>
    `;
    result.style.display = 'block';

    document.querySelectorAll('.quiz-option input').forEach(input => {
        input.disabled = true;
    });
}


window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('time')) {
        startTimer();
    }
});


const story = [
    { icon: "fa-owl", title: "Nico the Night Owl", text: "Nico was a little owl who loved watching the stars." },
    { icon: "fa-moon", title: "Quiet Forest", text: "Every night, he flew silently through the trees, listening to the wind." },
    { icon: "fa-eye", title: "Curious Eyes", text: "He noticed things others missed: glowing mushrooms, sleepy foxes, and hidden paths." },
    { icon: "fa-star", title: "A Bright Idea", text: "One night Nico realized that even in darkness, there is beauty to be found." },
    { icon: "fa-heart", title: "Nighttime Joy", text: "He hooted happily, knowing that being different made him special." }
];

let storyIndex = 0;

function updateStory() {
    const titleEl = document.getElementById("storyTitle");
    const textEl = document.getElementById("storyText");
    const iconEl = document.getElementById("storyIcon");
    if (!titleEl) return;

    titleEl.innerText = story[storyIndex].title;
    textEl.innerText = story[storyIndex].text;
    iconEl.innerHTML = `<i class="fas ${story[storyIndex].icon}"></i>`;
}

function nextStory() {
    if (storyIndex < story.length - 1) {
        storyIndex++;
        updateStory();
    } else {
        alert("End of Nico's story! 🦉");
    }
}

function prevStory() {
    if (storyIndex > 0) {
        storyIndex--;
        updateStory();
    }
}

function closeStory() {
    const overlay = document.getElementById("storyOverlay");
    if (overlay) overlay.style.display = "none";
}
