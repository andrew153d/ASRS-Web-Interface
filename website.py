
from flask import Flask, render_template, request, jsonify, send_file
import copy
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
    try:
        with open("parts_store.json", "r") as json_file:
            part_data = json.load(json_file)
        with open("templates/browsePage.html", "r") as html_file:
            browsePage = html_file.read()
    except Exception as e:
        return render_template("browsePage.html", part_list = "")
    
    content = """
        <button type="button" class="row list_button listHeader">
            <span class="col-2"><strong>ID</strong></span>
            <span class="col-3"><strong>Name</strong></span>
            <span class="col-2"><strong>Value</strong></span>
            <span class="col-2"><strong>Footprint</strong></span>
            <span class="col-3"><strong>Rating</strong></span>
        </button>
        """

    template ="""
        <button type="button" onclick=loadPartModifiers(ID) class="row list_button">
            <span class="col-2">ID</span>
            <span class="col-3">Name</span>
            <span class="col-2">Value</span>
            <span class="col-2">Footprint</span>
            <span class="col-3">Rating</span>
        </button>
        """

    #insert the list of parts
    for part in part_data:
         content += replace_in_html_string(template, part)
    
    browsePage = replace_in_html_string(browsePage, {"{{part_list}}":content})
    
    return browsePage

@app.route("/")
def index():
    return render_template("index.html", band0="hi")

def findPartByID(partID):
    with open("parts_store.json", "r") as json_file:
            part_data = json.load(json_file)
    for part in part_data:
        if(part["ID"] == partID):
            return part
    return ""

def findParIndextByID(partID):
    with open("parts_store.json", "r") as json_file:
            part_data = json.load(json_file)
    for i in range(len(part_data)):
        if(part_data[i]["ID"] == partID):
            return i
    return -1

# button coming from log section of website
@app.route("/getPart", methods=["POST"])
def log():
    requestDict = request.get_json()
    try:
        # Read data from the JSON file
        with open("parts_store.json", "r") as json_file:
            part_data = json.load(json_file)
    except Exception as e:
        return jsonify({"error": str(e)})
    p = findPartByID(requestDict["partID"])
    return p

def updateJson(part):
    index = findParIndextByID(part["ID"])
    with open("parts_store.json", "r") as json_file:
        part_data = json.load(json_file)
    json_file.close()
    part_data[index] = part
    print(part)
    with open("parts_store.json", "w") as json_file:
        json.dump(part_data, json_file, indent=4)

def deleteJson(part):
    index = findParIndextByID(part["ID"])
    with open("parts_store.json", "r") as json_file:
        part_data = json.load(json_file)
    json_file.close()
    del part_data[index]
    print(part)
    with open("parts_store.json", "w") as json_file:
        json.dump(part_data, json_file, indent=4)
        

@app.route("/savePart", methods=["POST"])
def ldog():
    requestDict = request.get_json()
    updateJson(requestDict)
    return jsonify({"return": 1})

@app.route("/deletePart", methods=["POST"])
def lddog():
    requestDict = request.get_json()
    deleteJson(requestDict)
    return jsonify({"return": 1})

@app.route("/newPart", methods=["POST"])
def ldddog():
    index=0
    with open("parts_store.json", "r") as json_file:
        part_data = json.load(json_file)
    json_file.close()

    for i in range(1, len(part_data)+2):
        if(findParIndextByID(str(i)) == -1):
                #get part 0
                print(i)
                newPart = copy.deepcopy(part_data[0])
                for field in newPart:
                    if(field != "ID"):
                        newPart[field] = "none"
                
                newPart["ID"] = str(i)
                print(newPart)
                part_data.append(newPart)
                break
    
    with open("parts_store.json", "w") as json_file:
        json.dump(part_data, json_file, indent=4)
    return jsonify({"return": 1})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
