from playwright.sync_api import sync_playwright

def run_cuj(page):
    # 1. Landing Page
    page.goto("http://localhost:5173/")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/1_landing_page.png")

    # 2. Login -> Dashboard
    page.goto("http://localhost:5173/login")
    page.wait_for_timeout(500)
    page.click("button[type='submit']")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/2_dashboard.png")

    # 3. New Listing Form -> Generate
    page.goto("http://localhost:5173/dashboard/new")
    page.wait_for_timeout(500)
    page.click("button[type='submit']")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/screenshots/3_results_page.png")

    # 4. Public Mini-Site
    page.goto("http://localhost:5173/p/demo742e")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/4_public_minisite.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
