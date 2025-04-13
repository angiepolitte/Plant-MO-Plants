import React, { useEffect, useState } from "react";
import api from "../services/api.jsx";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Errors from "../reusable-code/Errors.jsx";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { MdDateRange } from "react-icons/md";

//Material ui data grid has used for the table
//initialize the columns for the tables and (field) value is used to show data in a specific column dynamically
export const userListsColumns = [
  {
    field: "username",
    headerName: "UserName",
    minWidth: 200,
    headerAlign: "center",
    disableColumnMenu: true,
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal  border",
    renderHeader: (params) => <span className="text-center">UserName</span>,
  },

  {
    field: "email",
    headerName: "Email",
    aligh: "center",
    width: 260,
    editable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal  border  text-center ",
    align: "center",
    disableColumnMenu: true,
    renderHeader: (params) => <span>Email</span>,
    renderCell: (params) => {
      return (
        <div className=" flex  items-center justify-center  gap-1 ">
          <span>
            <MdOutlineEmail className="text-slate-700 text-lg" />
          </span>
          <span>{params?.row?.email}</span>
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border ",
    cellClassName: "text-slate-700 font-normal  border  ",
    renderHeader: (params) => <span className="ps-10">Status</span>,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-cente",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 200,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <Link
          to={`/admin/users/${params.id}`}
          className="h-full flex  items-center justify-center   "
        >
          <button className="bg-btnColor text-white px-4 flex justify-center items-center  h-9 rounded-md ">
            Views
          </button>
        </Link>
      );
    },
  },
];

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/getusers");
        const usersData = Array.isArray(response.data) ? response.data : [];
        setUsers(usersData);
      } catch (err) {
        setError(err?.response?.data?.message);

        toast.error("Error fetching users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const rows = users.map((item) => {
    //set the data for each rows in the table according to the field name in columns
    //Example: username is the keyword in row it should matche with the field name in column so that the data will show on that column dynamically
    return {
      id: item.userId,
      username: item.username,
      email: item.email,
      status: item.enabled ? "Active" : "Inactive",
    };
  });

  if (error) {
    return <Errors message={error} />;
  }

  return (
    <div className="p-4">
      <div className="py-4">
        <h1 className="text-center text-2xl font-bold text-slate-800 uppercase">
          All Users
        </h1>
      </div>
      <div className="overflow-x-auto w-full mx-auto">
        {loading ? (
          <>
            <div className="flex  flex-col justify-center items-center  h-72">
              <span>
                <ClipLoader
                  size={70}
                  color="#4fa94d"
                  loading={true}
                  aria-label="blocks-loading"
                  cssOverride={{}}
                />
              </span>
              <span>Please wait...</span>
            </div>
          </>
        ) : (
          <>
            {" "}
            <DataGrid
              className="w-fit mx-auto"
              rows={rows}
              columns={userListsColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6,
                  },
                },
              }}
              disableRowSelectionOnClick
              pageSizeOptions={[6]}
              disableColumnResize
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersList;
