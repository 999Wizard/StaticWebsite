# AI Reflection

## Part 1 Reflection

> Keep your original Part 1 reflection here. Do not submit this placeholder as your Part 1 reflection.

## Part 2 Reflection

### AI tools used
I used ChatGPT to help expand my existing single-page portfolio into three HTML pages with a shared stylesheet and external JavaScript.

### Prompts used
- "Here is my multi-page interactive website assignment. Help me create the webpage with all requirements, using my existing index.html and styles.css."
- "Preserve my existing portfolio content and project links while adding accessible navigation, dark mode, project filtering, and contact form validation."

Add any other prompts you actually used while testing or debugging.

### How I adapted and verified the output
The generated structure separates Home, Projects, and Contact into index.html, projects.html, and contact.html. I retained the existing project descriptions and URLs, and kept the contact form clearly labeled as a demonstration because there is no email backend. The shared app.js checks whether page-specific elements exist before adding event listeners. The navigation uses aria-current for the active page, the mobile menu updates aria-expanded, and the form connects inline errors with aria-describedby.

Before submission, describe the changes **you personally made** after testing, including any keyboard, contrast, or mobile layout fixes. Do not claim tests you did not perform.
