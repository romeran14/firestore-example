
import './App.css';
import React,{useState, useEffect} from 'react'
import  store  from './firebaseconf'
import { collection, addDoc, getDocs, deleteDoc, doc , getDoc, updateDoc} from "firebase/firestore"
import { async } from '@firebase/util';


function App() {
  const [idusuario, setId] = useState('')
  const[nombre, setNombre] = useState('')
  const[phone, setPhone] = useState('')
  const[error, setError] = useState('')
  const[usuarioagenda, setUsuariosAgenda] = useState([])
  const[modoEdicion, setModoedicion] = useState(null)

  useEffect( ()=>{
        const getUsuarios = async ()=>{
          const { docs} = await getDocs(collection(store, 'agenda'))
          
          const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
          setUsuariosAgenda(nuevoArray)
          console.log(nuevoArray)
        }
        getUsuarios()
  },[])

  const setUsuarios = async (e) => {
    e.preventDefault()
    if(!nombre.trim()){
      setError('El campo nombre esta vacio')
    }
   else if(!phone.trim()){
      setError('El campo phone esta vacio')
    } 
    const usuario = {
      nombre: nombre,
      telefono: phone
    }
    /*
    try{
       const data = await store.collection('agenda').addDoc(usuario)
       console.log('tarea anadida')
    }catch(e){
      console.log(e)
    }*/

    try {
      console.log("try ");
      const docRef = await addDoc(collection(store, "agenda"), (usuario));
      console.log(docRef);
      console.log("Document written with ID: ", docRef.id);
      const { docs} = await getDocs(collection(store, 'agenda'))
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
      alert('usuario añadido')
      setNombre('')
      setPhone('')

    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNombre('')
    setPhone('')
  
  }
  const BorrarUsuarios = async (id) => {
    try{
      //await store.collection('agenda').doc(id).delete()
      await deleteDoc(doc(store,'agenda',id))
      const { docs} = await getDocs(collection(store, 'agenda'))
          
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
    }catch(e){
      console.log(e)
    }
  }
  const pulsarActualizar = async (id)=>{
     try{
      const data = await getDoc(doc(store,'agenda', id))
      console.log(data.data())
      const { idusuario,  nombre ,telefono} = data.data()
      console.log(nombre)
      setNombre( nombre )
      setPhone (telefono)
      setId(id)
      setModoedicion(true)
      console.log(telefono)

     }catch(e){
       console.log(e)
     }

  }

  const setUpdate= async (e) =>{
    e.preventDefault()
    if(!nombre.trim()){
      setError('El campo nombre esta vacio')
    }
   else if(!phone.trim()){
      setError('El campo phone esta vacio')
    } 
    const userUpdate = {
      nombre: nombre,
      telefono: phone
    }
    
     
    try{
      const  userDoc = doc(store,'agenda',idusuario)
      await updateDoc(userDoc, userUpdate)
      const { docs} = await getDocs(collection(store, 'agenda'))
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
    }catch(e){
      console.log(e)
    }
    setNombre('')
    setPhone('')
    setModoedicion(false)
    setId('')
  }

  return (
    <div className="App">
      <div className="container">
      <div className="row">
     <div className="col">
       <h2>Formulario de Usuario</h2>
       <form onSubmit={modoEdicion ? setUpdate : setUsuarios} className='form-group' >
         <input onChange={(e) => {setNombre(e.target.value)}} value={nombre} className='form-control' type="text" placeholder='Introduce el nombre'  />
         <input onChange={(e) => {setPhone(e.target.value)}} value={phone} className='form-control mt-3' type="text" placeholder='Introduce el numero'  />
         
         {
           modoEdicion ? (
            <input type="submit" value='Editar' className='btn btn-dark btn-block mt-3'/>
           )
           :
           (
            <input type="submit" value='Registrar' className='btn btn-dark btn-block mt-3'/>
           )

  
         }

        
         {
           error? (
             <div>{error}</div>
           )
           :
           (<span></span>)
         }
       </form>
     </div>
     <div className="col">
       <h2>Lista de tu agenda</h2>
       <ul className='list-group'>
       {
         usuarioagenda.length !== 0 ? 
         (usuarioagenda.map(item => (
           <li className='list-group-item' key={item.id} > {item.nombre}--{item.telefono}
           <button onClick={(id)=>BorrarUsuarios(item.id)} className='btn btn-danger float-right' >Borrar</button>
           <button onClick={(id)=>pulsarActualizar(item.id)} className='btn btn-info float-right' >Actualizar</button>
           </li>
         )))
         :
         (<span>No hay tareas</span>)
       }
       </ul>
     </div>

    </div>
    </div>
    </div>
  );
}

export default App;
