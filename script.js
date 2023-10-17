let btnStart = document.querySelector(".btn-start");
let btnNext = document.querySelector(".btn-next");
let optionList = document.querySelector(".option-list");

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
    new Question("1-Hangisi bir Frontend Dilidir", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
    new Question("2-aaa", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
    new Question("3-aaa", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
    new Question("4-aaa", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
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
    document.querySelector(".card-box").classList.add("active");
    nextQuestion(quiz.bringQuestion())
})

btnNext.addEventListener("click", () => {
    if (quiz.questionIndex < quiz.questions.length - 1) {
        quiz.questionIndex += 1
        nextQuestion(quiz.bringQuestion())
    } else console.log("quiz bitti")

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
        item.classList.add("correct");
        markCorrectAnswer()
    } else {
        item.classList.add("incorrect");
        markCorrectAnswer();
    }


    for (let i = 0; i < optionList.children.length; i++) {
        optionList.children[i].classList.add("disabled");
        console.log(optionList.children[i].classList);
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




// correct veya incorrect ikonu eklenecek.

