import { useState } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "../../redux/reducers/user.js";
import { setFilter } from "../../redux/reducers/movies.js";
import "./navigation-bar.scss";

export const NavigationBar = () => {

  const user = useSelector((state) => state.user.user);
  const filter = useSelector((state) => state.movies.movies.filter || "");
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const handleToggle = () => setExpanded(!expanded);
  const handleNavClick = () => setExpanded(false);

  const hideNavPaths = ["/login", "/signup"];
  const showNavLinks = user && !hideNavPaths.includes(location.pathname);

  const handleSearchChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="md" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
          DarkFrame
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />

        <Navbar.Collapse id="basic-navbar-nav">
          <div className="nav-wrapper">
            {showNavLinks ? (
              <Nav className="ms-auto nav-content">
                <Nav.Link as={Link} to="/" onClick={handleNavClick}>
                  Home
                </Nav.Link>

                <Form className="nav-search">
                  <Form.Control
                    type="text"
                    placeholder="Search movies..."
                    value={filter}
                    onChange={handleSearchChange}
                  />
                </Form>

                <Nav.Link as={Link} to="/profile" onClick={handleNavClick}>
                  Profile
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    dispatch(setUser(null));
                    localStorage.clear();
                    setExpanded(false);
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            ) : null}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


/*


export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const filter = useSelector((state) => state.movies.movies.filter) || ""; 

  const handleSearchChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const hideNavPaths = ["/login", "/signup"];
  const showNavLinks = user && !hideNavPaths.includes(location.pathname);

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="md" style={{ width: "100%", margin: 0, paddingBottom: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.7)" }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ paddingLeft: '15px' }}>
          DarkFrame
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex align-items-center  py-0">          
          <Nav className="ms-auto align-items-center">
            {showNavLinks ? (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => dispatch(setUser(null))}>Logout</Nav.Link>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
*/
