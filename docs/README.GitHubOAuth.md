# GitHub oAuth explanation

For testing purposes I have registered our app as 'Hack Your Future - Hyfer' at the GitHub site. When you do that you get some credentials to use in the node server, viz.:

- Client ID
- Client Secret

In our app I have added this info to `config.js`.

To work with GitHub oAuth I've added two NPM packages to handle all low-level oAuth stuff:

- passport
- passport-github

Using these packages the oAuth protocol requires a few simple steps only.

1. On the client side we need a button to signin using GitHub. This button should point the browser to a URL (`/auth/github`) registered in our server to handle the GitHub authentication. This will cause the user to be redirected to a GitHub page asking permission for our app to access the user's GitHub account.

2. If the user authorizes our app, GitHub redirects the browser to a callback URL that we have specified. At this URL we hand back control to `passport` which then gives us the login info (accessToken, profile) from GitHub. At this point we know that we are dealing with an authenticated GitHub user. We can use the returned info to create a new user in the database or retrieve info for a returning user from the datebase.

## API endpoint authorization

In order to protect API endpoints the server app provides custom middleware to protect routes. For example:

```
// public route: accessible to anyone
app.get('/modules', modules.getCurriculum);

// protected route: only accessible to authenticated users with role 'teacher'
app.delete('/modules/:id', authService.hasRole('teacher'), modules.deleteModule);
