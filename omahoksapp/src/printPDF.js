import React, {useDebugValue, useRef} from "react";
import { useReactToPrint } from "react-to-print";

const PDFprint = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => alert("Tallennus onnistui")
  })
  return (
    <>
      <div ref={componentRef}>
          <h1>OmaHoks</h1>
      </div>
      <button ocClick={handlePrint}>Tallenna PDF</button>
    </>
  )
}

export default PDFprint;