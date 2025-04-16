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
import { Navigate, useNavigate } from "react-router-dom";

const UserProfile = () => {
  // Access the currentUser and token hook using the useMyContext custom hook from the ContextProvider
  const { currentUser, setCurrentUser, token, setToken } = useMyContext();
  //set the loggin session from the token
  const [loginSession, setLoginSession] = useState(null);

  const navigate = useNavigate();

  const [pageError, setPageError] = useState(false);

  const [openAccount, setOpenAccount] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  //loading state
  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token"); // or however you persist
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

  //update the credentials
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

      //fetchUser();
      toast.success("Update Credential successful");
      setTimeout(() => {
        logout(); // clear token, user, etc.
        navigate("/login"); // or wherever your login page is
      }, 1500);
    } catch (error) {
      toast.error("Update Credential failed");
    } finally {
      setLoading(false);
    }
  };

  //set the status of (credentialsNonExpired, accountNonLocked, enabled and credentialsNonExpired) current user
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
      //set the loggin session from the token
      setLoginSession(lastLoginSession);
    }
  }, [token]);

  if (pageError) {
    return <Errors message={pageError} />;
  }

  //two function for opening and closing the according
  const onOpenAccountHandler = () => {
    setOpenAccount(!openAccount);
    setOpenSetting(false);
  };

  return (
    <div className="min-h-[calc(100vh-74px)] py-10">
      {pageLoader ? (
        <>
          {" "}
          <div className="flex  flex-col justify-center items-center  h-72">
            <span>
              <ClipLoader
                size={70}
                color="#4fa94d"
                loading={true}
                cssOverride={{}}
              />
            </span>
            <span>Please wait...</span>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="xl:w-[70%] lg:w-[80%] sm:w-[90%] w-full sm:mx-auto sm:px-0 px-4   min-h-[500px] flex lg:flex-row flex-col gap-4 ">
            <div className="flex-1  flex flex-col shadow-lg shadow-gray-300 gap-2 px-4 py-6">
              <div className="flex flex-col items-center gap-2   ">
                <Avatar
                  alt={currentUser?.username}
                  src="/static/images/avatar/1.jpg"
                />
                <h3 className="font-semibold text-2xl">
                  {currentUser?.username}
                </h3>
              </div>
              <div className="my-4 ">
                <div className="space-y-2 px-4 mb-1">
                  <h1 className="font-semibold text-md text-slate-800">
                    UserName :{" "}
                    <span className=" text-slate-700  font-normal">
                      {currentUser?.username}
                    </span>
                  </h1>
                  <h1 className="font-semibold text-md text-slate-800">
                    Role :{" "}
                    <span className=" text-slate-700  font-normal">
                      {currentUser && currentUser["roles"][0]}
                    </span>
                  </h1>
                </div>
                <div className="py-3">
                  <Accordion expanded={openAccount}>
                    <AccordionSummary
                      className="shadow-md shadow-gray-300"
                      onClick={onOpenAccountHandler}
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <h3 className="text-slate-800 text-lg font-semibold ">
                        Update User Credentials
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails className="shadow-md shadow-gray-300">
                      <form
                        className=" flex flex-col gap-3"
                        onSubmit={handleSubmit(handleUpdateCredential)}
                      >
                        <InputField
                          label="UserName"
                          required
                          id="username"
                          className="text-sm"
                          type="text"
                          message="*Username is required"
                          placeholder="Enter your username"
                          register={register}
                          errors={errors}
                        />{" "}
                        <InputField
                          label="Email"
                          required
                          id="email"
                          className="text-sm"
                          type="email"
                          message="*Email is required"
                          placeholder="Enter your email"
                          register={register}
                          errors={errors}
                          readOnly
                        />{" "}
                        <InputField
                          label="Enter New Password"
                          id="password"
                          className="text-sm"
                          type="password"
                          message="*Password is required"
                          placeholder="type your password"
                          register={register}
                          errors={errors}
                          min={6}
                        />
                        <Buttons
                          disabled={loading}
                          className="bg-customRed font-semibold flex justify-center text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
                          type="submit"
                        >
                          {loading ? <span>Loading...</span> : "Update"}
                        </Buttons>
                      </form>
                    </AccordionDetails>
                  </Accordion>
                  <div className="pt-10 ">
                    <h3 className="text-slate-800 text-lg font-semibold  mb-2 px-2">
                      Last Login Session
                    </h3>
                    <div className="shadow-md shadow-gray-300 px-4 py-2 rounded-md">
                      <p className="text-slate-700 text-sm">
                        Your Last LogIn Session when you are loggedin <br />
                        <span>{loginSession}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
