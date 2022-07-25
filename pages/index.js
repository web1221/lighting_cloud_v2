import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, TextField } from "@mui/material";

export default function Home() {
  const [weatherData, setWeatherData] = useState("");
  const [formData, setFormData] = useState();
  const [results, setResults] = useState();
  useEffect(() => {}, [results]);

  const handleClick = async () => {
    let formDataArray = formData.split(",");
    console.log("what is formdata", formDataArray);
    let resultsArray = [];
    console.log(formDataArray);
    for (let i = 0; i < formDataArray.length; i++) {
      const trimZip = formDataArray[i].trim();
      console.log("hit");
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=0d577d442bb44bb1a32231355222307&q=${trimZip}&aqi=no`
      )
        .then((response) => response.json())
        .then((data) => {
          resultsArray.push(
            `Zip Code: ${trimZip} -- Current Temp: ${data?.current?.temp_f}`
          );
          console.log("inside foreach", resultsArray);
        });
    }
    console.log("ending", resultsArray);
    await setResults(resultsArray);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Lighting Cloud</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Light Cloud</h1>
      <TextField
        onChange={(e) => {
          setFormData(e.target.value);
        }}
        label="Enter Zip Codes"
        variant="outlined"
      />
      <Button onClick={handleClick} variant="outlined">
        SUBMIT
      </Button>
      {results &&
        results?.map((result) => {
          return (
            <div key={result}>
              <p>{result}</p>
            </div>
          );
        })}
    </div>
  );
}
