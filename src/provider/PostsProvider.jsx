import React, { Component } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

class PostsProvider extends Component {
  state = {
    posts: [],
  };

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ posts });
      });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };
}

export default PostsProvider;
