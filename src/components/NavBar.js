
import React, { useContext } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { useTheme } from '../hooks/useTheme'
import SearchBar from './SearchBar'

export default function NavBar() {
    const { color } = useTheme();
    return (
        <Navbar variant="light" expand="lg" className='py-4 nabBar' style={{ background: color }}>
            <Container>
                <Navbar.Brand className='mr-4'>
                    <Link to="/">Cooking Ninja</Link>
                </Navbar.Brand>
                <SearchBar />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Button variant="outline-secondary" className='px-5'>
                            <Link to="/create">Create</Link>
                        </Button>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
