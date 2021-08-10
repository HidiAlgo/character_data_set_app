
from flask import Flask,jsonify 

from flask import request

from flask_cors import cross_origin

import cv2 as cv
import numpy as np

import base64
import random

app = Flask(__name__)
app.config["DEBUG"] = True

# THIS FUNCTION WILL BE USED TO SAVE THE IMAGE
def saveImage(base):
    imgdata = base64.b64decode(base) # DECODING THE ENCODED BASE64
    nparr = np.frombuffer(imgdata, np.uint8) # TRANSLATING ITS VALUES TO NP.UINT8
    img = cv.imdecode(nparr, cv.IMREAD_GRAYSCALE) # TURNING IT INTO GRAYSCALE
    id = random.randint(0,1000) # ASSIGNING SOME RANDOM ID FOR THE SAVING PURPOSE

    # SAVING THE IMAGE, AND THE LOCATION WHERE THE IMAGE IS SAVED IS PROVIDED INSIDE THE BRACKETS
    cv.imwrite('photos/image'+str(id)+'.png',img); 
    

# THIS IS THE POST METHOD THAT IS GONNA BE CALLED BY THE MOBILE APPLICATION
@app.route('/', methods=['POST'])
@cross_origin() 
def home():
    # I SEND THE DATA AS A JSON STRING FROM THE MOBILE APPLICATION
    # IN THAT JSON STRING, THE BASE64 STRING OF THE IMAGE IS INCLUDED 
    inp = request.get_json() 

    # GETTING THAT JSON STRING AND PASSING THE BASE64 STRING IN IT TO THE saveImage() FUNCTION
    saveImage(inp["base64"])
    return "saved"


# HOST ADDRESS AND THE PORT TO LISTEN
app.run(port=3333, host= '192.168.8.100')