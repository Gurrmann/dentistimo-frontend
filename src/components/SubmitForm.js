import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/SubmitForm.css';
var mqtt = require('mqtt')
var response = mqtt.connect('ws://test.mosquitto.org:8080')

var userId = Math.floor(Math.random() * 1000000000)
var dentistArr = []          //The array of the selected dentistry
var selectedDate = ''        //Selected date YYYY-MM-DD
var selectedDay = ''         //Selected day
var selectedDentist = ''     //Name of selected dentist
var selectedId = ''          //Id of the selected dentistry
var count = 1

response.on('connect', function () {
    response.subscribe(userId.toString())
  })

  response.on('message', function (topic, message) {
      if (topic === userId.toString()){

        message = JSON.parse(message)
        if (message.time === 'none')
        {alert("Appointment has not been registered")}
        else 
        {alert("An appointment has been booked for" + ' ' + message.time)}
      }

})

class SubmitForm extends Component {
    state = {
        selectedDentistryOption: 'None',
    }
    constructor(props){
        super(props)

        this.state = {
            timeSlot: '',
            dentistry: '',
            timeSlotArr: []
        }
    }
    handleDentistryChange = (event) => {
        this.setState({dentistry: event.target.value,
                        timeSlot: ''
        });

        selectedDentist = event.target.value
        this.handleDentistry ()
    }

    handleDentistry () {
        if (selectedDentist === ''){
        }else {

        this.setState({timeSlotArr: []})
        var thisDentist = []
        var dayOfWeek = ''
        var start = ''
        var end = ''

        //Checks of there is a dentistry within the array that matches the name of the selected dentistry, if true it copies the dentistry
        //over to thisDentist array
        for (var i = 0; i < dentistArr.length; i++){
            if (dentistArr[i].name === selectedDentist){
                thisDentist = dentistArr[i]
                selectedId = dentistArr[i].id
            }
        }
        //Checks if which day of the week has been selected
        for (i = 0; i < Object.keys(thisDentist.openinghours).length; i++){
            if (Object.keys(thisDentist.openinghours)[i] === selectedDay){
                dayOfWeek = Object.values(thisDentist.openinghours)[i]
            }
        }
        //checks if start begins with a single digit or two
        if (dayOfWeek.charAt(1) === ':'){
            start = dayOfWeek.substring(0, 4)
            end = dayOfWeek.substring(5, 10)
        }
        else {
            start = dayOfWeek.substring(0, 6)
            end = dayOfWeek.substring(6, 11)
        }
        start = start.replace(':', '.')
        end = end.replace(':', '.')

        //Parses start and end to floats so we can do math on them
        start = parseFloat(start)
        end = parseFloat(end)

        //Calculate the total amount of hours that the dentistry will be open for the selected day
        var totalHours = (end - start)*2
        var halfHour = false

        var tempArr = []
        //Divides the openhours into timeslots
        for (i = 0; i < totalHours; i++){
        if (halfHour){
            tempArr.push({time_slot: + '' + start + '' + ':30'})
            start++
        }else {
            tempArr.push({time_slot: + '' + start + '' + ':00'})
        }
        halfHour = !halfHour
      }
      this.setState({timeSlotArr: tempArr})
  }
}

    handleTimeChange = (event) => {
        this.setState({timeSlot: event.target.value});
    }
    handleFormChange = ({ target }) => {
        this.setState({
            dentistry: target.value,
        })
    }
    handleSubmit = (event) => {
        var issuance = new Date()
        issuance = issuance.getTime()
        console.log(selectedDate)

        var bookingRequest = {

            userid: userId,
            requestid: count,
            dentistid: selectedId,
            issuance: issuance,
            time: selectedDate + ' ' + this.state.timeSlot

        }
        console.log(bookingRequest)
        event.preventDefault()
        response.publish('bookingRequest', JSON.stringify(bookingRequest))
        count++
    }
    handleDateChange = (value, event) => {
        this.setState({timeSlot: ''});
        selectedDate = ''
        var weekDay = ''
        var month = ''
        var day = ''
        var year = ''
        var selection = value.toString()
        selection = selection.replace(/\s/g, "")

        weekDay = selection.substring(0, 3)
        month = selection.substring(3, 6)
        day = year = selection.substring(6, 8)
        year = selection.substring(8, 12)

        switch(weekDay) {
            case "Mon":
                weekDay = "monday"
            break;
            case "Tue":
                weekDay = "tuesday"
            break;
            case "Wed":
                weekDay = "wednesday"
            break;
            case "Thu":
                weekDay = "thursday"
            break;
            case "Fri":
                weekDay = "friday"
            break;
            case "Sat":
                weekDay = "saturday"
            break;
            case "Sun":
                weekDay = "sunday"
            break;
          }
          switch(month) {
            case "Jan":
                month = "01"
            break;
            case "Feb":
                month = "02"
            break;
            case "Mar":
                month = "03"
            break;
            case "Apr":
                month = "04"
            break;
            case "May":
                month = "05"
            break;
            case "Jun":
                month = "06"
            break;
            case "Jul":
                month = "07"
            break;
            case "Aug":
                month = "08"
            break;
            case "Sep":
                month = "09"
            break;
            case "Oct":
                month = "10"
            break;
            case "Nov":
                month = "11"
            break;
            case "Dec":
                month = "12"
            break;
          }

          selectedDate = year + '-' + month + '-' + day
          selectedDay = weekDay

          this.handleDentistry()
    }


    render() {
 //The data from frontpage is sent after the webpage has loaded, so we check if it has been sent, if it has not we have an empty array
 // drop down options for timetable, not working {dentistArr.map(({monday, id}, index) => <option key={id} id ={id} >{monday}</option>)}
        if (this.props.dentistryarr.length) {
            if (dentistArr.length < this.props.dentistryarr.length){
                for (var i = 0; i < this.props.dentistryarr.length; i++){
                    dentistArr.push(this.props.dentistryarr[i])
                }
            }
        }
        return(
            <div id='position'>
              <div><Calendar onChange={this.handleDateChange} Days={this.state.date} /></div>
                <form onSubmit={this.handleSubmit}>
                   <label>Select a time: {this.state.timeSlot}</label><br/>
                    <select value= {this.state.timeSlot} onChange={this.handleTimeChange}>
                       <option default disabled>Select a time slot</option>
                        {this.state.timeSlotArr.map(({time_slot}, index) => <option key={time_slot} time_slot ={time_slot} >{time_slot}</option>)}
                    </select><br/>
                    <label>Select a dentistry: {this.state.dentistry}</label><br/>
                    <select value= {this.state.dentistry} onChange={this.handleDentistryChange}>
                        <option default disabled={this.state.dentistry}>Select your dentistry</option>
                        {dentistArr.map(({name, id}, index) => <option key={id} id ={id} >{name}</option>)}
                    </select>
                    <br/>
                    <input type="submit" value="Submit" disabled={!this.state.timeSlot} />
                </form>
            </div>
        )
    }
}
const TextBlock = () => {
  const textBlock = 'To book a time, either pick the dentistry you want from the form or select a marker on the map and then select a time slot and submit'
  return (
      <p id='textBlock'>{textBlock}</p>
  )
}

export default SubmitForm;
