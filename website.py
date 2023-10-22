
from flask import Flask, render_template, request, jsonify, send_file
import copy
import csv
import sys
import socket
import threading
import time
import json
from getpass import getuser
import re
#sys.path.append("../")
app = Flask(__name__)

# def getConfig():
#     with open("config.json", "r") as json_file:
#         data = json.load(json_file)
#     return data

# def setConfig(cfg):
#     with open("parts_store.json", "w") as json_file:
#         json.dump(cfg, json_file, indent=4)  

# class Part:
#     def __init__(self, ID):
#         self.propertyDict = {"ID": ID}

#     def __str__(self):
#         return f"{self.propertyDict}"       

#     def addProperty(self, name, value):
#         self.propertyDict[name] = value

# class PartCollection:
#     def __init__(self, filePath):
#         self.partList = []
#         if(len(filePath)==1):
#             return
#         self.jsonFilePath = filePath
#         with open(filePath, "r") as json_file:
#             self.partJson = json.load(json_file)
#         for p in self.partJson:
#             p_instance = Part(p["ID"])
#             for property in p:
#                 p_instance.addProperty(property, p[property])
#             self.partList.append(p_instance)

#     def __str__(self):
#         returnString = ""
#         for p in self.partList:
#             returnString += (str(p) + "\n") 
#         return returnString
    
#     def getPartByID(self, id):
#         for p in self.partList:
#             if p.propertyDict["ID"] == id:
#                 return p
#         return "-1"
    
#     def getPartIndexByID(self, id):
#         for i in range(len(self.partList)):
#             if self.partList[i].propertyDict["ID"] == id:
#                 return i
#         return "-1"

#     def addEmptyPart(self):
#         for i in range(1, len(self.partList)+2):
#             if(self.getPartByID(str(i)) == "-1"):
#                 #print(i)
#                 newPart = copy.deepcopy(self.partList[0])
#                 for prop in newPart.propertyDict:
#                     newPart.propertyDict[prop] = "-"
#                 newPart.propertyDict["ID"] = str(i)
#                 self.partList.append(newPart)
#                 return
    
#     def getPartListJson(self):
#         outList = []
#         for p in self.partList:
#             outList.append(p.propertyDict)
#         return outList

#     def getPartList(self):
#         return copy.deepcopy(self.partList)

#     def deletePartByID(self, id):
#         #print("deleting part " + id)
#         del self.partList[self.getPartIndexByID(id)]

#     def addPart(self, p):
#         if(self.getPartByID(p.propertyDict["ID"]) == "-1"):
#             self.partList.append(p)

#     def writeToJson(self):
#         with open("parts_store.json", "w") as json_file:
#             plist = []
#             for p in self.partList:
#                 plist.append(p.propertyDict)
#             json.dump(plist, json_file, indent=4)  
#         json_file.close()

#     def savePart(self, p):
#         i = self.getPartIndexByID(p["ID"])
#         self.partList[i].propertyDict = p
#         self.writeToJson()

#     def search(self, term):
#         newList = []
#         for p in self.partList:
#             if term.lower() in str(p).lower():
#                 newList.append(p)
#         return newList

# partListf = PartCollection("parts_store.json")

# def replace_in_string(content, replacement_dict):
#     for key, value in replacement_dict.items():
#         content = content.replace(key, value)
#     return content


# @app.route("/homePage.html")
# def sendHomePage():
#     original_html_path = "templates/homePage.html"
    
#     front = "<h2>"
#     center = "</h2><p>"
#     end = "</p>"
#     with open(original_html_path, 'r') as file:
#         content = file.read()

#     replacements = {
#         "row1col1": front + "Total Quantity" + center + "146",
#         "row1col2": front + "Number of types" + center + "16",
#         "row2col1": front + "parts per month" + center + "16",
#         "row2col2": front + "most popular parts" + center + "16",
#         "row2col3": front + "reorder" + center + "16",
#         "row3col1": front + "graph" + center + "16",
#         "row3col2": front + "least used" + center + "16",
#         "row3col3": front + "average part quantity" + center + "16",
#         "row3col4": front + "retreival time" + center + "16",
#     }
    
#     modified_content = replace_in_string(content, replacements)
    
#     return modified_content

