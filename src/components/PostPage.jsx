import React, { Component } from "react";

import Comments from "./Comments";
import Post from "./Post";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";
import { withRouter } from "react-router-dom";

class PostPage extends Component {
  state = {
    post: null,
    comments: [],
  };

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`posts/${this.postId}`);
  }

  get commentsRef() {
    return this.postRef.collection("comments");
  }

  unsubscribeFromPosts = null;
  unsubscribeFromComments = null;

  componentDidMount = async () => {
    this.unsubscribeFromPosts = this.postRef.onSnapshot((snapShot) => {
      const post = collectIdsAndDocs(snapShot);
      this.setState({ post });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot((snapShot) => {
      const comments = snapShot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPosts();
    this.unsubscribeFromComments();
  };

  render() {
    const { post, comments } = this.state;
    return (
      <section>
        {post && <Post {...post} />}
        <Comments comments={comments} onCreate={() => {}} />
      </section>
    );
  }
}

export default withRouter(PostPage);
