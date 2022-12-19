import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import StudiesToDrag from './draggable';
import MainLogo from './omaLogo';
import './styles.css'

const OmaHoks = () => {
  const [tutkinto, setTutkinto] = useState([]);
  const [pakollisetA, setPakollisetA] = useState([])  
  const [valinnaisetA, setValinnaisetA] = useState([])
  const [viestiJaVuorov, setViestiJaVuorov] = useState([])
  const [matem, setMatem] = useState([])
  const [yhteisK, setYhteisK] = useState([])

  const ytoID = [3708881, 3708883, 3708884]
  
  const apiCall = async () => {
    try {
      const response = await axios.get('/liiketoimintaData.json');
      setTutkinto(response.data.tutkinto)
      setPakollisetA(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && ytoID.indexOf(osa.id) === -1))
      setValinnaisetA(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => !osa.required ))
      setViestiJaVuorov(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708881))
      setMatem(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708883))
      setYhteisK(response.data.tutkinnon_osat.tutkinnon_osat.filter(osa => osa.required && osa.id === 3708884))
      } catch (error) {
      if (error.response){
        console.log(error.response.data)
      }
    }
  }
  
  useEffect(() => {
    apiCall()
  },[])
  
  console.log(pakollisetA)
  console.log(viestiJaVuorov)

  const onDragEnd = (result) => {
    if(!result.destination) {
      return
    }
  }
  
  const DropArea = () => {
    return(
      <div style={{overflowY:'scroll', overflowX: 'hidden', backgroundColor: '#E4EEEF', border: '2px solid black',width: '18%' ,position: 'absolute', top: 100, bottom: 2, left: '20%' }}>
        <h4 style={{textAlign: 'center', marginTop: 0, marginBottom: 0}}>Syksy I</h4>
      </div>
    )
  }
  
  return(
    <div style={{display: 'flex'}}>
      <h4 style={{position: 'absolute', top: 60, left: 5}}>Tutkinnon osat</h4>
      <MainLogo tutkinto={tutkinto?.name}/>
      <StudiesToDrag 
      list1={pakollisetA} 
      list2={valinnaisetA}
      list3={viestiJaVuorov}
      list4={matem}
      list5={yhteisK}
      onDragEnd={onDragEnd}/>
      <DropArea/>
      </div>
  )
}
 
export default OmaHoks;