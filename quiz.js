function Quiz(item) {
    this.questions = item;
    this.questionIndex = 0;
}
Quiz.prototype.bringQuestion = function () {
    return this.questions[this.questionIndex]
}