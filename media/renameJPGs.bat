echo off
setlocal enabledelayedexpansion

set /A i = 0

for %%f in (*.jpg) do (
	ren %%f !i!".jpg"
	set /A i = !i! + 1
)

endlocal