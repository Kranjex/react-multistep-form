import { FormEvent, ReactNode, useEffect, useState } from "react";
import "./App.css";
import { useMultistepForm } from "./useMultistepForm";
import { UserForm } from "./forms/UserForm";
import { AddressForm } from "./forms/AddressForm";
import { AccountForm } from "./forms/AccountForm";
import { Loader } from "./forms/Loader";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  zip: string;
  state: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  zip: "",
  state: "",
  email: "",
  password: "",
};

const titles: string[] = ["User info", "Address info", "Account creation"];

function App() {
  const [completed, setCompleted] = useState(false);
  const [data, setData] = useState(INITIAL_DATA);
  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    next,
    back,
    setCurrentStepIndex,
    completedSteps,
  } = useMultistepForm([
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />,
  ]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    setCompleted(true);
  }

  return (
    <div id="form-container">
      <div id="step-index-container">
        {steps.map((step, index) => {
          // @ts-ignore
          // @ts-ignore
          return (
            <>
              <span
                key={"step-indicator-" + index}
                className={
                  currentStepIndex >= index || completedSteps.includes(index)
                    ? "active-step step-indicator"
                    : "step-indicator"
                }
                id={
                  currentStepIndex > index ||
                  completedSteps.includes(index) ||
                  completed
                    ? "completed-step"
                    : ""
                }
              >
                <p
                  onClick={(e) =>
                    setCurrentStepIndex(titles.indexOf(e?.target.textContent))
                  }
                >
                  {titles[index]}
                </p>
              </span>
              <span
                className="step-indicator-line"
                id={
                  currentStepIndex > index || completed
                    ? "active-indicator-line"
                    : ""
                }
              />
            </>
          );
        })}
      </div>
      <form onSubmit={onSubmit}>
        {completed ? (
          <Loader completed={completed} setCompleted={setCompleted} />
        ) : (
          step
        )}
        {!completed && (
          <div id="button-container">
            {!isFirstStep && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
