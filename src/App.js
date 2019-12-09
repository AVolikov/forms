import React from "react";
import firebase, { todosRef } from "./config/firebase";
import "./App.css";
import LoginForm from "./components/LoginForm";

class App extends React.Component {
  state = {
    list: [],
    user: null,
    inputValue: ""
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Logged in; user.uid:", user.uid);
        this.setState({ user: user.uid });

        // firebase
        //   .database()
        //   .ref("todos")
        //   .on("child_added", snapshot => {
        //     console.log(snapshot.val(), snapshot.key);
        //   });

        firebase
          .database()
          .ref("todos")
          .on("value", snapshot => {
            console.log(snapshot.val());
            this.setState({
              list: Object.entries(snapshot.val()).map(([key, val]) => {
                return { key, ...val };
              })
            });
          });
      } else {
        console.log("Logout");
        this.setState({ user: null });
      }
    });
  }

  addItem = () => {
    todosRef.push().set({ text: this.state.inputValue });
    // todosRef.push().set({ text: this.state.inputValue });
    this.setState({ inputValue: "" });
  };

  render() {
    const { user, list, inputValue } = this.state;
    return (
      <div className="App">
        <LoginForm />
        <br />
        <br />
        <br />

        <input
          type="text"
          value={inputValue}
          placeholder="item text"
          onChange={e => {
            this.setState({ inputValue: e.target.value });
          }}
        />
        <button onClick={this.addItem}>Add item</button>
        {user && (
          <section>
            {list.map((item, i) => (
              <div key={i}>{item.text}</div>
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default App;
