import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import HabitList from './pages/HabitList';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/habits" element={<HabitList />} />
          <Route path="/habits/edit/:id" element={<div />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
