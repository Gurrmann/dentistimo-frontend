import React from 'react';
import SubmitForm from './SubmitForm.js'
import Calendar from './Calendar.js'
import DenistryMap from './DenistryMap.js'
import '../css/FrontPage.css'
import SidePanel from './SidePanel.js'


function FrontPage() {
    return (
      <>        
        <InfoText />        
        <SidePanel />      
      <div className='calendar'>        
          <Calendar />      
      </div>      
      <div className='submission-map-container'>        
        <div className='submit-form'>          
        <SubmitForm/>        
      </div>        
      <div className='map'>          
        <DenistryMap />        
        </div>      
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
