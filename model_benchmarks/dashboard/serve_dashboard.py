"""
FarmMind AI - Launch Standalone Benchmark Dashboard
Serves the benchmarking dashboard locally and opens it in the browser.
"""
import http.server
import socketserver
import webbrowser
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    os.chdir(DIRECTORY)
    url = f"http://localhost:{PORT}/"
    print("=" * 60)
    print("FarmMind AI — Standalone Model Benchmark Dashboard")
    print("=" * 60)
    print(f"Serving dashboard at: {url}")
    print("Press Ctrl+C to stop.")
    
    # Automatically open browser
    webbrowser.open(url)
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nDashboard server stopped.")

if __name__ == "__main__":
    main()
