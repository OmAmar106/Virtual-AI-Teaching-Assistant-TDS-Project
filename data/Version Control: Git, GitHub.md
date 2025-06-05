Version Control: Git, GitHub [#/git?id=version-control-git-github] Git [https://git-scm.com/] is the de facto standard for version control of software (and sometimes, data as well). It’s a system that keeps track of changes you make to files and folders. It allows you to revert to a previous state, compare changes, etc. It’s a central tool in any developer’s workflow. GitHub [https://github.com/] is the most popular hosting service for Git repositories. It’s a website that shows your code, allows you to collaborate with others, and provides many useful tools for developers. Watch these introductory videos to learn the basics of Git and GitHub (98 min): [https://youtu.be/HVsySz-h9r4] [https://youtu.be/RGOj5yH7evk] Essential Git Commands: # Repository Setup
git init # Create new repo
git clone url # Clone existing repo
git remote add origin url # Connect to remote

# Basic Workflow
git status # Check status
git add . # Stage all changes
git commit -m "message" # Commit changes
git push origin main # Push to remote

# Branching
git branch # List branches
git checkout -b feature # Create/switch branch
git merge feature # Merge branch
git rebase main # Rebase on main

# History
git log --oneline # View history
git diff commit1 commit2 # Compare commits
git blame file # Show who changed what Copy to clipboard Error Copied Best Practices: Commit Messages # Good commit message format
type ( scope ) : summary

Detailed description of changes.

# Examples
feat ( api ) : add user authentication
fix ( db ) : handle null values in query Copy to clipboard Error Copied Branching Strategy main: Production code develop: Integration branch feature/*: New features hotfix/*: Emergency fixes Code Review Keep PRs small (<400 lines) Use draft PRs for WIP Review your own code first Respond to all comments Essential Tools GitHub Desktop [https://desktop.github.com/] : GUI client GitLens [https://gitlens.amod.io/] : VS Code extension gh [https://cli.github.com/] : GitHub CLI pre-commit [https://pre-commit.com/] : Git hooks

PreviousDatabase: SQLite [#/sqlite]

Next2. Deployment Tools [#/deployment-tools]