import React, {useDebugValue, useRef} from "react";
import { useReactToPrint } from "react-to-print";
import './cssStyles/logoStyle.css'

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
    onAfterPrint: () => alert("Tallennus onnistui")
  })

  return (
    <>
    <div style={{display: 'none'}}>
      <div ref={componentRef}>
        {Object.entries(dataToPrint).map(([columnID, column]) => {
          if (column.orderNum !== 0) {
            return (
              <div key={columnID}>
                <div>
                   {column.name} Periodin opintopisteet {sumPoints(column.items)} op
                </div>
                <ul>
                  {column.items.map((item, index) => (
                    <li key={item.id}>{item.name} {item.points} op</li>
                  ))}
                </ul>
              </div>
            )
          }
        })}
        </div>
      </div>
      <button className="pdfButton" style={{transform: "translate(670px, 0px)"}} onClick={handlePrint}>Tallenna PDF</button>
    </>
  )
}

export default PDFprint;