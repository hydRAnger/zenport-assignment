import React, {Component} from 'react';
// Akira: I use Bootstrap as the component library this time, but Material-UI or ant-design are also alternative.
import {PageHeader, Pagination, Pager} from 'react-bootstrap';
import {css} from 'react-emotion';
import {List, fromJS} from 'immutable';

import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import Review from './components/Review'
import {availableMeals} from './models/dish';

// Akira: I prefer use Immutable.js to make data model more intuitive.
const stepInfo = new List([
  {
    label: 'Step1',
    component: Step1
  },
  {
    label: 'Step2',
    component: Step2
  },
  {
    label: 'Step3',
    component: Step3
  },
  {
    label: 'Review',
    component: Review
  }
])

// Akira: I've never used emotion before, Looking forward to your suggestions.
const appStyle = css`
  text-align: center;
  width: 800px;
  margin-right: auto;
  margin-left: auto;

  ul.pagination {
    width: 100%;
  }
`;

const stepStyle = css`
  .min-height: 200px;

  .container-fluid {
    padding: 0;
  }

  .alert {
    padding: 5px 15px;
    margin: 20px 0;
  }
`;

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentStep: 0,
      order: fromJS({
        meal: availableMeals.first(),
        people: 1,
        restaurant: '',
        dishes: []
      }),
      stepValidaties: fromJS([false, false, false, true])
    };

    this.handleOrderUpdate = this.handleOrderUpdate.bind(this);
    this.handleStepValidate = this.handleStepValidate.bind(this);
    this.handleToNextStep = this.handleToNextStep.bind(this);
    this.handleToPreviousStep = this.handleToPreviousStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOrderUpdate(order) {
    this.setState({order});
  }

  handleStepValidate(step, isValid) {
    this.setState({
      stepValidaties: this.state.stepValidaties.set(step, isValid)
    });
  }

  handleToNextStep() {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  }

  handleToPreviousStep() {
    this.setState({
      currentStep: this.state.currentStep - 1
    });
  }

  handleSubmit() {
    console.info('Order Info: ');
    console.dir(this.state.order.toJS());
    console.info('Maybe we will get opportunity for meeting in Tokyo.  --Akira');
  }

  render() {
    const {currentStep, order, stepValidaties} = this.state;
    const StepCompnent = stepInfo.get(currentStep).component;

    return (
      <div className={appStyle}>
        <PageHeader>
          Zenport <small>meals ordering system</small>
        </PageHeader>
        <Pagination>
          {stepInfo.map((step, idx) =>
            <Pagination.Item key={idx} active={idx === currentStep}>
              {step.label}
            </Pagination.Item>)}
        </Pagination>
        <div className={stepStyle}>
          <StepCompnent
            order={order}
            onUpdate={this.handleOrderUpdate}
            onValidate={this.handleStepValidate.bind(this, currentStep)}
            />
        </div>
        <Pager>
          {currentStep > 0 &&
            <Pager.Item previous href="#" onSelect={this.handleToPreviousStep}>
              Previous
            </Pager.Item>
          }
          {currentStep < stepInfo.size - 1 ?
            <Pager.Item next href="#" onSelect={this.handleToNextStep} disabled={!stepValidaties.get(currentStep)}>
              Next
            </Pager.Item>
            :
            <Pager.Item next href="#" onSelect={this.handleSubmit}>
              Submit
            </Pager.Item>
          }
        </Pager>
      </div>
    );
  }
}

export default App;
