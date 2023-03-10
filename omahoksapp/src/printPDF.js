import {useRef} from "react";
import { useReactToPrint } from "react-to-print";
import './cssStyles/printStyles.css';

const sumPoints = (props) => {
  return(
    props.reduce((acc, currentValue) => acc + currentValue.points, 0)
  )
};

const PDFprint = ({dataToPrint}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'OmaHoks',
  });

  return (
    <>
    <div style={{display: 'none'}}>
      <div ref={componentRef}>
      <h2 style={{justifyContent: 'center'}}>Lukuvuosi I</h2>
        {Object.entries(dataToPrint).map(([columnID, column]) => {
          if (column.orderNum !== 0 && column.orderNum < 6) 
          {
            return (
            <div key={columnID}>
              <div className='period'>
                <h2 style={{textAlign: 'center',fontSize: '10px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>
                   {column.items.map((item, index) => (
                    <div className="study" style={item.required ? {backgroundColor: "#4D97E2"}:{backgroundColor: "#CCFFCC",
                    color: "black",}} key={item.id}>{item.name} {item.points} op</div>
                  ))}
                  </div>
              </div>
            )
          }
        })}
        <h2 style={{justifyContent: 'center'}}>Lukuvuosi II</h2>
        {Object.entries(dataToPrint).map(([columnID, column]) => {
          if (column.orderNum > 6 && column.orderNum < 11) 
          {
            return (
            <div key={columnID}>
              <div className='period'>
                <h2 style={{textAlign: 'center',fontSize: '10px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>
                   {column.items.map((item, index) => (
                    <div className="study" style={item.required ? {backgroundColor: "#4D97E2"}:{backgroundColor: "#CCFFCC",
                    color: "black",}} key={item.id}>{item.name} {item.points} op</div>
                  ))}
                  </div>
              </div>
            )
          }
        })}
        <h2 style={{justifyContent: 'center'}}>Lukuvuosi III</h2>
        {Object.entries(dataToPrint).map(([columnID, column]) => {
          if (column.orderNum > 11 && column.orderNum < 19) 
          {
            return (
            <div key={columnID}>
              <div className='period'>
                <h2 style={{textAlign: 'center',fontSize: '10px'}}>{column.name}<br/>Periodin opintopisteet  {sumPoints(column.items)} op</h2>
                   {column.items.map((item, index) => (
                    <div className="study" style={item.required ? {backgroundColor: "#4D97E2"}:{backgroundColor: "#CCFFCC",
                    color: "black",}} key={item.id}>{item.name} {item.points} op</div>
                  ))}
                  </div>
              </div>
            )
          }
        })}
        </div>
      </div>
      <button className="pdfButton" style={{transform: "translate(670px, 0px)"}} onClick={() => [handlePrint(), navigator.vibrate(100)]}>Tallenna PDF</button>
    </>
  )
};

export default PDFprint;