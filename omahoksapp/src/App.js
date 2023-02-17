import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import MainLogo from './omaLogo';
import './styles.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StudiesToDrag from './draggable';

const OmaHoks = () => {
  // for now, these variabales are not in use. 
  {/*
  const [viestiJaVuorov, setViestiJaVuorov] = useState([])
  const [matem, setMatem] = useState()
  const [yhteisK, setYhteisK] = useState([])*/ }

const [tutkinto, setTutkinto] = useState([]);
  // periods is the main object that we are going to iterate
const [periods, setPeriods] = useState({})

  // for now there is no use for ytoID
const ytoID = [3708881, 3708883, 3708884]
  
  // In apicall we use axios-library to get the 
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
  
  useEffect(() => {
    apiCall()
  },[])
  
  return(
    <div style={{display: 'flex', boxSizing: 'border-box'}}>
      <MainLogo tutkinto={tutkinto?.name} allPoints={periods} fromTotal={tutkinto?.total_points}/>
      <StudiesToDrag periods={periods} setPeriods={setPeriods}/>
      
    </div>
  )
}
 
export default OmaHoks;