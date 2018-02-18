import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import CountUp from 'react-countup';
import ReactList from 'react-list';
import { browserHistory } from 'react-router';
import { includes, values } from 'lodash';

import Loading from '../components/Loading';
import { getStaredRepos } from '../services/github';

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      loading: true,
      repos: [],
      selected: '',
    }
  }

  async getStaredRepos(username) {
    const { repos = []} = this.state;

    if (!username) {
      console.log('no username');
    }

    if (repos.length > 0) {
      return;
    }

    const userStarredRepos = await getStaredRepos(username);

    this.setState({
      loading: false,
      repos: userStarredRepos,
      filteredRepos: userStarredRepos,
    })
  };

  componentWillReceiveProps(nextProps) {
    const { username } = nextProps;

    if (username) {
      this.getStaredRepos(username);
    }
  };

  handleRouteToRepo(repo) {
    browserHistory.push(`/${repo}`);
  }

  handleSelectCategory(key) {
    const { repos = [] } = this.state;
    const { categories } = this.props;

    if (key === 'reset') {
      return this.setState({
        selected: null,
        filteredRepos: repos,
      });
    }

    const filteredRepos = repos.filter(repo =>
      includes(categories[key].repos, repo.id)
    );

    this.setState({
      selected: key,
      filteredRepos,
    });
  }

  renderItem(index, key) {
    const { children } = this.props;
    const { repos = [], selected, filteredRepos } = this.state;
    console.log(repos);

    const repo = filteredRepos[index] || {};

    const {
      full_name: name = '',
      html_url: url = '',
      description = '',
      language = '',
      stargazers_count: stars = '',
    } = repo;

    return (
      <button key={index} style={{
        animationDelay: `${index * 40}ms`,
      }} onClick={() => this.handleRouteToRepo(name)}>
        <h2 className="title">{name.split('/')[1]}</h2>
        <h3 className="star">⭐ <CountUp start={0} end={stars} /></h3>
        {
          !children &&
          <p>{description}</p>
        }
      </button>
    );
  }

  render() {
    const { loading, filteredRepos = [], repos } = this.state;
    const { children, categories = [], username, name } = this.props;

    const Repos = (
      <div className="App">
        {children}
        <div className="wrapper" style={{
          width: children ? '30%' : '100%',
          padding: children ? '4%' : '8%',
        }}>
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
            length={filteredRepos.length}
            type='uniform'
          />
        </div>
      </div>
    );

    return loading ? <Loading color="white" /> : Repos;
  }
}

const mapStateToProps = (state) => ({
  username: state.collections.github,
  name: state.collections.name,
  categories: state.collections.categories,
});

export default connect(
  mapStateToProps,
)(App);