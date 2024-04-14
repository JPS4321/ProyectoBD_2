import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SeleccionArea from './SeleccionArea';
import SeleccionMesaNoFumadores from './SeleccionMesaNoFumadores';
import SeleccionMesaFumadores from './SeleccionMesaFumadores';
import TomarOrden from './TomarOrden';
import RevisarOrden from './RevisarOrden';
import CerrarFactura from './CerrarFactura';
import FormaDePago from './FormaDePago';
import Review from './Review';
import Opciones from './Opciones';
import Reportes from './Reportes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/seleccion-area" element={<SeleccionArea />} />
        <Route path="/seleccion-mesa-no-fumadores" element={<SeleccionMesaNoFumadores />} />
        <Route path="/seleccion-mesa-fumadores" element={<SeleccionMesaFumadores />} />
        <Route path="/tomar-orden" element={<TomarOrden />} />
        <Route path="/revisar-orden" element={<RevisarOrden />} />
        <Route path="/cerrar-factura" element={<CerrarFactura />} />
        <Route path="/pago" element={<FormaDePago />} />
        <Route path="/review" element={<Review />} />
        <Route path="/opciones" element={<Opciones />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
};

export default App;
