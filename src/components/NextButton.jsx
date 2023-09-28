const NextButton = ({ dispatch, answer, currentQ, numQuestions }) => {
  // if (answer === null) return null;

  if (currentQ < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (currentQ === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
  )
}
export default NextButton