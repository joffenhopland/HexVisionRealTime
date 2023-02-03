from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time

chrome_options = Options()

chrome_options.add_argument("--headless")

driver = webdriver.Chrome(
    executable_path='/usr/bin/chromedriver.exe', options=chrome_options)
driver.get("http://localhost:3000")

time.sleep(500)
print(driver.current_url)
driver.close()
