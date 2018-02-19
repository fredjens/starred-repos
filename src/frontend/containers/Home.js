import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CountUp from 'react-countup';
import ReactList from 'react-list';
import { browserHistory } from 'react-router';
import { includes, values } from 'lodash';

import Loading from '../components/Loading';
import { getStaredRepos } from '../services/github';

import {
  getUsername,
  getName,
  getCategories,
} from '../ducks/firebase';

import {
  getRepos,
  getLoading,
} from '../ducks/github';

class Home extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleRouteToRepo(repo) {
    browserHistory.push(`/${repo}`);
  }


  renderItem(index, key) {
    const { children, repos = [] } = this.props;

    const repo = repos[index] || {};

    const {
      full_name: name = '',
      html_url: url = '',
      description = '',
      language = '',
      stargazers_count: stars = '',
    } = repo;

    return (
      <div key={index} style={{
        animationDelay: `${index * 40}ms`,
      }} onClick={() => this.handleRouteToRepo(name)}>
        <h2 className="title">{name.split('/')[1]}</h2>
        <h3 className="star">⭐ <CountUp start={0} end={stars} /></h3>
        {!children && <p>{description}</p>}
      </div>
    );
  }

  render() {
    const { repos, loading, children, categories = [], name } = this.props;
    console.log(repos);

    console.log(this.props);

    const Repos = (
      <div>
        {children}
        <h3>Hi {name}!</h3>
        <p>You got {repos.length} starred repos</p>
        <button onClick={() => this.handleSelectCategory('unsorted')}>
          Unsorted ({repos.length})
        </button>
        {values(categories).map(({name, key, repos = []}, index) =>
          <button onClick={() => this.handleSelectCategory(key)} key={index}>
            {name} ({repos.length})
          </button>
        )}
        <button onClick={() => this.handleSelectCategory('reset')}>
          Reset
        </button>
        <ReactList
          itemRenderer={this.renderItem}
          length={repos.length}
          type='uniform'
        />
      </div>
    );

    return loading ? <Loading color="white" /> : Repos;
  }
}

const mapStateToProps = (state) => ({
  username: getUsername(state),
  name: getName(state),
  categories: getCategories(state),
  repos: getRepos(state),
  loading: getLoading(state),
});


export default connect(
  mapStateToProps,
)(Home);