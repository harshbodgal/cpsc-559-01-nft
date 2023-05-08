import React from 'react';
import { NavLink } from 'react-router-dom';
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
                    <Button to="/" activeClassName="active">
                        <img src={Home} width="35" height="35" className="logo" alt="" />
                    </Button>
                    <Button to="/Sell" activeClassName="active">
                        Sell
                    </Button>
                    <Button to="/My-items" activeClassName="active">
                        My Items
                    </Button>
                    <Button to="/Purchases" activeClassName="active">
                        Purchases
                    </Button>
                </nav>
                <Nav>
                    {wallet ? (
                        <NavLink
                            href={`https://etherscan.io/address/${wallet}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-button">
                            <Button variant="outline">
                                {wallet.slice(0, 6) + '...' + wallet.slice(39, 42)}
                            </Button>

                        </NavLink>
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
