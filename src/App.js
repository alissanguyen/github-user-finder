import React from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = React.useState("anveio");

  const [fetchedUsers, setFetchedUsers] = React.useState([]);

  return (
    <div className="App">
      <nav id="top-nav">
        <form
          className="username-form"
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
          <label id="title" for="github-username-input">
            GitHub spotter
          </label>
          <div className="form-inputs-container">
            <input
              id="github-username-input"
              placeholder="Example: alissanguyen"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            ></input>
            <button className="form-submit-button" type="submit">
              Find User
            </button>
          </div>
        </form>
      </nav>

      {fetchedUsers.length > 0 ? (
        <ul className="users-container">
          {fetchedUsers.map((fetchedUser) => (
            <UserInfo fetchedUser={fetchedUser} />
          ))}
        </ul>
      ) : <EmptyState></EmptyState>}
    </div>
  );
}

const EmptyState = (props) => {
  return (
    <p>Type a user into the text box to find their GitHub profile</p>
  )
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
                : "[No information]"}
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
