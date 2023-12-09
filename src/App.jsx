import { useCallback, useEffect, useState } from "react";
import "./App.css";
function App() {
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()~{}[]:<>?+=-";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numberAllowed, charAllowed, length, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, charAllowed, length, passwordGenerator]);
  return (
    <div className="w-full bg-dark vh-100 text-white">
      <h1 className="text-center pt-2">Password Generator</h1>

      <div className="mb-3 w-25 mx-auto">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Your password
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          value={password}
        />

        <div className="d-flex justify-content-center mt-4 gap-4">
          <input
            type="range"
            min={6}
            max={100}
            id="range"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="range">Length : {length}</label>
        </div>

        <div className="d-flex align-items-center gap-4 justify-content-center mt-4">
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id="number"
              className=""
              onChange={() => setNumberAllowed(true)}
            />
            <label htmlFor="number"> Number</label>
          </div>

          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id="character"
              onChange={() => setCharAllowed(true)}
            />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
