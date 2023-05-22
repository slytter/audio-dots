# Audio dots
## A quick p5 sketch to visualize audio input

Made for the live performance of "1000 HÆNDER" by Elsked

[Live demo](https://slytter.github.io/audio-dots/)

![Elsked - 1000 HÆNDER](https://i.imgur.com/yazV4Cd.png)

## Setup
1. You must serve the files from a server. I use [http-server](https://www.npmjs.com/package/http-server) for this. You can install it with `npm install -g http-server` and then run it with `http-server -c-1`. The `-c-1` flag disables caching.
2. Navigate to `localhost:8080` in your browser. You should see the sketch running.
3. Allow the browser to access your microphone. You should see the dots moving around in response to the audio input.

