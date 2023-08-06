import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

interface ToggleContext {
  count: number;
}

type ToggleEvents = { type: "TOGGLE" };

const toggleMachine = createMachine<ToggleContext, ToggleEvents>({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
  predictableActionArguments: true,
});

function App() {
  const [current, send] = useMachine(toggleMachine);
  const active = current.matches("active");
  const { count } = current.context;

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => send({ type: "TOGGLE" })}>
          count is {count}
          Click me ({active ? "✅" : "❌"})
        </button>
      </div>
    </>
  );
}

export default App;
