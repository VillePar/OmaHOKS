import logo from './logo.png'
import './cssStyles/logoStyle.css'
import PDFprint from './printPDF';
import { useEffect, useState } from 'react'

// function to update the sum of points in all of the periods
const AllPoints = (props) => {
  const summa = []
  Object.entries(props).map(([columnId, column]) => {
    column.items.map((tutkinto) => {
      if (column.orderNum !== 0 && column.orderNum !== 20){
        return(
          summa.push(tutkinto.points)
          )
        }
      })
    })
    return (
      summa.reduce((acc, currentValue) => acc + currentValue, 0)
      )
    };

    
// function to draw a bar for the upper edge of the screen, containing "Omahoks" logo, the name of the vocational qualification,
// sum of all the points of the studies that user has dropped in periods and button to save all the data in PDF-form
const MainLogo = (props) => {

  // "active" useState is for to determine active index of the seasonButtons 
  const [activeButton, setActiveButton] = useState(1)
  const toggleActive = (index) => {
    setActiveButton(index)
  };

  // Two useEffect hooks to save and fetch the active button data from local storage
  useEffect(() => {
    const buttonData = localStorage.getItem("activeButton")
    if(buttonData){
      setActiveButton(JSON.parse(buttonData))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeButton", JSON.stringify(activeButton))
  },[activeButton]);

  return (
    <div className='upperPinkBar'>
      <button className={activeButton === 1 ? 'seasonButtonActive': 'seasonButtonDeactive'} onClick={() => {if(window.confirm('Haluatko vaihtaa opintojen aloituksen syksylle?'))return[toggleActive(1), props.autumn()]}} style={{transform: "translate(500px, 100px)"}}>Syksy</button>
      <button className={activeButton === 2 ? 'seasonButtonActive': 'seasonButtonDeactive'} onClick={() => {if(window.confirm('Haluatko vaihtaa opintojen aloituksen keväälle?'))return[toggleActive(2), props.spring()]}} style={{transform: "translate(500px, 100px)"}}>Kevät</button>
      <img src={logo} width={60} style={{transform:'translate(-130px, 108px)'}}/>
      <h4 style={{color:'lightGrey', transform: 'translate(75px, 50px)'}}>{props.qualification} {AllPoints(props.allPoints)}/{props.fromTotal} opintopistettä</h4>
      <h6 style={{color: 'lightGrey', transform: 'translate(525px, -5px)'}}>Opintojen aloitus:</h6>
    </div>
    )
  };

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
  };

export  {MainLogo, PortraitScreen};