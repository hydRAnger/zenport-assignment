import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Alert} from 'react-bootstrap';
import {List} from 'immutable';

import {availableMeals} from '../models/dish';

const validator = order => order.get('meal') && order.get('people') > 0 && order.get('people') <= 10;

class Step1 extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isValid: validator(props.order)
    }

    this.handleMealUpdate = this.handleMealUpdate.bind(this);
    this.handlePeopoleUpdate = this.handlePeopoleUpdate.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isValid: validator(nextProps.order)
    });
  }

  shouldComponentUpdate(nextProps) {
    const currentOrder = this.props.order;
    const nextOrder = nextProps.order;

    return !currentOrder.equals(nextOrder);
  }

  componentDidUpdate() {
    this.handleValidate(this.props.order);
  }

  componentDidMount() {
    this.handleValidate(this.props.order);
  }

  handleValidate(order) {
    const isValid = validator(order);
    
    this.setState({
      isValid
    }, () => {
      this.props.onValidate && this.props.onValidate(isValid);
    })
  }

  handleMealUpdate(event) {
    const meal = event.target.value;
    const newOrder = this.props.order.set('meal', meal).set('restaurant', '').set('dishes', new List());

    event.preventDefault();
    this.props.onUpdate && this.props.onUpdate(newOrder);
  }

  handlePeopoleUpdate(event) {
    const people = event.target.value ? parseInt(event.target.value, 10) : 0;
    const newOrder = this.props.order.set('people', people);

    event.preventDefault();
    this.props.onUpdate && this.props.onUpdate(newOrder);
  }

  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Please Select a meal</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            required
            value={this.props.order.get('meal')}
            onChange={this.handleMealUpdate}
            >
            {availableMeals.map(meal => <option key={meal} value={meal}>{meal}</option>)}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Please Enter Number of people</ControlLabel>
          <FormControl
            type="number"
            value={this.props.order.get('people').toString()}
            onChange={this.handlePeopoleUpdate}
          />
          {this.state.isValid ||
            <Alert bsStyle="warning">
              People shoul be 1-10.
            </Alert>
          }
        </FormGroup>
      </form>
    );
  }
}

export default Step1;
