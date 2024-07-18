import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/anon_logo_transparent.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)
  
  const handleCurrencyChange = (e) => {
    switch(e.target.value){
      case 'cad':
        {
          setCurrency({name: "cad", symbol:"CA$"})
          break;
      }
      case 'usd':{
        setCurrency({name: "usd", symbol:"US$"})
        break;
      }
      case 'inr':{
        setCurrency({name: "inr", symbol:"₹"})
        break;
      }
      default:{
        setCurrency({name: "cad", symbol:"CA$"})
        break;
      }
    }
  }

  return (
    <div className="navbar">
      <Link to= {'/'}>
        <img src={logo} className='logo' />
        </Link>
        <ul>
        <Link to= {'/'}><li>Home</li></Link>
        </ul>
        <div className="nav-right">
            <select onChange={handleCurrencyChange}>
            <option value="cad">CAD</option>
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            </select>
            <button>Sign Up <img src={arrow_icon} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar