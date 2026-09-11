from flask import Flask,render_template,url_for,redirect,request,session,flash,jsonify
import speech_recognition as r
import sqlite3 as sq
import serial
import time
from datetime import datetime
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS
import joblib
import numpy as np
import requests


arduino = serial.Serial('COM3',9600)
time.sleep(2)

app=Flask(__name__)
app.secret_key="supersecret"
WEATHER_API_KEY="ebaf86c273cbaba82db56ab58c25c911"
WEATHER_API_BASE_URL = "http://api.openweathermap.org/data/2.5/weather"
CORS(app, supports_credentials=True, origins=["http://localhost:5173"]) 

app.config.update(
    SESSION_COOKIE_SAMESITE='None',
    SESSION_COOKIE_SECURE=False, # Set to True in production with HTTPS
    SESSION_COOKIE_HTTPONLY=True
)

#Ph,Soil_M,Temprature,N,P,K,Humidity,wind
soil=0
temp=0
humi=0
Ni=150
Pho=70
Ka=50
Ph=6.5
wind=0
rain=0
water=0


#sensor data
def getSensorData():
    global soil,temp,humi,Ni,Pho,Ka,Ph,wind,rain,water
    data = arduino.readline().decode().strip()
    soil,temp,humi,rain,water = data.split(",")


#FarmerData
#Database creation for userinfo
def init_db_far():
    conn=sq.connect("UserInfo.db")
    cur=conn.cursor()
    cur.execute('''create table if not exists FarmerData(F_Id integer primary key autoincrement,Name text not null,Phone integer not null unique,Password text not null unique, Role text check(Role in ('Admin','Farmer')) default 'Farmer',Active_Status integer default 1) 
                ''')
    conn.commit()
    conn.close()

