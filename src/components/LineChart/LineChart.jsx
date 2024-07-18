/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {
    const [data,setData] = useState([["Date","Price"]])

    useEffect(()=>{
        let data = [["Date","Price"]];
        if(historicalData.prices){
            historicalData.prices.map((item)=>{
                data.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
            })
            setData(data);
        }
    },[historicalData])



  return (
    <Chart
        
        height = "100%"
        width="100%"
        chartType="LineChart"
        data={data}
        legendToggle
    />
  )
}

export default LineChart