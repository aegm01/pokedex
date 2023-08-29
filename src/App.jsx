import "./App.css";
import MyPage from "./components/MyPage";
import { ApiProvider } from "./context/ApiContext";
import { LanguagesProvider } from "./context/LanguagesContext";

function App() {
  return (
    <div className="App">
      <ApiProvider>
        <LanguagesProvider>
          <MyPage />
        </LanguagesProvider>
      </ApiProvider>
    </div>
  );
}

export default App;