#Database creation for Fieldinfo
def init_db_fie():
    conn = sq.connect("UserInfo.db")
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS FieldData (
            Fie_Id INTEGER PRIMARY KEY AUTOINCREMENT,
            F_Id INTEGER not null,
            Slug_Name TEXT NOT NULL,
            Current_Crop TEXT NOT NULL,
            Action_Type TEXT CHECK(Action_Type IN ('Manual', 'Automatic')) DEFAULT 'Automatic',
            Area REAL NOT NULL,
            Active_Status INTEGER DEFAULT 1,
            Plantation_Date DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

#Database creation for Hardwareinfo
def init_db_har():
    conn=sq.connect("UserInfo.db")
    cur=conn.cursor()
    cur.execute('''create table if not exists HardwareData(
        H_Id integer primary key autoincrement,
        H_Name text not null,
        Fie_Id integer,
        H_Staus,Active_Status integer default 1) 
    ''')
    conn.commit()
    conn.close()    

#Database creation for Cropinfo
def init_db_cro():
    conn=sq.connect("UserInfo.db")
    cur=conn.cursor()
    cur.execute('''create table if not exists CropData(
                Crop_Id integer primary key autoincrement,
                Fie_Id integer,
                Ph real,
                Soil_M integer,
                Temprature real,
                Wind real,
                N integer,
                P integer,
                K integer,
                Humidity integer,
                Humidity real,
                Active_Status integer default 1) 
                ''')
    conn.commit()
    conn.close()    


@app.route("/")
def home():

    init_db_far()
    init_db_fie()
    init_db_har()
    init_db_cro()
    #rw=fieldStats(5)
    #c=crop_recommendation(rw)
    #return f"{c}"
    return "KrishiMitra"



@app.route("/RegisterFarmer", methods=["POST"])
def RegisterFarmer():
    data = request.json
    name = data.get("name")      # Match React state
    phone = data.get("phone")    # Match React state
    password = data.get("password")
    c_password = data.get("confirmPassword")

    # 1. Check if passwords match
    if password != c_password:
        return jsonify({"status": "error", "message": "Passwords do not match!"}), 400

    # 2. Hash and Save
    hash_pass = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)
    
    try:
        with sq.connect(
            "UserInfo.db") as conn:
            cur = conn.cursor()
            cur.execute('INSERT INTO FarmerData(Name, Phone, Password, Role) VALUES(?, ?, ?, ?)', 
                        (name, phone, hash_pass, "Farmer"))
            conn.commit()
        return jsonify({"status": "success"})
        
    except sq.IntegrityError:
        return jsonify({"status": "error", "message": "Farmer already exists with this phone number"}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/LoginFarmer",methods=["GET","POST"])
def loginfarmer():
    try:
        data = request.json
        phone = data.get("phone")
        password = data.get("Password")

        with sq.connect("UserInfo.db") as conn:
            cur = conn.cursor()
            cur.execute("SELECT Name, Phone, Password, Role, F_Id FROM FarmerData WHERE Phone=?", (phone,))
            rw = cur.fetchone()

        if rw and check_password_hash(rw[2], password):
            return jsonify(user={
                "id": rw[4],
                "name": rw[0],
                "phone": rw[1],
                "role": rw[3]
            })
        
        return jsonify(user=False), 401 # 401 means Unauthorized

    except Exception as e:
        print(f"CRASH ERROR: {e}") # This will show in your terminal
        return jsonify(error=str(e)), 500             
        
             
@app.route('/add-field', methods=['POST'])
def add_field():
    slug = request.form.get('slug')
    area = request.form.get('area')
    current_plantation = request.form.get('current_plantation')
    plantation_date = request.form.get('plantation_date')
    # 2. Server-side validation for required fields
    f_id = request.form.get('farmer_id')
    if f_id is None:
        return jsonify({"error": "User not logged in (Session missing)"}), 401
    
    if not slug or not area:
        return jsonify({"error": "Slug and Area are required fields"}), 400

    # 3. Insert into SQLite
    try:
        with sq.connect('UserInfo.db') as conn:
            cursor = conn.cursor()
            query = ''' 
                INSERT INTO FieldData(Slug_Name, Area,Current_Crop, Plantation_Date, F_Id) 
                VALUES (?, ?, ?, ?, ?) 
            '''
            cursor.execute(query, (slug, float(area), current_plantation, plantation_date,f_id))
            # conn.commit()
            # conn.close()
       # rw=getFieldData()    
        return jsonify({"message": "New field added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def getFieldData(f_id):
       conn=sq.connect("UserInfo.db")
       cur=conn.cursor()
       cur.execute('select * from FieldData where F_Id=?',(f_id,))
       return cur.fetchall()


@app.route("/Fields",methods=["GET"])
def fields():
    f_id = request.args.get("farmer_id")
    rw=getFieldData(f_id)
    return jsonify(rw)
       

#Fieldinfo posting data
@app.route("/CropFieldStatusPost",methods=["GET","POST"])
def CropFieldStatusPost():
    fie_id = request.args.get("field_id")
    city_name = "allahabad,Uttar Pradesh"

    if not fie_id:
        return jsonify({"error": "Missing field_id"}), 400

    cropdata(fie_id)
    conn = sq.connect("UserInfo.db")
    cur = conn.cursor()
    cur.execute('SELECT * FROM CropData WHERE Fie_Id=? ORDER BY Crop_Id DESC', (fie_id,))
    rw = cur.fetchone()
    conn.close()

    if rw is None:
        return jsonify({"error": "No data found for this field"}), 404
    
    weather_temp = None
    weather_wind = None
    try:
        weather_res = requests.get(WEATHER_API_BASE_URL, params={
            "q": city_name,
            "appid": WEATHER_API_KEY,
            "units": "metric"
        })
        
        # This will print the status (e.g., 401 or 200) and the error message
        print(f"DEBUG - Status: {weather_res.status_code}")
        print(f"DEBUG - Full Response: {weather_res.text}")

        if weather_res.status_code == 200:
            weather_data = weather_res.json()
            weather_temp = weather_data['main']['temp']
            weather_wind = weather_data['wind']['speed']
        else:
            # Helps identify if the key is the problem
            print(f"API Error: {weather_res.json().get('message')}")
            
    except Exception as e:
        print(f"Connection error: {e}")

    c_status = {
        "ph": rw[2],
        "n": rw[7],
        "p": rw[8],
        "k": rw[9],
        "temp": rw[4],
        "wind": weather_wind,
        "humi": rw[10],
        "moist": rw[3], # Fixed value based on your code
        "temp_api" : weather_temp,
    }

    return jsonify(c_status)

def fieldStats(fieldId):
    conn = sq.connect("UserInfo.db")
    cur = conn.cursor()
    cur.execute('SELECT * FROM CropData WHERE Fie_Id=? ORDER BY Crop_Id DESC', (fieldId,))
    rw = cur.fetchone()
    conn.close()

    return rw

#inserting crop data into table
def cropdata(fie_Id):
    getSensorData()
    conn=sq.connect("UserInfo.db")
    cur=conn.cursor()
    cur.execute('''
        INSERT INTO CropData (
            Fie_Id, Ph, Soil_M, Temprature, N, P, K, Humidity, Wind
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (fie_Id, Ph, soil, temp, Ni, Pho, Ka, humi, wind))
    conn.commit()
    conn.close()


from huggingface_hub import InferenceClient

# Initialize client
client = InferenceClient(
    model="meta-llama/Meta-Llama-3-8B-Instruct",
    api_key="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"
)

@app.route("/Task_Manager", methods=["POST"])
def task_manager():
    farmer_id = request.form.get('farmer_id')
    farms = getFieldData(farmer_id)
    
    # Start the base message
    system_message = "You are a friendly not too friendly, helpful local farming advisor. Farmer current fields are:\n"
    
    # Correctly append each farm's data
    for farm in farms:
        field_id = farm[0]
        field_data = fieldStats(field_id)
        # Use += to add to the string
        system_message += f"""
        - Crop name: {farm[3]}, Field Name: {farm[2]}
        - NPK: {field_data[7]}-{field_data[8]}-{field_data[9]}
        - Moisture: {field_data[3]}%
        """
    
    # Append the final instructions
    system_message += """
    What task should I perform today for my fields so they are in best condition? 
    give tasks with the name of field and crop
    Respond in simple, clear Hindi (using Devanagari script). 
    Be professional, act like an advisor, and answer in bullet points.

    EXAMPLE FORMAT:
    - सिंचाई: आपके खेत 'A' में नमी (Moisture) कम है, कृपया आज सिंचाई करें।
    - खाद का प्रयोग: मिट्टी में नाइट्रोजन की कमी दिख रही है, 10 किलो यूरिया का छिड़काव करें।
    - कीट नियंत्रण: वर्तमान मौसम को देखते हुए कीटों की जांच करें।
    """

    try:
        response = client.chat_completion(
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": "मुझे आज क्या काम करना चाहिए?"}, # Changed to Hindi for better consistency
            ],
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {e}"

@app.route("/crop_recommendation",methods=["POST"])
def crop_recommendation():
    farmer_id = request.form.get('farmer_id')
    farms = getFieldData(farmer_id)
    
    # Start the base message
    system_message = "You are a friendly Farmer Resource Centre adviser, helpful local farming advisor. Farmer current fields are:\n"
    
    # Correctly append each farm's data
    for farm in farms:
        field_id = farm[0]
        field_data = fieldStats(field_id)
        # Use += to add to the string
        system_message += f"""
        - Crop name: {farm[3]}, Field Name: {farm[2]}
        - NPK: {field_data[7]}-{field_data[8]}-{field_data[9]}
        - Moisture: {field_data[3]}%
        """
    
    # Append the final instructions
    system_message += """
    what crop shold i grow in my fields
    respond after considering current weather for allahabad ,uttar pradesh and my current crop field status
    Respond in simple, clear Hindi (using Devanagari script). 
    Be professional, act like an advisor, and answer in bullet points.

    EXAMPLE FORMAT:
    - फसल का नाम: गेहूं
    - कारण: इलाहाबाद की वर्तमान नमी और मौसम इसके लिए उपयुक्त है।
    """

    try:
        response = client.chat_completion(
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": "कृपया मुझे मेरे खेतों के लिए सही फसल बताएं।"}, # Changed to Hindi for better consistency
            ],
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {e}"

def ask_agronomist(user_msg, field_data):
    # This prompt tells the AI how to speak
    if not field_data:
        return "I'm sorry, I couldn't find any soil records for this field. Can you double-check the field ID?"
    
    crop_name="Mint"
    # If we have data, proceed with the prompt
    system_message = f"""
    You are a friendly, helpful local farming advisor...
    Current Field Info:
    - NPK: {field_data[7]}-{field_data[8]}-{field_data[9]}
    - Temp: {field_data[4]}°C, pH: {field_data[2]}
    - Moisture: {field_data[3]}%
    -Suggested Crop Name:{crop_name}
    
    Give practical, easy-to-follow advice like a friend would. 
    If they need fertilizer, tell them what to buy at the store and how to use it.

    Respond in simple, clear Hindi (using Devanagari script) so it is easy to understand.
    """

    try:
        response = client.chat_completion(
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=500
        )
        return response.choices[0].message.content # Added [0] for safety

    except Exception as e:
        return f"Error: {e}"

@app.route("/mcp",methods=["POST"])
def mcp():
    fi = request.form.get("field_id")
    msg = request.form.get("message")
    
    rw = fieldStats(int(fi))
    
    # CHECK IF DATA EXISTS
    if rw is None:
        return jsonify("Sorry, I couldn't find any information for that field ID. Please check the ID and try again")
    
    res = ask_agronomist(msg, rw)
    return jsonify(res)

def crop_recommendation(field_data):
        n=field_data[7]
        k=field_data[9]
        p=field_data[8]
        tem=field_data[4]
        hu=field_data[9]
        ph=field_data[2]
        w=field_data[3]
        x=[[n,k,p,tem,hu,ph,w]]  
        cropmodel = joblib.load('CropRecommend')
        pred=cropmodel.predict(x)     
        return pred[0].upper()

    
    

