REM build - this will update lib folder - ignored by gitignore
call npm run build
REM eb command has a known problem in Windows where it doesnt respect ebignore for nested folders. Removing the folder to avoid the problem.
echo deleting node_modules due to a bug in ebignore for Windows
rmdir /Q /S node_modules
REM deploy uncommited files to include lib folder
call eb deploy --staged

