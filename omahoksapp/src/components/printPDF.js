import {useRef} from "react";
import { useReactToPrint } from "react-to-print";
import pdfData from "./pdfData";
import '../cssStyles/printStyles.css';

// For PDFprint function we give three arguments, printData for the data that is to be printed, qualification to get the name of
// the API's qualification unit, and fromTotal to calculate sum of points from all of the the periods.
const PDFprint = ({printData, qualification, fromTotal}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'OmaHoks',
    fileName: "OmaHoks.pdf",
  });

  return (
    <>
      {/*div display is set to 'none', so PDFprint is not renderer on screen when we use it in the OmaHoks component*/}
      <div style={{display: 'none'}}>
        <div ref={componentRef} style={{background: '#3f3f3f'}}>
        {/*Here we call the 'pdfData' component and pass all of out PDFprints arguments as parameters*/}
        {pdfData(printData, qualification, fromTotal)}
        </div>
      </div>
      <button className="pdfButton" style={{transform: "translate(750px, 5px)"}} onClick={() => handlePrint()}>Tallenna PDF</button>
    </>
  )
};

export default PDFprint;