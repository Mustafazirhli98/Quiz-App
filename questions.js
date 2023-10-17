function Question(questionText, answers, correctAnswer) {
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}
Question.prototype.checkTheAnswer = function (userAnswer) {
    return userAnswer === this.correctAnswer
}
let data = [
    new Question("1-Hangisi bir Frontend Dilidir?", { a: "Javascript", b: "Angular", c: ".Net", d: "C++" }, "a"),
    new Question("2-Hangi framework Javascript temellidir?", { a: "Spring", b: ".Net", c: "React", d: "Symfony" }, "c"),
    new Question("3-Hangi metot sayesinde dizi içerisindeki tüm elemanlar işlemden geçer ve çıktı dizi halinde döner?", { a: "trim()", b: "forEach()", c: "pop()", d: "map()" }, "d"),
    new Question("4-Javascript'te bir dizi içerisindeki elemanlar hangi index numarasından başlar?", { a: "1", b: "0", c: "2", d: "-1" }, "b"),
]
