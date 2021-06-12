/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import AppNavbar from '../../components/AppNavBar';
import { Link } from 'react-router-dom';

export default function ProductList(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const response = await fetch('https://compass-products-backend.herokuapp.com/products');
      const body = await response.json();
      setProducts(body);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  });

  async function remove(id) {
    await fetch(`https://compass-products-backend.herokuapp.com/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedProducts = [...products].filter(i => i.id !== id);
      setProducts(updatedProducts)
    });
  }

  function renderProductList() {
    return products.map(product => <tr key={product.id}>
      <td style={{ whiteSpace: 'nowrap' }}>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/products/" + product.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(product.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
    );
  }

  return (
    <div>
      <AppNavbar />
      <div style={{ marginTop: '2%' }}>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/products/new">Add Product</Button>
          </div>
          <h3>Products</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Name</th>
                <th width="30%">Description</th>
                <th width="40%">Price</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <p>Loading...</p>}
              {!isLoading && renderProductList()}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );


}