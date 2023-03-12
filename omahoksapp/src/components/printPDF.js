import {useRef} from "react";
import { useReactToPrint } from "react-to-print";
import pdfData from "./pdfData";
import '../cssStyles/printStyles.css';




const PDFprint = ({printData, qualification, fromTotal}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'OmaHoks',
    fileName: "my-file.pdf",
  });

  return (
    <>
    <div style={{display: 'none'}}>
      <div ref={componentRef} style={{background: '#3f3f3f'}}>
      {pdfData(printData, qualification, fromTotal)}
      </div>
      </div>
      <button className="pdfButton" style={{transform: "translate(750px, 0px)"}} onClick={() => handlePrint()}>Tallenna PDF</button>
    </>
  )
};

export default PDFprint;