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
import Cookies from "js-cookie";

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
      const token = Cookies.get("token"); 
      console.log("Token from cookies:", token); // Debug log
  
      if (!token) {
        console.log("No token found. User is logged out.");
        setIsLoggedIn(false);
        setCurrentUser(null);
        return;
      }
  
      try {
        const response = await axios.get('/api/cookie');
        console.log("User API response:", response.data); // Debug log
  
        if (response.status === 200 && response.data.user) {
          setIsLoggedIn(true);
          setLoggedUserId(response.data.user.id);
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
  
        const users = await axios.get('/api/user');
        console.log("All users data:", users.data); // Debug log
  
        if (users.status === 200) {
          setFindUsers(users.data.users);
        }
      } catch (error) {
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
  const [logoutDropdownOpen, setLogoutDropdownOpen] = useState(false);

  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);
  const toggleCollectionDropdown = () => setCollectionDropdownOpen(!collectionDropdownOpen);
  const toggleLogoutDropdown =() =>  setLogoutDropdownOpen(!logoutDropdownOpen)

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout'); // Optional API call
    } catch (error) {
      console.error("Logout failed", error);
    }
  
    Cookies.remove("token"); // Remove token
    setIsLoggedIn(false);
    setUserName("");
    setCurrentUser(null);
    setLoggedUserId("");
    setFindUsers([]);
  
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

  console.log("isLoggedIn:", isLoggedIn);
  console.log("userName:", userName);
  console.log("currentUser:", currentUser);
  console.log("loggedUserId:", loggedUserId);
  console.log("findUsers:", findUsers);


  return (
    <>
    <div className="welcome-mess">Welcome to our store !!</div>
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <Image src={ReLogo} alt="Company Logo" width={90} height={90} />
        </div>

        <nav>
          <Link href="/">Home</Link>
          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleCollectionDropdown}>
              Collections
            </button>
            {collectionDropdownOpen && (
              <div className="dropdown-content">
                <Link href="/handmadegift">Handmade Gifts</Link>
                <Link href="/resinart">Resin Arts</Link>
                <Link href="/frame">Frames</Link>
                <Link href="/walletcard">Wallet Cards</Link>
              </div>
            )}
          </div>
          <Link href="/contact-information">Contact</Link>
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
                      <Link href="/account">My Account</Link>

                    <div className="dropdown">
                    <button className="dropdown-btn" onClick={toggleLogoutDropdown}>
                      Logout
                    </button>
                    {logoutDropdownOpen && (
                      <div className="logout-btn">
                        <button className= "logout-btns" onClick={handleLogout}>Yes</button>
                        <button className= "logout-btns" onClick={handleCancelLogout}>No </button>
                      </div>
                    )}
                    </div>

                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="cart-icon" title="Cart">
              <Link href="/cart">
                <div className="fas fa-cart-plus" style={{ color: "black" }}></div>
              </Link>
            </div>
          </div>
        </div>

        
    
    </header>
    </>
  );
};

export default Navbar;
