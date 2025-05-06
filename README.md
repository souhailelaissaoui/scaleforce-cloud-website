# Scale Force Cloud Website

This is the official website for Scale Force Cloud, providing AI & Cloud consulting services for startups and enterprises.

## Project Structure

The website follows modern best practices for static website organization:

```
website/
├── assets/
│   ├── images/       # All image files (logos, photos, icons)
│   └── videos/       # Video files
├── css/              # CSS stylesheets
├── js/               # JavaScript files
└── index.html        # Main HTML file
```

## File Organization

- **HTML**: Single page website with sections for hero, services, and contact
- **CSS**: Styles organized in a single file (css/styles.css)
- **JavaScript**: Functionality split into two files:
  - `js/ui-interactions.js`: Handles animations, mobile menu, and UI interactions
  - `js/form-handlers.js`: Manages form submissions and popup functionality
- **Assets**: All media files organized by type in the assets directory

## Development

This is a static website that can be served directly from any web server or hosting service.

### Local Development

To run the website locally, you can use any local server. For example:

```bash
# Using Python's built-in HTTP server
python -m http.server

# Or using Node.js with http-server
npx http-server
```

## Deployment

The website is currently deployed on AWS S3 as a static website at scaleforce.cloud.

## Contact

For any questions or inquiries about this website, please contact:
- Email: souhail@scaleforce.cloud
- Phone: +33 (0)6 05 60 03 61
