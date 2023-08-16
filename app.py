import os
from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import sqlite3

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'


def create_database():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)''')
    conn.commit()
    conn.close()

def process_excel_file(file_path):
    df = pd.read_excel(file_path)
    conn = sqlite3.connect('data.db')
    df.to_sql('users', conn, if_exists='append', index=False)
    conn.close()

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = file.filename
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            process_excel_file(file_path)
            return redirect(url_for('uploaded', filename=filename))
    return render_template('upload.html')

@app.route('/uploaded')
def uploaded():
    return "File uploaded and data stored successfully!"

if __name__ == '__main__':
    create_database()
    app.run(debug=True)
