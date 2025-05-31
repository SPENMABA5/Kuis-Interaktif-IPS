const questions = [
    {
        question: "Apa yang dimaksud dengan interaksi sosial?",
        answers: [
            { text: "Hubungan timbal balik antara dua orang atau lebih", correct: true },
            { text: "Kegiatan perdagangan antarnegara", correct: false },
            { text: "Pergantian musim di Indonesia", correct: false },
            { text: "Hubungan antara manusia dan lingkungan", correct: false }
        ]
    },
    {
        question: "Kerajaan Hindu tertua di Indonesia adalah ...",
        answers: [
            { text: "Majapahit", correct: false },
            { text: "Sriwijaya", correct: false },
            { text: "Kutai", correct: true },
            { text: "Tarumanegara", correct: false }
        ]
    },
    {
        question: "Berikut ini yang merupakan contoh interaksi manusia dengan lingkungan adalah ...",
        answers: [
            { text: "Bermain sepak bola di lapangan", correct: false },
            { text: "Menanam pohon di halaman rumah", correct: true },
            { text: "Menonton televisi bersama keluarga", correct: false },
            { text: "Membaca buku di perpustakaan", correct: false }
        ]
    },
    {
        question: "Kenampakan alam berikut yang terbentuk karena tenaga endogen adalah ...",
        answers: [
            { text: "Gunung api", correct: true },
            { text: "Sungai", correct: false },
            { text: "Danau", correct: false },
            { text: "Padang pasir", correct: false }
        ]
    },
    {
        question: "Salah satu dampak positif globalisasi adalah ...",
        answers: [
            { text: "Mudah mendapatkan informasi dari berbagai negara", correct: true },
            { text: "Meningkatnya konsumsi barang impor secara berlebihan", correct: false },
            { text: "Menyebarnya budaya asing tanpa filter", correct: false },
            { text: "Menurunnya rasa cinta produk dalam negeri", correct: false }
        ]
    }
];

const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    intro.style.display = 'none';
    quiz.style.display = 'block';
    resultDiv.style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let q = questions[currentQuestionIndex];
    questionContainer.innerText = `Soal ${currentQuestionIndex + 1}: ${q.question}`;
    q.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.innerText = answer.text;
        btn.classList.add('btn');
        btn.onclick = () => selectAnswer(answer, btn);
        answerButtons.appendChild(btn);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer, btn) {
    const correct = answer.correct;
    if (correct) {
        btn.style.background = '#388e3c';
        score++;
    } else {
        btn.style.background = '#c62828';
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (questions[currentQuestionIndex].answers.find(a => a.text === button.innerText).correct) {
            button.style.background = '#388e3c';
        }
    });
    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quiz.style.display = 'none';
    resultDiv.style.display = 'block';
    scoreText.innerText = `Skor Anda: ${score} dari ${questions.length}`;
}

restartBtn.addEventListener('click', () => {
    startQuiz();
});

startBtn.addEventListener('click', () => {
    startQuiz();
});

// Mulai pada tampilan intro