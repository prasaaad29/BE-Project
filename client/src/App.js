import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Screen1 from './components/Screen1';
import AddNode from './components/AddNode';
import AddRelationship from './components/AddRelationship';

function App() {
  return (
    <div className="App ht">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/HomePage" element={<HomePage />} />
        <Route exact path="/Screen1" element={<Screen1 />} />
        <Route exact path="/AddNode" element={<AddNode />} />
        <Route exact path="/AddRelationship" element={<AddRelationship />} />
        
      </Routes>
    </div>
  );
}

export default App;
