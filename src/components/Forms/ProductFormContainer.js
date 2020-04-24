import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import ProductForm from './ProductForm';
import { addProduct, updateProduct } from '../../actions/products'
import { getCategoriesById } from '../../reducers/categories';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';


class ProductFormContainer extends Component {

  render() {
    const { products, categoriesById, addProduct, updateProduct } = this.props;
    let productForUpdate = null
    if (this.props.location &&
      this.props.location.state &&
      this.props.location.state.productForUpdate
    ) { productForUpdate = this.props.location.state.productForUpdate }

    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              {productForUpdate ? <Header name="Update Product" /> : <Header name="Add Product" />}
            </Col>
            <Col xs="auto">
              <Link to="/"><Button>Back to Products</Button></Link>
            </Col>
          </Row>
        </Container>
        {productForUpdate ?
          <ProductForm categoriesById={categoriesById} updateProduct={updateProduct} productForUpdate={productForUpdate} /> :
          <ProductForm categoriesById={categoriesById} addProduct={addProduct} newId={products[products.length - 1].id + 1} />
        }
      </Fragment>
    );
  }
}

ProductFormContainer.propTypes = {
  products: PropTypes.array.isRequired,
  categoriesById: PropTypes.object.isRequired,
  addProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  productForUpdate: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
  return {
    addProduct: (obj) => dispatch(addProduct(obj)),
    updateProduct: (obj) => dispatch(updateProduct(obj)),

  }
}
const mapStateToProps = (state) => {
  const products = state.products
  const categoriesById = getCategoriesById(state);

  return {
    products,
    categoriesById
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductFormContainer);
