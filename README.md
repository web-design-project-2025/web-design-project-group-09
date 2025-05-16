## Web design project group 09
The purpose of the project is to make a website while learning to manage a project and work in a team. 
Implements UX and UI design while showcasing programming knowledge with Javascript, CSS and HTML.

## Bacon Pancakes
Bacon Pancakes is a simple but clean website to search for recipes from your favorite Movies, TV Shows, Games, Anime, Books etc. 
Using filtering for different recipes and user friendly design with taking accessibility into account.

## Team Members
- Armando Rossmann
- Peri Muhtaroğlu
- Elina Asratyan

## 1. Feature Description

### Filtering Options
You can filter the recipes based on different criteria: by type of meal (meal, drink, or dessert), by media source (like cartoons, anime, games, or movies), and by dietary needs (vegetarian, gluten-free, or lactose-free). Once you select your preferred filters, only recipes that match your choices will be displayed.

### Search Bar
The search bar allows you to look for specific recipes by title. If you already know what you want to cook, like our classic “bacon pancakes,” you can simply type the name into the search bar and it will show up right away. It’s a fast way to find exactly what you’re looking for.

### Trending Recipes
At the top of the homepage, you’ll see a scrollable carousel showing the latest and most popular recipes. This carousel gives a quick overview of what’s trending on the site, so you can try out something new and exciting without having to search manually.

### Recipe Detail Page
Each recipe has its own page where you can find all the details you need to cook it. One of the best features here is the ability to change the number of servings between 1x, 2x, or 4x — the ingredients and nutritional values update automatically. You can also tick off ingredients and steps while you cook, read extra tips, and check the nutrition facts.

### Comments (Personal Notes)
Every recipe includes a comment section where you can leave your own personal notes. Whether it’s a reminder to add more spice or a note about how it turned out, your comments are stored in the browser’s local storage and only visible to you. You can also delete your comments at any time.

### Login and Signup
To leave comments or use personal features, users must sign up and log in. Once logged in, you’ll have access to your own user page. This keeps your notes linked to your account and ensures that only you can view and manage them.

### Suggestion Form
If you know a great recipe from a movie, game, or show that we haven’t added yet, you can submit it through our suggestion form. Once you send it in, we’ll review it before deciding whether to publish it on the site. This helps us maintain quality and keep everything media-themed.

## 2. How to Use Our Website

### Homepage
On the homepage, you’ll see all of the recipe categories you can explore, along with the trending recipes carousel. You can also click on the “View All Recipes” button to access the complete collection. Scrolling further down, you’ll find a preview of some featured recipes to get you started.

### Category Page
When you click on a specific category — like "Cartoons" or "Desserts" — you’ll be taken to a page with all matching recipes. Each card shows the name of the recipe, how long it takes to cook, and where it comes from. You can also access the full recipe by clicking on the card.

### Recipe Page
The recipe page contains everything you need to cook the dish. The servings can be adjusted to automatically update quantities and nutrition. The ingredients and steps are interactive — click to check them off as you go. Below that, you’ll find helpful cooking tips and a comment section for your own notes.

## 3. About Our Code

### JavaScript
We use multiple JavaScript files to handle everything from filtering to interactions. The most important ones include recipes.js, which manages the recipe details and functionality like servings and comments. `login.js` and `signup.js` handle the authentication process. The `suggestion.js` file is used for the suggestion form. We also have other smaller JS files for each section or category of the website.

### CSS
Our main styles are located in `style.css`, which is linked to all recipe pages. We also use `main.css` to store global variables like fonts and colors that are reused throughout the site. Each HTML page has its own dedicated CSS file for styling specific layouts or content. To ensure the website works on all devices, we’ve added a `responsiveness.css` file that handles mobile and tablet styling.

### JSON
All the recipe and filter data comes from different JSON files. `recipes.json` holds the actual recipe content — ingredients, instructions, nutrition, etc. `browse_items.json` is used to build the filter buttons and category layout. `trending_recipe.json` is responsible for displaying the carousel on the homepage. `users.json` stores login information. Finally, `website_list_searchbar.json` holds all searchable recipe names to make the search bar work properly.

## 4. Current Functionality

At the moment, we have 10 fully working recipes on the website. All of them support filtering, searching, serving adjustments, and comments. The website also includes a login and signup system, a suggestions form, and a trending recipe carousel. Every recipe is presented with complete ingredients, nutrition info, tips, and interactive steps — making the cooking process both fun and practical.

## 5. What’s Coming Next?

We are currently working on new features such as saving favorite recipes, building a shopping list, printable recipe pages, and syncing comments online. We’re also planning to grow the collection of recipes by adding even more meals from a wider range of media.
