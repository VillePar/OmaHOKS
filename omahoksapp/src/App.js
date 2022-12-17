import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
//import Draggable from 'react-draggable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MainLogo from './omaLogo';
import './styles.css'

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

  const onDragEnd = (result) => {
    if(!result.destination) {
      return
    }
  }
  
  const StudiesToDrag = ({list1}) => {
  
    return (
    <div style={{overflowY:'scroll', overflowX: 'hidden', border: '1px solid black',width: '18%' ,position: 'absolute', top: 100, bottom: 2, left: 2 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId=''>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} >
              {list1.map((osa, index) => (
                <Draggable key={osa.id} draggableId={osa.id.toString()} index={index} >
                  {(provided) => (
                    <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div style={{width: '92%', height: '30px', backgroundColor: 'lightblue', margin:'5px', textAlign:'center', fontSize:'10px', border: '1px solid black'}}>
                    {osa.name} {osa.points} op
                    </div>
              </div>
                )}
                </Draggable>
              ))}
          {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
    )
  }
  
    return(
    <div style={{display: 'flex'}}>
      <h4 style={{position: 'absolute', top: 60, left: 5}}>Tutkinnon osat</h4>
      <MainLogo tutkinto={liiketoiminta?.data.tutkinto.name}/>
      <StudiesToDrag list1={opinnot}/>
      </div>
  )
}
 
export default OmaHoks;