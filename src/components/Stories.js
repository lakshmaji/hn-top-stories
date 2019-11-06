import React, { Fragment } from 'react';
import { GET_TOP_STORIES } from '../constants';

class Stories extends React.Component {
  state = {
    defaultPageSize: 5,
    topStories: [],
    offset: 0,
    error: false
  };

  _getTopStoriesFromAPI = async () => {
    try {
      const request = await fetch(GET_TOP_STORIES);
      const json = await request.json();
      this.setState({ topStories: json, error: false });
    } catch (error) {
      this.setState({ topStories: [], error: true });
    }
  };

  componentDidMount() {
    this._getTopStoriesFromAPI();
  }

  _refetchTopResults = _ => {
    this._getTopStoriesFromAPI();
  };

  _getResultSet = _ => {
    const { pageSize = 5, topStories = [], offset = 0 } = this.state;
    return topStories.slice(offset, pageSize);
  };

  renderErrorMessage = _ => {
    return (
      <div>
        There is problem loading results ...
        <button onClick={this._refetchTopResults}>try again</button>
      </div>
    );
  };

  render() {
    const { error } = this.state;
    if (error) {
      return this.renderErrorMessage();
    }
    const records = this._getResultSet();
    return (
      <Fragment>
        {records.map(record => {
          return <div key={record}>{record}</div>;
        })}
      </Fragment>
    );
  }
}

export default Stories;
