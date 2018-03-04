import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {css} from 'react-emotion';

const gridStyle = css`
  .row {
    margin-bottom: 15px;
  }

  div.left {
    text-align: right;
  }

  div.right {
    text-align: left;
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
          <Col md={6} className="left">
            <label>
              Meal:
            </label>
          </Col>
          <Col md={6} className="right">
            <label>
              {this.props.order.get('meal')}
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="left">
            <label>
              Number of People:
            </label>
          </Col>
          <Col md={6} className="right">
            <label>
              {this.props.order.get('people')}
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="left">
            <label>
              Restaurant:
            </label>
          </Col>
          <Col md={6} className="right">
            <label>
              {this.props.order.get('restaurant')}
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="left">
            <label>
              Dishes:
            </label>
          </Col>
          <Col md={6} className="right">
            {this.props.order.get('dishes').map((dish, idx) =>
              <p key={idx}>
                <label>
                  {`+ ${dish.get('name')} - ${dish.get('num')}`}
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
