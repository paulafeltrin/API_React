import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Filmes from './components/Filmes';
import Series from './components/Series';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

//npm install react-router-dom ROTAS DOM

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`

const Menu = styled.nav`
display: flex;
justify-content: space-evenly;
width: 98vw;
background-color: lightgray;
`

export default class App extends React.Component{
  render(){
    return(
      <Router>

        <GlobalStyle />

        <Menu>
          <Link to='/filmes'><p>Filmes</p></Link>
          <Link to='/series'><p>Séries</p></Link>
        </Menu>

        <Routes>
          <Route path='/filmes' element={<Filmes />} />
          <Route path='/series' element={<Series />}/>
        </Routes>
      </Router>
    )
  }
}
