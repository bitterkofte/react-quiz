const ProgressBar = ({ currentQ, numQuestions, points, maxPossiblePoints, selection }) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={currentQ + Number(selection !== null)} />

      <p>
        Question <strong>{currentQ + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  )
}
export default ProgressBar