# @app.route("/browsePage.html")
# def sendBrowsePage():
#     try:
#         with open("templates/browsePage.html", "r") as html_file:
#             browsePage = html_file.read()
#     except Exception as e:
#         return render_template("browsePage.html", part_list = "")
#     return browsePage

# @app.route("/getPartsJson")
# def getPartsJson():
#     pjson = partListf.getPartListJson()
#     #print(pjson)
#     return pjson

# @app.route("/getPartData")
# def getPartData():
#     sendData = {}
#     sendData["parts"] = partListf.getPartListJson()
#     sendData["config"] = getConfig()
#     #print(json.dumps(sendData, indent=4))
#     return sendData

@app.route("/")
def index():
    return render_template("index.html", band0="hi")

# def findPartByID(partID):
#     with open("parts_store.json", "r") as json_file:
#             part_data = json.load(json_file)
#     for part in part_data:
#         if(part["ID"] == partID):
#             return part
#     return ""

# def findParIndextByID(partID):
#     with open("parts_store.json", "r") as json_file:
#             part_data = json.load(json_file)
#     for i in range(len(part_data)):
#         if(part_data[i]["ID"] == partID):
#             return i
#     return -1

# @app.route("/getPart", methods=["POST"])
# def log():
#     requestDict = request.get_json()
#     p = partListf.getPartByID(requestDict["partID"])
#     config = getConfig()    
#     outData = {}
#     outData["part"] = p.propertyDict
#     outData["config"] = getConfig()
#     return outData

# def deleteJson(part):
#     partListf.deletePartByID(part["ID"])
        
# @app.route("/savePart", methods=["POST"])
# def savePart():
#     requestDict = request.get_json()
#     partListf.savePart(requestDict)
#     return jsonify({"return": 1})

# @app.route("/deletePart", methods=["POST"])
# def deletePart():
#     requestDict = request.get_json()
#     partListf.deletePartByID(requestDict["ID"])
#     return jsonify({"return": 1})

# @app.route("/newPart", methods=["POST"])
# def newPart():
#     partListf.addEmptyPart()
#     return jsonify({"return": 1})

# @app.route("/search", methods=["POST"])
# def newPdart():
#     requestDict = request.get_json()
#     sortedParts = PartCollection("d")
#     sortedParts.partList = partListf.search(requestDict["term"])
#     #print(sortedParts)
#     content = """
#         <button type="button" class="row list_button listHeader">
#             <span class="col-2"><strong>ID</strong></span>
#             <span class="col-3"><strong>Name</strong></span>
#             <span class="col-2"><strong>Value</strong></span>
#             <span class="col-2"><strong>Footprint</strong></span>
#             <span class="col-3"><strong>Rating</strong></span>
#         </button>
#         """

#     template ="""
#         <button type="button" onclick=loadPartModifiers(ID) class="row list_button">
#             <span class="col-2">ID</span>
#             <span class="col-3">Name</span>
#             <span class="col-2">Value</span>
#             <span class="col-2">Footprint</span>
#             <span class="col-3">Rating</span>
#         </button>
#         """

#     #insert the list of parts
#     for p in sortedParts.getPartList():
#          content += replace_in_string(template, p.propertyDict)
#     return content


def apply_filters_and_sort(parts_data, filters, sorting_criteria):
    filtered_parts = parts_data


    for filter_rule in filters:
        key, value, direction = list(filter_rule.keys())[0], list(filter_rule.values())[0], list(filter_rule.values())[1]
        if direction == "above":
            filtered_parts = [part for part in filtered_parts if part.get(key) >= str(value)]
        elif direction == "below":
            filtered_parts = [part for part in filtered_parts if part.get(key) <= str(value)]

    print(sorting_criteria[0]["field"])
    print(sorting_criteria[0]["direction"])
    sorted_parts = sorted(filtered_parts, key=lambda x: x.get(sorting_criteria[0]["field"]),reverse=(sorting_criteria[0]["direction"]=="ascending"))

    return sorted_parts

def remove_non_numbers(input_string):
    # Use regular expression to remove all non-digit characters
    return re.sub(r'[^0-9]', '', input_string)

def getPart(sku):
    try:
        with open("parts_store.json", "r") as json_file:
            part_data = json.load(json_file)
            for part in part_data:
                if part.get("SKU") == int(sku):
                    return part
    except FileNotFoundError:
        # Handle the case where the file doesn't exist
        pass

    return {}  # Return an empty dictionary if the part doesn't exist

