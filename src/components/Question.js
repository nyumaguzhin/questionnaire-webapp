const Question = ({question, answer, onChangeAnswer}) => {
    const formSubmit = () => {
        console.log("test"); //this.state.selectedOption)
    }

    const onChange = (event) => {
        onChangeAnswer({
            questionId: question.id,
            answerId: event.target.value
          });
        //console.log(event.target.value);
    }

    if (!question) {
        return null;
    }

    return (
        <form onSubmit={formSubmit}>
            <h4 className="question">{question.id}. {question.questionText}</h4>
            { question.options.map(option => {return (
                <div key={"optionDiv"+option.id} className="option">
                    <label className="radioButton">
                        <input
                            type="radio"
                            value={option.id}
                            name={question.id}
                            checked={answer.answerId === option.id}
                            onChange={ onChange }/>
                        {option.answerText}
                    </label>
                </div>
            )})}
        </form>
    )
}
export default Question