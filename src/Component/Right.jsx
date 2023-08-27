import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardFooter, Text, Heading } from "@chakra-ui/react";
import "./Right.css";
import Chart from "./Chart";
import { FaTemperatureHigh,FaWind,FaFire,FaCloudRain,FaEyeDropper} from 'react-icons/fa';


// import TemperatureChart from "./TemperatureChart";
 
const Right = (props) => {
  const [state, setState] = useState([]);
  const [latitude, setLatitude] = useState(19.08333333);
  const [longitude, setLongitude] = useState(74.73333333);
  const [data,setData] = useState([]);
  const [cityname,setCityname]=useState('kopargaon')
 console.log(cityname)
 
  useEffect(() => {
    setData(props.data)
    if (data.length > 0) {
      const obj = data[0]; // Assuming there's only one object in the array
      setCityname(obj.name.toString())
      setLatitude(obj.latitude.toString()); // Convert to string if needed
      setLongitude(obj.longitude.toString()); // Convert to string if needed
    }
  }, [data,props.data]);

 
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,windspeed_180m,temperature_180m,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,windspeed_10m_max&timezone=GMT`
    )
      .then((resp) => resp.json())
      .then((data) => setState(data));
  }, [latitude,longitude]);
  

  return (
 
    
    <div >
    
     <div className="right">
      <div  className="cardData">
      <Card align="center" bg="gray.50" borderTop={'3px solid orange'} width={{ base: "112px", md: "142px", lg: "142px" }} m="5px" height={{base:'152px'}} boxShadow="lg" borderRadius="md"  >
        <CardHeader size="sm">
          <Text>Temperature</Text >
        </CardHeader>
      <Text><FaTemperatureHigh pt={'16px'}  size={24}/></Text> 
        <CardFooter size="sm">
      <Heading size="sm">{state?.daily?.temperature_2m_max[0] !== undefined
      ? `${state.daily.temperature_2m_max[0]}°C`
      : "Loading..."}</Heading>  
        </CardFooter>
      </Card>

      <Card align="center" borderTop={'3px solid green'} width={{ base: "112px", md: "142px", lg: "142px" }} m="5px" height={{base:'152px'}}  boxShadow="lg" borderRadius="md">
        <CardHeader size="sm">
          <Text > Wind Speed</Text >
        </CardHeader>
        <Text><FaWind pt={'16px'}  size={24}/></Text>
        <CardFooter size="sm">
          <Heading colorScheme="blue" size="sm">
            {state?.daily?.windspeed_10m_max[0] !== undefined
      ? `${state.daily.windspeed_10m_max[0]}Km/hr`
      : "Loading..."}
          </Heading>
        </CardFooter>
      </Card>
      <Card align="center" borderTop={'3px solid violet'} width={{ base: "112px", md: "142px", lg: "142px" }} m="5px" height={{base:'152px'}} boxShadow="lg" borderRadius="md">
        <CardHeader size="sm">
          <Text >UV Index</Text >
        </CardHeader>
        <Text><FaFire pt={'16px'}  size={24}/></Text>
        <CardFooter size="sm">
          <Heading colorScheme="blue" size="sm">
           
           {state?.daily?.uv_index_max[0] !== undefined
      ? `${state.daily.uv_index_max[0]}`
      : "Loading..."}
          </Heading>
        </CardFooter>
      </Card>
      <Card align="center" borderTop={'3px solid blue '}  width={{ base: "112px", md: "142px", lg: "142px" }} m="5px" height={{base:'152px'}}  boxShadow="lg" borderRadius="md">
        <CardHeader size="sm">
          <Text > Rain Chances</Text >
        </CardHeader>
        <Text><FaCloudRain pt={'16px'}  size={24}/></Text>
        <CardFooter size="sm">
          <Heading colorScheme="blue" size="sm">
            {state?.hourly?.precipitation_probability[0]!== undefined
      ? `${state?.hourly?.precipitation_probability[7]}%`
      : "Loading..."}
          </Heading>
        </CardFooter>
      </Card> 
      <Card align="center" borderTop={'3px solid gray'}  width={{ base: "112px", md: "142px", lg: "142px" }} m="5px" height={{base:'152px'}}  boxShadow="lg" borderRadius="md">
        <CardHeader size="sm">
          <Text >DewPoint</Text >
        </CardHeader>
        <Text><FaEyeDropper pt={'16px'}  size={24}/></Text>
        <CardFooter size="sm">
          <Heading colorScheme="blue" size="sm">
           {state?.hourly?.dewpoint_2m[0] !== undefined
      ? `${state.hourly.dewpoint_2m[0]}`
      : "Loading..."}
          </Heading>
        </CardFooter>
      </Card>
      
      </div>
      
      <div>
       <Chart weatherDetails={state}></Chart>
      </div>
     
      </div>
    </div>
   
  );
};

export default Right;
