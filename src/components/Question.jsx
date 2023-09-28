import Options from "./Options"

const Question = ({ question, dispatch, selection }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} selection={selection} />
    </div>
  )
}
export default Question