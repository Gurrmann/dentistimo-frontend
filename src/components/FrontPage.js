import React from 'react';
import SubmitForm from './SubmitForm.js'
import Calendar from './Calendar.js'
import DenistryMap from './DenistryMap.js'
import '../css/FrontPage.css'

function FrontPage() {
    return (
      <>
        <InfoText />
      <div className='submission-container-1'>
        <div className='box-1'>
          <TextBlock />
        </div>
        <div className='box-2'>
          <SubmitForm/>
        </div>
      </div>
        <div className='box-3'>
          <Calendar />
        </div>
        <div className='box-4'>
          <DenistryMap />
        </div>
      </>


    )
}

const InfoText = () => {
  const banner = 'Dentistimo'
    return (
      <div>
        <h1 id='infoText'>{banner}</h1>
      </div>
    )
}

const TextBlock = () => {
  const textBlock = 'To book a time, either pick the dentistry you want from the form or select a marker on the map and then fill in your info and submit'
  return (
      <p id='textBlock'>{textBlock}</p>
  )
}

export default FrontPage;
