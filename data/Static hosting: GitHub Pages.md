Static hosting: GitHub Pages [#/github-pages?id=static-hosting-github-pages] GitHub Pages [https://pages.github.com/] is a free hosting service that turns your GitHub repository directly into a static website whenever you push it. This is useful for sharing analysis results, data science portfolios, project documentation, and more. Common Operations: # Create a new GitHub repo
mkdir my-site
cd my-site
git init

# Add your static content
echo "<h1>My Site</h1>" > index.html

# Push to GitHub
git add .
git commit -m "feat(pages): initial commit"
git push origin main

# Enable GitHub Pages from the main branch on the repo settings page Copy to clipboard Error Copied Best Practices: Keep it small Optimize images [https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Multimedia] . Prefer SVG over WEBP over 8-bit PNG. Preload [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload] critical assets like stylesheets Avoid committing large files like datasets, videos, etc. directly. Explore Git LFS [https://git-lfs.github.com/] instead. Tools: GitHub Desktop [https://desktop.github.com/] : GUI for Git operations GitHub CLI [https://cli.github.com/] : Command line interface GitHub Actions [https://github.com/features/actions] : Automation [https://youtube.com/shorts/WqOXxoGSpbs] [https://youtu.be/sT_zXIX3ZA0]

PreviousImages: Compression [#/image-compression]

NextNotebooks: Google Colab [#/colab]