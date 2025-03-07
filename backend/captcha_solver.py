import requests
import time
from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379/0")

API_KEY = "your_2captcha_api_key"
captcha_site_key = "sitekey_from_target"
page_url = "https://targetsite.com"


@app.task
def solve_captcha():
    response = requests.post("http://2captcha.com/in.php", {
        "key": API_KEY,
        "method": "userrecaptcha",
        "googlekey": captcha_site_key,
        "pageurl": page_url
    })

    request_id = response.text.split('|')[1]

    # Wait for solution
    time.sleep(10)
    while True:
        result = requests.get(f"http://2captcha.com/res.php?key={API_KEY}&action=get&id={request_id}")
        if result.text.startswith("OK"):
            return result.text.split('|')[1]
        time.sleep(5)


@app.task
def crawl_with_captcha(url):
    captcha_solution = solve_captcha()
    print(f"Crawling {url} with Captcha solution: {captcha_solution}")
