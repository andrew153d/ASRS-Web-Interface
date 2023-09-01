
from flask import Flask, render_template, request, jsonify, send_file

import csv
import sys
import socket
import threading
import time
import json
from getpass import getuser
#sys.path.append("../")
app = Flask(__name__)

def replace_in_html_string(content, replacement_dict):
    for key, value in replacement_dict.items():
        content = content.replace(key, value)
    return content


# @app.route("/homePage.html")
# def sendHomePage():
#     return send_file("templates/homePage.html", mimetype="text/html")

@app.route("/homePage.html")
def sendHomePage():
    original_html_path = "templates/homePage.html"
    
    front = "<h2>"
    center = "</h2><p>"
    end = "</p>"
    with open(original_html_path, 'r') as file:
        content = file.read()

    replacements = {
        "row1col1": front + "Total Quantity" + center + "146",
        "row1col2": front + "Number of types" + center + "16",
        "row2col1": front + "parts per month" + center + "16",
        "row2col2": front + "most popular parts" + center + "16",
        "row2col3": front + "reorder" + center + "16",
        "row3col1": front + "graph" + center + "16",
        "row3col2": front + "least used" + center + "16",
        "row3col3": front + "average part quantity" + center + "16",
        "row3col4": front + "retreival time" + center + "16",

        
    }
    
    modified_content = replace_in_html_string(content, replacements)
    
    return modified_content

@app.route("/browsePage.html")
def sendBrowsePage():
    return send_file("templates/browsePage.html", mimetype="text/html")

@app.route("/")
def index():
    return render_template("index.html", band0="hi")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
