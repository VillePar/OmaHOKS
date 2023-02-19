import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {MainLogo, PortraitLogo} from './omaLogo';
import StudiesToDrag from './draggable';


const OmaHoks = () => {
 
const [tutkinto, setTutkinto] = useState([]);
  // periods is the main object that we are going fill fit json-data and iterate for the application
const [periods, setPeriods] = useState({})

// landscape-variable is ment to track if user is holding the phone in portrait or in Slandscape mode.
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

      setTutkinto(response.data.tutkinto)
  
      setPeriods({
        opinnot: {
          name: "Tutkinnon osat",
          items: response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => ytoID.indexOf(osa.id) === -1)
          
        },
        syksyI: {
          name: "Syksy I",
          items: [],
          
        },
        syksyII: {
          name: "Syksy II",
          items: []
        },
        kevätIII: {
          name: "Kevät III",
          items: []
        },
        kevätIV: {
          name: "Kevät IV",
          items: []
        },
        kesäV: {
          name: "Kesä V",
          items: []
        }
        ,
        syksyI2: {
          name: "Syksy I/II",
          items: [],
          
        },
        syksyII2: {
          name: "Syksy II/II",
          items: []
        },
        kevätIII2: {
          name: "Kevät III/II",
          items: []
        },
        kevätIV2: {
          name: "Kevät IV/II",
          items: []
        },
        kesäV2: {
          name: "Kesä V/II",
          items: []
        }
        ,
        syksyI3: {
          name: "Syksy I/III",
          items: [],
          
        },
        syksyII3: {
          name: "Syksy II/III",
          items: []
        },
        kevätIII3: {
          name: "Kevät III/III",
          items: []
        },
        kevätIV3: {
          name: "Kevät IV/III",
          items: []
        },
        kesäV3: {
          name: "Kesä V/III",
          items: []
        }
      })
      } catch (error) {
      if (error.response){
        console.log(error.response.data)
      }
    }
  }
  
  // useEffect hook calls apiCall function when dom is rendered for the first time 
  useEffect(() => {
    apiCall()
  },[])
  
  // function to track inital screen orientation when application is opened
  const initialScreenOrientation = () => {
    if(window.matchMedia("(orientation: landscape)").matches)
      return(
        setLandscape(true)
      )
      else(
        setLandscape(false)
      )
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
  // when the app is opened, and to update changes of the screen orientation when app is in use.
  useEffect(() => {
    initialScreenOrientation()
    updateScreenOrientation()
  })

  const MainApp = () => {
    if(landscape) 
      return(
        <div style={{display: 'flex'}}>
        <MainLogo tutkinto={tutkinto?.name} allPoints={periods} fromTotal={tutkinto?.total_points}/>
        <StudiesToDrag periods={periods} setPeriods={setPeriods}/>
      </div>
      )
    else
      return(
        <div style={{display: 'flex',backgroundColor: "#b32d84", height: '100vh', width: '100hv', alignItems: 'center'}}>
          <div style={{textAlign: 'center', marginBottom: '200px'}}>
          <PortraitLogo/>
            <div style={{color: 'white', fontSize: '30px', textAlign: 'center', fontFamily: 'monospace'}}>
            Käännä puhelin vaakatasoon
            </div>
          </div>
        </div>
      )
    }
  
  return(
    <MainApp/>
  )
}
 
export default OmaHoks;