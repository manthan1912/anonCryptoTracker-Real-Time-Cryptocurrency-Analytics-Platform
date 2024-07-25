import React, { useState, useEffect, useContext } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';



const Coin = () => {

  const {coinID} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCoinData = async () =>{

    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': '{your-api-key}'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchHisotricalData = async () =>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': '{your-api-key}'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=15&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }
  // useEffect(()=>{
  //   fetchHisotricalData();
  // },[currency, fetchHisotricalData])
  

  useEffect(()=>{
    fetchCoinData();
    fetchHisotricalData();
  },[currency, historicalData])

  if(coinData && historicalData){
  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
      </div>
      <div className="coin-info">
        <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
        <li>Current Price</li> 
        <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
        <li>Market Cap</li> 
        <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
        <li>Total Volume</li>
        <li>{currency.symbol}{coinData.market_data.total_volume[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
        <li>Price Change 24h</li>
        <li style={{color: coinData.market_data.price_change_percentage_24h > 0? 'green' :'red'}}>{Math.floor(coinData.market_data.price_change_percentage_24h*100)/100}%</li>
        </ul>
        <ul>
        <li>24H High</li>
        <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
        <li>24H Low</li>
        <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
        <li>Total Supply</li>
        <li>{coinData.market_data.total_supply.toLocaleString()}</li>
        </ul>
        <ul>
        <li>Circulating Supply</li>
        <li>{coinData.market_data.circulating_supply.toLocaleString()}</li>
        </ul>
        <ul>
        <li>Website</li>
        <li>{coinData.links.homepage[0]}</li>
        </ul>
    

      </div>
    </div>
  )
}else{
  return (
    <div className="spinner">
      <div className="spin">

      </div>
      
    </div>
  )
}
}
export default Coin
