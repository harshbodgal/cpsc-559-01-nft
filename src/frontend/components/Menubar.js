import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import Sports from './Sports.png'
import Home from './Home.png'

const Menu = ({ web3Handler, wallet}) => {
  return (
    <Navbar bg = "primary" variant = "dark">
        <Container>
            <Navbar.Toggle aria-controls="response" />
            <Navbar.Collapse id="response">
                <nav>
                    <Navbar.Brand>
                        <img src={Sports} width="45" height="45" className="" alt="" />
                        &nbsp; Sports NFT Marketplace
                    </Navbar.Brand>
                    <Button>
                        <Link to="/" activeClassName="active">
                            <img src={Home} width="35" height="35" className="logo" alt="" />
                        </Link>
                    </Button>
                    <Link to="/Sell" activeClassName="active">
                        <Button>    
                            Sell                       
                        </Button>
                    </Link>
                    <Link to="/My-items" activeClassName="active">
                        <Button>    
                            My-items                       
                        </Button>
                    </Link>
                    <Link to="/Purchases" activeClassName="active">
                        <Button>    
                            Purchases                      
                        </Button>
                    </Link>
                </nav>
                <Nav>
                    {wallet ? (
                        <Nav.Link
                            href={`https://etherscan.io/address/${wallet}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-button">
                            <Button variant="outline">
                                {wallet.slice(0, 6) + '...' + wallet.slice(39, 42)}
                            </Button>
                        </Nav.Link>
                    ) : (
                        <Button onClick={web3Handler} style={{backgroundColor: 'red' }}>Connect Metamask</Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Menu;
