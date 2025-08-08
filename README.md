# 🏕️ YelpCamp

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

YelpCamp is a full-stack web application that allows users to discover, create, and review campgrounds from around the world. Inspired by Yelp but focused on outdoor experiences, the platform provides user authentication, interactive maps, and dynamic campground listings. It is built using the Node.js, Express, MongoDB, and EJS stack, following modern web development practices.

---

## **Live Demo**

[View Live](https://yelpcamp-tae8.onrender.com)

---

## **Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Connect](#connect)

---

## **Features**

- 🔐 User authentication with registration & login

- 🗺️ Create, edit, and delete campgrounds with image uploads

- 💬 Leave reviews and ratings on campgrounds

- 🧭 Map integration with location-based search (via Mapbox)

- 🧼 Form validation and sanitization

- ⚙️ RESTful routing and MVC structure

---

## **Installation**

Clone the repository:

```bash
git clone url of repository
cd project-name
```

Install Dependencies

```bash
npm install
```

Configure Environment Variables
Create a .env file and add the following:

```bash
DATABASE_URL=your_mongodb_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
SECRET=your_session_secret
```

Run the Application

```bash
node app.js
```

or

```bash
nodemon app.js
```

## **Usage**

- Visit the homepage to explore all campgrounds

- Sign up or log in to create a new campground

- Click on any campground to view details and reviews

- Logged-in users can edit or delete their own campgrounds and reviews

## **Customization**

- Modify views in the `/views` folder to customize UI

- Update routes in `/routes` to add new functionality

- Change models in `/models` for data structure customization

- Replace logos, icons, and styles in `/public` as needed

## **💻 Technologies Used**

- Frontend: HTML, CSS, Bootstrap, EJS

- Backend: Node.js, Express.js

- Database: MongoDB, Mongoose

- Authentication: Passport.js

- Maps & Geolocation: Mapbox

- Image Storage: Cloudinary

- Environment Variables: dotenv

- Utilities: Method-override, Express-session, Connect-flash

## **🙏 Acknowledgements**

- Colt Steele - The Web Developer Bootcamp

- Mapbox

- Cloudinary

- Bootstrap

## **🤝 Contributing**

Contributions are welcome! Feel free to open issues or submit pull requests.
To contribute:

1. Fork the repo

2. Create a new branch `(git checkout -b feature/feature-name)`

3. Commit your changes `(git commit -am 'Add new feature')`

4. Push to the branch `(git push origin feature/feature-name)`

5. Open a pull request

## **🌐 Connect**

- 💼 LinkedIn
- 📧 Email:
