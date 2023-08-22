import Homepage from "./pages/Homepage";
import "/node_modules/primeflex/primeflex.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

function App() {
  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;
