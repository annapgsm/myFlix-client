import { Navbar, Container, Nav, Form, InputGroup } from "react-bootstrap";
import { Link, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "../../redux/reducers/user.js";
import { setFilter } from "../../redux/reducers/movies.js"; 


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
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg" style={{ width: "100%", margin: 0, paddingBottom: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.7)" }}>
      <Container fluid className="p-0">
        <Navbar.Brand as={Link} to="/" style={{ paddingLeft: '15px' }}>
          Movies App
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav" className="d-flex align-items-center  py-0">
        
          <Nav className="me-auto align-items-center">
            {/* Currently empty */}
          </Nav>
          
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
