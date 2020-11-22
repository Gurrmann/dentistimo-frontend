import React from 'react';
import SubmitForm from './SubmitForm.js'
import Calendar from './Calendar.js'
import DenistryMap from './DenistryMap.js'
import '../css/FrontPage.css'

function FrontPage() {
    return (
      <>
        <InfoText />
      <div className='container-1'>
        <div className='box-2'>
          <SubmitForm/>
        </div>
        <div className='box-4'>
          <DenistryMap />
        </div>
      </div>
        <div className='box-3'>
          <Calendar />
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

export default FrontPage;
