import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import moment from 'moment'


const ProductForm = ({ addProduct, newId, categoriesById, updateProduct, productForUpdate }) => {
    const [name, setName] = useState(productForUpdate ? productForUpdate.name : '')
    const [brand, setBrand] = useState(productForUpdate ? productForUpdate.brand : '')
    const [rating, setRating] = useState(productForUpdate ? productForUpdate.rating : '')
    const [itemsInStock, setItemsInStock] = useState(productForUpdate ? productForUpdate.itemsInStock : 0)
    const [receiptDate, setReceiptDate] = useState(
        productForUpdate && productForUpdate.receiptDate ?
            productForUpdate.receiptDate : '')
    const [categories, setCategories] = useState(productForUpdate ? productForUpdate.categories.map(obj => obj.id) : [])
    const [expirationDate, setExpirationDate] = useState(
        productForUpdate && productForUpdate.expirationDate ?
            productForUpdate.expirationDate : '')

    const validate = {
        name: () => name.length > 0 && name.length < 200 ? true : false,
        expirationDate: () => {
            if (expirationDate) {
                const selectedDate = moment(expirationDate);
                const now = moment();
                if (selectedDate.diff(now, 'days') > 30) { return true }
                else { return false }
            } else {
                return true
            }
        },
        categories: () => categories.length >= 1 && categories.length <= 5 ? true : false
    }

    return (
        <Form>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="productName">Product Name</Label>
                        <Input
                            invalid={!validate.name()}
                            type="text"
                            name="name"
                            id="productName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormFeedback>Product name length must be between 0 and 200</FormFeedback>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="brandName">Brand</Label>
                        <Input
                            type="text"
                            name="brand"
                            id="brandtName"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <Label for="productRating">Rating</Label>
                        <Input
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            type="select"
                            name="select"
                            id="productRating"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                (num) => <option key={num}>{num}</option>)
                            }
                        </Input>
                        <FormFeedback>Rating is required</FormFeedback>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="itemsInStock">Items in Stock</Label>
                        <Input
                            value={itemsInStock}
                            onChange={(e) => setItemsInStock(e.target.value)}
                            type="number"
                            name="itemsInStock"
                            id="itemsInStock"
                            placeholder="number"
                        />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="productCategories">Categories</Label>
                        <Input
                            invalid={!validate.categories()}
                            value={categories.map((id, index) => categoriesById[id].name)}
                            onChange={(e) => {
                                let options = e.target.options;
                                var newCategories = [];
                                for (let i in options) {
                                    if (options[i].selected) {
                                        newCategories.push(parseInt(options[i].id));
                                    }
                                }
                                setCategories(newCategories)
                            }}
                            type="select"
                            name="selectMulti"
                            id="productCategories"
                            multiple
                        >
                            {Object.keys(categoriesById).map((key) => {
                                const categoryName = categoriesById[key].name
                                const categoryId = categoriesById[key].id
                                return <option
                                    id={categoryId}
                                    key={categoriesById[key].id}
                                >{categoryName}</option>
                            })}
                        </Input>
                        <FormFeedback>product should have from 1 to 5 categories</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label for="expirationDate">Expiration Date</Label>
                        <Input
                            invalid={!validate.expirationDate()}
                            value={expirationDate}
                            type="date"
                            name="date"
                            id="expirationDate"
                            placeholder="date placeholder"
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                        <FormFeedback>product should expire not less than 30 days since now</FormFeedback>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="receiptDate">ReceiptDate Date</Label>
                        <Input
                            value={receiptDate}
                            type="date"
                            name="date"
                            id="receiptDate"
                            placeholder="date placeholder"
                            onChange={(e) => setReceiptDate(e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Link to='/'>
                {productForUpdate ?
                    <Button
                        disabled={Object.keys(validate).some(field => !validate[field]())}
                        onClick={(e) => {
                            updateProduct(
                                {
                                    id: productForUpdate.id,
                                    name,
                                    rating,
                                    featured: (() => rating > 8 ? true : false)(),
                                    itemsInStock,
                                    receiptDate: (() => receiptDate ?
                                        moment(receiptDate).format('YYYY-MM-DD') : null)(),
                                    brand,
                                    categories,
                                    expirationDate: (() => expirationDate ?
                                        moment(expirationDate).format('YYYY-MM-DD') : null)(),
                                    createdAt: productForUpdate.createdAt,
                                }
                            )
                        }}
                    >
                        Update Product
                    </Button>
                    :
                    <Button
                        disabled={Object.keys(validate).some(field => !validate[field]())}
                        onClick={(e) => {
                            addProduct(
                                {
                                    id: newId,
                                    name,
                                    rating,
                                    featured: (() => rating > 8 ? true : false)(),
                                    itemsInStock,
                                    receiptDate: (() => receiptDate ?
                                        moment(receiptDate).format('YYYY-MM-DD') : null)(),
                                    brand,
                                    categories,
                                    expirationDate: (() => expirationDate ?
                                        moment(expirationDate).format('YYYY-MM-DD') : null)(),
                                    createdAt: moment().format(),
                                }
                            )
                        }}
                    >
                        Add Product
                    </Button>
                }
            </Link>
        </Form>
    );
}

ProductForm.propTypes = {
    newId: PropTypes.number,
    categoriesById: PropTypes.object.isRequired,
    addProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    productForUpdate: PropTypes.object,
};

export default ProductForm;