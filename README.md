# Interview Scheduler

  A single page application allowing users to book, edit, and delete appointments. Appointment spots will update accordingly and the number of spots available is displayed on the left-hand side underneth the corrisponding day. Appointments are required to be booked with one of the available interviewers on the specificed day. Errors will occur if the name section is left empty when attempting to book an interview. 

## Dependencies
  *  Axios: 0.21.x or above
  *  Classnames: 2.2.6 or above
  *  Normalize.css: 8.0.1 or above
  *  React: 16.9.x or above
  *  React-dom: 16.9.x or above
  *  React-scripts: 3.0.x or above

Install dependencies with `npm install`.

## Setup

1. Install dependencies with `npm install`.'

2. Clone and follow the README.md from the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api)

3. Make sure to run the scheduler-api prior to running the webpack development server

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


## Screenshots

![home-page](https://github.com/jvongsana/scheduler/blob/master/docs/home-page.png)
![form](https://github.com/jvongsana/scheduler/blob/master/docs/form.png)
![interview-booked](https://github.com/jvongsana/scheduler/blob/master/docs/interview-booked.png)
![empty-student-name](https://github.com/jvongsana/scheduler/blob/master/docs/empty-student-name.png)
![interview-delete](https://github.com/jvongsana/scheduler/blob/master/docs/interview-delete.png)
![interview-edit](https://github.com/jvongsana/scheduler/blob/master/docs/interview-edit.png)
![error-saving](https://github.com/jvongsana/scheduler/blob/master/docs/error-saving.png)
![error-deleting](https://github.com/jvongsana/scheduler/blob/master/docs/error-deleting.png)