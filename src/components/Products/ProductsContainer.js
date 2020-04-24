import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import ProductsList from './ProductsList';
import { fetchCategories } from '../../actions/categories';
import { fetchProducts, deleteProduct } from '../../actions/products';
import { getCategoriesById } from '../../reducers/categories';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';

class ProductsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }

  render() {
    const { products, dispatch } = this.props;

    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <Header name="Products" />
            </Col>
            <Col xs="auto">
              <Link to="/create"><Button>Create Product</Button></Link>
            </Col>
          </Row>
        </Container>
        <ProductsList
          products={products}
          deleteProduct={(id) => dispatch(deleteProduct(id))}
        />
      </Fragment>
    );
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state);

  const products = state.products.map(product => {
    const categories = product.categories.map(id => categoriesById[id])

    return {
      ...product,
      categories
    };
  });

  return {
    products,
  }
};

export default connect(mapStateToProps)(ProductsContainer);
