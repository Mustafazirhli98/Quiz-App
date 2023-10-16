btnStart = document.querySelector(".btn-start");
btnNext = document.querySelector(".btn-next")

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
    new Question("2-Hangisi bir Frontend Dilidir", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
    new Question("3-Hangisi bir Frontend Dilidir", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
    new Question("4-Hangisi bir Frontend Dilidir", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
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
    if (quiz.questionIndex < quiz.questions.length -1) {
        quiz.questionIndex += 1
        nextQuestion(quiz.bringQuestion())
    } else console.log("quiz bitti")
})

const nextQuestion = (questions) => {
    let question = `
    <span>${questions.questionText}</span>`;
    let option = '' //Bu değişkenin içini for döngüsü ile dolduracağız. Çünkü aynı anda yazdırılması gereken birden fazla şık var.

    for (answer in questions.answers) {
        option += `
        <div class = "option">
         <span><b>${answer}</b>${questions.answers[answer]}</span>
        </div>
       `
    }
    document.querySelector(".question-text").innerHTML = question;
    document.querySelector(".option-list").innerHTML = option;
}



//Question constructor'ı ile farklı sorular ve cevaplarını içeren objeler oluşturabilirim.,
//Quiz constructor'ı ile de bu soru ve cevapları yönetebilirim.