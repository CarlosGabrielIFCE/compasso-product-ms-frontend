/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../components/AppNavBar';

function ProductEdit(props) {
  const emptyItem = {
    name: '',
    description: '',
    price: ''
  }

  const [item, setItem] = useState(emptyItem);

  useEffect(async () => {
    try {
      if (props.match.params.id !== 'new') {
        const product = await (await fetch(`https://compass-products-backend.herokuapp.com/products/${props.match.params.id}`)).json();
        console.log(product);
        setItem(product);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newItem = { ...item };
    newItem[name] = value;
    setItem(newItem);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch('https://compass-products-backend.herokuapp.com/products' + (item.id ? '/' + item.id : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    props.history.push('/');
  }

  return (<div>
        <AppNavbar/>
        <div style={{ marginTop: '2%'}}>
        <Container>
            {<h2>{item.id ? 'Edit Product' : 'Add Product'}</h2>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={item.name || ''}
                           onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" id="description" value={item.description || ''}
                           onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="number" name="price" id="price" value={item.price || ''}
                           onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
        </div>
    </div>)

}

export default withRouter(ProductEdit);