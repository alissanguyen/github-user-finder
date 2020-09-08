import React from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = React.useState("anveio");

  const [fetchedUsers, setFetchedUsers] = React.useState([]);

  return (
    <div className="App">
      <form
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
        <input
          placeholder="Type in GitHub username"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        ></input>
        <button type="submit">Find User</button>
      </form>

      {fetchedUsers.length > 0 ? (
        <ul>
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
    <a
      href={props.fetchedUser.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <li className="userInfo">
        <h4>
          {props.fetchedUser.name
            ? props.fetchedUser.name
            : props.fetchedUser.login}
        </h4>
        <img
          src={props.fetchedUser.avatar_url}
          style={{ height: 100, width: 100, borderRadius: 150 / 2 }}
          alt=""
        />

        {props.fetchedUser.html_url}

        <p>
          Company:{" "}
          {props.fetchedUser.company
            ? props.fetchedUser.company
            : "[Unemployed]"}
        </p>
        <p>
          Location:{" "}
          {props.fetchedUser.location
            ? props.fetchedUser.location
            : "[No information]"}
        </p>
        <p>Bio: {props.fetchedUser.bio ? props.fetchedUser.bio : "N/A"}</p>
      </li>
    </a>
  );
};

export default App;
