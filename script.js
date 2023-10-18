//#region variables
let variables = new Variables()
let quiz = new Quiz(data);
let amountOfCorrects = 0;
let amountOfFalses = 0;
let correctIcon = `<i class="fa fa-check"></i>`
let incorrectIcon = `<i class="fa fa-times"></i>`
//#endregion

//#region EventListener
variables.btnStart.addEventListener("click", () => {
    timeLine()
    setTime(10)
    variables.cardBox.classList.add("active");
    nextQuestion(quiz.bringQuestion())
    questionAmount(quiz.questionIndex + 1, quiz.questions.length)

})

variables.btnNext.addEventListener("click", () => {

    variables.remainingTime.innerHTML = ""
    clearInterval()
    timeLine()
    clearInterval(counterRemainingTime)
    setTime(10)
    if (quiz.questions.length !== quiz.questionIndex + 1) {
        quiz.questionIndex += 1;
        nextQuestion(quiz.bringQuestion())
        questionAmount(quiz.questionIndex + 1, quiz.questions.length)
    } else {
        variables.scoreBox.classList.add("active");
        variables.cardBox.classList.remove("active")
        variables.btnStart.classList.add("d-none")
        showResult(amountOfCorrects, amountOfFalses)
    }

})

variables.btnFinish.addEventListener("click", function () {
    window.location.reload();
})
variables.btnReplay.addEventListener("click", function () {
    quiz.questionIndex = 0;
    variables.btnStart.click();
    variables.scoreBox.classList.remove("active")
})
//#endregion

//#region function => to create questions and answers.
const nextQuestion = (item) => {
    clearInterval(counterRemainingTime);
    setTime(10)
    variables.btnNext.classList.remove("active")
    let question = `
    <span>${item.questionText}</span>`;
    let option = '' //Bu değişkenin içini for döngüsü ile dolduracağız. Çünkü aynı anda yazdırılması gereken birden fazla şık var.
    for (answer in item.answers) {
        option += `
        <div class = "option">
         <span><b>${answer}</b>:${item.answers[answer]}</span>
        </div> `}

    document.querySelector(".question-text").innerHTML = question;
    variables.optionList.innerHTML = option;
    let optionListChildren = variables.optionList.querySelectorAll(".option");

    for (children of optionListChildren) {
        children.setAttribute("onclick", "optionSelected(this)") // Burada option içinde oluşturduğum elementin kendisini optionSelected fonksiyonuna gönderiyoruz. Böylelikle gönderdiğimiz fonksiyonda şık seçildikten sonraki işlemleri düzenlicez.
        children.classList.add("flex"); //Burada her bir şık kutucuğunun içi flex sınıfıyla düzenleniyor. Aşağıda eklenen iconun kutucukta sağda kalması için.
    }
}
//#endregion

//#region  function => when you select an option
const optionSelected = (item) => {
    clearInterval(counterLineWidth)
    clearInterval(counterRemainingTime)

    let userAnswer = item.querySelector("span b").textContent;
    let currentQuestion = quiz.bringQuestion();

    if (currentQuestion.checkTheAnswer(userAnswer)) {
        amountOfCorrects += 1
        markCorrectAnswer()
    } else {
        amountOfFalses += 1
        item.classList.add("incorrect"); //Doğrunun aksine yanlış cevabı yalnızca seçtiğimiz zaman işaretliyoruz.
        markCorrectAnswer();
    }
    for (let i = 0; i < variables.optionList.children.length; i++) { //buradaki amaç bir şık seçilince tüm şıkları disabled etmek.
        variables.optionList.children[i].classList.add("disabled");
    }
    variables.btnNext.classList.add("active");
    if (!item.classList.contains("correct")) {
        item.insertAdjacentHTML("beforeend", incorrectIcon) //Burada yalnızca incorrectIcon ekledik çünkü correctIcon eklemek için zaten markCorrectAnswer adlı fonksiyon aşağıda mevcut.
    } 
}
//#endregion

//#region function => to give an background to correct answer
const markCorrectAnswer = () => { // Bu fonksiyonun her halukarda çalışması gerekli.Çünkü yanlış cevabı seçince de doğrusunu işaretliyoruz.
    let correctAnswerOfCurrent = quiz.bringQuestion().correctAnswer;
    let options = variables.optionList.querySelectorAll(".option")

    for (let i = 0; i < options.length; i++) {
        if (options[i].querySelector("span b").textContent === correctAnswerOfCurrent) {
            options[i].classList.add("correct");
            options[i].insertAdjacentHTML("beforeend", correctIcon);
        }
    }
}
//#endregion

//#region function => to see which question you see
const questionAmount = (current, amount) => {
    let amountElement = `<span>${current}/${amount}</span>`;
    variables.amountDiv.innerHTML = amountElement;
}
//#endregion

//#region function => to show your result
const showResult = (correctAnswerss, falseAnswers) => {
    let tag = `<span><b>Doğru sayısı:</b>${correctAnswerss}    <b>Yanlış sayısı:</b>${falseAnswers}</span>`;
    variables.result.innerHTML = tag
}
//#endregion

//#region timing Functions
let counterRemainingTime;
const setTime = (time) => {
    counterRemainingTime = setInterval(() => {
        variables.remainingTime.textContent = time;
        time--
        if (time < 0) {
            clearInterval(counterRemainingTime)
            let options = variables.optionList.querySelectorAll(".option");
            let correctOption = quiz.bringQuestion().correctAnswer
            for (let option of options) {
                if (option.querySelector("span b").textContent === correctOption) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", correctIcon)
                    option.classList.add("disabled")
                    variables.btnNext.classList.add("active")
                }
            }
        }
    }, 1000);
}


let counterLineWidth;
const timeLine = () => {
    let lineWidth = 0;
    counterLineWidth = setInterval(() => {
        lineWidth += 1;
        variables.line.style.width = lineWidth + "px";
        if (lineWidth > 527) {
            clearInterval(counterLineWidth);
        }
    }, 21);
};
//#endregion