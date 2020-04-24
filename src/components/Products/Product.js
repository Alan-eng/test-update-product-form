import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Button, Col, Row } from 'reactstrap';
import moment from 'moment'

const shortDateFormat = 'MM/DD/YYYY';
const longDateFormat = 'MM/DD/YYYY hh:mm a';

const Product = ({ product, deleteProduct }) => {
  const receiptDate = product.receiptDate ? moment(product.receiptDate).format(shortDateFormat) : '-';
  const expirationDate = product.expirationDate ? moment(product.expirationDate).format(shortDateFormat) : '-';
  const createdAt = product.createdAt ? moment(product.createdAt).format(longDateFormat) : '-';

  return (
    <Card>
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
          </ListGroup>
        </CardText>
        <Row>
          <Col sm={{ size: 4,  order: 2, offset: 1}}>
            <Button onClick={() => { deleteProduct(product.id) }}>
              Delete
            </Button>
          </Col>
          <Col sm={{ size: 4,  order: 2, offset: 1}}>
            <Link to={{
              pathname: "/update",
              state: {
                productForUpdate: product
              }
            }}>
              <Button>Update</Button>
            </Link>
          </Col>
        </Row>


      </CardBody>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default Product;
