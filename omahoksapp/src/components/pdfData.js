import '../cssStyles/printStyles.css';

// sumPoints is to calculate the sum of points on one period to display it on the PDF-file
const sumPoints = (props) => {
    return(
      props.reduce((acc, currentValue) => acc + currentValue.points, 0)
    )
  };

  // AllPoints is to sum points from all of the periods to display it on the PDF-file
  const AllPoints = (props) => {
    const pointsArray = []
    Object.entries(props).map(([columnId, column]) => {
      column.items.map((tutkinto) => {
        if (column.orderNum !== 0 && column.orderNum !== 20){
          return(
            pointsArray.push(tutkinto.points)
            )
          }
        })
      })
      return (
        pointsArray.reduce((acc, currentValue) => acc + currentValue, 0)
        )
      }; 

const pdfData = (dataToPrint, qualification, fromTotal) => {
    return (
        <div className='upperPinkBarPrint'>
        <img className='logo' src={'/omaHoksLogo.png'}/>
        <h1 className='title'>{qualification} | Opintopisteet {AllPoints(dataToPrint)}/{fromTotal}</h1>
        <h2 style={{transform: 'translate(40%, 0)'}}>Lukuvuosi I</h2>
        {Object.entries(dataToPrint).map(([columnID, column]) => {
          if (column.orderNum > 0 && column.orderNum <= 5) {
            return (
            <div key={columnID} className='print-container'>
              <div className='period' style={column.orderNum === 5 ? {backgroundColor: '#FFFACD'}:{backgroundColor: '#F2F2F2'}}>
                <h2 style={{textAlign: 'center',fontSize: '16px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>
                   {column.items.map((item, index) => (
                    <div className="study" style={item.required ? {backgroundColor: "#4D97E2"}:{backgroundColor: "#CCFFCC",
                    color: "black",}} key={item.id}>{item.name}<br/> {item.points} op</div>
                  ))}
                  </div>
              </div>
            )
          }
        })}
        <h2 style={{transform: 'translate(40%, 0)'}}>Lukuvuosi II</h2>
        {Object.entries(dataToPrint).map(([columnID, column]) => {
          if (column.orderNum > 5 && column.orderNum < 11) {
            return (
            <div key={columnID} className='print-container'>
              <div className='period' style={column.orderNum === 10 ? {backgroundColor: '#FFFACD'}:{backgroundColor: '#F2F2F2'}}>
                <h2 style={{textAlign: 'center',fontSize: '16px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>
                   {column.items.map((item, index) => (
                    <div className="study" style={item.required ? {backgroundColor: "#4D97E2"}:{backgroundColor: "#CCFFCC",
                    color: "black",}} key={item.id}>{item.name}<br/>{item.points} op</div>
                  ))}
                  </div>
              </div>
            )
          }
        })}
        <h2 style={{transform: 'translate(40%, 0)'}}>Lukuvuosi III</h2>
        {Object.entries(dataToPrint).map(([columnID, column]) => {
          if (column.orderNum > 10 && column.orderNum < 19) {
            return (
            <div key={columnID} className='print-container'>
              <div className='period' style={column.orderNum === 15 ? {backgroundColor: '#FFFACD'}:{backgroundColor: '#F2F2F2'}}>
                <h2 style={{textAlign: 'center',fontSize: '16px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>
                   {column.items.map((item, index) => (
                    <div className="study" style={item.required ? {backgroundColor: "#4D97E2"}:{backgroundColor: "#CCFFCC",
                    color: "black",}} key={item.id}>{item.name}<br/>{item.points} ops</div>
                  ))}
                  </div>
              </div>
            )
          }
        })}
        </div>
    )
};

export default pdfData;