[Link to Notes](./notes.md)

# **Portfoilo Website**

## **Specification Deliverable**

### **Elevator pitch**

Imagine exploring a portfolio that’s not just a static resume, but an interactive experience! My personal website showcases my skills, projects, and achievements in a fresh and engaging way. Beyond just reading about my journey, visitors can dive into a fun, simple maze mini-game that brings my story to life. Whether it's trying to get out of maze with the information from protfolio, this interactive element keeps you engaged while learning more about me. It’s more than just a resume – it’s a unique way to connect with my professional journey!

### **Design**
![Desktop1](./public/imgs/Desktop1.jpg)
![Desktop2](./public/imgs/Desktop2.jpg)

### **Key features**
- Secure login over HTTPS for maze game
- Ability to select the buttons for game
- Display of portfolio infromation
- Ability to choose the one option out of two go forward maze
- Display total time that they took to finish the game
- Top 5 ranks from game will be saved

### **Technologies**

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one for seeing portfolio.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **React** - Provides login, choice display, applying maze game, display other users result of game, and use of React for routing and components.
- **Service** - Backend service with endpoints for:
  - Login
  - Set the questions tree for the game
  - Choosing answer in the game
  - Recording the time during game
- **Java script** - Handles interactivity, game logic, communication with the back-end via API calls, and validation of login forms.
- **DB/Login** - Store users, choices, and time record in database. Register and login users. Credentials securely stored in database. Can't play game unless authenticated.
- **WebSocket** - As each user make choices in the game, their time result are broadcast to all other users.


## **HTML deliverable**
- **HTML pages** - Two HTML pages for portfolio info and game page
- **3rd Party Services** - I brought my profile image by using url on online.
- **Links** - Play button links to the game page.
- **Text** - My resume's information and questions and selections in game are represented by a textual description.
- **Images** - I posted my profile picture. Also, I am thinking adding more pictures that are related to my resume.
- **DB/Login** - Input box for login. The questions and selection options for the game will be from the database.
- **WebSocket** - The Top Ranks will be updated in real time.

## **CSS deliverable**

- **Header, footer, and main content body** - There are contents in each sections.
- **Navigation elements** - I made underlines and made a link to specific section of page.
- **Responsive to window resizing** - My elements are made of Gird. I checked they are responsive for size of screen.
- **Application elements** - Used good contrast and whitespace.
- **Application text content** - Consistent fonts.
- **Application images** - I have put icons, and images. I am planning to add more images as I continue with JS.

## **React deliverable**

- **Vite** - Created the vite development environment for react web development.
- **Data Base** - Displayed final score of user at the end of the game. Currently this is stored at local storage, but it will be replaced with the database data later.
- **WebSocket** - I made the function to display the scores at the rank box . This will be replaced with WebSocket messages later.
- **Router** - Routing between Menu, Footer, Login, Game page.
- **Hooks** - I used hooks such as useState to manage state (e.g., user input or score), and useNavigate to handle navigation between pages based on user interactions in the game.
- **Login** - When you press enter or the login button it takes you to game page.


## **Service deliverable**

- **Node.js/Express HTTP service** - Done!
- **Static middleware for frontend** - Done!
- **Calls to third party endpoints** - Calling the motivation quotes from open API.
- **Backend service endpoints** - Placeholders for login that stores the current user on the server.
- **Frontend calls service endpoints** - I did this using the fetch function.