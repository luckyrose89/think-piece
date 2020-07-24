import React, { Component } from "react";
import { firestore } from "../firebase";

import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  handleCreate = async (post) => {
    await firestore.collection("posts").doc(post.id).set(post);
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
