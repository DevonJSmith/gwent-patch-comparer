dir /b | find "png" /i > temp.log
 set tempvar=
 for /f "tokens=1-2 delims=." /f %%A in (temp.log) do (
 rename_file.bat %%A %%B
 )

 del temp.log