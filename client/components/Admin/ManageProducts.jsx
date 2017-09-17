import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, RaisedButton } from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import { H2, H3 } from '../reusableStyles';

// Styles
const styles = {
  divider: {
    marginLeft: '40px',
    marginRight: '40px',
  },
  raisedButton: {
    width: 180,
    height: 40,
    margin: '60px 0 30px 0',
  },
  flatButton: {
    margin: '30px 0 30px 0',
  },
  input: {
    width: 500,
  },
};


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
  }

  render() {
    const { products } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <H2>Add New Product</H2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                name="title"
                floatingLabelText="Product title"
                style={styles.input}
              />
              <br />
              <TextField
                name="price"
                floatingLabelText="Product price"
                hintText="Type price in number only"
                style={styles.input}
              />
              <br />
              <TextField
                name="photoUrl"
                floatingLabelText="Photo URL"
                hintText="Enter URLs for photos"
                style={styles.input}
                multiLine={true}
                rows={3}
              />
              <br />
            </div>
            <div>
              <TextField
                floatingLabelText="Product Description"
                multiLine={true}
                rows={5}
              />
              <br />
              <RaisedButton
                label="Submit"
                type="submit"
              />
            </div>
          </form>
          <Divider style={styles.divider} />
          <H2>Existing Products</H2>
          <div>
            {
              products.map((product) => {
                return (
                  <div key={product.id}>
                    {product.title}
                  </div>
                );
              })
            }
          </div>
        </div>
      </MuiThemeProvider>

    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => ({
  products: state.products,
  photos: state.photos,
});

const mapDispatch = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    // addCampus: (campus) => {
    //   dispatch(addCampusThunk(campus, history));
  }
};

export default connect(mapState, mapDispatch)(ManageProducts);
