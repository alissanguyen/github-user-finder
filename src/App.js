import React from "react";
import "./App.css";
import { TEST_DATA } from "./test-data";

function App() {
  const [userInput, setUserInput] = React.useState("anveio");

  const [fetchedUsers, setFetchedUsers] = React.useState(
    Array.from(new Array(10).keys()).map(() => TEST_DATA)
  );

  return (
    <div className="App">
      <form className="username-form"
        onSubmit={(e) => {
          e.preventDefault();
          setUserInput("");
          fetch(`https://api.github.com/users/${userInput}`)
            .then((result) => {
              if (result.ok === true) {
                return result.json();
              } else {
                throw new Error("Invalid response.");
              }
            })
            .then((json) => {
              setFetchedUsers([json].concat(fetchedUsers));
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <div>
          <span className="question-title">
            Type in GitHub user you want to find :)
          </span>
        </div>
        <div>
        <input
          placeholder="example: alissanguyen"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        ></input>
        <button type="submit">Find User</button>
        </div>
      </form>

      {fetchedUsers.length > 0 ? (
        <ul className="users-container">
          {fetchedUsers.map((fetchedUser) => (
            <UserInfo fetchedUser={fetchedUser} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const UserInfo = (props) => {
  return (
    <li className="user-info word-wrap">
      <a
        href={props.fetchedUser.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="user-info-link"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gridGap: 20,
          }}
        >
          <img
            src={props.fetchedUser.avatar_url}
            style={{ height: 100, width: 100, borderRadius: 150 / 2 }}
            alt=""
          />

          <div className="info-text-container">
            <h4
              style={{
                marginTop: 0,
              }}
            >
              {props.fetchedUser.name
                ? props.fetchedUser.name
                : props.fetchedUser.login}
            </h4>
            <p className="user-info-text">
              Company:{" "}
              {props.fetchedUser.company
                ? props.fetchedUser.company
                : "[Unemployed]"}
            </p>
            <p className="user-info-text">
              Location:{" "}
              {props.fetchedUser.location
                ? props.fetchedUser.location
                : "[No information]"}
            </p>
            <p className="user-info-text">
              Bio: {props.fetchedUser.bio ? props.fetchedUser.bio : "N/A"}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
};

export default App;
