import React from 'react';
import '../css/InfoText.css';

function InfoText() {
  const banner = 'Dentistimo'
    return (
      <div>
        <h1 id='infoText'>{banner}</h1>
        <TextBlock />
      </div>
    )
}

const TextBlock = () => {
  const textBlock = 'To book a time, either pick the dentistry you want from the form or select a marker on the map and then fill in your info and submit'
  return (
      <p id='textBlock'>{textBlock}</p>
  )
}
export default InfoText;
