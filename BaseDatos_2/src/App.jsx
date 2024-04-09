import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeleccionArea from './SeleccionArea';
import TomaDePedido from './TomaDePedido';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SeleccionArea />} />
        <Route path="/toma-de-pedido" element={<TomaDePedido />} />
      </Routes>
    </Router>
    
  );
};

export default App;
