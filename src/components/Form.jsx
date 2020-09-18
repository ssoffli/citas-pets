import React, {Fragment, useState} from 'react'
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types'


const Form = ({crearCita}) => {

    // State para citas

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fechaAlta: '',
        horaAlta: '',
        sintomas: ''
    })

    const [error, actualizarError] = useState (false)

    // fnc update State de valores del form
    const actualizarState = e => {
        actualizarCita({
            ...cita, //copia array con spread op
            [e.target.name]: e.target.value // obtinene todos los values de 'name'
        })
    }

    //extryendo los datos del state para no citar obj.atr (buena practica 👍)
    const {mascota, propietario, fechaAlta, horaAlta, sintomas} = cita;

    const submitCita = e => {
        e.preventDefault() //evita enviar por GET y evita actualizar pagina
        
        // Validar campos vacios 
        if (mascota.trim() === '' ||  propietario.trim() === '' || fechaAlta.trim() === '' || 
        horaAlta.trim() === '' ||sintomas.trim() === ''){
            actualizarError(true)
            return
        }
        actualizarError(false)
        // Dar ID
        cita.id = uuid()
        // Crear cita
        crearCita(cita)
        // Reiniciar Form
        actualizarCita({
            mascota: '',
            propietario: '',
            fechaAlta: '',
            horaAlta: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear citas</h2>
            
            {error ? <p className='alerta-error'> Todos los campos son obligatorios!</p>
            : null}
            
            <form 
                onSubmit={submitCita}
            >
                <label htmlFor="">Nombre de tu mascota</label>
                <input 
                    type='text'
                    name= 'mascota'
                    className = 'u-full-width'
                    placeholder = 'Nombre de la mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                <label htmlFor="">Nombre del dueño</label>
                <input 
                    type='text'
                    name= 'propietario'
                    className = 'u-full-width'
                    placeholder = 'Nombre del propietario'
                    onChange={actualizarState}
                    value={propietario}
                />
                <label htmlFor="">Fecha Alta</label>
                <input 
                    type='date'
                    name= 'fechaAlta'
                    className = 'u-full-width'
                    onChange={actualizarState}
                    value={fechaAlta}
                />
                <label htmlFor="">Hora Alta</label>
                <input 
                    type='time'
                    name= 'horaAlta'
                    className = 'u-full-width'
                    onChange={actualizarState}
                    value={horaAlta}
                />
                <label htmlFor="">Descripcion de Síntomas</label>
                <textarea 
                    name="sintomas"
                    className = 'u-full-width'
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type='submit'
                    className='u-full-width button agregar'
                > Agregar la cita</button>
            </form>
        </Fragment>
     );
}

Form.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Form;