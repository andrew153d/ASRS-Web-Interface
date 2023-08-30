
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

@app.route("/")
def index():
    return render_template("index.html", band0="hi")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
