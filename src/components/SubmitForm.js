import React from 'react';
import '../css/SubmitForm.css';

function SubmitForm () {
    return(
        <div>
            <form>
                <label>Name:</label><br/>
                <input type="text" name="name" placeholder = 'Name Namerson'/><br/>
                <label>Phone number:</label><br/>
                <input type="text" phoneNumber="phone" placeholder = '0713333337'/><br/>
                <label>Email:</label><br/>
                <input type="text" eMail="mail" placeholder = 'youremail@domain.gov' /><br/>
                <label>Time:</label><br/>
                (Selected Time Slot Goes Here)<br/>
                <label>Dentistry:</label><br/>
                (Selected Dentistry Goes Here)<br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default SubmitForm;