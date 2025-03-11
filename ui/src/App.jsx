import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import './App.css'; 
import ExampleOne from './pages/ExampleOne'; 
import ExampleTwo from './pages/ExampleTwo'; 
import Props from './reusable-code/props';


function App() {
  return (
    
    <Router>
      {/* test for using props
      <Props />      */}
      <div>
        <Routes>

          {/* "/"  will be the default for startup, so I added this route to take me to first page. */}
          <Route path="/" element={<Navigate to="/chocolate-ice-cream" />} /> {/* Redirect */}

          {/* Define the route for ExampleOne - intentionally naming it somthing completely different so you can see the React routes can have different names.*/}
          <Route path="/chocolate-ice-cream" element={<ExampleOne />} /> 

          {/* Define the route for ExampleTwo - intentionally naming it somthing completely different so you can see the React routes can have different names.*/}
          <Route path="/jolly-ranchers" element={<ExampleTwo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

