import React, {Fragment, useState, useEffect} from 'react';
import Form from './components/Form';
import Cita from './components/Cita';
import dog from './dog.png';

function App() {
  
  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  
  if (!citasIniciales) {
    citasIniciales = [];
  }
  
  // Array de citas pcpal
  const [citas,guardarCitas] = useState(citasIniciales);
  
  // useEffect para cuando el state cambia, y realizar algunas operaciones
  // es similar a componentDidMount o DidUpdate
  
  useEffect(() => {
    
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas, citasIniciales]);

  const crearCita = cita => {
    guardarCitas([...citas, cita])
  }

  // fnc eliminar cita por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas (nuevasCitas) // usa array auxiliar
  }

  const titulo = citas.length===0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <div className="cabecera">
        <img 
          className=""
          src={dog}
          alt="logo dog"
        />
        <h1>Administrador de Mascotas</h1>
        <img 
          className=""
          src={dog}
          alt="logo dog"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita
                key = {cita.id}
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