@app.route("/inventory.html")
def showInventoryPage():
    return render_template("inventory.html")

@app.route("/partsList")
def showPartsList():
    with open("parts_store.json", "r") as json_file:
        data = json.load(json_file)
    contentString = ""
    for part in data:
        #print(part)
        #print(type(part))
        contentString+=render_template("part_template.html", **part)
    return contentString

@app.route("/getModifyPartBox", methods=["POST"]) 
def getModifyPartBox():
    # print(type(request.get_json()))
    json_data = request.get_json()
    print(remove_non_numbers(json_data["partID"]))
    with open("parts_store.json", "r") as json_file:
        data = json.load(json_file)

    part_details = {}
    for part in data:
        print(part)
        print('/n')
        print(json_data)
        if(part["SKU"] == remove_non_numbers(json_data["partID"])):
            part_details = part
            break
    print(part_details)
    return render_template("modify_part_template.html", **part_details)

@app.route("/savePart", methods=["POST"])
def savePart():
    json_data = request.get_json()
    print(json_data)
    with open("parts_store.json", "r") as json_file:
        part_data = json.load(json_file)
    newPart={}
    for part in part_data:
        if part["SKU"] == json_data["SKU"]:
            # Update the existing part dictionary with the new data
            part.update(json_data)
            newPart=part
            print("storing")
            break
    
    with open("parts_store.json", "w") as json_file:
        json.dump(part_data, json_file, indent=4)


    return render_template("part_template.html", **newPart)

@app.route("/newPart")
def newPart():
    with open("parts_store.json", "r") as json_file:
        part_data = json.load(json_file)

    newPart = {
        "SKU": -1,
        "Name":"",
        "Value": "",
        "Footprint": "",
        "Quantity": 0,
        "Rating": "",
        "Group": "",
        "Location": "",
        "Tags": "",
        "Price": 0,
        "Warning_Stock": 0,
        "Source": "empty",
        "Datasheet": "empty",
        "History": []
        }

    for i in range(1, len(part_data) + 5):
        if getPart(str(i)):
            pass
        else:
            newPart["SKU"] = i
            part_data.append(newPart)  # Add the new part to the part_data list
            break

    with open("parts_store.json", "w") as json_file:
        json.dump(part_data, json_file, indent=4)

    return render_template("part_template.html", **newPart)

@app.route("/deletePart", methods=["POST"])
def deletePart():
    json_data = request.get_json()
    sku_to_delete = json_data["SKU"]  # Assuming you send the SKU to delete in the JSON request
    with open("parts_store.json", "r") as json_file:
        part_data = json.load(json_file)
    print(type(sku_to_delete))
    for part in part_data:
        if part["SKU"] == sku_to_delete:
            part_data.remove(part)
            break  # We found and deleted the part, so exit the loop

    with open("parts_store.json", "w") as json_file:
        json.dump(part_data, json_file, indent=4)
    return "Part deleted successfully"

@app.route("/search", methods=["POST"])
def deletePdart():
    json_data = request.get_json()
    term_list = json_data["terms"]
    
    
    with open("parts_store.json", "r") as json_file:
        part_data = json.load(json_file)
    
    matching_parts = []
    for term in term_list:
        for part in part_data:
            values_list = [str(value) for value in part.values()]
            values_string = " ".join(values_list)
            if term.lower() in values_string.replace(" ", "").replace("\n", "").lower():
                matching_parts.append(part)

                
    
    contentString = " "
    for part in matching_parts:
        contentString+=render_template("part_template.html", **part)
    
    return contentString

@app.route("/filter", methods=["POST"])
def filterParts():
    json_data = request.get_json()
    print(json_data)
    with open("parts_store.json", "r") as json_file:
        part_data = json.load(json_file)
        # Sample filters and sorting criteria from the JSON data
    filters = [
        # {"Quantity": 1, "Direction": "above"},
        # {"Price": 0.9, "Direction": "below"}
    ]

    sorting_criteria = json_data
    #     {"field": "SKU", "Direction": "ascending"}
    # ]
    # Applying the filters and sorting criteria
    filtered_and_sorted_parts = apply_filters_and_sort(part_data, filters, sorting_criteria)

    contentString = " "
    for part in filtered_and_sorted_parts:
        contentString+=render_template("part_template.html", **part)
     
    return contentString
    



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    