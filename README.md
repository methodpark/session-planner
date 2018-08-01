# SWEC Planner

## Dev

```sh
npm start   # start frontend and server concurrently
```

or (if you prefer having frontend and backend running in separate shells):

```sh
npm run start:server
npm run start:frontend
```

## PWA Objective

* the app can be added to the homescreen
* the app is usable even if there is no network connection
* the app checks for changes of the schedule in the background (even if it is
  not opened)
* if there is any, the app shows a notification

## TODO

* overview screen:
  * shows a complete vertical session list with all tracks side by side
  * has a dropdown menu that allows for a day selection (saturday/sunday)
  * shows a line that marks the current time in relation to the session plan
  * has the possibility to add session to scheduled sessions
* detail screen:
  * shows details of a certain session (start/end time, room, title, short
    description)
  * has the possibility to add session to scheduled sessions
* schedule screen:
  * the schedule screen shows the scheduled sessions in order
  * shows a line that marks the current time in relation to the session plan
* room plan:
  * shows a list of all rooms
  * shows a building layout with the locations of the rooms
* settings:
  * give the user the possibility to switch off notifications for upcoming
    sessions they have subscribed for