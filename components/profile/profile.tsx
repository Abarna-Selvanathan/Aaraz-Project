"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../profile/profile.css"; 
import axios from "axios";
import { XCircle } from "lucide-react";

const Profile = () => {
  const [preview, setPreview] = useState<string>('');
  const router = useRouter();
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    phoneNumber: "", 
    profileImage: ""
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phoneNumber: false,
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/cookie");
        const id = response.data.user.id;
  
        if (response.status === 200) {
          const userResponse = await axios.post('/api/user/getUserById', { id });
          setUserData(userResponse.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUserData();
  }, []);

  const handleEditClick = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleCloseEdit = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleClosePage = () => {
    router.push("/account"); 
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
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
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
      name: false,
      email: false,
      phoneNumber: false,
    });
  };

  return (
    <div className="profileContainer">
      <ToastContainer />
      
      {/* Close Button */}
      <div className="closeButton" onClick={handleClosePage}>
        <XCircle size={30} />
      </div>

      <div className="contentprofile">
        <div className="infoprofile">
          <h1>Edit Profile</h1>
        </div>

        <div className="formInputs">
          {["name", "email", "phoneNumber"].map((field) => (
            <div key={field} className="formGroup">
              <input
                type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                value={userData[field as keyof typeof userData]}
                onChange={(e) => handleChange(e, field)}
                readOnly={!isEditing[field as keyof typeof isEditing]}
              />
              {!isEditing[field as keyof typeof isEditing] ? (
                <span
                  className="editSymbol"
                  onClick={() => handleEditClick(field)}
                  role="button"
                  tabIndex={0}
                >
                  ✎
                </span>
              ) : (
                <span
                  className="closeSymbol"
                  onClick={() => handleCloseEdit(field)}
                  role="button"
                  tabIndex={0}
                >
                  <XCircle size={18} />
                </span>
              )}
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
