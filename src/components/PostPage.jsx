import React, { Component } from "react";

import Comments from "./Comments";
import Post from "./Post";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

class PostPage extends Component {
  state = {
    post: null,
    comments: [],
  };

  render() {
    return <div>Post Page!</div>;
  }
}

export default PostPage;
