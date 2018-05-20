import parseLinkHeaders from 'parse-link-header';
import qs from 'qs';

export const FETCH_START = '@fetch/start';
export const FETCH_ERROR = '@fetch/error';
export const FETCH_SUCCESS = '@fetch/success';

const fetchStart = () => ({
  type: FETCH_START,
});

const fetchError = error => ({
  type: FETCH_ERROR,
  error,
});

const fetchSuccess = ({ nextPage, data }) => ({
  type: FETCH_SUCCESS,
  nextPage,
  data,
});

/**
 * Fetches repositories asyncronously for the given username, see {@link https://developer.github.com/v3/repos/#list-user-repositories}
 * @param { string } username - username to fetch
 */
export const fetchUserRepos = (username, page = 1) => async (
  dispatch,
  getState,
) => {
  dispatch(fetchStart());
  const { REACT_APP_GITHUB_API_KEY } = process.env;

  try {
    const params = {
      page: page,
      per_page: 5,
    };

    const url = `https://api.github.com/users/${username}/repos?${qs.stringify(
      params,
    )}`;

    const options = {
      headers: {
        Authorization: REACT_APP_GITHUB_API_KEY,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const linkHeader = response.headers.get('link');
    const link = parseLinkHeaders(linkHeader);

    dispatch(
      fetchSuccess({
        nextPage: link && link.next && link.next.page ? link.next.page : null,
        data: data,
      }),
    );
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
