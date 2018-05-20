import React from 'react';
import { number, string, shape, arrayOf, func, bool } from 'prop-types';
import '../../styles/RepoList.css';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Other: '#949494',
  'C#': '#178600',
  Go: '#375eab',
  Perl: '#0298c3',
  PHP: '#4f5d95',
  Java: '#b07219',
  OCaml: '#3be133',
  Python: '#3572a5',
};

const RepoList = props => {
  const { data, username, fetchMore, isLastPage } = props;

  if (!data) {
    return <div />;
  }

  return (
    <div className="repo-list">
      <h1 className="title">{username} – repos</h1>
      {data.map(repo => <Repo key={repo.id} {...repo} />)}
      {!isLastPage && (
        <button className="load-more-btn" onClick={fetchMore}>
          Load more
        </button>
      )}
    </div>
  );
};

const Repo = props => {
  const { name, html_url } = props;
  const description = props.description || 'No description given';
  const language = props.language || 'Other';
  return (
    <div className="repo">
      <div className="repo-name">
        <a href={html_url}>{name}</a>
      </div>
      <div className="repo-description">{description}</div>
      <span
        className="repo-language-color"
        style={{ backgroundColor: languageColors[language] }}
      />
      <span className="repo-language-name">{language}</span>
    </div>
  );
};

RepoList.propTypes = {
  username: string.isRequired,
  data: arrayOf(
    shape({
      id: number,
      name: string,
      description: string,
      html_url: string,
      language: string,
    }),
  ).isRequired,
  fetchMore: func.isRequired,
  isLastPage: bool.isRequired,
};

export default RepoList;
