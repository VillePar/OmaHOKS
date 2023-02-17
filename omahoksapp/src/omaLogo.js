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
      <div style={{backgroundColor:'#b32d84', position: 'absolute', top:-50, left: -1, right: -1}}>
        <img src={logo} width={60} style={{transform:'translate(10px, 55px)'}}/>
        <h3 style={{color:'lightGrey', transform: 'translate(100px, 5px)'}}>{props.tutkinto} {AllPoints(props.allPoints)}/{props.fromTotal} opintopistettä</h3>
      </div>
    )
  }

export default MainLogo