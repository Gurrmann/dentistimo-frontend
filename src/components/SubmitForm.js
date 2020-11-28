import React, { Component } from 'react';
import '../css/SubmitForm.css';

class SubmitForm extends Component {
    state = {
        selectedDentistryOption: 'None',
    }
    constructor(props){
        super(props)

        this.state = {
            name: '',
            phoneNumber: '',
            eMail: '',
            timeSlot: '',
            dentistry: ''
        }
    }
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handlePhoneNumberChange = (event) => {
        this.setState({
            phoneNumber: event.target.value
        })
    }
    handleEMailChange = (event) => {
        this.setState({
            eMail: event.target.value
        })
    }
    handleDentistryChange = (event) => {
        this.setState({dentistry: event.target.value});
        console.log(event.target.value)
    }
    handleTimeChange = (event) => {
        this.setState({timeSlot: event.target.value});
        console.log(event.target.value)
    }
    handleFormChange = ({ target }) => {
        this.setState({
            dentistry: target.value,
        })
    }
    handleSubmit = (event) => {
        alert(`${this.state.name} ${this.state.phoneNumber} ${this.state.eMail} ${this.state.timeSlot} ${this.state.dentistry}`)
        event.preventDefault()
    }
        
    render() {

        
        var dentistArr = []

 //The data from frontpage is sent after the webpage has loaded, so we check if it has been sent, if it has not we have an empty array
 // drop down options for timetable, not working {dentistArr.map(({monday, id}, index) => <option key={id} id ={id} >{monday}</option>)}
        if (this.props.dentistryarr.length) {
            for (var i = 0; i < this.props.dentistryarr.length; i++){
            dentistArr.push(this.props.dentistryarr[i])
        }
    }

        return(
            <div id='position'>
              <TextBlock /> 
                <form onSubmit={this.handleSubmit}>
                    <label>Name:</label><br/>
                    <input type="text" value={this.state.name} placeholder = 'Name Namerson' onChange={this.handleNameChange}/><br/>
                    <label>Phone number:</label><br/>
                    <input type="text" value={this.state.phoneNumber} placeholder = '0712345678' onChange={this.handlePhoneNumberChange}/><br/>
                    <label>Email:</label><br/>
                    <input type="text" value={this.state.eMail} placeholder = 'youremail@domain.gov' onChange={this.handleEMailChange} /><br/>
                     <label>Time:</label><br/>
                    <select value= {this.state.timeSlot} onChange={this.handleTimeChange}>
                        <option default>Select a time slot</option>
                        <option>-------</option>
                        {dentistArr.map(({name, id}, index) => <option key={id} id ={id} >{name}</option>)}  
                       
                    </select><br/>
                    <label>Dentistry:</label><br/>
                    <select value= {this.state.dentistry} onChange={this.handleDentistryChange}>
                        <option default>Select your dentistry</option>
                        <option>-------</option>
                        {dentistArr.map(({name, id}, index) => <option key={id} id ={id} >{name}</option>)}             
                    </select>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
const TextBlock = () => {
  const textBlock = 'To book a time, either pick the dentistry you want from the form or select a marker on the map and then fill in your info and submit'
  return (
      <p id='textBlock'>{textBlock}</p>
  )
}

export default SubmitForm;
