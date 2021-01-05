import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/SubmitForm.css';
import mapboxgl from 'mapbox-gl';

var mqtt = require('mqtt')
var response = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')
mapboxgl.accessToken = 'pk.eyJ1IjoibGVvd2VpMDkyMiIsImEiOiJja2hydGI1dG8yZzZyMnJwZXVmYmN5bDRjIn0.OpbuLDJ2ptHBjK1JBaE3pg';

var userId = Math.floor(Math.random() * 1000000000)
var dentistArr = []          //The array of the selected dentistry
var selectedDate = ''        //Selected date YYYY-MM-DD
var selectedDay = ''         //Selected day
var selectedDentist = ''     //Name of selected dentist
var selectedId = ''          //Id of the selected dentistry
var count = 1

var options = { qos: 2 }

response.on('connect', function () {
    response.subscribe(userId.toString(), options)
})

response.on('message', function (topic, message) {
    if (topic === userId.toString()) {
        message = JSON.parse(message)
        if (message.time === 'none') {
            alert("Could not book appointment, timeslot is already occupied")
        } else {
            if (!alert("An appointment has been booked for" + ' ' + message.time + ' ' + "on" + ' ' + selectedDate)) {
                window.location.reload();
            }
        }
    }

})

class SubmitForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            timeSlot: '',
            dentistry: '',
            timeSlotArr: [],
            selectedMonday: '',
            selectedTuesday: '',
            selectedWednesday: '',
            selectedThursday: '',
            selectedFriday: '',
            lng: 11.974560,
            lat: 57.708870,
            zoom: 11.5
        }
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        if (dentistArr.length) {

            var tempA = {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': []
                }
            }

            for (var i = 0; i < dentistArr.length; i++) {
                if (this.getAppointments(dentistArr[i]).length > 0) {
                    var long = dentistArr[i].coordinate.longitude
                    var lat = dentistArr[i].coordinate.latitude
                    var temp =
                    {
                        'type': 'Feature',
                        'properties': {
                            'name': dentistArr[i].name,
                            'description':
                                '<strong>' + dentistArr[i].name + '</strong>' + '<p>Adress: ' + dentistArr[i].address + '</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [long, lat]
                        }
                    }
                    tempA.data.features.push(temp)
                }
            }

            map.on('load', function () {
                map.loadImage(
                    'dentistryMarker.png',
                    function (error, image) {
                        if (error) throw error;
                        map.addImage('marker', image);

                        map.addSource('point', tempA);
                        map.addLayer({
                            'id': 'points',
                            'type': 'symbol',
                            'source': 'point',
                            'layout': {
                                'icon-image': 'marker',
                                'icon-size': 0.07
                            }
                        });

                    }
                );

                var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                map.on('mouseenter', 'points', function (e) {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';

                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var desc = e.features[0].properties.description


                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    // Populate the popup and set its coordinates
                    // based on the feature found.

                    popup.setLngLat(coordinates).setHTML(desc).addTo(map);
                });

                map.on('mouseleave', 'points', function () {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });

            });
        }

        map.on('click', 'points', (e) => {
            selectedDentist = e.features[0].properties.name
            this.setState({
                dentistry: e.features[0].properties.name,
                timeSlot: ''
            });
            this.handleDentistry()
        });

        // add map controllers
        map.addControl(new mapboxgl.NavigationControl());

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    handleDentistryChange = (event) => {
        this.setState({
            dentistry: event.target.value,
            timeSlot: ''
        });

        selectedDentist = event.target.value
        this.handleDentistry()
    }

    getAppointments(thisDentist) {
        var dayOfWeek = ''
        var start = ''
        var end = ''
        //Checks if which day of the week has been selected
        for (var i = 0; i < Object.keys(thisDentist.openinghours).length; i++) {
            if (Object.keys(thisDentist.openinghours)[i] === selectedDay) {
                dayOfWeek = Object.values(thisDentist.openinghours)[i]
            }
        }

        //checks if start begins with a single digit or two
        if (dayOfWeek.charAt(1) === ':') {
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
        var totalHours = (end - start) * 2
        var halfHour = false

        var tempArr = []
        var selectedDentistry = thisDentist

        /*Find existing appointment with selected date and time and compare with amount of dentists
        If there exists a greater amount of dentists than amount of booked appointments,
        create time slot and push it to array */

        //Divides the openhours into timeslots
        for (i = 0; i < totalHours; i++) {
            if (halfHour) {
                if (start === 12) {
                }
                else if (selectedDentistry.appointments.filter(element => element.timeSlot === selectedDate + ' ' + start + ':30').length < selectedDentistry.dentists) {
                    tempArr.push({ time_slot: + start + ':30' })
                }
                start++
            } else {
                if (start === 12 || start === 9) {
                }
                else if (selectedDentistry.appointments.filter(element => element.timeSlot === selectedDate + ' ' + start + ':00').length < selectedDentistry.dentists) {
                    tempArr.push({ time_slot: + start + ':00' })

                }
            }
            halfHour = !halfHour
        }
        return tempArr
    }

    handleDentistry() {
        if (selectedDentist === '') {
        } else {

            this.setState({ timeSlotArr: [] })
            var thisDentist = []

            //Checks of there is a dentistry within the array that matches the name of the selected dentistry, if true it copies the dentistry
            //over to thisDentist array
            for (var i = 0; i < dentistArr.length; i++) {
                if (dentistArr[i].name === selectedDentist) {
                    thisDentist = dentistArr[i]
                    selectedId = dentistArr[i].id
                    this.setState({
                        selectedMonday: dentistArr[i].openinghours.monday,
                        selectedTuesday: dentistArr[i].openinghours.tuesday,
                        selectedWednesday: dentistArr[i].openinghours.wednesday,
                        selectedThursday: dentistArr[i].openinghours.thursday,
                        selectedFriday: dentistArr[i].openinghours.friday
                    })
                }
            }
            this.setState({ timeSlotArr: this.getAppointments(thisDentist) })
        }
    }

    handleTimeChange = (event) => {
        this.setState({ timeSlot: event.target.value });
    }
    handleFormChange = ({ target }) => {
        this.setState({
            dentistry: target.value,
        })
    }
    handleSubmit = (event) => {
        var issuance = new Date()
        issuance = issuance.getTime()


        var bookingRequest = {

            userid: userId,
            requestid: count,
            dentistid: selectedId,
            issuance: issuance,
            time: selectedDate + ' ' + this.state.timeSlot,
            numberOfDentists: dentistArr.find(element => element.id === selectedId).dentists

        }
        event.preventDefault()
        response.publish('bookingRequest', JSON.stringify(bookingRequest))
        count++
    }
    handleDateChange = (value, event) => {
        this.setState({ timeSlot: '' });
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

        switch (weekDay) {
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
        switch (month) {
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

        this.componentDidMount()
        this.handleDentistry()

    }

    render() {
        //The data from frontpage is sent after the webpage has loaded, so we check if it has been sent, if it has not we have an empty array
        // drop down options for timetable, not working {dentistArr.map(({monday, id}, index) => <option key={id} id ={id} >{monday}</option>)}
        if (this.props.dentistryarr.length) {
            if (dentistArr.length < this.props.dentistryarr.length) {
                for (var i = 0; i < this.props.dentistryarr.length; i++) {
                    dentistArr.push(this.props.dentistryarr[i])
                }
            }
        }

        return (

            <div id='position'>
                <div className="calendarContainer"><Calendar defaultActiveStartDate={new Date()} minDate={new Date()} onChange={this.handleDateChange} Days={this.state.date} />
                <br />
                {this.state.dentistry && <form className="formContainer" onSubmit={this.handleSubmit}>
                    <label>Select a time: {this.state.timeSlot}</label><br />
                    <select value={this.state.timeSlot} onChange={this.handleTimeChange}>
                        <option default disabled>Select a time slot</option>
                        {this.state.timeSlotArr.map(({ time_slot }, index) => <option key={time_slot} time_slot={time_slot} >{time_slot}</option>)}
                    </select><br />
                    <input type="submit" value="Submit" disabled={!this.state.timeSlot} />
                </form>}
                {this.state.dentistry && <span className="hoursContainer">
                    {this.state.dentistry && <strong className='displayCenter' >{this.state.dentistry}</strong>}
                    <br />
                    {this.state.dentistry && <label className='displayLeft' >Monday: {this.state.selectedMonday}</label>}
                    <br />
                    {this.state.dentistry && <label className='displayLeft' >Tuesday: {this.state.selectedTuesday}</label>}
                    <br />
                    {this.state.dentistry && <label className='displayLeft' >Wednesday: {this.state.selectedWednesday}</label>}
                    <br />
                    {this.state.dentistry && <label className='displayLeft' >Thursday: {this.state.selectedThursday}</label>}
                    <br />
                    {this.state.dentistry && <label className='displayLeft' >Friday: {this.state.selectedFriday}</label>}
                </span>}
                </div>
                <div>
                    <div ref={el => this.mapContainer = el} className='mapContainer' />
                </div>
                <br />
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
