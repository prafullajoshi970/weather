import React, { useState, useEffect } from "react";
import { Select, Heading,Box } from "@chakra-ui/react";
import { Country, City } from "country-state-city";
import "./Left.css";
import Right from "./Right";

const Left = () => {
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [selectcountry, setselectCountry] = useState([
    { flag: "select country", name: "loading..." },
  ]);
  const [selectCity, setSelectCity] = useState([]);
  const [ne, setNe] = useState();
  const [displaycity, setDisplaycity] = useState([]);
 
 

  useEffect(() => {
    setCountry(Country.getAllCountries());
  }, []);
 

  useEffect(() => {
    setNe(selectcountry.map((el) => el.isoCode));
    setDisplaycity(selectCity.map((ele) => ele.name));
  }, [selectcountry, selectCity]);

  useEffect(() => {
    setCity(City.getCitiesOfCountry(`${ne}`));
  }, [ne]);
  


  return (
    <Box className="App">
      <>
        <Box className="left">
          <Heading fontFamily={"Roboto"} fontSize={{ base: "24px", md: "24px", lg: "36px" }}>Weather App</Heading>
          
          <Select
            placeholder="Country"
            variant="outline"
            
            width={{ base: "120px", md: "140px", lg: "178px" }}
            m="15px"
            onChange={(e) =>
              setselectCountry(
                country.filter((ele) => ele.name === e.target.value)
              )
            }
          >
            {country.map((ele, id) => {
              return <option key={id}>{ele.name}</option>;
            })}
          </Select>

          <Select
            placeholder="City"
            variant="outline"
            width={{ base: "120px", md: "140px", lg: "178px" }}
            m="15px"
            onChange={(e) =>
              setSelectCity(city.filter((ele) => ele.name === e.target.value))
            }
          >
            {city.map((ele, id) => {
              return <option key={id}>{ele.name}</option>;
            })}
          </Select>
          <Box className="displaycity">
            {displaycity !== undefined ? (
              <Box>
                <Heading size="xl"  fontSize={{ base: "22px", md: "44px", lg: "44px" }} fontFamily={"Roboto"}>
                  {" "}
                  {selectcountry[0].flag === undefined
                    ? "loading"
                    : selectcountry[0].flag}
                </Heading>
                <br></br>
                <Heading size="md"  fontSize={{ base: "16px", md: "20px", lg: "22px" }} fontFamily={"Roboto"} fontWeight={"5px"}>
                  Country:
                  {selectcountry[0].name === undefined
                    ? "loading"
                    : selectcountry[0].name}{" "}
                </Heading>
                <br></br>
                <Heading size="md"  fontSize={{ base: "16px", md: "20px", lg: "22px" }} fontFamily={"Roboto"} fontWeight={"5px"}>
                  {" "}
                  City:{displaycity}
                </Heading>{" "}
              </Box>
            ) : (
              <p>Please select country and city...</p>
            )}{" "}
          </Box>
        </Box>
        <Right data={selectCity}></Right>
      </>
    </Box>
  );
};

export default Left;
