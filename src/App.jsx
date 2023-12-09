import { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  // useRef
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()~{}[]:<>?+=-";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numberAllowed, charAllowed, length, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    toast.success("Password Copied");
  }, [password]);

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
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          title="generated password will be here"
          value={password}
        />
        <div className="d-flex mt-4 gap-4">
          <input
            type="range"
            min={6}
            max={100}
            id="range"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="range">Length : {length}</label>
        </div>

        <div className="d-flex align-items-center gap-4 mt-4">
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id="number"
              className=""
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            <label htmlFor="number"> Number</label>
          </div>

          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id="character"
              onChange={() => setCharAllowed(!charAllowed)}
            />
            <label htmlFor="character">Character</label>
          </div>
        </div>
        <button
          className="w-100 p-2 btn btn-primary mt-2"
          onClick={copyToClipBoard}
        >
          Copy
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
