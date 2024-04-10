import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SeleccionArea from './SeleccionArea';
import SeleccionMesaNoFumadores from './SeleccionMesaNoFumadores';
import SeleccionMesaFumadores from './SeleccionMesaFumadores';
import TomarOrden from './TomarOrden';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/seleccion-area" element={<SeleccionArea />} />
        <Route path="/seleccion-mesa-no-fumadores" element={<SeleccionMesaNoFumadores />} />
        <Route path="/seleccion-mesa-fumadores" element={<SeleccionMesaFumadores />} />
        <Route path="/tomar-orden" element={<TomarOrden />} />
        {/* Puedes seguir agregando rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;