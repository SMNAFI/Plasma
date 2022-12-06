import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../actions/userActions'
import plasma from '../assets/images/plasma.png'

const Header = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(removeUser())
  }

  return (
    <header>
      <Navbar
        variant='dark'
        expand='lg'
        collapseOnSelect
        style={{ paddingTop: '24px', paddingBottom: '0px' }}
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image src={plasma} style={{ height: '36px' }} className='me-3' />
              Plasma
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/request'>
                <Nav.Link>Request for blood</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/feed'>
                <Nav.Link>Live Feed</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/donars'>
                <Nav.Link>Find Donars</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/faq'>
                <Nav.Link>FAQ</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/contact'>
                <Nav.Link>Contact Us</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  {userInfo.isAdmin && (
                    <>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Manage Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/requests'>
                        <NavDropdown.Item>Manage Requests</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
