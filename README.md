<h1>
  Leave Tracker
</h1>
<p>LeaveMonitor is a simple, effective, cloud-based staff leave planner that has been making lives easier for many companies over the years.</p>
<br />

## Available Scripts

In the project directory, you can run:

### `npm install`

To install project dependencies before starting the project.

### `gatsby develop`

Runs the app in the development mode.<br>
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `gatsby build`

Builds the app folder for production to the `public` folder.<br>


## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

## 🤘 Quick walkthrough Internal File Structure.


### `Main file`
    .
    ├── src
    ├─── pages
    ├──── .index.js
    
The entire application is going to be controlled in the index file under pages. (pages/index.js)
<hr/>

### `Login file`
    .
    ├── src
    ├─── pages
    ├──── .login.js
    
The login service requests and validations of admin and users are going to be handled by the login page under pages. (pages/login.js).
<hr/>

### `DashBoard`
    .
    ├── src
    ├─── pages
    ├──── .board.js
    
Once the user is verified he will be redirected to the dashboard where he can able to access the entire application. (pages/board.js)

<hr/>

### `Assets`
    .
    ├── src
    ├─── data
    ├──── .assets
    
If we want add or update the icons or images everything can be handled internally by the given above path . (data/assets.js)

<hr/>

### `API handled`
    .
    ├── src
    ├─── utils
    ├──── .urls.js
    
If we want include a new API for service request then insted of rewriting same lines again and again we can follow effective way to export reusable API functions{}. (utils/urls.js)

<hr/>

### `Adding reusable functions`
    .
    ├── src
    ├─── utils
    ├──── .functions.js
    
We can export logics in the above file path and we can we use them in the entire application again and again. (utils/functions.js)
<hr/>

### `Mockdata`
    .
    ├── src
    ├─── utils
    ├──── .mockdata.js
    
If we want to create mock data which we are going to be used in dropdowns and test cases we can create new nock data in the above path and we can use it anywhere of application. (utils/mockdata.js)


## 🧐 What else if we want to add new component (or) update existing component.

    .
    ├── src
    ├─── components

The custom components we are using in the entire application are going to created and updated in the give path. (src/components).

## Suppose if we want to edit the forms inside the popup, Like adding or removing the input field in popups, we can access using the below file path.

    .
    ├── src
    ├─── components
    ├───── Forms
    ├───────AddEmployee.js

<hr/>

## 🙂 What to contribute ?

## Contribution checklist?

- [ ] The commit messages are detailed
- [ ] It does not break existing features (unless required)
- [ ] I have performed a self-review of my own code
- [ ] Documentation has been updated to reflect the changes
- [ ] Tests have been added or updated to reflect the changes
- [ ] All code formatting pass
- [ ] All lints pass
- [ ] All tests pass

## Security checklist?

- [ ] Injection has been prevented (parameterized queries, no eval or system calls)
- [ ] The UI is escaping output (to prevent XSS)
- [ ] Sensitive data has been identified and is being protected properly

## Demo?

Optionally, provide any screenshot, gif or small video.

##  The application is open for all of your ideas and contributions are always welcome.🤗