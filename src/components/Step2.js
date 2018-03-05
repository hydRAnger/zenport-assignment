import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Collapse, Alert} from 'react-bootstrap';
import {List} from 'immutable';

import {getRestaurantsByMeal} from '../models/dish';

const validator = order => !!order.get('restaurant');

class Step2 extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      restaurants: getRestaurantsByMeal(props.order.get('meal')),
      isValid: validator(props.order)
    }

    this.handleRestaurantUpdate = this.handleRestaurantUpdate.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      // Akira: Cause this is a React test and has no async need, I'm not involve Redux for now.
      restaurants: getRestaurantsByMeal(nextProps.order.get('meal')),
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

  handleRestaurantUpdate(event) {
    const restaurant = event.target.value;
    const newOrder = this.props.order.set('restaurant', restaurant).set('dishes', new List());

    event.preventDefault();
    this.props.onUpdate && this.props.onUpdate(newOrder);
  }

  render() {
    const restaurants = this.state.restaurants;
    const restaurant = this.props.order.get('restaurant');

    return (
      <form>
        <FormGroup>
          <ControlLabel>Please Select a Restaurant</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            value={restaurant}
            required
            onChange={this.handleRestaurantUpdate}
            >
            {restaurants.map(restaurant =>
              <option key={restaurant} value={restaurant}>
                {restaurant}
              </option>
            ).unshift(
              <option key="" value="">
                ---
              </option>
            )}
          </FormControl>
          <Collapse in={!this.state.isValid}>
            <Alert bsStyle="warning">
              Please select a restaurant
            </Alert>
          </Collapse>
        </FormGroup>
      </form>
    );
  }
}

export default Step2;
