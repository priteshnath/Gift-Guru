import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from "./Screens/WelcomePage";
import ChatPage from "./Screens/ChatPage";
import PageNotFound from './Screens/PageNotFound';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
