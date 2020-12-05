# Berzerk
A 3D shooting game developed using WebGL and Three.js.

## Video
[![Video](http://i3.ytimg.com/vi/Ek_L5upUZSw/maxresdefault.jpg)](https://youtu.be/Ek_L5upUZSw)

## Instructions for running the game
Run the program on a local server. The music won’t play if the index.html file is run locally.

Use the following commands to run the program on the local server.

If you have Python installed, it should be enough to run this from a command line (from your working directory):

1. For Python 2.x:
python -m SimpleHTTPServer

2. For Python 3.x:
python -m http.server

This will serve files from the current directory at localhost under port 8000, i.e in the address bar type:
http://localhost:8000/

## Instructions for playing the game
Following keys are used to control the player:
1. W: Move Up
2. S: Move Down
3. A: Move Left
4. D: Move Right
5. Space: Shoot

Player dies if hit by enemy bullets or when it touches the maze walls. The score is incremented by 10 points every time the player shoots the enemy.
