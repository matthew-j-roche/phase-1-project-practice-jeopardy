const random_url = "http://jservice.io/api/random"
const search = document.querySelector("#search")
const questionContainer = document.querySelector("#question-container")

function fetchJeopardy() {
    fetch(random_url)
    .then(res => res.json())
    .then(data => {
        data.forEach((question) => {
            console.log(question);
            createQuestion(question);
        })
    })
}

function createQuestion(obj) {
    const question = document.createElement('p');
    question.id = "question-text"
    const answer = document.createElement('p');
    answer.id = "answer-text"
    const value = document.createElement('p')
    value.id = "value-text"
    const cat = document.createElement('p');
    cat.id = "cat-text"
    const categoryBox = document.createElement('div')
    categoryBox.className = "category-box"
    const questionBox = document.createElement('div')
    questionBox.className = "question-box"
    cat.textContent = obj.category.title
    value.textContent = `$${obj.value}`
    question.textContent = obj.question;
    answer.textContent = obj.answer;
    categoryBox.appendChild(cat);
    questionBox.appendChild(value);
    questionContainer.appendChild(categoryBox)
    questionContainer.appendChild(questionBox)
    
    questionBox.addEventListener('click', () => {
        const ansBtn = document.createElement('button')
        ansBtn.textContent = "answer"
        questionBox.removeChild(value);
        questionBox.appendChild(question)
        questionBox.appendChild(ansBtn)
        
        ansBtn.addEventListener('click', () => {
            const nextBtn = document.createElement('button')
            nextBtn.textContent = "next question"
            questionBox.removeChild(question)
            questionBox.removeChild(ansBtn)
            questionBox.appendChild(answer)
            questionBox.appendChild(nextBtn)
            
            nextBtn.addEventListener('click', () => {
                questionContainer.removeChild(questionBox)
                questionContainer.removeChild(categoryBox)
                fetchJeopardy();
            })
        })
    })
}

fetchJeopardy();