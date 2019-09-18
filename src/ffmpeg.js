const { ffmpeg, youtubedl } = require("../bin/runner.json");
const { spawn } = require("child_process");
const command = `${ffmpeg} -stream_loop 5 -t 00:30:00  -re -i $(${youtubedl} -f "best[height<720]" -g https://www.youtube.com/watch?v=Fw0R0b2r6pE --restrict-filenames)  -stream_loop 5  -re -i $(${youtubedl} -f bestaudio[ext=m4a] -g https://www.youtube.com/watch?v=Fw0R0b2r6pE --restrict-filenames) -vcodec copy -acodec  copy -f flv "rtmps://live-api-s.facebook.com:443/rtmp/957051864633459?s_bl=1&s_ps=1&s_sml=3&s_sw=0&s_vt=api-s&a=AbwcOtaTJKX35xtH"`
console.log(command)