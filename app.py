import os
from flask import Flask, render_template, request, redirect, url_for, flash
import pandas as pd
import sqlite3

app = Flask(__name__)
app.secret_key = "abc"
app.config['UPLOAD_FOLDER'] = 'uploads'

df = None  # Initialize the DataFrame globally

def create_database():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)''')
    conn.commit()
    conn.close()

#this is for uploading database in html
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    global df  # Access the global DataFrame
    if request.method == 'POST':
        if 'file' in request.files:
            file = request.files['file']
            filename = file.filename
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            df = pd.read_excel(file_path)
            flash("You selected a file!")
            return render_template('index.html', data=df.to_html(index=False))
    return render_template('index.html')

#this is for filtering the database in html
@app.route('/filter', methods=['POST'])
def filter_data():
    global df  # Access the global DataFrame
    if request.method == 'POST':
        selected_state = request.form.getlist("stateCheckbox")
        selected_district = request.form.getlist("districtCheckbox")
        selected_clg = request.form.getlist("clgCheckbox")
        selected_course = request.form.getlist("courseCheckbox")

        if not selected_state and selected_district and selected_clg and selected_course:
            flash("Please select at least one category.")
            filtered_df = df
        
        else:
            # Filter the DataFrame based on selected categories and types
            if selected_state and selected_district and selected_clg and selected_course:
                filtered_df = df[df["State"].isin(selected_state) & df["District"].isin(selected_district) & df["Types_of_Organization"].isin(selected_clg) & df["Course"].isin(selected_course)]
            elif  selected_state and selected_district and selected_clg:
                filtered_df = df[df["State"].isin(selected_state) & df["District"].isin(selected_district) & df["Types_of_Organization"].isin(selected_clg)]
            elif  selected_state and selected_clg and selected_course:
                filtered_df = df[df["State"].isin(selected_state) & df["Types_of_Organization"].isin(selected_clg) & df["Course"].isin(selected_course)]
            elif selected_state and selected_district:
                filtered_df = df[df["State"].isin(selected_state) & df["District"].isin(selected_district)]
            elif selected_state and selected_clg:
                filtered_df = df[df["State"].isin(selected_state) & df["Types_of_Organization"].isin(selected_clg)]
            elif selected_clg and selected_course:
                filtered_df = df[df["Types_of_Organization"].isin(selected_clg) & df["Course"].isin(selected_course)]
            elif selected_state:
                filtered_df = df[df["State"].isin(selected_state)]
            elif selected_clg:
                filtered_df = df[df["Types_of_Organization"].isin(selected_clg)]
            else:
                # If no checkboxes are selected, show all data
                filtered_df = df

            data_html = filtered_df.to_html(index=False)
            return render_template("index.html", data=data_html)

    flash("No data available for filtering.")
    filtered_df = df

@app.route('/uploaded')
def uploaded():
    return "File uploaded and data stored successfully!"

if __name__ == '__main__':
    create_database()
    app.run(debug=True)