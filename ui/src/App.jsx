import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css'; 
import ExampleOne from './pages/ExampleOne'; 
import ExampleTwo from './pages/ExampleTwo'; 


function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define the route for ExampleOne */}
          <Route path="/" element={<ExampleOne />} />
          
          {/* Define the route for ExampleTwo */}
          <Route path="/example-two" element={<ExampleTwo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

