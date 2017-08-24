import React, { Component } from 'react';
import autoBind from 'auto-bind';

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

  async getStaredRepos() {
    const repos = await getStaredRepos();

    this.setState({
      loading: false,
      repos,
    })
  };

  componentWillMount() {
    this.getStaredRepos();
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

export default App;
