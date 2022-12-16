import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import {useDropzone} from 'react-dropzone'
import logo from './logo.png'

const OmaHoks = () => {
  const [liiketoiminta, setLiiketoiminta] = useState();
  const [opinnot, setOpinnot] = useState([])
 
  const setValues = async () => {
    try {
      const response = await axios.get('http://localhost:3020/eperuste');
      setLiiketoiminta(response.data)
      setOpinnot(response.data.data.tutkinnon_osat.tutkinnon_osat)
        
    } catch (error) {
      if (error.response){
        console.log(error.response.data)
      }

    }

  }
  
  useEffect(() => {
    setValues();
  }, [])

  const mainLogo = () => {
    return (
      <div style={{backgroundColor:'#003777',border:'2px solid black', position: 'absolute', top:-20, left: -1, right: -1}}>
        <h3 style={{color:'lightGrey'}}><img src={logo} width={50}/>{liiketoiminta?.data.tutkinto.name} </h3>
      </div>
    )
  }

  const studiesToDrag = () => {
    return(
      <div style={{overflow: 'scroll', border: '1px solid black', position: 'absolute', top: 100, right:698, bottom: 2, left: 2 }}>
        
    {opinnot.map((osa) => {
      if(osa.required)
      return(
       <Draggable key={osa.id}>
          <div style={{width: '92%', height: '10%', backgroundColor: '#4d9be6', margin:'5px', textAlign:'center', fontSize:'10px', border: '1px solid black'}} 
            >{osa.name} {osa.points} op</div>
        </Draggable>
      )
      else {
        return(
          <Draggable key={osa.id}>
            <div style={{width: '92%', height: '10%', backgroundColor: 'lightgreen', margin:'5px', textAlign:'center', fontSize:'10px', border: '1px solid black'}}
            >{osa.name} {osa.points} op</div>
          </Draggable>
        )
      }
     })
    }
    </div>
    )
  }

  return(
    <div>
      <h4 style={{position: 'absolute', top: 60, left: 25}}>Tutkinnon osat</h4>
      <>
        {mainLogo()}
        {studiesToDrag()}
      </>
    </div>
  )
}
 
export default OmaHoks;