import speech_recognition as sr

r = sr.Recognizer() #initialize recognizer
with sr.Microphone() as source:
  print("Speak Anything:")
  audio = r.listen(source)  # listen to source
  try:
    text = r.recognize_google(audio)  # use recognizer to cover audio to text
    print("You said: {}".format(text))
  except:
    prin t("Sorry could not recognize your voice") # voice ko đc nhận ra