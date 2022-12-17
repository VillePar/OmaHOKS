import logo from './logo.png'

const MainLogo = (props) => {
    return (
      <div style={{backgroundColor:'#0112c7', position: 'absolute', top:-50, left: -1, right: -1}}>
        <img src={logo} width={60} style={{transform:'translate(10px, 55px)'}}/>
        <h3 style={{color:'lightGrey', transform: 'translate(100px, 5px)'}}>{props.tutkinto} </h3>
      </div>
    )
  }

export default MainLogo