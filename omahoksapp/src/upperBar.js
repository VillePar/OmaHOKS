import logo from './logo.png'
import './cssStyles/logoStyle.css'

// function to update the sum of points in all of the periods
const AllPoints = (props) => {
  const summa = []
  Object.entries(props).map(([columnId, column]) => {
    column.items.map((tutkinto) => {
      if (column.id !== 0){
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
        <button className='seasonButton' onClick={props.autumn} style={{transform: "translate(500px, 100px)"}}>Syksy</button>
        <button className='seasonButton' onClick={props.spring} style={{transform: "translate(500px, 100px)"}}>Kevät</button>
        <button className='pdfButton' style={{transform: "translate(550px, 100px)"}}>Tallenna PDF</button>
        <img src={logo} width={60} style={{transform:'translate(-240px, 108px)'}}/>
        <h4 style={{color:'lightGrey', transform: 'translate(75px, 50px)'}}>{props.qualification} {AllPoints(props.allPoints)}/{props.fromTotal} opintopistettä</h4>
        <h6 style={{color: 'lightGrey', transform: 'translate(515px, -5px)'}}>Opiskelujen aloitus:</h6>
        </div>
        )
      }

// function to draw the "OmaHoks" logo and notification to turn the mobile device when user is holding the mobile device in portrait mode.
const PortraitScreen = () => {
  return (
    <div style={{display: 'flex',backgroundColor: "#b32d84", height: '100vh', width: '100hv', alignItems: 'center'}}>
        <div style={{textAlign: 'center', marginBottom: '200px'}}>
        <img src={logo} width={180} height={120} style={{margin: 100}}/>
          <div style={{color: 'white', fontSize: '30px', textAlign: 'center', fontFamily: 'monospace'}}>
          Käännä puhelin vaakatasoon
          </div>
        </div>
      </div>
    )
  }

export  {MainLogo, PortraitScreen}