# github-issue-browser [![Build Status](https://travis-ci.org/ykhs/github-issue-browser.svg?branch=master)](https://travis-ci.org/ykhs/github-issue-browser)

github-issue-browser is Github Client to look over issues easily.

![Screen shot](https://monosnap.com/image/5lrtLqRtPiSuEvJp0ddxNxTsFYW1f4.png)

Built with [node-webkit](https://github.com/rogerwang/node-webkit).

## Features

- look over selected repository issues.
- `N`, `P` move to next/prev repository.
- `J`, `K` move to next/prev issue.
- `B` open selected issue in browser.

## Installation

1. [Download binary](https://github.com/ykhs/github-issue-browser/releases/latest)
1. Generate new token
1. Launch github-issue-browser.app
1. Input your username and token
1. Select watching repositories as you want

Token can be generated from [New personal access token](https://github.com/settings/tokens/new)  
(Settings > Application > Personal access tokens > Generate new token button)

![Generate new token](https://monosnap.com/image/NIrXblyjQkdp1e8euatOgwpqW2cXVR.png)

require scopes are no need to change.

![User settings](https://monosnap.com/image/Q3oxl991JOzWsnk3xd7a88razFVHde.png)

During the first launch, you will be asked username and token.

## Develop

```
npm install
bower install
gulp nwbuild
```

## License

MIT
