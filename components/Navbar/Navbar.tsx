'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import '../Navbar/Navbar.css';
import "../../src/app/globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReLogo from "../../public/Image/logo-removebg-preview.png";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const [findUsers, setFindUsers] = useState<any[]>([]); // Fix: Initialize as an empty array
  const [loggedUserId, setLoggedUserId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null); // Fix: Define state for current user
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/api/cookie');
        if (response.status === 200 && response.data.user) {
          setIsLoggedIn(true);
          setLoggedUserId(response.data.user.id);
        }

        const users = await axios.get('/api/user');
        if (users.status === 200) {
          setFindUsers(users.data.users); 
        }
      } catch (error: any) {
        setError(error);
        console.error('Failed to fetch user data:', error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (loggedUserId && findUsers.length > 0) {
      const user = findUsers.find((u) => u._id === loggedUserId);
      console.log(user)
      if (user) {
        setCurrentUser(user);
        setUserName(user.name);
      }
    }
  }, [loggedUserId, findUsers]);

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);

  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);
  const toggleCollectionDropdown = () => setCollectionDropdownOpen(!collectionDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
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
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
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

        <div className="logo">
          <Image src={ReLogo} alt="Company Logo" width={100} height={100} />
        </div>

        <div className="icons">
          {!isLoggedIn ? (
            <div className="user-icon" title="Login">
              <Link href="/login">
                <div className="fa fa-user" style={{ color: "white" }}></div>
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
