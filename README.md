# 🛠️ GitHub Issues Tracker

Welcome to my **GitHub Issues Tracker**! This is a simple, clean, and fully functional dashboard designed to manage project tasks and bugs efficiently. It connects to a live API to fetch, filter, and display issue data in real-time.

## 🚀 Live Demo
You can explore the project live here:  
👉 **[https://arrimon.github.io/github-issue-tracker/](https://arrimon.github.io/github-issue-tracker/)**

## ✨ Project Overview
This application was built with a focus on clean UI and smooth user experience. It demonstrates how to handle complex data states, such as filtering by status (Open/Closed) and searching through records dynamically.

### Core Features:
* **Authentication:** A professional login gate requiring demo credentials to access the tracker.
* **Dynamic Issue Cards:** Displays Title, Priority, Labels, and Author in a clean 4-column grid.
* **Status Filtering:** Dedicated tabs to instantly switch between **All**, **Open**, and **Closed** issues.
* **Detailed Modals:** Deep-dive into any issue with a single click to see descriptions and assignees.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views using Tailwind CSS.

## 🛠️ Built With
* **Logic:** Vanilla JavaScript (ES6+)
* **Styling:** Tailwind CSS & DaisyUI
* **Icons:** Lucide Icons
* **API:** RESTful API for issue management

## 🔑 Demo Access
To test the login functionality, use these credentials:
* **Username:** `admin`
* **Password:** `123456`

## ⚙️ Local Installation
If you want to run this project on your local machine:
1. Clone the repo: `git clone https://github.com/arrimon/github-issue-tracker.git`
2. Open `index.html` in your browser.

## 🚀 Challenges

### 1. var vs let vs const
* **var:** The legacy way to declare variables. It is function-scoped and can be redeclared.
* **let:** The modern way for variables that need to change. It is block-scoped and safer to use.
* **const:** Used for variables that stay constant. Once assigned, they cannot be reassigned (used for most functions and API data in this project).

### 2. Spread Operator (`...`)
Used to expand or copy elements from arrays and objects. 
* **Example:** ```javascript
    const originalIssues = [issue1, issue2];
    const updatedIssues = [...originalIssues, newIssue];
    ```

### 3. Array Methods: map(), filter(), & forEach()
* **map():** Used to transform data into a new array (e.g., converting the issues array into HTML cards).
* **filter():** Used to create a subset of data (e.g., showing only "Open" or "Closed" issues).
* **forEach():** Used to loop through items when no new array is needed (e.g., adding event listeners to buttons).

### 4. Arrow Functions
A concise way to write functions using the `=>` syntax. It makes the code much cleaner and easier to read.
* **Example:** `const displayCards = (issues) => { ... }`

### 5. Template Literals
Using backticks (`` ` ``) to inject variables directly into strings. This was essential for generating the dynamic HTML for the cards and modals.
* **Example:** ```javascript
    console.log(`Issue ID: ${issue.id}`);
    ```

---
**Developed by Md Abu Rayhan Rimon.** *Feel free to star the repo if you find this helpful!* 😊