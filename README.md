### **Overview**

Sprint_2, migrated project to MVC architecture, created base Block and used component approach
Added validation logic to inputs

To install dependencies use `npm install`

To run project in development mode use `npm run dev`

To build and start project locally `npm run start`

To run linters use `npm run lint`

### **Routing**

On the current stage of development, routing is realised via change in url for some links and <a> tags

/ - login page

/register - registration page

/im - main messenger page, with chat select and messaging block
_Info:_ only way to get to this page is to manually type `/im` in address bar

/profile - user profile page

/edit_data - page for editing user's information

/edit_password - page for editing user's password

/404 - default page that will show up if someone tries to access not existing page

/500 - internal server error page, no logic realized yet

Routing might be updated as the development goes on

### **Design link**

https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&p=f

### **Netlify link**

https://melodious-dolphin-722b36.netlify.app/
