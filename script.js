let btnStart = document.querySelector(".btn-start");
let btnNext = document.querySelector(".btn-next");
let optionList = document.querySelector(".option-list");
let amountDiv = document.querySelector(".question-amount")
let scoreBox = document.querySelector(".score-box")
let cardBox = document.querySelector(".card-box")
let result = document.querySelector(".result")
let btnReplay= document.querySelector(".btn-replay")
let btnFinish= document.querySelector(".btn-finish")


let amountOfCorrects = 0

// Soru oluşturma constructor'ı başlangıç
function Question(questionText, answers, correctAnswer) {
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}
Question.prototype.checkTheAnswer = function (userAnswer) {
    return userAnswer === this.correctAnswer
}
// Soru oluşturma constructor'ı başlangıç

let data = [
    new Question("1-Hangisi bir Frontend Dilidir?", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
    new Question("2-Hangi framework Javascript temellidir?", { a: "Spring", b: ".Net", c: "React", d: "Symfony" }, "c"),
    new Question("3-Hangi metot sayesinde dizi içerisindeki tüm elemanlar işlemden geçer ve çıktı dizi halinde döner?", { a: "trim()", b: "forEach()", c: "pop()", d: "map()" }, "d"),
    new Question("4-Javascript'te bir dizi içerisindeki elemanlar hangi index numarasından başlar?", { a: "1", b: "0", c: "2", d: "-1" }, "b"),
]

//Quiz oluşturma constructor'ı başlangıç. 

function Quiz(item) {
    this.questions = item;
    this.questionIndex = 0;
}
Quiz.prototype.bringQuestion = function () {
    return this.questions[this.questionIndex]
}

// Aşağıda data parametresini vererek quiz isimli objeyi oluşturuyoruz.
let quiz = new Quiz(data)

//Quiz oluşturma constructor'ı bitiş


btnStart.addEventListener("click", () => {
    cardBox.classList.add("active");
    nextQuestion(quiz.bringQuestion())
    questionAmount(quiz.questionIndex + 1, quiz.questions.length)

})

btnNext.addEventListener("click", () => {
    if (quiz.questions.length !== quiz.questionIndex + 1) {
        quiz.questionIndex += 1
        nextQuestion(quiz.bringQuestion())
        questionAmount(quiz.questionIndex + 1, quiz.questions.length)
    } else {
        scoreBox.classList.add("active");
        cardBox.classList.remove("active")
        btnStart.classList.add("d-none")
        showResult(amountOfCorrects, quiz.questions.length)
        console.log("quiz bitti")
    }

})

btnFinish.addEventListener("click", function () {
    window.location.reload();
})
btnReplay.addEventListener("click", function() {
    btnStart.click()
})

const nextQuestion = (item) => {
    btnNext.classList.remove("active")
    let question = `
    <span>${item.questionText}</span>`;
    let option = '' //Bu değişkenin içini for döngüsü ile dolduracağız. Çünkü aynı anda yazdırılması gereken birden fazla şık var.

    for (answer in item.answers) {
        option += `
        <div class = "option">
         <span><b>${answer}</b>:${item.answers[answer]}</span>
        </div>
       `
    }
    document.querySelector(".question-text").innerHTML = question;
    optionList.innerHTML = option;

    let optionListChildren = optionList.querySelectorAll(".option");

    for (children of optionListChildren) {
        children.setAttribute("onclick", "optionSelected(this)")
        children.classList.add("flex"); //Burada her bir şık kutucuğunun içi flex sınıfıyla düzenleniyor. Aşağıda eklenen iconun kutucukta sağda kalması için.
    }
}


const optionSelected = (item) => {
    let userAnswer = item.querySelector("span b").textContent;
    let currentQuestion = quiz.bringQuestion();

    if (currentQuestion.checkTheAnswer(userAnswer)) {
        amountOfCorrects += 1
        item.classList.add("correct");
        markCorrectAnswer()
    } else {
        item.classList.add("incorrect");
        markCorrectAnswer();
    }


    for (let i = 0; i < optionList.children.length; i++) {
        optionList.children[i].classList.add("disabled");
    }
    btnNext.classList.add("active");

    // Doğru-Yanlış iconlarının eklendiği yer.
    let correctIcon = `<i class="fa fa-check"></i>`
    let incorrectIcon = `<i class="fa fa-times"></i>`

    if (item.classList.contains("correct")) {
        item.insertAdjacentHTML("beforeend", correctIcon)
    } else item.insertAdjacentHTML("beforeend", incorrectIcon)

}

const markCorrectAnswer = () => {
    let correctAnswerOfCurrent = quiz.bringQuestion().correctAnswer;
    let options = optionList.querySelectorAll(".option")

    for (let i = 0; i < options.length; i++) {
        if (options[i].querySelector("span b").textContent === correctAnswerOfCurrent) {
            options[i].classList.add("correct");
        }
    }
}

const questionAmount = (current, amount) => {
    let amountElement = `<span>${current}/${amount}</span>`;
    amountDiv.innerHTML = amountElement;
}



const showResult = (correctAnswerss, totalQuestion) => {
    let tag = `<span><b>Doğru sayısı:</b>${correctAnswerss}    <b>Yanlış sayısı:</b>${totalQuestion}</span>`;
    result.innerHTML = tag
}
