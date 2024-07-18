import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'


const Home = () => {

  
  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');
  const inputHandler = (e) =>{
    setInput(e.target.value)
    if(e.target.value === ''){
      setDisplayCoin(allCoin) // Reset the search results when input is cleared.
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item)=> {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
  }



  useEffect(() => {
    setDisplayCoin(allCoin) // Display top 10 coins by default.
  },[allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br />Crypto Marketplace</h1>
        <p>Welcome to the world's largest crypto Marketplace. Believe in something Anon.</p>

      <form onSubmit={searchHandler}>
        <input onChange={inputHandler} list = 'coinlist' value = {input} type="text" placeholder="Search for cryptocurrencies" required/>
        <datalist id = 'coinlist'>
          {allCoin.map((item, index) => (
            <option key={index} value={item.name}/>
          ))}

  
        </datalist>

        <button type="submit">Search</button>
      </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:'center'}}>24H Change</p>
          <p className='marketcap'>Market Cap</p>
        </div>
        {
          // Display top 10 coins only. If more coins are added, this will be adjusted accordingly.
          displayCoin.slice(0,10).map((item,index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
              <p>{item.name +'-' + item.symbol}</p>
              </div>

              <p>{currency.symbol}{item.current_price.toLocaleString(currency)}</p>
              
              <p style={{textAlign:'center'}} className={item.price_change_percentage_24h > 0 ? "green":"red"}>
                {Math.floor(item.price_change_percentage_24h*100)/100}
                </p>

                <p className='marketcap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            
          </Link>
        ))
}

      </div>
    </div>
  )
}

export default Home