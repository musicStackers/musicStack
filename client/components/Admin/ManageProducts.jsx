import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
class ManageProducts extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // const campus = {
    //   name: evt.target.campusName.value,
    //   image: evt.target.campusImage.value,
    //   description: evt.target.campusDescription.value
    // };
    // this.props.addCampus(campus);
  }

  render() {
    return (
      <div className="container">
        <h1>This is Manage Products page!</h1>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({});

const mapDispatch = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    // addCampus: (campus) => {
    //   dispatch(addCampusThunk(campus, history));
  }
};

export default connect(mapState, mapDispatch)(ManageProducts);
