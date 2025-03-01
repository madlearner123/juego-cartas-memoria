echo off
setlocal enabledelayedexpansion

set /A i = 0

for %%f in (*.png) do (
	ren %%f !i!".png"
	set /A i = !i! + 1
)

endlocal