import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../cssStyles/TabStyle.css"
import '../cssStyles/drag&dropStyle.css'


//onDragEnd function is essential for defining what happens to the draggable object when
// it is dropped in to the droppable area.
const onDragEnd = (result, columns, setColumns) => {
  vibrate(40)
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

 // function for haptic feedback when button is pressed
 const vibrate = (ms) => {
  navigator.vibrate(ms)
};

// function to update the amount of points in one period when study is dropped in to the said period
const sumPoints = (props) => {
  return(
    props.reduce((acc, currentValue) => acc + currentValue.points, 0)
  )
};

const ytoID = [3708881, 3708883, 3708884]

const DnD = ({periods, setPeriods, onclick}) => {
   
  // toggelstate variabale is to keep track that which of the tabs containing periods is selected
  const [toggleState, setToggleState] = useState(1)

  const [toggleStudies, setToggleStudies] = useState(1)

  const [activeButton, setActiveButton] = useState(1)

  const activateButton = (index) => {
    vibrate(40)
    setActiveButton(index)
  }

  const toggleButton = (index) => {
    vibrate(40)
    setToggleStudies(index)
  }


  // toggletab function sets the index of the selected tab for the togglestate variable
  const toggleTab = (index) => {
    vibrate(40)
    setToggleState(index)
  }
  
  return (
  <DragDropContext onDragEnd={result => onDragEnd(result, periods, setPeriods)}>
    <button className={activeButton === 2 ? 'studyButton' : 'nonActiveStudyButton'} style={{marginLeft: '85px'}} onClick={() => [toggleButton(2), activateButton(2)]}>Yhteisopinnot</button>
    <button className={activeButton === 1 ? 'studyButton' : 'nonActiveStudyButton'} style={{marginLeft: '1px'}} onClick={() => [toggleButton(1), activateButton(1)]}>Ammatilliset</button>
    <button className='resetButton' onClick={onclick}>Resetoi</button>
        {/*Inside the DragDropContext we first iterate our main object "periods"*/}
        {Object.entries(periods).map(([columnId, column], index) => 
        { if(column.orderNum === 0)
        return (
            <div
              className={toggleStudies === 1 ? 'qualificationUnitsContainer' : 'qualificationHidden'}
              key={columnId}
              >
              <h5 style={{position: 'absolute', top: '28px', textAlign: 'center'}}>Tutkinnon osat</h5>
              
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} isDropDisabled={false}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                      className={toggleStudies === 1 ? 'qualificationUnits' : 'qualificationUnitsHidden'}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#666666"
                            : "#F2F2F2",
                         }}
                      >
                        {/*Inside the droppable we iterate all of our list items to be draggable objects*/}
                        {column.items.map((item, index) => {
                          
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div 
                                  className='draggableStudy'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={item.required ? {
                                    backgroundColor: snapshot.isDragging
                                      ? "#6EE8FF"
                                      : "#4D97E2",
                                    ...provided.draggableProps.style
                                  }:{backgroundColor: snapshot.isDragging
                                    ? "#47FF78"
                                    : "#CCFFCC",
                                  ...provided.draggableProps.style}}
                                  >
                                    {item.name}<br/>{item.points} op
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
        {Object.entries(periods).map(([columnId, column], index) => 
        { if(column.orderNum === 20)
        return (
            <div
              className={toggleStudies === 2 ? 'qualificationUnitsContainer' : 'qualificationHidden'}
              key={columnId}
              >
                <h5 style={{position: 'absolute', top: '28px', textAlign: 'center'}}>Tutkinnon osat</h5>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} isDropDisabled={false}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                      className={toggleStudies === 2 ? 'qualificationUnits' : 'qualificationUnitsHidden'}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#666666"
                            : "#F2F2F2",
                         }}
                      >
                        {/*Inside the droppable we iterate all of our list items to be draggable objects*/}
                        {column.items.map((item, index) => {
                          
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div 
                                  className='draggableStudy'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={item.required ? {
                                    backgroundColor: snapshot.isDragging
                                      ? "#6EE8FF"
                                      : "#4D97E2",
                                    ...provided.draggableProps.style
                                  }:{backgroundColor: snapshot.isDragging
                                    ? "#47FF78"
                                    : "#CCFFCC",
                                  ...provided.draggableProps.style}}
                                  >
                                    {item.name}<br/>{item.points} op
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
        {/*Each school year is wrapped around tab, this tab-wrapper is duplicated for 
        each of the years*/}
        <div className='container'>
          <div className='bloc-tabs'>
            < button
            // button onclick calls our toggTab function to change the index of the selected tab
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
            >
              Lukuvuosi I
            </button>
          <div className='content-tabs'>
            <div
              className={toggleState === 1 ? "content active-content" : "content"}
            >
              {/*Inside the tab we iterate our object*/}
        {Object.entries(periods).map(([columnId, column], index) => 
        { if(column.orderNum >= 1 && column.orderNum < 5)
          return (
            <div
              className='periodContainer'
              key={columnId}
              >
              {<h2 style={{textAlign: 'center', fontSize: '10px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>}
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} isDropDisabled={false}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                      className='droppablePeriod'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#666666"
                            : "#F2F2F2",
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
                                  className='draggableStudy'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={item.required ? {
                                      backgroundColor: snapshot.isDragging
                                        ? "#6EE8FF"
                                        : "#4D97E2",
                                      ...provided.draggableProps.style
                                    }:{backgroundColor: snapshot.isDragging
                                      ? "#47FF78"
                                      : "#CCFFCC",
                                    ...provided.draggableProps.style}}
                                  >
                                    {item.name}<br/>{item.points} op
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
        </div>
          </div>
          </div>
        </div>
        <div className='container'>
          <div className='bloc-tabs'>
            < button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
            >
              Lukuvuosi II
            </button>
          <div className='content-tabs'>
            <div
              className={toggleState === 2 ? "content active-content2" : "content"}
            >
        {Object.entries(periods).map(([columnId, column], index) => 
        { if(column.orderNum > 5 && column.orderNum <= 9)
          return (
            <div
            className='periodContainer'
            key={columnId}
            >
              {<h2 style={{textAlign: 'center',fontSize: '10px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>}
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} isDropDisabled={false}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                      className='droppablePeriod'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#666666"
                          : "#F2F2F2",
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
                                  className='draggableStudy'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={item.required ? {
                                    backgroundColor: snapshot.isDragging
                                      ? "#6EE8FF"
                                      : "#4D97E2",
                                    ...provided.draggableProps.style
                                  }:{backgroundColor: snapshot.isDragging
                                    ? "#47FF78"
                                    : "#CCFFCC",
                                  ...provided.draggableProps.style}}
                                  >
                                    {item.name}<br/>{item.points} op
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
        </div>
          </div>
          </div>
        </div>
        <div className='container'>
          <div className='bloc-tabs'>
            < button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
            >
              Lukuvuosi III
            </button>
          <div className='content-tabs'>
            <div
              className={toggleState === 3 ? "content active-content3" : "content"}
            >
        {Object.entries(periods).map(([columnId, column], index) => 
        { if(column.orderNum > 10 && column.orderNum <= 14) 
          return (
          <div
            className='periodContainer'
            key={columnId}
              >
              {<h2 style={{textAlign: 'center',fontSize: '10px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>}
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} isDropDisabled={false}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                      className='droppablePeriod'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#666666"
                          : "#F2F2F2",
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
                                  className='draggableStudy'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={item.required ? {
                                      backgroundColor: snapshot.isDragging
                                        ? "#6EE8FF"
                                        : "#4D97E2",
                                      ...provided.draggableProps.style
                                    }:{backgroundColor: snapshot.isDragging
                                      ? "#47FF78"
                                      : "#CCFFCC",
                                    ...provided.draggableProps.style}}
                                  >
                                    {item.name}<br/>{item.points} op
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
        </div>
          </div>
          </div>
        </div>
        <div className='container'>
          <div className='bloc-tabs'>
            < button
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
            >
              Kesäopinnot
            </button>
          <div className='content-tabs'>
            <div
              className={toggleState === 4 ? "content active-content4" : "content"}
            >
        {Object.entries(periods).map(([columnId, column], index) => 
        { if(column.orderNum === 5 || column.orderNum === 10 || column.orderNum === 15)
          return (
          <div
            className='periodContainer'
            key={columnId}
              >
              {<h2 style={{textAlign: 'center',fontSize: '10px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>}
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} isDropDisabled={false}>
                  {(provided, snapshot) => {
                    return (
                      <div 
                      className='droppablePeriod'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#666666"
                          : "	#FFFACD",
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
                                  className='draggableStudy'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={item.required ? {
                                    backgroundColor: snapshot.isDragging
                                      ? "#6EE8FF"
                                      : "#4D97E2",
                                    ...provided.draggableProps.style
                                  }:{backgroundColor: snapshot.isDragging
                                    ? "#47FF78"
                                    : "#CCFFCC",
                                  ...provided.draggableProps.style}}
                                  >
                                    {item.name}<br/>{item.points} op
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
        </div>
          </div>
          </div>
        </div>
        </DragDropContext>
        )
}

export default DnD;