# Pantry Hound
## Application Summary

This app lets you log all of your household foods and their calorie count and set a daily calorie limit for yourself. When you press a button "Fetch my food" It generates a list of your available foods that you can eat before you reach your cal. limit. As the day goes on and you are closer to your cal. limit the list gets more refined.

Link to front-end client built using React.
https://pantryhound.vercel.app/
![image](https://user-images.githubusercontent.com/72418388/107437670-f6327b00-6af4-11eb-90a7-d92b2f005ad7.png)


## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.
### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
## Technology used to create Pantry Hound
### Backend
• Node & Express <br/>
  ⁃ RESTful API <br/><br/>
• Testing <br/>
  ⁃ Supertest <br/>
  ⁃ Mocha & Chai <br/><br/>
• Database <br/>
  ⁃ PostgreSQL <br/>
  ⁃ Knex <br/><br/>
• Production <br/>
  ⁃ Deployed via Heroku <br/>
### Frontend
• React <br/>
  ⁃ Create React <br/>
  ⁃ React Router <br/>
  ⁃ React Context <br/><br/>
• Testing <br/>
  ⁃ Jest (smoke tests) <br/><br/>
• Production <br/>
  ⁃ Deployed via Vercel <br/>
## Documentation of API
### Pantry Hound
#### Pantry Endpoint
`GET  /pantry` <br/>
Provides full list of foods saved to pantry. <br/>
`POST  /pantry` <br/>
Creates new food with name and calories per serving <br/>
| Key | Value |
| ------------- | ------------- |
| title  | Text, required |
| cal  | Text, required |
`DELETE  /pantry/:id` <br/>
Deletes a specific product that matches endpoint id. <br/>
#### Diet Endpoint
`PATCH /diet/:id` <br/>
Updates users calorie limit. <br/>
| Key  | Value |
| ------------- | ------------- |
| cal_limit  | Text, required  |