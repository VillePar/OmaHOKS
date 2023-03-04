import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {MainLogo, PortraitScreen} from './upperBar';
import StudiesToDrag from './draggable';
import {periodDataAutumn, periodDataSpring} from './periodData'

const OmaHoks = () => {
 
const [qualification, setQualification] = useState([]);
  // periods is the main object that we are going fill fit json-data and iterate for the application
const [periods, setPeriods] = useState({})

// startSeason boolean to change the periods depending on if the user has started hes/hers studies in spring of autumn.
// true for autumn and false for spring.
const [startSeason, setStartSeason] = useState(true)

// landscape-variable is ment to track if user is holding the phone in portrait or in landscape mode.
// Later in the code we will give it a boolean value depending on the screen orientation.
const [landscape, setLandscape] = useState()

  // for now there is no use for ytoID
const ytoID = [3708881, 3708883, 3708884]
  
  // In apicall we use axios-library to get the json data from liiketoiminnan eperusteet
  const apiCall = async () => {
    try {
      const response = await axios.get('/liiketoimintaData.json');
      // for now these setStates are not in use.
      {/*setViestiJaVuorov(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708881))
      setMatem(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708883))
    setYhteisK(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708884))*/}

      setQualification(response.data.tutkinto)
      
      if(startSeason){
        setPeriods(periodDataAutumn(response.data.tutkinnon_osat.tutkinnon_osat, response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708881)))
      }
      else{
        setPeriods(periodDataSpring(response.data.tutkinnon_osat.tutkinnon_osat))
      }
        
      
      //setPeriods(periodData(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => ytoID.indexOf(osa.id) === -1)))
      } catch (error) {
      if (error.response){
        console.log(error.response.data)
      }
    }
  }

 // function to track inital screen orientation when application is opened
  const initialScreenOrientation = () => {
    if(window.matchMedia("(orientation: landscape)").matches)
      return(
        setLandscape(true)
      )
      else(
        setLandscape(false)
      )
      window.addEventListener('orientationchange', () => {
        if(window.matchMedia("(orientation: landscape)").matches)
        return(
          setLandscape(false)
        )
        else(
          setLandscape(true)
        )
      })
  }

  // function to track mobile devices screen orientation changes to update the landscape-variables boolean value
  const updateScreenOrientation = () => {
    window.addEventListener('orientationchange', () => {
      if(window.matchMedia("(orientation: landscape)").matches)
      return(
        setLandscape(false)
      )
      else(
        setLandscape(true)
      )
    })
  }

  // UseEffect hook to render the screen depending of the initial orientation of the screen
  // when the app is opened, and to update changes of the screen orientation when the device is flipped between portrait and landscape.
  useEffect(() => {
    initialScreenOrientation()
    updateScreenOrientation()
  })

  // simple function for resetbutton, that prompts the user if they really want to reset all of their choices.
  const handleclick = () => {
    vibrate(50)
    if(window.confirm("Haluatko tyhjä kaikki periodit?"))
    return(
      //if user accepts, then apiCall function is called again, which returns the app for it's original state.
      apiCall(),
      vibrate(150)
    )
  }

  // function for haptic feedback when button is pressed (does not work in IOS/Safari)
  const vibrate = (ms) => {
    navigator.vibrate(ms)
  }

  // Two functions to bind for the buttons where user can choose the starting season for studies 
  const springStart = () => {
    if(startSeason){
      vibrate(50)
      if(window.confirm("Haluatko vaihtaa opiskelujen aloitusajankohdan keväälle?"))
      {
        vibrate(150)
        setStartSeason(false)
      }
    }
    else{
      vibrate(50)
      alert("Kevät on jo valittu aloitukseksi.")
    }
  }

  const autumnStart = () => {
    vibrate(50)
    if(!startSeason){
      if(window.confirm("Haluatko vaihtaa opiskelujen aloitusajankohdan syksylle?"))
      {
        setStartSeason(true) 
        vibrate(150)
      }
    }
    else{
      vibrate(50)
      alert("Syksy on jo valittu aloitukseksi.")
    }
  }

  // and useEffect hook to track changes in startSeason value. apiCall function is called
  useEffect(() => {
    apiCall()
  }, [startSeason])

  // useEffect hook to check if there is anything saved from the user to local storage, if not the we call
  // the apiCall function.
  useEffect(() => {
    const periodData = localStorage.getItem("studiesToPeriods")
    const qualificationData = localStorage.getItem("tutkinto")
    const spingOrAutumn = localStorage.getItem('season')
    if(periodData) {
      setPeriods(JSON.parse(periodData))
      setQualification(JSON.parse(qualificationData))
      setStartSeason(JSON.parse(spingOrAutumn))
    }
    else {
      apiCall()
      setStartSeason(spingOrAutumn)
    }
  }, [])
  
  //useEffect hook to save user choices to local storage, so made choices stay between sessions.
  useEffect(() => {
    localStorage.setItem("studiesToPeriods", JSON.stringify(periods))
    localStorage.setItem("tutkinto", JSON.stringify(qualification))
    localStorage.setItem('season', JSON.stringify(startSeason))
  })
  console.log(startSeason)

  // If lanscape-variable is true, then the main application is drawn to the screen.
  if(landscape) 
    return(
      <div style={{display: 'flex'}}>
        <MainLogo qualification={qualification?.name} allPoints={periods} fromTotal={qualification?.total_points} spring={() => springStart()} autumn={() => autumnStart()}/>
        <StudiesToDrag periods={periods} setPeriods={setPeriods} onclick={handleclick}/>
      </div>
    )
    // If landscape-variabale is not true, aka mobile device is held in the portrait mode, then we call the "PortraitScreen", which suggests the user 
    // to turn the mobile device to landscape mode.
  else
    return(
      <PortraitScreen/>
    )
  }
 
export default OmaHoks;