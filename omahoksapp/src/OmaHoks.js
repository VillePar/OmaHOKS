import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {MainLogo, PortraitScreen} from './components/upperBar';
import DnD from './components/drag&drop';
import {periodDataAutumn, periodDataSpring} from './components/periodData'
import PDFprint from './components/printPDF';
import { isMobile } from 'react-device-detect';
import './cssStyles/body.css'


const OmaHoks = () => {

  // useRef for useEffect later in the code to prevent unnecessary use of useEffect hook.
  const firstUpdate = useRef(true);
  
  const [qualification, setQualification] = useState([]);

  // periods is the main object that we are going fill fit json-data and iterate for the application
  const [periods, setPeriods] = useState({});

  // startSeason boolean to change the periods depending on if the user has started hes/hers studies in spring of autumn.
  // true for autumn and false for spring.
  const [startSeason, setStartSeason] = useState(() => {
  // Check if the value exists in the local storage 
  const storedValue = localStorage.getItem("season") 
  return storedValue !== null ? JSON.parse(storedValue) : true});
  
  // landscape-variable is ment to track if user is holding the phone in portrait or in landscape mode.
  // Later in the code we will give it a boolean value depending on the screen orientation.
  const [landscape, setLandscape] = useState();

  // this array contains id numbers of all the 'yhteisopinnot' from liiketoiminnan ePerusteet API.
  const ytoID = [3708881, 3708883, 3708884];
  
  // In apicall we use axios-library to get the json data from liiketoiminnan eperusteet
  const apiCall = async () => {
    try {
      const response = await axios.get('/liiketoimintaData.json');
      // firts we filter the 'ammatilliset tutkinnonosat' by filtering out the id numbers contained in ytoID array.
      const aot = response.data.tutkinnon_osat.tutkinnon_osat.filter(part => ytoID.indexOf(part.id) === -1);
      // and then we filter the ones with matching id from ytoID
      const ytoFiltered =  response.data.tutkinnon_osat.tutkinnon_osat.filter(part => ytoID.indexOf(part.id) !== -1);
      // Because 'yhteisopinnot' are so deep in JSON.data, we have to map the ytoFiltered and push the values from there in to empty 'yot' array.
      const yot = [] 
      
      ytoFiltered?.map((value) => {
        return(
        value.to_children?.map((study) => {
          return(
          yot.push(study)
          )
        }))
      });

      setQualification(response.data.tutkinto)
      // if startseason is true, we use the useState hook to fill the startSeason and periods are rendered on screen with autumn as starting point for the studies
      if(startSeason){
        setPeriods(periodDataAutumn(aot, yot))
      }
      // and if startSeason is not true, then we use she spring layout for the periods
      else{
        setPeriods(periodDataSpring(aot, yot))
      };
      } catch (error) {
      if (error.response){
        console.log(error.response.data)
      }
    }
  };

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
  };

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
  };

   // UseEffect hook to render the screen depending of the initial orientation of the screen
  // when the app is opened, and to update changes of the screen orientation when the device is flipped between portrait and landscape.
  useEffect(() => {
    initialScreenOrientation()
    updateScreenOrientation()
  });

  // simple function for resetbutton, that prompts the user if they really want to reset all of their choices.
  const resetClick = () => {
    if(window.confirm("Haluatko tyhjätä kaikki periodit?"))
    return(
      //if user accepts, then apiCall function is called again, which returns the app for it's original state.
      apiCall()
    )
  };

  // Two functions to bind for the buttons where user can choose the starting season for studies 
  const springStart = () => {
    if(startSeason){
      setStartSeason(false)
      }
    else{
      alert("Kevät on jo valittu aloitukseksi.")
    }
  };

  const autumnStart = () => {
    if(!startSeason){
      setStartSeason(true) 
    }
    else{
      alert("Syksy on jo valittu aloitukseksi.")
    }
  };

   // useEffect hook to check if there is anything saved from the user to local storage, if not the we call
  // the apiCall function.
  useEffect(() => {
    const periodData = localStorage.getItem("studiesToPeriods")
    const qualificationData = localStorage.getItem("qualification")
    const springOrAutumn = localStorage.getItem("season")
    if(periodData && qualificationData) {
      setPeriods(JSON.parse(periodData))
      setQualification(JSON.parse(qualificationData))
      setStartSeason(JSON.parse(springOrAutumn))
    }
    else {
      apiCall()
    }
  }, []);

  // and useEffect hook to track changes in startSeason value. apiCall function is called when startSeason variable is changed
  // to re-render the periods on screen. useRef firstUpdate.current is used to prevent the useEffect hook from infinite re-rendering.
  useEffect(() => {
    localStorage.setItem('season', JSON.stringify(startSeason))
    if(firstUpdate.current){
      firstUpdate.current = false;
      return 
    }
    apiCall()
  },[startSeason]);

 
  //useEffect hook to save user choices to local storage, so made choices stay between sessions.
  useEffect(() => {
    localStorage.setItem("studiesToPeriods", JSON.stringify(periods))
    localStorage.setItem("qualification", JSON.stringify(qualification))
    localStorage.setItem('season', JSON.stringify(startSeason))
  });
  
  // If device is detected to be a mobile device, then the application is rendered.
  if(isMobile) {
    // If lanscape-variable is true, then the main application is drawn to the screen.
    if(landscape) 
    return(
      <div className='full-screen' >
        <MainLogo qualification={qualification?.name} allPoints={periods} fromTotal={qualification?.total_points} spring={() => springStart()} autumn={() => autumnStart()}/>
        <PDFprint printData={periods} qualification={qualification?.name} fromTotal={qualification?.total_points}/>
        <DnD periods={periods} setPeriods={setPeriods} onclick={resetClick}/>
      </div>
      )
    // If landscape-variabale is not true, aka mobile device is held in the portrait mode, then we call the "PortraitScreen", which suggests the user 
    // to turn the mobile device to landscape mode.
    else
    return(
    <PortraitScreen/>
    )
  };
  if(!isMobile){
    return(
      <h1 style={{textAlign: 'center', color: 'black', marginTop: '200px'}}>Sorry but desktop device is not supported, mobile only!</h1>
    )
  };
 
};
 
export default OmaHoks;