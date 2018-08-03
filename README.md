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
* the app shows a "splash screen" 
* the app is usable even if there is no network connection
* the app checks for changes of the schedule in the background (even if it is
  not opened)
* if there is any, the app shows a notification
* alternatively the server pushes notifications about changes to the client(s)

## TODO

* overview story:
  * shows a list of all tracks
  * each track can be expanded to show the list of sessions with their respective slot
  * it is possible to switch from track view to slot view
  * in the slot view all slots are shown
  * each slot can be expended to show the list of sessions with their respective track
* detail story:
  * shows details of a certain session (start/end time, room, title, short
    description)
* admin story:
  * the admin screen is protected by a password
  * the admin screen gives the possibility to add/modify/delete tracks, add/modify/delete      slots, add/modify sessions and to assign sessions to tracks and slots
* room plan story:
  * shows a list of all rooms
  * each room links to the respective track
  * shows a building layout with the locations of the room
* schedule story:
  * on the overview and the details screen from each slot one session can be marked as "scheduled"  
  this is a marker for the user as a reminder which session they want to attend  
  only one session per slot can be scheduled (you can't be on two places at once)
  * on the schedule screen all scheduled sessions can be accessed and viewed in order
  * on the overview screen sessions that are scheduled are marked as such (❤ symbol)
  * on the detail screen scheduled sessions are marked as such (❤ symbol)
  * on the schedule screen a horizontal line marks the current time in relation to the 
    scheduled session plan
  * if for a given slot another session is already scheduled the user is queried if
    they want to change this subscription or cancel
  * create a notification shortly before a scheduled session is due
* settings story:
  * the settings screen has a list of features that can by defined
  * gives the user the possibility to switch off notifications for upcoming
    sessions they have scheduled
  * gives the user the possibility to switch off notifications from the server
* matrix overview story:
  * shows a complete vertical session matrix with all tracks side by side
  * shows a line that marks the current time in relation to the session plan
  * has the possibility to add session to scheduled sessions
  * marks sessions as scheduled
  * has a dropdown menu that allows for a day selection (saturday/sunday)