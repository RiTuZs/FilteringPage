# This Python code sets up a Flask web application for uploading, filtering, and displaying data. It imports necessary modules, including Flask for web handling, Pandas for data manipulation, and SQLite3 for database management. The app initializes with a secret key and configures an upload folder. It defines routes for uploading a database file and filtering data based on user-selected checkboxes. Additionally, a route is set up to confirm successful file uploads. The code also initializes a global DataFrame, and when a file is uploaded, it reads the data into the DataFrame. Filtering is performed based on various checkbox selections, and the filtered data is displayed in an HTML template. The application starts when the script is run, and it also creates an SQLite database to store user data. Flash messages are used for user feedback during the upload and filtering processes.

# Import necessary modules
import os
from flask import Flask, render_template, request, redirect, url_for, flash
import pandas as pd
import sqlite3

# Initialize a Flask application
app = Flask(__name__)
app.secret_key = "abc"  # Set a secret key for Flask session management
app.config['UPLOAD_FOLDER'] = 'uploads'  # Configure the upload folder for file uploads

df = None  # Initialize the DataFrame globally

def create_database():
    # Create an SQLite database and a users table if it doesn't exist
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER)''')
    conn.commit()
    conn.close()

# This is route for uploading database in html
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    global df  # Access the global DataFrame
    if request.method == 'POST':
        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                flash("Please upload a file!")
            else:
                filename = file.filename
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                df = pd.read_excel(file_path)
                flash("You selected a file!")
                return render_template('index.html', data=df.to_html(index=False))
    return render_template('index.html')

#This is route for filtering the database in html
@app.route('/filter', methods=['POST'])
def filter_data():
    global df  # Access the global DataFrame
    if request.method == 'POST':
        if df is None:
            flash("Please upload a file before searching.")
        else:
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

# Route for confirming successful file upload
@app.route('/uploaded')
def uploaded():
    return "File uploaded and data stored successfully!"

# Start the Flask application
if __name__ == '__main__':
    create_database()  # Create the database if it doesn't exist
    app.run(debug=True)  # Start the Flask application

