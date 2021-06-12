/* eslint-disable react-hooks/exhaustive-deps */
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch('https://compass-products-backend.herokuapp.com/products');
      const body = await response.json();
      setProducts(body);
    } catch(e) {
      console.log(e);
    }
    });

  return (
    <Router>
          <Switch>
            <Route path='/' exact={true} component={ProductList}/>
            <Route path='/products/:id' component={ProductEdit}/>
          </Switch>
        </Router>
  );
}

export default App;
