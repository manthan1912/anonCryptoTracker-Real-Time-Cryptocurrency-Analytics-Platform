import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext()

const CoinProvider = (props) => {

    // Initialize your state here
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState(
        {
            name :'cad',
            symbol : 'CA$'
        }
    )

    const fetchAllCoin = async () => {
        // Fetch data from API
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': '{your-api-key}'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));

    }

    useEffect(()=>{
        fetchAllCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency])


    const contextValue = {
        allCoin,
        currency,
        setCurrency

    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinProvider;
