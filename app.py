from flask import Flask,jsonify
from flask import request
from flask_cors import cross_origin


import os

import cv2 as cv
import numpy as np

import base64
import random

app = Flask(__name__)
app.config["DEBUG"] = True

def saveImage(base, letter, details):
    imgdata = base64.b64decode(base) # DECODING THE ENCODED BASE64
    nparr = np.frombuffer(imgdata, np.uint8) # TRANSLATING ITS VALUES TO NP.UINT8
    img = cv.imdecode(nparr, cv.IMREAD_GRAYSCALE) # TURNING IT INTO GRAYSCALE
    id = random.randint(0,1000) # ASSIGNING SOME RANDOM ID FOR THE SAVING PURPOSE

    # CREATING A PATH WITH THE GIVEN DETAILS
    path = details['username']+"_"+details['age']+"_"+"/"+letter

    if not os.path.exists('photos/'+path):
        os.makedirs('photos/'+path)

    # SAVING THE IMAGE, AND THE LOCATION WHERE THE IMAGE IS SAVED IS PROVIDED INSIDE THE BRACKETS
    cv.imwrite('photos/'+path+"/image"+str(id)+'.png',img); 




@app.route('/', methods=['POST'])
@cross_origin()
def home():
    inp = request.get_json()
    letter = inp["letter"]
    base = inp["base64"]
    details = inp["details"]
    saveImage(base, letter, details)
    return "saved"


app.run(port=3333, host= '192.168.8.101')