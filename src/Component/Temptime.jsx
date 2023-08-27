import React, { useEffect, useState } from "react";
import './Chart.css'
import { Line } from "react-chartjs-2";

import { CategoryScale,LinearScale, Chart,LineElement,Tooltip,Legend,PointElement} from "chart.js";
Chart.register(CategoryScale,LinearScale,LineElement,Tooltip,Legend,PointElement );


const Temptime = ({weatherDetails}) => {
    const [chartData, setChartData] = useState([]);
    const labels = chartData?.slice(0, 10)?.map(item => item.Time);
    const TemperatureData = chartData?.slice(0, 10).map(item => item.Temperature);
  console.log(chartData)
  
  
    useEffect(() => {
      const hourly = weatherDetails?.hourly?.time?.map((time) =>
        new Date(time)
          .toLocaleString("en-US", { hour: "numeric", hour12: false })
          .slice(0, 10)
      );
  
      setChartData(
        hourly?.map((hour, i) => ({
          Time: Number(hour),
          Temperature: weatherDetails?.hourly?.temperature_2m[i],
        }))
      );
    }, [weatherDetails]);
    const chartdata = {
      labels: labels,
      datasets: [
        {
          label: "Temperature",
          data: TemperatureData,
          fill: false,
          backgroundColor: "white",
          borderColor: "black",
          borderWidth: 2,
          
          pointBackgroundColor: "white"
        }
      ]
    }
    const options = {
      scales: {
        x: {
          type: "category",
          grid: {
            display: false
          },
          title: {
            display: true,
            text: "Time",
            color:'"black"'
            
          },
          ticks: {
            color: "rgba(2, 2, 2, 2)", 
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false
          },
          title: {
            display: true,
            text: "Temperature",
           
            color:"black"
          },
          ticks: {
            color: "black", // Change the color of y-axis ticks
          },
         
        },
      
      },
      
    };
  return (
    <div>
        <Line data={chartdata} options={options}></Line>
    </div>
  )
}

export default Temptime