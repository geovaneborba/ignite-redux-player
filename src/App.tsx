import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { Player } from "./pages/Player";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./lib/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <Player />
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default App;
