---
description: How to initialize this project as a Git repository and push it to a new remote.
---

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Add Files**:
   Stage all your files for the first commit.
   ```bash
   git add .
   ```

3. **Commit**:
   Save your changes locally.
   ```bash
   git commit -m "Initial commit: Vivid Dashboard with Galaxy V2"
   ```

4. **Create a Repository on GitHub/GitLab**:
   - Go to [GitHub.com/new](https://github.com/new).
   - Name your repository (e.g., `vivid-dashboard`).
   - Do **not** initialize with README/gitignore (you already have them).
   - Click "Create repository".

5. **Link Remote**:
   Copy the URL provided by GitHub (e.g., `https://github.com/username/repo.git`) and run:
   ```bash
   git remote add origin <YOUR_REPO_URL>
   ```

6. **Push**:
   Upload your code.
   ```bash
   git branch -M main
   git push -u origin main
   ```
