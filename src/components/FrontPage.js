import React from 'react';
import InfoText from './InfoText.js'
import SubmitForm from './SubmitForm.js'
import Calendar from './Calendar.js'
import DenistryMap from './DenistryMap.js'
import '../css/FrontPage.css'

function FrontPage() {
    return (
      <div className='container-1'>
        <InfoText />
        <SubmitForm />
        <Calendar />
        <DenistryMap />
      </div>


    )
}

export default FrontPage;
