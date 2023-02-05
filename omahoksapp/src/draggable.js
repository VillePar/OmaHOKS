import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StudiesToDrag = ({list, onDragEnd}) => {
  
  return (
    
  <div style={{overflowY:'scroll', overflowX: 'hidden', border: '2px solid black',width: '18%' ,position: 'absolute', top: 100, bottom: 2, left: 2 }}>
    <h6 style={{textAlign: 'center', marginTop: 0, marginBottom: 0 }}>Ammatilliset pakolliset 55 op</h6>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} >
            {list[0].map((osa, index) => (
              <Draggable key={osa.id} draggableId={osa.id.toString()} index={index} >
                {(provided) => (
                  <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <div style={{width: '90%', height: '40px', backgroundColor: 'lightblue', margin:'5px', textAlign:'center', fontSize:'11px', border: '1px solid black'}}>
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
      <h6 style={{textAlign: 'center', marginTop: 0, marginBottom: 0 }}>Ammatilliset valinnaiset 90 op</h6>
    </DragDropContext>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list1'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} >
            {list[1].map((osa, index) => (
              <Draggable key={osa.id} draggableId={osa.id.toString()} index={index} >
                {(provided) => (
                  <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <div style={{width: '90%', height: '40px', backgroundColor: 'lightGreen', margin:'5px', textAlign:'center', fontSize:'11px', border: '1px solid black'}}>
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
    <h6 style={{textAlign: 'center', marginTop: 0, marginBottom: 0 }}>Viestintä- ja vuorovaikutusosaaminen 11 op</h6>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list2'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} >
            {list[2].map((osa) => {
              
              return(
                osa.to_children.map((yto, index) => (
                  <Draggable key={yto.id} draggableId={yto.id.toString()} index={index} >
                {(provided) => (
                  <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <div style={{width: '90%', height: '40px', backgroundColor: 'lightYellow', margin:'5px', textAlign:'center', fontSize:'11px', border: '1px solid black'}}>
                  {yto.name} {yto.points} op
                  </div>
            </div>
              )}
              </Draggable>

                ))
              )
            }
          )}
        {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <h6 style={{textAlign: 'center', marginTop: 0, marginBottom: 0 }}>Matemaattis-luonnontieteellinen osaaminen 6 op</h6>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list2'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} >
            {list[3].map((osa) => {
              
              return(
                osa.to_children.map((yto, index) => (
                  <Draggable key={yto.id} draggableId={yto.id.toString()} index={index} >
                {(provided) => (
                  <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <div style={{width: '90%', height: '40px', backgroundColor: 'lightYellow', margin:'5px', textAlign:'center', fontSize:'11px', border: '1px solid black'}}>
                  {yto.name} {yto.points} op
                  </div>
            </div>
              )}
              </Draggable>

                ))
              )
            }
          )}
        {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <h6 style={{textAlign: 'center', marginTop: 0, marginBottom: 0 }}>Yhteiskunta- ja työelämäosaaminen 9 op</h6>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list2'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} >
            {list[4].map((osa) => {
              
              return(
                osa.to_children.map((yto, index) => (
                  <Draggable key={yto.id} draggableId={yto.id.toString()} index={index} >
                {(provided) => (
                  <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <div style={{width: '90%', height: '40px', backgroundColor: 'lightYellow', margin:'5px', textAlign:'center', fontSize:'11px', border: '1px solid black'}}>
                  {yto.name} {yto.points} op
                  </div>
            </div>
              )}
              </Draggable>

                ))
              )
            }
          )}
        {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
  )
}

export default StudiesToDrag;