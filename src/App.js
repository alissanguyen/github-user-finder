import React from "react";
import "./App.css";
import emptyStateIllustration from "./undraw_Profile_data_re_v81r.svg";
import logo from "./logo.png";

/**
 * 1. What do we show the user while we're loading data from Github, for example, for users on slow connections on dialup in Ho Chi Minh city?
 * 2. What do we show the user when there's an error from github for the user?
 * 3. What do we show the user if they type in a user that already exists in our map of users.
 * 
 * 
 * Considerations when writing async code:
 * 
 * 1. Loading State 
 * 2. Failure State
 * 3. Success State
 * 
 */

function App() {
  const [userInput, setUserInput] = React.useState("");

  const [fetchedUsers, setFetchedUsers] = React.useState({});

  /**
   * We want to sort them by the time they were fetched from Github
   */

  const getUserFromGithub = (username) => {
    const timeOfRequest = Date.now();

    if (fetchedUsers[username.toLowerCase()] !== undefined) {
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((result) => {
        if (result.ok === true) {
          return result.json();
        } else {
          throw new Error("Invalid response.");
        }
      })
      .then((userInfoFromGithub) => {
        setFetchedUsers((prev) => {
          return {
            ...prev,
            [userInfoFromGithub.login.toLowerCase()]: {
              ...userInfoFromGithub,
              timeOfRequest,
            },
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function onLoadExampleButtonClick() {
    getUserFromGithub("alissanguyen");
  }

  const fetchedUsersArray = Object.values(fetchedUsers).sort((a, b) => {
    return b.timeOfRequest - a.timeOfRequest;
  });

  const fetchedUsersIsEmpty = fetchedUsersArray.length === 0;

  return (
    <div className="App">
      <nav id="top-nav">
        <div className="app-title-container">
          <img id="gitspotter-logo" src={logo} alt=""></img>
          <h1 id="title">GitHub Spotter</h1>
        </div>

        <form
          className="username-form"
          onSubmit={(e) => {
            e.preventDefault();
            setUserInput("");
            getUserFromGithub(userInput);
          }}
        >
          <div>
            <label htmlFor="github-username-input"></label>
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

      <div className="main-content-wrapper">
        {!fetchedUsersIsEmpty ? (
          <ul className="users-container">
            {fetchedUsersArray.map((fetchedUser) => (
              <UserInfo fetchedUser={fetchedUser} />
            ))}
          </ul>
        ) : (
          <EmptyState
            onLoadExampleButtonClick={onLoadExampleButtonClick}
          ></EmptyState>
        )}
      </div>
    </div>
  );
}

const EmptyState = (props) => {
  return (
    <div id="empty-state">
      <p id="empty-state-description-headline">
        Explore GitHub users you never know exist
      </p>
      <p id="empty-state-description">
        Type a user into the text box to find their GitHub profile.
      </p>
      <img id="empty-state-illustration" src={emptyStateIllustration} alt="" />
      <button
        className="button"
        id="example-button"
        onClick={() => {
          props.onLoadExampleButtonClick();
        }}
      >
        Load Example
      </button>
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
