import React, { useContext, useState, useMemo } from "react";

import { theme } from "./theme";

import { ThemeContext } from "./providers/ThemeProvider";
import ThemeSwitch from "./ThemeSwitch";

import { BiSearch } from "react-icons/bi";

import { useFetch } from "./hooks";

import Table from "./units/table/Table";
import ErrorMessage from "./units/error/ErrorMessage";
import SubmitButton from "./units/submitButton/SubmitButton";

import "./App.css";

function App() {
  const { mode } = useContext(ThemeContext);

  const [searchString, setSearchString] = useState("");
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  let { users, totalCount, isLoading, hasError } = useFetch({
    query: searchString,
    page,
  });

  const triggerSearch = () => {
    setSearchString(input);
  };

  const paginationCallback = ({ pageIndex, pageSize }) => {
    setPage(pageIndex + 1);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "avatar_url",
        Cell: (d) => (
          <span >
            <img
              src={d.value}
              className="rounded-border-sm"
              style={{ height: "30px", width: "30px" }}
              alt="avatar"
            />
          </span>
        ),
        width: 100
      },
      {
        Header: "Login",
        accessor: "login",
        width: 100
      },
      {
        Header: "Type",
        accessor: "type",
        width: 100
      },
    ],
    users
  );

  return (
    <div className="App" style={{backgroundColor: theme[mode].appBackground}}>
      <div className="container">

        {/* Start Search Component */}
        <div
          className="item item-1 rounded-border-sm p-20 sm-p-10"
          style={{ backgroundColor: theme[mode].backgroundColor, height: "fit-content" }}
        >
          <div style={{ color: theme[mode].color }}>
            <h3>Find GitHub Users</h3>
          </div>
          <div className="m-20 sm-m-5 md-m-5 h-40 sm-mb-10 md-mb-10">
            <div id="switch-div">
              <ThemeSwitch />
            </div>
          </div>

          <div className="m-20 sm-m-5 l-m-10">
            <div
              className="rounded-border-sm"
              style={{
                padding: "5px",
                backgroundColor: theme[mode].inputBackground,
              }}
            >
              <input
                className="w-percent-80 l-percent-80 sm-w-percent-60 md-w-percent-80 rounded-border h-40"
                style={{ border: "none", color: theme[mode].color }}
                data-testid="input-login"
                placeholder="Enter GitHub login"
                onChange={(e) => setInput(e.target.value)}
              />

              <SubmitButton triggerSearch={triggerSearch} isLoading={isLoading}/>
            </div>

            {hasError && <ErrorMessage message={hasError} />}
          </div>
        </div>
        {/* End Search Component */}

        {/* Start Result Component */}
        <div
          className="item item-2 rounded-border-sm p-20"
          style={{
            backgroundColor: theme[mode].backgroundColor,
            color: theme[mode].color,
          }}
        >
          {users.length > 0 ? (
            <Table
              columns={columns}
              data={users}
              pageCount={totalCount}
              fetchData={paginationCallback}
              newIndex={page - 1}
              data-testid="result-table"
            />
          ) : searchString.length > 0 ? (
            <div
              className="alert-item-1 text-center"
              style={{ color: theme[mode].resultString }}
            >
              <h1>No user exists with this login</h1>
            </div>
          ) : (
            <div
              className="alert-item-1 text-center"
              style={{ color: theme[mode].resultString }}
            >
              <h1>
                Enter a login and click <BiSearch size={25} />
              </h1>
            </div>
          )}

 
        </div>
      </div>
    </div>
  );
}

export default App;
