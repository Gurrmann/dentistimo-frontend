import React from 'react';
import InfoText from './InfoText.js'
import SubmitForm from './SubmitForm.js'
import Calendar from './Calendar.js'
import '../css/FrontPage.css'

function FrontPage() {
    return (
      <div >
        <InfoText className='background' />
        <SubmitForm />
        <Calendar />
      </div>


    )
}

export default FrontPage;
