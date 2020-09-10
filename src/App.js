import React from "react";
import "./App.css";
import emptyStateIllustration from "./undraw_Profile_data_re_v81r.svg";
import logo from "./logo.png";

function App() {
  const [userInput, setUserInput] = React.useState("");

  const [fetchedUsers, setFetchedUsers] = React.useState([]);

  const getUserFromGithub = (username) => {
    fetch(`https://api.github.com/users/${username}`)
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
  };

  function onLoadExampleButtonClick() {
    getUserFromGithub("alissanguyen");
  }

  return (
    <div className="App">
      <nav id="top-nav">
        <form
          className="username-form"
          onSubmit={(e) => {
            e.preventDefault();
            setUserInput("");
            getUserFromGithub(userInput);
          }}
        >
          <div>
            <img id="gitspotter-logo" src={logo} alt=""></img>
            <label id="title" for="github-username-input">
              GitHub spotter
            </label>
          </div>
          <div className="form-inputs-container">
            <input
              id="github-username-input"
              placeholder="Example: alissanguyen"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            ></input>
            <button className="button" type="submit">
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
      ) : (
        <EmptyState
          id="empty-state-template"
          onLoadExampleButtonClick={onLoadExampleButtonClick}
        ></EmptyState>
      )}
    </div>
  );
}

const EmptyState = (props) => {
  return (
    <div id="empty-state">
      <p id="empty-state-description-headline">
        Explore GitHub users you never known exist
      </p>
      <p id="empty-state-description">
        Type a user into the text box to find their GitHub profile.
      </p>
      <button
        className="button"
        id="example-button"
        onClick={() => {
          props.onLoadExampleButtonClick();
        }}
      >
        Load Example
      </button>
      <img id="empty-state-illustration" src={emptyStateIllustration} alt="" />
    </div>
  );
};

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
