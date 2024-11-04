import sys
import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

output_dir = "data"
os.makedirs(output_dir, exist_ok=True)

if len(sys.argv) != 2:
    print("Usage: python scrape.py <url>")
    sys.exit(1)
print(sys.argv)
url = sys.argv[1]
print(url)

webdriver_path = 'C:\\Users\\sss\\Dropbox\\PC\\Downloads\\chrome\\chromedriver-win64\\chromedriver.exe'

service = Service(executable_path=webdriver_path)
driver = webdriver.Chrome(service=service)

try:
    driver.get(url)

    time.sleep(10)

    page_html = driver.page_source

    with open(os.path.join(output_dir, 'leetcode.html'), 'w', encoding='utf-8') as file:
        file.write(page_html)

finally:
    # Close the WebDriver
    driver.quit()