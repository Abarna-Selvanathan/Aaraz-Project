'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import '../Navbar/Navbar.css';
import "../../src/app/globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReLogo from "../../public/Image/logo-removebg-preview.png";

import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token) as JwtPayload | null;
        if (decoded && decoded.email) {
          setIsLoggedIn(true);
          setUserName(decoded.email.split("@")[0]);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);


  // Define the state for controlling dropdown visibility
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const toggleCollectionDropdown = () => {
    setCollectionDropdownOpen(!collectionDropdownOpen);
  }; 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
  };

  const handleSearch= () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleClose = () => {
    setIsNavbarOpen(false)
  }
  
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/list?cat=${search}`);
  };

    // Listen to scroll events
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
    <div className="navIcons">
      <div className="search-icon">
        <BiSearch
          onClick={handleSearch}
        />
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
      <div className="logo">
        <Image
          src={ReLogo}
          alt="Company Logo"
          width={100}
          height={100}
        />
      </div>
      <div className="icons">
        {!isLoggedIn ? (
          // Show login link if the user is not logged in
          <div className="user-icon" title="Login">
            <Link href="/login">
              <div className="fa fa-user" style={{ color: "white" }}></div>
            </Link>
          </div>
        ) : (
          // Show account dropdown if the user is logged in
          <div className="user-icon" title="User Account">
            <div className="dropdown" >
              <button className="dropdown-btn" onClick={toggleUserDropdown}>{userName} </button>
              {userDropdownOpen && (
              <div className="dropdown-content">
                <Link href="/account">My Account</Link>
                <Link href="/orders">My Orders</Link>
                <button onClick={handleLogout} style={{ cursor: "pointer", background: "none", border: "none" }}>
                  Logout
                </button>
              </div>
              )}
            </div>
          </div>
        )}
        <div className="cart-icon" title="Cart">
          <Link href="/cart">
            <div className="fas fa-cart-plus" style={{ color: "white" }}></div>
          </Link>
        </div>
      </div>
    </div>
    <nav>
      <Link href="/">Home</Link>
      <div className="dropdown">
        <button className="dropdown-btn" onClick={toggleCollectionDropdown}>
          Collections
          {/* <i className="fa fa-caret-down"></i> */}
        </button>
        {collectionDropdownOpen && (
          <div className="dropdown-content">
            <Link href="/frame">Frames</Link>
            <Link href="/resinart">Resin Arts</Link>
            <Link href="/walletcard">Wallet Cards</Link>
            <Link href="/handmadegift">Handmade Gifts</Link>
          </div>
        )}
      </div>
      <Link href="/contact-information">Contact</Link>


    </nav>
  </header>
);
};

export default Navbar;
