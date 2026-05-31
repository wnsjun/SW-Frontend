import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import HabitList from './pages/HabitList';
import HabitForm from './pages/HabitForm';
import History from './pages/History';
import Statistics from './pages/Statistics';

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
          <Route path="/habits/new" element={<HabitForm />} />
          <Route path="/habits/edit/:id" element={<HabitForm />} />
          <Route path="/history" element={<History />} />
          <Route path="/stats" element={<Statistics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
