from appium import webdriver
import base64

caps = {
  "deviceName": "Pixel 3 API 29",
  "uuid": "emulator-5554",
  "platformName": "Android",
  "platformVersion": "10.0",
 
}

driver = webdriver.Remote("http://localhost:4723/wd/hub", caps)

with open("image-appium-challenge.jpg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

driver.push_file("/sdcard/Pictures/image-appium-challenge.jpg", encoded_string)

driver.quit()