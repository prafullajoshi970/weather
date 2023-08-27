import React, { useEffect, useState } from "react";
import './Chart.css'
import { Line } from "react-chartjs-2";
import { Button} from '@chakra-ui/react'
import { CategoryScale,LinearScale, Chart,LineElement,Tooltip,Legend,PointElement} from "chart.js";
import Temptime from "./Temptime";

// Register the CategoryScale globally
Chart.register(CategoryScale,LinearScale,LineElement,Tooltip,Legend,PointElement );


function LineChartCard({ weatherDetails }) {
  const [chartData, setChartData] = useState([]);
  const[count,setCount]=useState(true)
  const labels = chartData?.slice(0, 10)?.map(item => item.Time);
  const humidityData = chartData?.slice(0, 10).map(item => item.Humidity);



  useEffect(() => {
    const hourly = weatherDetails?.hourly?.time?.map((time) =>
      new Date(time)
        .toLocaleString("en-US", { hour: "numeric", hour12: false })
        .slice(0, 10)
    );

    setChartData(
      hourly?.map((hour, i) => ({
        Time: Number(hour),
        Humidity: weatherDetails?.hourly?.relativehumidity_2m[i],
      }))
    );
  }, [weatherDetails]);
  const chartdata = {
    labels: labels,
    datasets: [
      {
        label: "Humidity",
        data: humidityData,
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
          text: "Humidity",
         
          color:"black"
        },
        ticks: {
          color: "black", // Change the color of y-axis ticks
        },
       
      },
    
    },
    
  };


  return (
    <>
    <Button colorScheme="yellow" size={'md'} mt={'15px'} onClick={()=>count?setCount(false):setCount(true)}> {count?'Time Vs  Temperature':'Time Vs Humidity'}</Button>
    <div className="chart">
      {count?<>
      <h1>Time vs Humidity</h1>
    <Line data={chartdata} options={options} />
    </>
    :
    <> 
    <h1>Time vs Temperature</h1>
    <Temptime weatherDetails={weatherDetails}></Temptime>
    </>}
   
   
    </div></>
    
  );
}

export default LineChartCard;