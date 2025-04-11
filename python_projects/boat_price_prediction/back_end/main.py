from flask import *
import data_base
from werkzeug.utils import secure_filename
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random
from flask_cors import CORS







aa=data_base.data_base()

app=Flask(__name__)
app.config['SECRET_KEY'] = '1'
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)





@app.route("/")
def index():
    return render_template('login.html')

@app.route("/login",methods=['post','get'])
def login():
    data = request.get_json()
    
    a = data['email']
    b = data['password']
    data=aa.show("select * from user_details where username='"+a+"' and password='"+b+"'")

    if data:
             session['user_id'] = data[0][0]
            
             return jsonify({
            "status": "success",
            "message": "User registered successfully",
            "user": "user_response"
        }), 201
   
   
    else:
            return jsonify({
            "status": "error",
            "message": "Invalid credentials"
        }), 401
   
     

@app.route("/signup",methods=['post','get'])
def signup():
    data = request.get_json()
    
    a = data['name']
    b = data['email']
    c = data['phone_number']
    d = data['age']
    e = data['address']
    f = data['username']
    i=  data['password']
       
       
    data=aa.show(f"select * from user_details where username='{f}' ")
    
    if data or f=='admin':
                return jsonify({"status": "Error",
                                'message':"Username already exists",
                                 "user": "user_response"}),500
    else:
                aa.register(f"INSERT INTO user_details(name,email,phone_number,age,address,username,password) values ('{a}','{b}','{c}','{d}','{e}','{f}','{i}')")
                return jsonify({
            "status": "success",
            "message": "User registered successfully",
            "user": "user_response"
        }), 201
   
#admin

@app.route("/add_boat",methods=['post','get'])
def add_boat():
    try:
        a= request.form.get('name')
        b = request.form.get('type')
        c = request.form.get('description')
        d = request.form.get('seatCount')
        e =request.form.get('yearBuilt')
        f = request.form.get('registerNumber')
        image=request.files['image']
        filename=secure_filename(image.filename)
        image.save(os.path.join("../front_end/src/assets/", filename))
        aa.register("INSERT INTO add_boat(boat_name,boat_type,description,seatCount,yearBuilt,register_number,image) values ('"+a+"','"+b+"','"+c+"','"+d+"','"+e+"','"+f+"','"+filename+"')")
        return jsonify({
            "status": "success",
            "message": "Add boat successfully",
            "user": "user_response"
        }), 201


    except Exception as e:
        print(f"Error in add_boat: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Failed to add boat",
            "error": str(e)
        }), 500
 

@app.route('/view_boat')
def view_boat():
    data = aa.show("select * from add_boat")
    # Convert the data to a list of dictionaries if it isn't already
    boats = []
    for row in data:
        boat = {
            'id': row[0],  # adjust indices based on your table structure
            'name': row[1],
            'type': row[2],
            'description': row[3],
            'seatCount': row[4],
            'yearBuilt': row[5],
            'registerNumber': row[6]
        }
        boats.append(boat)
    return jsonify(boats)


@app.route('/view_user')
def view_user():
    data = aa.show("select * from user_details")
    # Convert the data to a list of dictionaries if it isn't already
    users = []
    for row in data:
        user = {
            'id': row[0],  # adjust indices based on your table structure
            'name': row[1],
            'email': row[2],
            'number': row[3],
            'age': row[4],
            'address': row[5],
            'username': row[6]
          
        }
        users.append(user)
    return jsonify(users)


@app.route("/view_booking")
def view_booking():
     data=aa.show("select * from booking_details")
     print(data)

     booking = []
    
     for row in data:
        book = {
            'id': row[0],  # adjust indices based on your table structure
            'name': row[1],
            'seats': row[2],
            'day': row[3],
            'date': row[4],
            'price': row[5],
            'boatName': row[6],
        }
        booking.append(book)

    
     return jsonify(booking)



# user_part

@app.route("/user_view_boat")
def user_view_boat():
    data = aa.show("select * from add_boat")

    boats = []
    
    for row in data:
        boat = {
            'id': row[0],  # adjust indices based on your table structure
            'name': row[1],
            'type': row[2],
            'description': row[3],
            'seatCount': row[4],
            'yearBuilt': row[5],
            'registerNumber': row[6],
            'image':row[7]
        }
        boats.append(boat)

    
    return jsonify(boats)


@app.route("/user_booking",methods=['post','get'])
def user_booking():

    try:
        data = request.get_json()
        a = data['userName']
        b = data['seats']
        c = data['day']
        d = data['date']
        e = data['price']
        f = data['boatId']
        g=  data['boatName']
        h= "1"

        aa.register(f"insert into booking_details(userName,seats,day,date,price,boatId,boatName,user_id) value('{a}','{b}','{c}','{d}','{e}','{f}','{g}','{h}')")
        return jsonify({
            "status": "success",
            "message": "Booking boat successfully",
            "user": "user_response"
        }), 201


    except Exception as e:
        print(f"Error in add_boat: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Failed to Booking boat",
            "error": str(e)
        }), 500
 

     
      

if __name__=="__main__":
    app.run(debug=True)
