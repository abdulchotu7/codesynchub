import json
import os
from bs4 import BeautifulSoup

output_dir = "data"

with open(os.path.join(output_dir, "leetcode.html"), "r", encoding="utf-8") as f:
    doc = f.read()

soup = BeautifulSoup(doc, "lxml")

rating = soup.find(class_="text-label-1 dark:text-dark-label-1 flex items-center text-2xl")
solved = soup.find(class_="text-[30px] font-semibold leading-[32px]")
easy = soup.find_all(class_="text-sd-foreground text-xs font-medium")
max_streak = soup.find_all(class_="font-medium text-label-2 dark:text-dark-label-2")

data = {
    "rating": rating.string.strip() if rating else "N/A",
    "solved": solved.string.strip() if solved else "N/A",
    "max_streak": max_streak[1].string.strip() if len(max_streak) > 1 else "N/A",
    "type": [e.string.strip() for e in easy] if easy else []
}

with open(os.path.join(output_dir, "scraped_data.json"), "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, indent=4)
