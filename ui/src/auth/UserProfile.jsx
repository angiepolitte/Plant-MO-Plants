import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useMyContext } from "../store/ContextApi";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InputField from "../reusable-code/InputFeild";
import { useForm } from "react-hook-form";
import Buttons from "../reusable-code/Buttons";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import Errors from "../reusable-code/Errors";
import { useNavigate } from "react-router-dom";
import "../custom-css/UserProfile.css";

const UserProfile = () => {
  const { currentUser, setCurrentUser, token, setToken } = useMyContext();
  const [loginSession, setLoginSession] = useState(null);
  const navigate = useNavigate();
  const [pageError, setPageError] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
      password: "",
    },
    mode: "onTouched",
  });

  const handleUpdateCredential = async (data) => {
    const newUsername = data.username;
    const newPassword = data.password;

    try {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("newUsername", newUsername);
      formData.append("newPassword", newPassword);
      await api.post("/auth/update-credentials", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Update Credential successful");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error("Update Credential failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      setValue("username", currentUser.username);
      setValue("email", currentUser.email);
    }
  }, [currentUser, setValue]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const lastLoginSession = moment
        .unix(decodedToken.iat)
        .format("dddd, D MMMM YYYY, h:mm A");
      setLoginSession(lastLoginSession);
    }
  }, [token]);

  if (pageError) {
    return <Errors message={pageError} />;
  }

  const onOpenAccountHandler = () => {
    setOpenAccount(!openAccount);
  };

  return (
    <div className="user-profile-container">
      {pageLoader ? (
        <div className="loader-container">
          <ClipLoader size={70} color="#4fa94d" loading={true} />
          <span>Please wait...</span>
        </div>
      ) : (
        <div className="profile-wrapper">
          <div className="profile-card">
            <div className="avatar-section">
              <Avatar
                alt={currentUser?.username}
                src="/static/images/avatar/1.jpg"
              />
              <h3>{currentUser?.username}</h3>
            </div>
            <div className="info-section">
              <p>
                <strong>Username:</strong> {currentUser?.username}
              </p>
              <p>
                <strong>Role:</strong> {currentUser?.roles?.[0]}
              </p>
              <Accordion expanded={openAccount}>
                <AccordionSummary
                  onClick={onOpenAccountHandler}
                  expandIcon={<ArrowDropDownIcon />}
                >
                  <h3>Update User Credentials</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <form
                    className="update-form"
                    onSubmit={handleSubmit(handleUpdateCredential)}
                  >
                    <InputField
                      label="UserName"
                      required
                      id="username"
                      type="text"
                      message="*Username is required"
                      placeholder="Enter your username"
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      label="Email"
                      required
                      id="email"
                      type="email"
                      message="*Email is required"
                      placeholder="Enter your email"
                      register={register}
                      errors={errors}
                      readOnly
                    />
                    <InputField
                      label="Enter New Password"
                      id="password"
                      type="password"
                      message="*Password is required"
                      placeholder="Type your password"
                      register={register}
                      errors={errors}
                      min={6}
                    />
                    <Buttons
                      className="update-button"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Update"}
                    </Buttons>
                  </form>
                </AccordionDetails>
              </Accordion>
              <div className="session-info">
                <h4>Last Login Session</h4>
                <p>{loginSession}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
