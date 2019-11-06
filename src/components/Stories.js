import React, { Fragment } from 'react';
import { GET_TOP_STORIES, PAGE_SIZES } from '../constants';

class Stories extends React.Component {
  state = {
    defaultPageSize: 5,
    topStories: [],
    offset: 1,
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
    const { defaultPageSize = 5, topStories = [], offset = 1 } = this.state;
    const indexOfLastTodo = offset * defaultPageSize;
    const indexOfFirstTodo = indexOfLastTodo - defaultPageSize;
    return topStories.slice(indexOfFirstTodo, indexOfLastTodo);
  };

  renderErrorMessage = _ => {
    return (
      <div>
        There is problem loading results ...
        <button onClick={this._refetchTopResults}>Try again!</button>
      </div>
    );
  };

  _navigateTo = pageNum => {
    this.setState({
      offset: pageNum
    });
  };

  renderPageNumbers = _ => {
    return Array.from({
      length: Math.ceil(
        this.state.topStories.length / this.state.defaultPageSize
      )
    }).map((_, i) => {
      const pgNumber = i + 1;
      return (
        <li
          key={pgNumber}
          onClick={() => this._navigateTo(pgNumber)}
          style={{
            display: 'inline',
            float: 'left',
            padding: '5px',
            margin: '5px'
          }}
        >
          {pgNumber}
        </li>
      );
    });
  };

  _setDefaultPageSize = event => {
    this.setState({ defaultPageSize: event.target.value });
  };

  renderPageSizes = _ => {
    return (
      <select
        value={this.state.defaultPageSize}
        onChange={this._setDefaultPageSize}
      >
        {PAGE_SIZES.map(pageSize => {
          return (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          );
        })}
      </select>
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
        <div>
          Select Page Size
          {this.renderPageSizes()}
        </div>
        <div>
          {records.map(record => {
            return <div key={record}>{record}</div>;
          })}
        </div>
        <div>
          <span>{this.renderPageNumbers()}</span>
        </div>
      </Fragment>
    );
  }
}

export default Stories;
