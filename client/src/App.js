import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Screen1 from './components/Screen1';
import AddNode from './components/AddNode';
import DeleteNode from './components/DeleteNode';
import AddRelationship from './components/AddRelationship';
import DeleteRelationship from './components/Deleterelationship';
import GetImpacted from "./components/GetImpacted";
import GetDependent from "./components/GetDependent";
import Graph from './components/Graph'

function App() {
  return (
    <div className="App ht">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/HomePage" element={<HomePage />} />        
        <Route exact path="/Graph" element={<Graph />} />
        <Route exact path="/Screen1" element={<Screen1 />} />
        <Route exact path="/AddNode" element={<AddNode />} />
        <Route exact path="/DeleteNode" element={<DeleteNode />} />
        <Route exact path="/AddRelationship" element={<AddRelationship />} />
        <Route exact path="/DeleteRelationship" element={<DeleteRelationship />} />
        <Route exact path="/GetImpacted" element={<GetImpacted />} />
        <Route exact path="/GetDependent" element={<GetDependent />} />
        
      </Routes>
    </div>
  );
}

export default App;
