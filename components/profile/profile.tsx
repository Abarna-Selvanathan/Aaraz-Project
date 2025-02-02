import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../profile/profile.css"; 
import axios from "axios";



const Profile = () => {

  const router = useRouter();
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/cookie");
        const id = response.data.user.id
  
        if (response.status === 200) {
          const userResponse = await axios.post('/api/user/get-user', {
            id 
          });
          setUserData(userResponse.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUserData();
  }, []);
   
  console.log(userData)
  

  const handleEditClick = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
    setIsModified(true);
  };

  const handleSave = async () => {
    if (isModified) {
      try {
        const response = await fetch(`/api/user/${userData._id}`, {
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to update user.");
        }

        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser.updatedUser)); 
        setUserData(updatedUser.updatedUser);

        toast.success("Profile updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error: any) {
        console.error("Error updating profile:", error.message);
        toast.error(`Error: ${error.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsModified(false);
      }
    } else {
      toast.info("No changes were made.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setIsEditing({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    router.push("/login"); 
  };

  return (
    <div className="profileContainer">
      <ToastContainer />
      <div className="headerprofile">
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="contentprofile">
        <div className="imageprofile">
          {/* <Image src={ProfileImage} alt="Profile Image" width={150} height={150} /> */}
        </div>

        <div className="infoprofile">
          <h1>Edit Profile</h1>
          <p className="userEmail">{userData.email || "No email available"}</p>
        </div>

        <div className="formInputs">
          {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
            <div key={field} className="formGroup">
              <input
                type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                value={userData[field as keyof typeof userData]}
                onChange={(e) => handleChange(e, field)}
                readOnly={!isEditing[field as keyof typeof isEditing]}
              />
              <span
                className="editSymbol"
                onClick={() => handleEditClick(field)}
                role="button"
                tabIndex={0}
              >
                ✎
              </span>
            </div>
          ))}
        </div>

        <button className="buttonSave" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
