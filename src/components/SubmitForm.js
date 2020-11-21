import React from 'react';
import '../css/SubmitForm.css';

function SubmitForm () {
    return(
        <div>
            <form>
                <label>Name:<input type="text" name="name" placeholder = 'Name'/></label><br/>
                <label>Phone number:<input type="text" phoneNumber="phone" placeholder = 'Phone number'/></label><br/>
                <label>Email:<input type="text" eMail="mail" placeholder = 'Email' /></label><br/>
                <label>ssn:<input type="text" ssn="ssn" placeholder = 'SSN'/></label><br/>
                <label>Time:</label><br/>
                <label>Selected Dentistry:</label><br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default SubmitForm;