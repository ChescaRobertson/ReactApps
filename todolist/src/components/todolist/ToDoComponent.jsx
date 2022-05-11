import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ToDoDataService from '../../api/todo/ToDoDataService';
import AuthenticationService from './AuthenticationService';

class ToDoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      description: '',
      targetDate: moment(new Date()).format('YYYY-MM-DD'),
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount = async () => {
    if (this.state.id === -1) {
      return;
    }
    let username = AuthenticationService.getLoggedInUser();
    try {
      const response = await ToDoDataService.retrieveTodo(
        username,
        this.state.id
      );
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
      });
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = async (values) => {
    let username = AuthenticationService.getLoggedInUser();
    let todo = {
      id: this.state.id,
      description: values.description,
      targetDate: values.targetDate,
    };

    if (this.state.id === -1) {
      try {
        await ToDoDataService.createTodo(username, todo);
        this.props.navigate(`/todos`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await ToDoDataService.updateTodo(username, this.state.id, todo);
        this.props.navigate(`/todos`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = 'Enter a description';
    } else if (values.description.length < 5) {
      errors.description = 'Enter a description of at least 5 characters';
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = 'Enter a valid date';
    }
    return errors;
  }

  render() {
    let { description, targetDate } = this.state;
    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default ToDoComponent;
