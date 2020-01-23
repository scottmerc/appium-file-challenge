from appium import webdriver

caps = {
  "deviceName": "Pixel 3 API 29",
  "uuid": "emulator-5554",
  "platformName": "Android",
  "platformVersion": "10.0",
 
}

driver = webdriver.Remote("http://localhost:4723/wd/hub", caps)

driver.push_file("/mnt/sdcard/Pictures/test.txt", 'QXJlIHlvdXIgYmVlcnMgb2theT8=')

driver.quit()