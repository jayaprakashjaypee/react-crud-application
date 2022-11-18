import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

import "../css/Allusers.css";

const formValidation = yup.object({
  FirstName: yup.string().required("You Forgot To Write First Name😱"),
  LastName: yup.string().required("You Forgot To Write Last Name😱"),
  Email: yup.string().required("You Forgot To Write Email 🥺🥺"),
});

export function AllUsers() {
  const [alllUsersData, setalllUsersData] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "JD@gm.com" },
    { id: 2, firstName: "Ezio", lastName: "Auditore", email: "EA@gm.com" },
    { id: 3, firstName: "Rek", lastName: "Frost", email: "NU@gm.com" },
  ]);
  const [isEdit, setIsEdit] = useState(null);
  const [currentValues, setCurrentValues] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [message, setMessage] = useState([]);

  window.onbeforeunload = function () {
    localStorage.clear();
  };

  // console.log("User is :", usersName);
  console.log("SearchResult", searchResult.length);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        ID: "",
        FirstName: "",
        LastName: "",
        Email: "",
        SearchUser: null,
      },

      validationSchema: formValidation,
      onSubmit: (values) => {
        console.log("OnSubmit", values);
        UpdatingUser(values.ID);
      },
    });

  useEffect(async () => {
    if (localStorage.getItem("allusers")) {
      setalllUsersData(JSON.parse(localStorage.getItem("allusers")));
    } else {
      localStorage.setItem("allusers", JSON.stringify(alllUsersData));
    }

    // localStorage.clear();
  }, []);

  //after successful editing and deletion , localStorage will update
  useEffect(async () => {
    localStorage.setItem("allusers", JSON.stringify(alllUsersData));
    console.log("updating LocalStrogae...");
    setSearchResult([]); //searchResult will be empty to refresh the list after deletion
  }, [alllUsersData]);

  //using useEffect to Show errors
  // useEffect( async ()=>{

  //     if(errors)
  //   {
  //     for(let keys in errors)
  //     {
  //       alert(errors[keys]);
  //     }
  //   }

  // },[errors]);

  //useEffectfor setting default values to formik when edting
  useEffect(() => {
    if (currentValues) {
      values.ID = currentValues.id;
      values.FirstName = currentValues.firstName;
      values.LastName = currentValues.lastName;
      values.Email = currentValues.email;

      console.log("From Effect", values);
    }
  }, [currentValues]);

  const DeleteThisUser = (userID) => {
    let index = alllUsersData.findIndex((x) => x.id === userID);
    console.log("Deleting... ", index);
    alllUsersData.splice(index, 1);
    setalllUsersData([...alllUsersData]); //to activate useEffect
    // setMessage(`${result.message} 🤨`);
  };

  const UpdatingUser = (UserID) => {
    console.log("Updating... ", UserID);
    alllUsersData.map((u) => {
      if (u.id === UserID) {
        u.firstName = values.FirstName;
        u.lastName = values.LastName;
        u.email = values.Email;
      }
    });

    // alllUsersData[isEdit]=updatedUser;
    setalllUsersData([...alllUsersData]); //to activate useEffect
    setIsEdit(null);

    // setMessage(`${result.message} 🤨`);
  };

  const handleSearch = (SearchUser) => {
    console.log("Searching.. ", SearchUser); //
    let result = [];
    if (SearchUser) {
      //we will store the result in local variable
      //bcus its checking next condition before updating  setSearchResult state

      result = alllUsersData.filter(
        (user) =>
          user.firstName.toLocaleLowerCase() === SearchUser.toLocaleLowerCase()
      );

      if (result.length === 0) {
        result = alllUsersData.filter(
          (user) =>
            user.lastName.toLocaleLowerCase() === SearchUser.toLocaleLowerCase()
        );
        if (result.length === 0) {
          result = alllUsersData.filter(
            (user) =>
              user.email.toLocaleLowerCase() === SearchUser.toLocaleLowerCase()
          );
          // if( result.length===0 )
          // {
          //     setSearchResult([]);
          //   console.log("Result Not Foiund") ;
          //   alert("Result Not Found");
          // }
        }
      }
    }
    setSearchResult(result);
  };

  return (
    <div className="section-container allUsers-responsive container">
      <div className="head-container">
        <div className="Content-heading">
          <h3>
            <i className="bi bi-person-circle "></i> Users
          </h3>
        </div>
        <div className="leads-utilities d-flex justify-content-between">
          <div className="search-box">
            <form>
              <input
                onChange={(e) => handleSearch(e.target.value)}
                name="SearchUser"
                type="text"
                aria-label="UserSearch"
                placeholder="Search Users"
              />{" "}
              <i
                onClick={handleSearch}
                type="submit"
                className="bi bi-search"
              ></i>
            </form>
          </div>
          <div className="add-user">
            <Link to="/Dashboard/AddUser">
              <button className="btn btn-primary">
                {" "}
                <i className="bi bi-plus-square"></i> Add User
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="leads-tableBody">
            {/* //after Seaching.. search result will be displayed 
            //if search result is not found Users will be displayed */}
            {!searchResult[0]
              ? alllUsersData.map((UserData, key) => {
                  //edit is state with defaultValue null
                  //when someone clicks edit button we pass uniquekey to edit(nameOfState) state
                  if (isEdit !== key) {
                    return (
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>
                          {UserData.firstName} {UserData.lastName}{" "}
                        </td>
                        <td>{UserData.email}</td>
                        <td>
                          <button
                            onClick={() => {
                              setIsEdit(key);
                            }}
                            title="Edit User"
                            className="btn bg-primary mx-1 text-white"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          {/* <button style={{pointerEvents:showEdit}} onClick={()=>DeleteThisUserData(UserData)} className="btn bg-danger text-white"><i className="bi bi-trash"></i></button></td> */}
                          <button
                            onClick={() => {
                              const confirmBox = window.confirm(
                                "Do you really want to delete this User 🧐?"
                              );
                              if (confirmBox === true) {
                                DeleteThisUser(UserData.id);
                              }
                            }}
                            title="Delete User"
                            className="btn bg-danger mx-1 text-white"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  ////////////////////////////////////////////////
                  else {
                    //to call useEffect and Updating Formik initial values
                    {
                      if (currentValues != UserData) {
                        setCurrentValues(UserData);
                      }
                    }
                    return (
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>

                        <td>
                          <input
                            type="text"
                            defaultValue={[UserData.firstName]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="FirstName"
                            placeholder="First Name"
                            required
                          />

                          <input
                            type="text"
                            defaultValue={UserData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="LastName"
                            placeholder="Last Name"
                            required
                          />
                        </td>

                        <td>
                          <input
                            type="Email"
                            defaultValue={UserData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="Email"
                            placeholder="sample@gmail.com"
                            required
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => setIsEdit(null)}
                            className="btn bg-danger mx-1 text-white"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                          <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn bg-success mx-1 text-white"
                          >
                            <i className="bi bi-save"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })
              : searchResult.map((UserData, key) => {
                  //only selfAddedUserData or Admin or manager can edit a UserData
                  //edit is state with defaultValue null
                  //when someone clicks edit button we pass uniquekey to edit(nameOfState) state
                  if (isEdit !== key) {
                    return (
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>
                          {UserData.firstName} {UserData.lastName}{" "}
                        </td>
                        <td>{UserData.email}</td>
                        <td>
                          <button
                            onClick={() => {
                              setIsEdit(key);
                            }}
                            title="Edit User"
                            className="btn bg-primary mx-1 text-white"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          {/* <button style={{pointerEvents:showEdit}} onClick={()=>DeleteThisUserData(UserData)} className="btn bg-danger text-white">Delete</button></td> */}
                          <button
                            onClick={() => {
                              const confirmBox = window.confirm(
                                "Do you really want to delete this Crumb?"
                              );
                              if (confirmBox === true) {
                                DeleteThisUser(UserData.id);
                              }
                            }}
                            title="Delete User"
                            className="btn bg-danger  mx-1 text-white"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  ////////////////////////////////////////////////
                  else {
                    //to call useEffect and Updating Formik initial values
                    {
                      if (currentValues !== UserData) {
                        setCurrentValues(UserData);
                      }
                    }
                    return (
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>

                        <td>
                          <input
                            type="text"
                            defaultValue={[UserData.firstName]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="FirstName"
                            placeholder="First Name"
                            required
                          />

                          <input
                            type="text"
                            defaultValue={UserData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="LastName"
                            placeholder="Last Name"
                            required
                          />
                        </td>

                        <td>
                          <input
                            type="Email"
                            defaultValue={UserData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="Email"
                            placeholder="sample@gmail.com"
                            required
                          />
                        </td>

                        <td>
                          <button
                            onClick={() => setIsEdit(null)}
                            className="btn bg-danger mx-1 text-white"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                          <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn bg-success mx-1 text-white"
                          >
                            <i className="bi bi-save"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
