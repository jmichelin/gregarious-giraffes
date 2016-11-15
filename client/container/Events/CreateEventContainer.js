import React from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Navbar, ControlLabel, Checkbox, Radio, HelpBlock } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitEventForm } from '../../actions/eventForm';
import { browserHistory } from 'react-router';
import TimePicker from 'react-bootstrap-time-picker';
var DatePicker = require("react-bootstrap-date-picker");
import Select from 'react-select';
import axios from 'axios';


function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

const ANIMALS = [
    {label: 'All Welcome', value: 'All'},
    {label: 'Cat', value: 'Cat'},
    {label: 'Dog', value: 'Dog'},
    {label: 'Bear', value: 'Bear'},
    {label: 'Turtle', value: 'Turtle'},
    {label: 'Lion', value: 'Lion'},
    {label: 'Giraffe', value: 'Giraffe'},
    {label: 'Kangaroo', value: 'Kangaroo'},
    {label: 'Frog', value: 'Frog'},
    {label: 'Monkey', value: 'Monkey'},
    {label: 'Rabbit', value: 'Rabbit'},
    {label: 'Sheep', value: 'Sheep'},
    {label: 'Cow', value: 'Cow'},
    {label: 'Goat', value: 'Goat'},
    {label: 'Parrot', value: 'Parrot'},
    {label: 'Dinosaur', value: 'Dinosaur'},
    {label: 'Pig', value: 'Pig'},
    {label: 'Honey Badger', value: 'Honey Badger'},
    {label: 'Squirrels', value: 'Squirrels'},
    {label: 'Horse', value: 'Horse'},
    {label: 'Ostrich', value: 'Ostrich'},
    {label: 'Armadillo', value: 'Armadillo'},
    {label: 'Vulture', value: 'Vulture'},
    {label: 'Crawfish', value: 'Crawfish'},
    {label: 'Nutria', value: 'Nutria'},
    {label: 'Duck', value: 'Duck'},
    {label: 'Hippo', value: 'Hippo'},
    {label: 'Moose', value: 'Moose'},
    {label: 'DoDo', value: 'DoDo'},
    {label: 'Clownfish', value: 'Clownfish'},
    {label: 'Reindeer', value: 'Reindeer'},
    {label: 'Chicken', value: 'Chicken'},
    {label: 'Other', value: 'Other'}
];

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDangerChange = this.handleDangerChange.bind(this);
        this.handleEatingChange = this.handleEatingChange.bind(this);
        this.handleGiftChange = this.handleGiftChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.state = {
            time: 0,
            date: new Date().toISOString(),
            gifts: 'yes',
            location: '',
            danger: '',
            eating: '',
            options: ANIMALS,
            value: []
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let animals = this.state.value.split(',').join(', ');
        //submit action with all form data
        this.props.submitEventForm({
            time: this.state.time,
            date: this.state.date,
            gifts: this.state.gifts,
            danger: this.state.danger,
            animals: animals,
            eating: this.state.eating,
            location: this.state.location,
            email: this.props.email
        });
        //redirect to profile
        browserHistory.push('/myProfile');
    }


    handleTimeChange(time) {
        this.setState({time});
    }

    handleDateChange(date) {
        this.setState({date});
    }

    handleEatingChange(eating) {
        this.setState({eating: eating.currentTarget.value});
    }

    handleGiftChange(gifts) {
        this.setState({gifts});
    }

    handleDangerChange(danger) {
        this.setState({danger: danger.currentTarget.value});
    }

    handleLocationChange(location) {
        this.setState({location: location.currentTarget.value});
    }

    handleSelectChange(value) {
        this.setState({value});
    }


    render() {
        return (
            <div className="eventForm">
                <h3>Create an Event</h3>
                <form onSubmit={this.handleSubmit} data-toggle='validator'>

                    <FormGroup>
                        <ControlLabel>Time</ControlLabel>
                        <TimePicker onChange={this.handleTimeChange} value={this.state.time}/>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Date</ControlLabel>
                        <DatePicker value={this.state.date} onChange={this.handleDateChange}/>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Location</ControlLabel>
                        <FormControl
                            value={this.state.location}
                            onChange={this.handleLocationChange}
                            componentClass="textarea"
                            placeholder="Where will the event be held?"
                            required='true'/>
                    </FormGroup>

                    <FormGroup>
                        <Select multi simpleValue disabled={this.state.disabled} value={this.state.value}
                                placeholder="Which type of animal(s) in attendance" options={this.state.options}
                                onChange={this.handleSelectChange}/>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Dangers</ControlLabel>
                        <FormControl value={this.state.danger}
                                     onChange={this.handleDangerChange}
                                     componentClass="textarea"
                                     placeholder="Are there any dangers to be aware of?"
                                     required='true'/>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Eating Arrangements</ControlLabel>
                        <FormControl value={this.state.eating} onChange={this.handleEatingChange} componentClass="textarea"
                                     placeholder="Should I plan on eating before the event?" required='true'/>
                    </FormGroup>


                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Are gifts accepted?</ControlLabel>
                        <select noValidate value={this.state.gifts} onChange={this.handleGiftChange}
                                className='selectpicker' title="yes or no" data-max-options="1" required='true'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </FormGroup>

                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {email: state.reducers.isAuthorized.email}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({submitEventForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);