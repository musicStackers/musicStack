import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import { H2, div } from '../reusableStyles';

import { addProductThunk } from '../../store/reducers/products';

// Styles
const styles = {
  divider: {
    marginLeft: '40px',
    marginRight: '40px',
    marginTop: '40px',
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
    width: 400,
  },
  addProductDiv: {
    marginLeft: 50,
  },
  leftPane: {
    margin: 10,
  },
  rightPane: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 10,
  },
};

/**
 * COMPONENT
 */
class ManageProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCat: null,
    };
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCat(evt, index, value) {
    this.setState({ selectedCat: value });
  }

  handleSubmit(evt) {
    const { title, price, photoUrl, description } = evt.target;
    evt.preventDefault();
    const product = {
      title: title.value,
      price: price.value,
      description: description.value,
      photoURL: photoUrl.value,
      category: this.state.selectedCat,
    };
    this.props.addProduct(product);
  }

  render() {
    const { products, categories } = this.props;

    const catList = (
      <SelectField
        floatingLabelText="Category"
        style={styles.input}
        value={this.state.selectedCat}
        onChange={this.handleChangeCat}
      >
        { categories.map(category => (
          <MenuItem
            key={category.id}
            value={category.id}
            primaryText={category.title}
          />
        )) }
      </SelectField>
    );

    return (
      <MuiThemeProvider>
        <div>
          <H2>Add New Product</H2>
          <div style={styles.addProductDiv}>
            <form onSubmit={this.handleSubmit}>
              {catList}
              <br />
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
              />
              <br />
              <TextField
                name="description"
                floatingLabelText="Product Description"
                multiLine={true}
                rows={5}
                style={styles.input}
              />
              <br />
              <RaisedButton
                label="Submit"
                type="submit"
              />
            </form>
          </div>

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
const mapState = state => ({
  products: state.products,
  categories: state.categories,
  photos: state.photos,
});

const mapDispatch = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    addProduct: (product) => {
      dispatch(addProductThunk(product, history));
    },
  };
};

export default connect(mapState, mapDispatch)(ManageProducts);
