# Havenstone Realty

A responsive, frontend-only real estate demonstration website built with semantic HTML, CSS, Tailwind CDN utilities, and vanilla JavaScript. Property data, team profiles, testimonials, office details, and all inquiries are illustrative. No form submits data to a server, and property availability is not real.

## Run locally

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already available.
3. Open `index.html` and choose **Open with Live Server**.
4. Browse the site at the local URL shown by the extension.

The data is loaded through classic scripts, so the project avoids ES module and local-file CORS issues. Google Fonts, Tailwind CDN, and Unsplash-hosted photography require an internet connection. If you need production submissions, connect the forms to a trusted backend and add appropriate privacy and validation controls.

## Pages

- `index.html`: home, search, featured properties, services, locations and journal preview
- `properties.html`: searchable, sortable property collection with filters and incremental loading
- `property-details.html?id=h01`: query-selected property detail, gallery, favorites and inquiry UI
- `buy.html`, `rent.html`, `sell.html`: buyer, renter and seller guidance
- `about.html`, `contact.html`: company story, team and contact form
- `blog.html`, `article-details.html?id=slow-morning`: journal filters and article view

Favorites are stored in browser localStorage. Forms show local demonstration feedback only.