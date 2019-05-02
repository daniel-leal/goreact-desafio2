import React, { Component } from "react";
import moment from "moment";
import api from "../../services/api";

import logo from "../../assets/logo.png";

import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: []
  };

  async componentDidMount() {
    this.setState({
      repositories: await this.getLocalRepositories()
    });
  }

  getLocalRepositories = async () =>
    JSON.parse(await localStorage.getItem("repositories")) || [];

  handleAddRepository = async e => {
    e.preventDefault();

    const { repositories, repositoryInput } = this.state;

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: "",
        repositories: [...repositories, repository]
      });

      const localRepositories = await this.getLocalRepositories();

      await localStorage.setItem(
        "repositories",
        JSON.stringify([...localRepositories, repository])
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRemoveRepository = async id => {
    const storageRepositories = await this.getLocalRepositories();

    const repos = storageRepositories.filter(repo => repo.id !== id);

    this.setState({ repositories: repos });
    await localStorage.setItem("repositories", JSON.stringify(repos));
  };

  handleRefreshRepository = async repo => {
    const storageRepositories = await this.getLocalRepositories();

    try {
      const { data: repository } = await api.get(`/repos/${repo}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: storageRepositories.map(repo =>
          repo.id === repository.id ? repository : repo
        )
      });

      await localStorage.setItem(
        "repositories",
        JSON.stringify(this.state.repositories)
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const {
      repositories,
      repositoryError,
      repositoryInput,
      loading
    } = this.state;

    return (
      <Container>
        <div>
          <img src={logo} alt="Github Compare" />
        </div>

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuario/repositorio"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : "Ok"}
          </button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepo={this.handleRemoveRepository}
          refreshRepo={this.handleRefreshRepository}
        />
      </Container>
    );
  }
}
