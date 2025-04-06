### **Overview**

Sprint_4, finished basic functional, including authorization, registration, real-time messaging, profile customization.
Added tests for HTTPTransport, Block(view) and Router.

To install dependencies use `npm install`

To run project in development mode use `npm run dev`

To build and start project locally `npm run start`

To run linters use `npm run lint`

To run tests use `npm run test`

### **Routing**

This is SPA. Created Router instance to offhand default browser navigation to.

/ - login page

/register - registration page
_Info:_ If you are not authentificated - you won't be able to access any other pages than these two. It's also works in reverse, if you are authentificated - you won't be able to access these pages, except after logging out.

/messenger - main messenger page
_Info:_ You will be redirected to this page by default if you are logged in.

/settings - user profile page

/settings/edit_data - page for editing user's information

/settings/edit_password - page for editing user's password

/404 - default page that will show up if someone tries to access not existing page

/500 - internal server error page, no logic realized yet

### **Design link**

https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&p=f

### **Netlify link**

https://melodious-dolphin-722b36.netlify.app/
