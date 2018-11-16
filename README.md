# Session planner

> A progressive web app to manage the sessions of an (un)conference.

This web app can display the sessions of an (un)conference, notify users of
updates regarding sessions they liked and tell them when a session they are
interested in is about to start.

This app was written at ![mp logo](./public/logo/mp.png) Method Park for the
![swec logo](./public/logo/logo16x16.png) Software Engineering Camp.

See it in action: <https://sessions.swe.camp>.

More information about [SWEC](https://swe-camp.de) and [Method Park](https://methodpark.com).

## Setup

This project requires Node 10 or later. To build a docker image or run the
docker image you need docker as well.

Clone the repository and install the dependencies with

```sh
npm ci
npm run generate-notification-keys
```

Then start the webpack dev server with

```sh
npm start
```

or (if you prefer having frontend and backend running in separate shells):

```sh
npm run start:server
npm run start:frontend
```

The sessions are stored in `sessionsData.json` in the root directory.

### Build and run a docker image

To build a docker image use the Dockerfile in the project root:

```sh
docker build -t swecapp .
docker run -p 3000:8080 -v /path/to/data:/data --name swec swecapp
```

The docker image expects some configuration files in a volume:

* the sessions data (sessionsData.json)
* public/private key pair for the push notifications (vapid-keys.*)
* metadata about the push subscriptions (subscriptions.json)

## License

This project is licensed under the terms of the MIT license
([LICENSE](./LICENSE) or <http://opensource.org/licenses/MIT>).

If you use this app for your own event we would appreciate it if you kept our
logo and a link to our homepage below the session plan. Similar to what we have
in our [Footer component](./src/components/shared/Footer.jsx).