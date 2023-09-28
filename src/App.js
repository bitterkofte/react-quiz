import React, { useEffect, useReducer } from "react";
// import DateCounter from "./DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active',, 'finished'
  status: "loading",
  currentQ: 0,
  selection: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newSelection":
      const theQ = state.questions.at(state.currentQ);
      return {
        ...state,
        selection: action.payload,
        points:
          action.payload === theQ.correctOption
            ? state.points + theQ.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, currentQ: state.currentQ + 1, selection: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        selection: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...state, status: "ready", points: 0, currentQ: 0 };

    case "time":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unexpected Action!");
  }
};

const App = () => {
  const [
    {
      status,
      questions,
      currentQ,
      selection,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              currentQ={currentQ}
              numQuestions={questions.length}
              points={points}
              maxPossiblePoints={questions.reduce(
                (acc, curr) => acc + curr.points,
                0
              )}
              selection={selection}
            />
            <Question
              question={questions.at(currentQ)}
              dispatch={dispatch}
              selection={selection}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              {selection !== null && (
                <NextButton
                  currentQ={currentQ}
                  dispatch={dispatch}
                  numQuestions={questions.length}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={questions.reduce(
              (acc, curr) => acc + curr.points,
              0
            )}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
