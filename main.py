from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, 
            static_folder='.', 
            static_url_path='',
            template_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)