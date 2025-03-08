echo off

for /l %%i in (1, 1, 46) do (
	curl "https://www.memorymatching.com/images/uspresidents/"%%i".jpg" -o %%i".jpg"
)