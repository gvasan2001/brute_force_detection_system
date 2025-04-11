import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShip } from "react-icons/fa";

function NavbarComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isAuthPage = currentPath === "/" || currentPath === "/register";
  const isAdminPage = currentPath.startsWith("/admin") ;

  const shouldShowHome = !isAuthPage && !isAdminPage;


  return (
    <Navbar expand="md" bg="dark" variant="dark" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <FaShip size={24} className="text-info" />
          <span className="fw-bold fs-5">Boat Booking</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {isAuthPage ? (
              <>
                <Nav.Link as={Link} to="/">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : isAdminPage ? (
              <>
                <Nav.Link as={Link} to="/admin/boats">Add Boats</Nav.Link>
                {/* <Nav.Link as={Link} to="/admin/seats">Add Seats</Nav.Link> */}
                <Nav.Link as={Link} to="/admin/bookings">Booking List</Nav.Link>
                <Nav.Link as={Link} to="/admin/view-boats">View Boats</Nav.Link>
                <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
                <Nav.Link
                  as="span"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to logout?")) {
                      navigate("/");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  LogOut
                </Nav.Link>
              </>
            ) : (
              <>
               
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/booking">Book now</Nav.Link>
                {/* <Nav.Link as={Link} to="/prediction">Prediction</Nav.Link> */}
                {/* <Nav.Link as={Link} to="/my-bookings">View your booking</Nav.Link> */}
                <Nav.Link
                  as="span"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to logout?")) {
                      navigate("/");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  LogOut
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
