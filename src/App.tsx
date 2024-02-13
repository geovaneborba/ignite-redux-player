import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <ReduxProvider store={store}>
      <></>
    </ReduxProvider>
  );
}

export default App;
