import React from 'react';
import '../css/SubmitForm.css';

function SubmitForm () {
    return(
        <div>
            <form>
                <label>
                    Name:
                    <input type="text" name="name"/>
                </label>
                <br/>
                <label>
                    Phone number:
                    <input type="text" phoneNumber="phone" />
                </label>
                <br/>
                <label>
                    Email:
                    <input type="text" eMail="mail" />
                </label>
                <br/>
                <label>
                    Ssn:
                    <input type="text" ssn="ssn" />
                </label>
                <br/>
                <label>
                    Time:
                </label>
                <br/>
                <label>
                    Selected Dentistry:
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default SubmitForm;