import logo from './logo.png'
import './cssStyles/logoStyle.css'

// function to update the sum of points in all of the periods
const AllPoints = (props) => {
  const summa = []
      Object.entries(props).map(([columnId, column]) => {
        column.items.map((tutkinto) => {
          if (column.name !== 'Tutkinnon osat'){
            return(
              summa.push(tutkinto.points)
              )
          }
        })
      })
      return (
        summa.reduce((acc, currentValue) => acc + currentValue, 0)
       )
    }

// function to draw a bar for the upper edge of the screen, containing "Omahoks" logo, the name of the vocational qualification,
// sum of all the points of the studies that user has dropped in periods and button to save all the data in PDF-form
const MainLogo = (props) => {
    return (
      <div className='upperPinkBar'>
        <button className='pdfButton' style={{transform: "translate(600px, 50px)"}}>Tallenna PDF</button>
        
        <img src={logo} width={60} style={{transform:'translate(-80px, 60px)'}}/>
        <h4 style={{color:'lightGrey', transform: 'translate(90px, 10px)'}}>{props.tutkinto} {AllPoints(props.allPoints)}/{props.fromTotal} opintopistettä</h4>
        
      </div>
    )
  }

// function to draw the "OmaHoks" logo when user is holding the mobile device in portrait mode.
const PortraitLogo = () => {
  return (
    <img src={logo} width={180} height={120} style={{margin: 100}}/>
  )
}

export  {MainLogo, PortraitLogo}