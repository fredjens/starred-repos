import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router';
import { isEqual } from 'lodash';

import { getRepoReadme } from '../services/github';

import Loading from '../components/Loading';
import ReactMarkdown from 'react-markdown';

class Repo extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      loading: false,
      readme: '',
    }
  }

  async getReadme({ repo, owner }) {
    this.setState({ loading: true });

    const readme = await getRepoReadme({ repo, owner });

    this.setState({
      loading: false,
      readme: atob(readme),
    });
  }

  componentWillMount() {
    const { params: { repo, owner } = {}} = this.props;
    this.getReadme({ repo, owner });
  }

  componentWillReceiveProps(nextProps) {
    const { params: { repo } = {}} = this.props;
    const { params: { repo: newRepo, owner: newOwner } = {}} = nextProps;

    if (repo !== newRepo) {
      this.getReadme({ repo: newRepo, owner: newOwner });
    }
  }

  render() {
    const { params } = this.props;
    const { loading, readme = '' } = this.state;

    const Repo = (
      <div className="view">
        <Link to="/">
          Close
        </Link>
        { loading ? <Loading /> :  <ReactMarkdown source={readme} />}
      </div>
    );

    return Repo;
  }
}

export default Repo;
