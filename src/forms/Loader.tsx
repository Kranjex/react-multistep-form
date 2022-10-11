import { useState, useEffect } from "react";

type LoaderProps = {
  completed: boolean;
  setCompleted: (prev: boolean) => void;
};

export function Loader({ completed, setCompleted }: LoaderProps) {
  const [loading, setLoading] = useState(true);

  const newPromise = new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), 2000);
  }).then(() => setLoading(false));

  return loading ? (
    <div id="outer-loader-container" />
  ) : (
    <div>
      Successful registration
      <button onClick={() => setCompleted(!completed)}>Back</button>
    </div>
  );
}
