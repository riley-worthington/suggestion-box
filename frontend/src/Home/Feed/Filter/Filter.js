import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postFeedFilters as filters } from '../PostFeed/postFeedConstants';
import { setPostFeedFilter } from '../PostFeed/postFeedActions';

const mapStateToProps = state => {
  return {
    currentFilter: state.feed.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPostFeedFilter: filter => dispatch(setPostFeedFilter(filter))
  }
}

class Filter extends Component {

  onFilterChange = event => {
    const { setPostFeedFilter } = this.props;
    setPostFeedFilter(event.target.value);
  }

  render() {
    const { currentFilter } = this.props;
    return (
      <div>
        <label htmlFor="post-filter">Filter by  </label>
        <select id="post-filter" value={currentFilter} onChange={this.onFilterChange}>
            <option value={filters.MOST_RECENT}>Most Recent</option>
            <option value={filters.TOP_VOTED}>Top Voted</option>
        </select>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
