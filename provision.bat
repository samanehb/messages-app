@echo off
set /p envname= Enter a name for AWS environment: 
if not defined DATABASE_NAME set /p DATABASE_NAME= Enter a name for a new database: 
if not defined DATABASE_USER set /p DATABASE_USER= Enter your Cloudant account: 
if not defined DATABASE_PASS set /p DATABASE_PASS= Enter Cloudant password this will be in clear text: 
REM build - this will create lib folder which was ignored in git repository
call npm run build
call eb init %envname% -p node.js
call eb create %envname% --single --envvars DATABASE_NAME=%DATABASE_NAME%,DATABASE_USER=%DATABASE_USER%,DATABASE_PASS=%DATABASE_PASS%
@echo on