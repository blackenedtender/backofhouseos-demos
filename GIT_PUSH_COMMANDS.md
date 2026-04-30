# Git Push Commands

Use these commands from PowerShell:

```powershell
cd E:\backofhouseos-demos
git init
git branch -M main
git add .
git commit -m "Create BackOfHouseOS public demo repo"
git remote add origin https://github.com/blackenedtender/backofhouseos-demos.git
git push -u origin main
```

Recovery note:

Do not run `git init` from `C:\Users\philb`.
