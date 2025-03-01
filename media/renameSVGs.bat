echo off
setlocal enabledelayedexpansion

set /A i = 0

for %%f in (*.svg) do (
	ren %%f !i!".svg"
	set /A i = !i! + 1
)

endlocal