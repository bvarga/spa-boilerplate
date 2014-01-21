call compile.cmd
pushd public
node ..\r.js -o mainConfigFile=js\config.js baseUrl=./js
popd

call busta --file .\release\js\login.js
call busta --file .\release\js\home.js
call busta --file .\release\js\lib\require.js
call busta --file .\release\css\login.css
call busta --file .\release\css\home.css
