import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen
} from "@testing-library/react";
import Table from "../units/table/Table";
import ThemeProvider from "../providers/ThemeProvider";
import { ApiProvider } from "../context/ApiContext";

test("renders table data", () => {
  const columns = [
    {
      Header: "Avatar",
      accessor: "avatar_url",
      Cell: (d) => (
        <span>
          <img
            src={d.value}
            className="rounded-border-sm"
            style={{ height: "30px", width: "30px" }}
          />
        </span>
      ),
    },
    {
      Header: "Login",
      accessor: "login",
    },
    {
      Header: "Type",
      accessor: "type",
    },
  ];

  const data = [
    {
      login: "First Login",
      avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
      type: "Organization",
    },
    {
      login: "First Login",
      avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
      type: "Organization",
    },
    {
      login: "First Login",
      avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
      type: "Organization",
    },
    {
      login: "First Login",
      avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
      type: "Organization",
    },
  ];

  render(
    <ApiProvider>
      <ThemeProvider>
        <Table
          data={data}
          columns={columns}
          pageCount={2}
          newIndex={1}
          fetchData={() => {}}
        />
      </ThemeProvider>
    </ApiProvider>
  );

  const tableElement = screen.getByTestId("result-table");
  const tableHeader = screen.getByText("Login");
  expect(tableElement).toBeInTheDocument();
  expect(tableHeader).toBeInTheDocument();
});
