document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const customizeButton = document.getElementById('customize');
    const modal = document.getElementById('customization-modal');
    const closeModal = document.querySelector('.close');
    const saveQuizButton = document.getElementById('save-quiz');
    const quizJsonTextarea = document.getElementById('quiz-json');

    let quizData = [];

    // Load quiz from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    if (quizParam) {
        try {
            quizData = JSON.parse(decodeURIComponent(quizParam));
            loadQuiz();
        } catch (e) {
            console.error('Invalid quiz data in URL');
        }
    }

    function loadQuiz() {
        quizContainer.innerHTML = '';
        quizData.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <h3>${index + 1}. ${question.question}</h3>
                ${question.answers.map((answer, i) => `
                    <label>
                        <input type="radio" name="question${index}" value="${i}">
                        ${answer}
                    </label><br>
                `).join('')}
            `;
            quizContainer.appendChild(questionElement);
        });
    }

    submitButton.addEventListener('click', () => {
        let score = 0;
        quizData.forEach((question, index) => {
            const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedAnswer && selectedAnswer.value == question.correctAnswer) {
                score++;
            }
        });
        alert(`You scored ${score} out of ${quizData.length}`);
    });

    customizeButton.addEventListener('click', () => {
        modal.style.display = 'block';
        quizJsonTextarea.value = JSON.stringify(quizData, null, 2);
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    saveQuizButton.addEventListener('click', () => {
        try {
            const newQuizData = JSON.parse(quizJsonTextarea.value);
            quizData = newQuizData;
            loadQuiz();
            const quizString = encodeURIComponent(JSON.stringify(quizData));
            window.history.replaceState({}, '', `?quiz=${quizString}`);
            modal.style.display = 'none';
        } catch (e) {
            alert('Invalid JSON format');
        }
    });
});