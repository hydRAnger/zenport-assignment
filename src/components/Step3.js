import React, {Component} from 'react';
import {Grid, Row, Col, FormControl, Button, Glyphicon, Collapse, Alert} from 'react-bootstrap';
import {css} from 'react-emotion';
import {fromJS} from 'immutable';

import {getDishesByMealAndRestaurant} from '../models/dish';

const validator = (order) => {
  const numberOfDishes = order.get('dishes').reduce((sum, dish) => sum += dish.get('num'), 0);

  return numberOfDishes >= order.get('people') && numberOfDishes <= 10;
}

const gridStyle = css`
  .row {
    text-align: left;
    margin-bottom: 15px;
  }
`;

class Step3 extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dishesInMenu: getDishesByMealAndRestaurant(props.order.get('meal'), props.order.get('restaurant')),
      isValid: validator(props.order)
    }

    this.handleDishSelect = this.handleDishSelect.bind(this);
    this.handleDishNumberChange = this.handleDishNumberChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleAddDish = this.handleAddDish.bind(this);
    this.handleRemoveDish = this.handleRemoveDish.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dishesInMenu: getDishesByMealAndRestaurant(nextProps.order.get('meal'), nextProps.order.get('restaurant')),
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

  handleDishSelect(oldDish, event) {
    const dishes = this.props.order.get('dishes');
    const newDish = fromJS({
      name: event.target.value,
      num: 1
    });
    const newDishes = oldDish ? dishes.map(d => d.get('name') === oldDish ? newDish : d) : dishes.push(newDish);
    const newOrder = this.props.order.set('dishes', newDishes);

    event.preventDefault();
    this.props.onUpdate && this.props.onUpdate(newOrder);
  }

  handleDishNumberChange(dish, event) {
    const num = event.target.value ? parseInt(event.target.value, 10) : 0;
    const newDishes = this.props.order.get('dishes').map(d =>
      d.get('name') === dish ? d.set('num', num) : d
    );
    const newOrder = this.props.order.set('dishes', newDishes);

    event.preventDefault();
    this.props.onUpdate && this.props.onUpdate(newOrder);
  }

  handleAddDish(unorderedDishes, event) {
    const newDishes = unorderedDishes.size ?
      this.props.order.get('dishes').push(fromJS({
        name: unorderedDishes.first(),
        num: 1
      })) 
      :
      this.props.order.get('dishes');
    
    const newOrder = this.props.order.set('dishes', newDishes);

    event.preventDefault();
    this.props.onUpdate && this.props.onUpdate(newOrder);
  }

  handleRemoveDish(dish, event) {
    const newDishes = this.props.order.get('dishes').filterNot(d => d.get('name') === dish);
    const newOrder = this.props.order.set('dishes', newDishes);

    event.preventDefault();
    this.props.onUpdate && this.props.onUpdate(newOrder);
  }


  renderDishes(unorderedDishes) {
    const dishes = this.props.order.get('dishes');
    const dishesInMenu = this.state.dishesInMenu;

    if (!dishes.size) {
      return (
        <Row>
          <Col md={6}>
            <FormControl
              componentClass="select"
              placeholder="select"
              value=""
              required
              onChange={this.handleDishSelect.bind(this, '')}
              >
              {dishesInMenu.map(d =>
                <option key={d} value={d}>
                  {d}
                </option>
              ).unshift(
                <option key="" value="">
                  ---
                </option>
              )}
            </FormControl>
          </Col>
          <Col md={5}>
            <FormControl
              type="number"
              value="1"
              required
              onChange={this.handleDishNumberChange.bind(this, '')}
              >
            </FormControl>
          </Col>
        </Row>
      );
    }

    return dishes.map((dish, idx) => {
      const alternativeDishes = unorderedDishes.unshift(dish.get('name'));

      return (
        <Row key={idx}>
          <Col md={6}>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={dish.get('name')}
              required
              onChange={this.handleDishSelect.bind(this, dish.get('name'))}
              >
              {alternativeDishes.map(d =>
                <option key={d} value={d}>
                  {d}
                </option>
              )}
            </FormControl>
          </Col>
          <Col md={5}>
            <FormControl
              type="number"
              value={dish.get('num').toString()}
              required
              onChange={this.handleDishNumberChange.bind(this, dish.get('name'))}
              >
            </FormControl>
          </Col>
          <Col md={1}>
            {dishes.size > 1 &&
              <Button
                bsStyle="warning"
                bsSize="small"
                style={{margin: '4px 0', padding: '1px 4px'}}
                onClick={this.handleRemoveDish.bind(this, dish.get('name'))}
                >
                <Glyphicon glyph="trash" />
              </Button>
            }
          </Col>
        </Row>
      );
    });
  }

  render() {
    const people = this.props.order.get('people') || 1;
    const dishes = this.props.order.get('dishes');
    const currentDishes = dishes.map(d => d.get('name'));
    const unorderedDishes = this.state.dishesInMenu.filterNot(d => currentDishes.includes(d));

    return (
      <Grid fluid className={gridStyle}>
        <Row>
          <Col md={6}>
            <label>
              Please Select a Dish
            </label>
          </Col>
          <Col md={5}>
            <label>
              Please enter no. of servings
            </label>
          </Col>
        </Row>
        {this.renderDishes(unorderedDishes)}
        {dishes.size > 0 && unorderedDishes.size > 0 &&
          <Row>
            <Col md={6}>
              <Button onClick={this.handleAddDish.bind(this, unorderedDishes)}>
                <Glyphicon glyph="plus" /> Add Dish
              </Button>
            </Col>
          </Row>
        }
        <Collapse in={!this.state.isValid}>
          <Row>
            <Col md={11}>
              <Alert bsStyle="warning">
                {`For ${people} people, the total number of dishes (i.e number of dishes * respective serving) should be ${people} - 10`}
              </Alert>
            </Col>
          </Row>
        </Collapse>
      </Grid>
    );
  }
}

export default Step3;
