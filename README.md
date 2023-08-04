# agc-backend

![GitHub](https://img.shields.io/github/license/agelesscoding/agc-backend)

Backend service for AGC project.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE).

## Function List

- [ ] User System

  - [ ] Register (expand knowledge base)
  - [ ] Email & Password
  - [ ] Mobile Verification Code (obtain verification code)
  - [ ] Oauth2 (Gitee, Github, WeChat, etc.)
  - [ ] Login
  - [ ] Email & Password
  - [ ] Get user information
  - [ ] Modify user information

- [ ] Project Management

  - [ ] Create a blank project
  - [ ] Copy project (create through a template)
  - [ ] Query own project list
  - [ ] Query individual project information
  - [ ] Save (update) project
  - [ ] Delete project
  - [ ] Publish project
  - [ ] Publish as a template

- [ ] Template - Another presentation form of projects, public projects

  - [ ] Home template list
  - [ ] Individual template information

- [ ] Channels - Special information attached to projects

  - [ ] Create a channel
  - [ ] Delete a channel
  - [ ] Modify channel name
  - [ ] Get all channels of a single project

- [ ] Utility

  - [ ] Upload photos (expand knowledge base, local upload, cloud service upload, and image processing)
  - [ ] Preview and display projects (not standard RESTful API)

- [ ] Permissions
  - [ ] Level 1: Logged-in users
  - [ ] Level 2: Can only update or delete their own resources
  - [ ] Level 3: Can only update specific fields
  - [ ] Level 4: Administrators
