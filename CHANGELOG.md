# Change Log

All notable changes to this project will be documented in this file.

## 2017-03-02

### Added

- Get the README file as HTML for a specific repository. Use API endpoint: `/github/readme/:owner/:repo` wher owner = `hackyourfuture` and repo = the repo name.

## 2017-02-28

### Added

- GitHub oAuth authentication using the `passport` library.
- Storing / retrieving user info to/from the `users` table.
- Back-end database layer
