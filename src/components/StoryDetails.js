import React, { Component, Fragment } from 'react';
import { getStoryDetail } from '../constants';

export default class StoryDetails extends Component {
  state = {
    error: false,
    data: null
  };
  _getStoryDetail = async id => {
    try {
      const request = await fetch(getStoryDetail(id));
      const json = await request.json();
      this.setState({ data: json, error: false });
    } catch (error) {
      this.setState({ data: null, error: true });
    }
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this._getStoryDetail(this.props.match.params.id);
    } else {
    }
  }

  renderStoryDetail() {
    const {
      data: { title, by, score, id }
    } = this.state;
    return (
      <Fragment>
        <h3>Title: {title}</h3>
        <div>ID: {id}</div>
        <div>Author: {by}</div>
        <div>Score: {score}</div>
      </Fragment>
    );
  }

  render() {
    if (this.state.error || !this.state.data) {
      return <div>We are unable to find the requested story</div>;
    }
    return (
      <div>
        story details
        {this.renderStoryDetail()}
      </div>
    );
  }
}
