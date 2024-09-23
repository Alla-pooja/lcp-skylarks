import "./styles/App.css";
import "./styles/Toast.css";

import BaseLayout from "./layouts/BaseLayout";
import Routes from "./routes/Routes";

function App() {
  return (
    <BaseLayout>
      <Routes />
    </BaseLayout>
  );
}

export default App;
