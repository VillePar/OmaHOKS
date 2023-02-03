import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import StudiesToDrag from './draggable';
import MainLogo from './omaLogo';
import './styles.css'
import uuid from 'react-uuid'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const OmaHoks = () => {
  const [tutkinto, setTutkinto] = useState([]);
  const [pakollisetA, setPakollisetA] = useState([])  
  const [valinnaisetA, setValinnaisetA] = useState([])
  const [viestiJaVuorov, setViestiJaVuorov] = useState([])
  const [matem, setMatem] = useState([])
  const [yhteisK, setYhteisK] = useState([])
  const [periods, setPeriods] = useState([])
  const ytoID = [3708881, 3708883, 3708884]
  
  const apiCall = async () => {
    try {
      const response = await axios.get('/liiketoimintaData.json');
      setTutkinto(response.data.tutkinto)
      setPakollisetA(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && ytoID.indexOf(osa.id) === -1))
      setValinnaisetA(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => !osa.required ))
      setViestiJaVuorov(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708881))
      setMatem(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708883))
      setYhteisK(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708884))
      setPeriods({
        ['opinnot']: {
          name: "Tutkinnon osat",
          items: response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => ytoID.indexOf(osa.id) === -1) 
        },
        [uuid()]: {
          name: "Syksy I",
          items: []
        },
        [uuid()]: {
          name: "Syksy II",
          items: []
        },
        [uuid()]: {
          name: "Kevät III",
          items: []
        },
        [uuid()]: {
          name: "Kevät IV",
          items: []
        }
      })
      } catch (error) {
      if (error.response){
        console.log(error.response.data)
      }
    }
  }
  
  useEffect(() => {
    apiCall()
  },[])
  
  
  console.log(pakollisetA)
  console.log(viestiJaVuorov)

  
  return(
    <div style={{display: 'flex', overflow: 'hidden'}}>
      
      <MainLogo tutkinto={tutkinto?.name}/>
      
      <DragDropContext
        onDragEnd={result => onDragEnd(result, periods, setPeriods)}
      >
        {Object.entries(periods).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: '8%'
                
              }}
              key={columnId}
            >
              <h2 style={{fontSize: '12px', marginTop: 1}}>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} isDropDisabled={false}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#666666"
                            : "#F2F2F2",
                          alignItems: 'center',
                          overflowY: 'scroll',
                          overflowX: 'hidden',
                          boxShadow: '1px 2px 9px #000000',
                          width: '150px',
                          height: '250px',
                        }}
                      >
                        {column.items?.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={item.required ? {
                                      height: '40px',
                                      textAlign: 'center',
                                      marginLeft: '2%',
                                      width: '96%',
                                      marginTop: '3px',
                                      fontSize: '11px',
                                      border: '0.2px solid #989898',
                                      backgroundColor: snapshot.isDragging
                                        ? "#6EE8FF"
                                        : "#4D97E2",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }:{ height: '40px',
                                    textAlign: 'center',
                                    marginLeft: '2%',
                                    width: '96%',
                                    marginTop: '3px',
                                    fontSize: '11px',
                                    border: '0.2px solid #989898',
                                    backgroundColor: snapshot.isDragging
                                      ? "#47FF78"
                                      : "#CCFFCC",
                                    color: "#5A5656",
                                    ...provided.draggableProps.style}}
                                  >
                                    {item.name} {item.points} op
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
      
      
      </div>
  )
}
 
export default OmaHoks;