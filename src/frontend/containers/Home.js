import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import CountUp from 'react-countup';
import ReactList from 'react-list';
import { browserHistory } from 'react-router';
import classNames from 'classnames';

import Loading from '../components/Loading';
import { getStaredRepos } from '../services/github';

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      loading: true,
      repos: [],
    }
  }

  async getStaredRepos(username) {
    if (!username) {
      console.log('no username');
    }

    const repos = await getStaredRepos(username);

    this.setState({
      loading: false,
      repos,
    })
  };

  componentWillMount() {
    console.log('mount', this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    const { username } = nextProps;
    console.log(nextProps);

    if (username) {
      console.log('username', username);
      this.getStaredRepos(username);
    }
  };

  handleRouteToRepo(repo) {
    browserHistory.push(`/${repo}`);
  }

  renderItem(index, key) {
    const { children } = this.props;
    const { repos = []} = this.state;
    const repo = repos[index];

    const {
      full_name: name = '',
      html_url: url = '',
      description = '',
      language = '',
      stargazers_count: stars = '',
    } = repo;

    const itemClass = classNames({
      'item': !children,
      'item-small': children,
    });

    return (
      <button key={index} className={itemClass} style={{
        animationDelay: `${index * 4}ms`,
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
    const { loading, repos = [] } = this.state;
    const { children } = this.props;

    const Repos = (
      <div className="App">
        {children}
        <div className="wrapper" style={{
          width: children ? '30%' : '100%',
          padding: children ? '4%' : '8%',
        }}>
          <ReactList
            itemRenderer={this.renderItem}
            length={repos.length}
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
});

export default connect(
  mapStateToProps,
)(App);