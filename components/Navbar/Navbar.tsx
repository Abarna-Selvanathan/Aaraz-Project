'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

import '../Navbar/Navbar.css';
import "../../src/app/globals.css";

import ReLogo from "../../public/Image/logo-removebg-preview.png";
import Image from "next/image";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
// import Cookies from "js-cookie";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  // const [user, setUser] = useState<any[]>([]); // Fix: Initialize as an empty array
  // const [loggedUserId, setLoggedUserId] = useState<string>('');
  // const [currentUser, setCurrentUser] = useState<any>(null); // Fix: Define state for current user
  // const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/api/cookie');

        if (response.status === 200 && response.data.user) {
          const user = await axios.post('/api/user/getUserById', {
            id: response.data.user.id
          });
          if (user.status === 200) {
            setUserName(user.data.name);
            setIsLoggedIn(true);
          }
        } else {
          setIsLoggedIn(false);
        }


      } catch (error) {
        
      }
    };

    getUser();
  }, []);

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
  const [logoutDropdownOpen, setLogoutDropdownOpen] = useState(false);

  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);
  const toggleCollectionDropdown = () => setCollectionDropdownOpen(!collectionDropdownOpen);
  const toggleLogoutDropdown = () => setLogoutDropdownOpen(!logoutDropdownOpen);

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout');
    } catch (error) {
      console.error("Logout failed", error);
    }

    setIsLoggedIn(false);

    setTimeout(() => {
      router.push("/"); // Redirect to home
      window.location.reload(); // Force full page reload
    }, 300);
  };

  const handleCancelLogout = () => {
    setLogoutDropdownOpen(false); // Close the logout dropdown
    router.push("/"); // Navigate to home page
  };

  const handleSearch = () => setIsNavbarOpen(!isNavbarOpen);
  const handleClose = () => setIsNavbarOpen(false);

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/list?cat=${search}`);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="welcome-mess">Welcome to our store !!</div>
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <Image src={ReLogo} alt="Company Logo" width={130} height={130} />
        </div>

        <nav>
          <Link href="/" className={pathname === "/" ? "active-link" : ""}>Home</Link>
          <Link href="/collection" className={pathname === "/collection" ? "active-link" : ""}>Collection</Link>
          <Link href="/contact-information" className={pathname === "/contact-information" ? "active-link" : ""}>Contact</Link>
        </nav>

        <div className="navIcons">
          <div className="search-icon">
            <BiSearch onClick={handleSearch} />
            {isNavbarOpen && (
              <div className="searchbar">
                <div className="searchdiv">
                  <form onSubmit={handleSubmit} className="searchform">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..." />
                    <button>
                      <BiSearch className="search-icon" />
                    </button>
                  </form>
                  <CgClose onClick={handleClose} className="close" />
                </div>
              </div>
            )}
          </div>

          <div className="icons">
            {!isLoggedIn ? (
              <div className="user-icon" title="Login">
                <Link href="/login">
                  <div className="fa fa-user" style={{ color: "black" }}></div>
                </Link>
              </div>
            ) : (
              <div className="user-icon" title="User Account">
                <div className="dropdown">
                  <button className="dropdown-btn" onClick={toggleUserDropdown}>
                    {userName}
                  </button>
                  {userDropdownOpen && (
                    <div className="dropdown-content">
                      <Link href="/account">Account</Link>
                      <button className="dropdown-btn" onClick={toggleLogoutDropdown}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {logoutDropdownOpen && (
              <div className="logout-dropdown">
                <button className="logout-btns" onClick={handleLogout}>Yes</button>
                <button className="logout-btns" onClick={handleCancelLogout}>No</button>
              </div>
            )}
            {/* <div className="cart-icon" title="Cart">
              <Link href="/cart">
                <div className="fas fa-cart-plus" style={{ color: "black" }}></div>
              </Link>
            </div> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;