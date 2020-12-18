import React, { useState, Fragment } from 'react'
import SubmitForm from './SubmitForm.js'
import '../css/FrontPage.css'
import SidePanel from './SidePanel.js'
var mqtt = require('mqtt')
var client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

client.on('connect', function () {
  client.subscribe('dentistries')

})


function FrontPage() {

  client.on('message', function (topic, message) {
    if (topic === 'dentistries'){
    //start with and empty array
    var dentistArr = []
      message = message.toString()
      message = JSON.parse(message)
   
      //compares the current array length to the length of the message, just to avoid errors
    if (dentistArr.length < message.length){
      for (var i = 0; i < message.length; i++){
        dentistArr.push(message[i])
      }
      //sets the message to be the array
    setMesg(dentistArr)

    //stops the subscriber
    client.end()
    }
  }
  })
  

  const [mesg, setMesg] = useState(<Fragment><em>nothing heard</em></Fragment>);

  //on line 50 we pass the message to the submitform component

    return (
      <>
        <InfoText />
        <SidePanel />
      <div className='submission-map-container'>
        <div className='submit-form'>
          <SubmitForm dentistryarr={mesg} /> 
        </div>
        <div className='map'>
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
