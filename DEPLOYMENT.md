# No Safeword App Distribution Website

This is the distribution website for the No Safeword app, a mobile application for generating random intimate scenes.

## Directory Structure

```
/App_distribute/
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── app-preview.webp
│   ├── body_worship.png
│   ├── custom_scenes.png
│   ├── favicon.png
│   ├── favourites.png
│   ├── main.png
│   └── positions.png
├── download/
│   └── NoSafeword-v1.0.apk
└── index.html
```

## Setup Instructions

1. Place your app's signed APK file in the `download` directory, naming it `NoSafeword-v1.0.apk`
2. Replace the placeholder SVG images in the `images` directory with actual screenshots and app preview images if desired
3. Host the website on a static web hosting service of your choice

## Image Requirements

The website uses a mix of WebP and PNG images:

- **app-preview.webp**: Main app icon (180px x 180px recommended)
- **Screenshot PNGs**: App screenshots in PNG format (main.png, positions.png, etc.)
- **favicon.png**: Website favicon (sizes are handled with HTML attributes)

If you wish to optimize the site further, consider converting the PNG screenshots to WebP format, which provides better compression while maintaining image quality.

## Deployment Options

This is a static website that can be hosted on various platforms:

### 1. GitHub Pages
- Create a GitHub repository
- Push the website files to the repository
- Enable GitHub Pages in the repository settings

### 2. Netlify
- Sign up for a Netlify account
- Drag and drop the App_distribute folder to Netlify's dashboard
- Your site will be automatically deployed

### 3. Vercel
- Sign up for a Vercel account
- Install the Vercel CLI: `npm i -g vercel`
- Navigate to your website directory
- Run `vercel` to deploy

### 4. Traditional Web Hosting
- Upload the files to your web hosting provider using FTP
- Make sure the directory structure is maintained

## APK Direct Download Settings

When users download your APK file directly, some web servers might incorrectly set the MIME type. To ensure proper downloads, you might need to add a `.htaccess` file with the following content:

```
<Files "*.apk">
  ForceType application/vnd.android.package-archive
  Header set Content-Disposition "attachment"
</Files>
```

## Security Considerations

- Make sure to use HTTPS for your website to ensure secure downloads
- Include instructions on how to verify the APK signature for advanced users
- Consider adding release notes for each version

## Updating the Website for New Releases

When releasing a new version of your app:

1. Update the version number in the website content
2. Add the new APK file to the download directory
3. Consider creating a section for release notes and update history
4. Update screenshots if the UI has changed significantly
