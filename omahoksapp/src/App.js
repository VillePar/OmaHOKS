import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import {useDropzone} from 'react-dropzone'
import MainLogo from './omaLogo';

const OmaHoks = () => {
  const [liiketoiminta, setLiiketoiminta] = useState();
  const [opinnot, setOpinnot] = useState([])
  
  const [originalX, setOriginalX] = useState(0)
  const [originalY, setOriginalY] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [currentY, setCurrentY] = useState(0)

  const handleStart = (e, data) => {
    setOriginalX(data.x)
    setOriginalY(data.y)
  }
  
  const handleStop = (event, data) => {
    setCurrentX(originalX)
    setCurrentY(originalY)
  }
  
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


  const studiesToDrag = () => {
    return(
      <div style={{overflowY: 'scroll', overflowX: 'hidden', border: '1px solid black', position: 'absolute', top: 100, right:698, bottom: 2, left: 2 }}>
        {opinnot.map((osa) => {
          if(osa.required)
            return(
              <Draggable
              onStart={handleStart}
              onStop={handleStop} 
              position={{x: currentX, y: currentY}}
              key={osa.id}>
                <div style={{width: '92%', height: '10%', backgroundColor: '#4d9be6', margin:'5px', textAlign:'center', fontSize:'10px', border: '1px solid black'}} 
                >{osa.name} {osa.points} op</div>
              </Draggable>
            )
              
          else {
            return(
              <Draggable
              onStart={handleStart}
              onStop={handleStop} 
              position={{x: currentX, y: currentY}}
              key={osa.id}>
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
      <MainLogo tutkinto={liiketoiminta?.data.tutkinto.name}/>
      {studiesToDrag()}
      </div>
  )
}
 
export default OmaHoks;