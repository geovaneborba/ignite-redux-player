import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { Player } from "./pages/Player";

function App() {
  return (
    <ReduxProvider store={store}>
      <Player />
    </ReduxProvider>
  );
}

export default App;
