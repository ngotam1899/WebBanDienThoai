import subprocess
from gtts import gTTS

# Đoạn text muốn convert to audio
myText = "Welcome to TellMe"

# Ngôn ngữ bạn muốn convert
language = 'en'

myObj = gTTS(text=myText, lang=language)
myObj.save("welcome.mp3")

# chạy file vừa convert
subprocess.call(['vlc', "welcome.mp3", '--play-and-exit'])