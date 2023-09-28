const Options = ({ question, dispatch, selection }) => {
  const hasAnswered = selection !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === selection ? "answer" : ""}
          ${hasAnswered ? index === question.correctOption 
            ? "correct" : "wrong"
            : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newSelection", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
export default Options