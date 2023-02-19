import logo from './logo.png'

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

  
const MainLogo = (props) => {
    return (
      <div style={{backgroundColor:'#b32d84', position: 'absolute', top:-60, left: 0, right: 0}}>
        <img src={logo} width={60} style={{transform:'translate(10px, 60px)'}}/>
        <h4 style={{color:'lightGrey', transform: 'translate(90px, 10px)'}}>{props.tutkinto} {AllPoints(props.allPoints)}/{props.fromTotal} opintopistettä</h4>
      </div>
    )
  }

const PortraitLogo = () => {
  return (
    <img src={logo} width={180} height={120} style={{margin: 100}}/>
  )
}

export  {MainLogo, PortraitLogo}