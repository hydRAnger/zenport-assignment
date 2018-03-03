import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {css} from 'react-emotion';

const gridStyle = css`
  .row {
    text-align: left;
    margin-bottom: 15px;
  }
`;

class Review extends Component {
  componentDidMount() {
    this.props.onValidate && this.props.onValidate(true);
  }

  render() {
    return (
      <Grid fluid className={gridStyle}>
        <Row>
          <Col md={6}>
            <label>
              Meal
            </label>
          </Col>
          <Col md={6}>
            <label>
              {this.props.order.get('meal')}
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label>
              Number of People
            </label>
          </Col>
          <Col md={6}>
            <label>
              {this.props.order.get('people')}
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label>
              Restaurant
            </label>
          </Col>
          <Col md={6}>
            <label>
              {this.props.order.get('restaurant')}
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label>
              Dishes
            </label>
          </Col>
          <Col md={6}>
            {this.props.order.get('dishes').map((dish, idx) =>
              <p key={idx}>
                <label>
                  {`${dish.get('name')} - ${dish.get('num')}`}
                </label>
              </p>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Review;
