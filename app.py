# from flask import Flask, render_template, request, url_for, redirect, flash, send_from_directory
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user
#
# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret-key-goes-here'
#
# # CONNECT TO DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# db = SQLAlchemy()
# db.init_app(app)
#
# with app.app_context():
#     db.create_all()
#
#
#
# # CREATE TABLE IN DB
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(100), unique=True)
#     password = db.Column(db.String(100))
#     name = db.Column(db.String(1000))
#
#
#
# @app.route('/')
# def home():
#     return render_template("index.html")
#
#
# @app.route('/register',methods = ["GET","POST"])
# def register():
#     if (request.method == "POST"):
#         new_user = User(
#
#             email=request.form["email"],
#             password=request.form["password"],
#             name=request.form["name"],
#         )
#         db.session.add(new_user)
#         db.session.commit()
#         return render_template("secrets.html", user = new_user)
#     return render_template("register.html")
#
#
# @app.route('/login')
# def login():
#     return render_template("login.html")
#
#
# @app.route('/secrets', methods = ["GET","POST"])
# def secrets():
#
#     return render_template("secrets.html")
# @app.route('/download',methods = ["GET","POST"] )
# def download():
#     return send_from_directory('static', path="files/cheat_sheet.pdf")
#
#
# @app.route('/logout')
# def logout():
#     pass
#
#
#
#
# if __name__ == "__main__":
#     app.run(debug=True)
import sqlite3
from flask import Flask, request, jsonify
#from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret-key-goes-here'

# CONNECT TO DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy()
db.init_app(app)


# CREATE TABLE IN DB
class plugDataPoint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plugid = db.Column(db.Integer)
    wattage = db.Column(db.Integer())
    timestamp = db.Column(db.String())



with app.app_context():
    db.create_all()
@app.route('/send_data', methods=['GET'])
def send_data():
    try:
        global app
        global db
        date_time = datetime.now()
        # Get parameters from the request
        plugid = request.args.get('plugid')
        wattage = request.args.get('wattage')
        timestamp = date_time.strftime("%Y-%m-%d@%H:%M:%S")

        # You can perform any necessary processing hereData
        # For example, you can store the data in a database or log it
        #Data Query


        # Return a response
        response_data = {
            'plugid': plugid,
            'wattage': wattage,

            'timestamp': timestamp
        }
        with app.app_context():
            new_datapoint = plugDataPoint( plugid=plugid, wattage=wattage, timestamp=timestamp)
            db.session.add(new_datapoint)
            db.session.commit()
        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400
@app.route("/get_data")
def get_data():
    try:
        global app
        global db
        wattage_sum = 0
        # Get parameters from the request
        plugid = request.args.get('plugid')
        end_time = datetime.strptime(request.args.get('end_time'),"%Y-%m-%d@%H:%M:%S")
        start_time = datetime.strptime(request.args.get('start_time'),"%Y-%m-%d@%H:%M:%S")
        print(f"endtime = {end_time}, starttime = {start_time}")



        with app.app_context():

            result = db.session.execute(db.select(plugDataPoint).where(plugDataPoint.plugid == plugid))

            all_plugDataPoints = result.scalars()
            for dataPoint in all_plugDataPoints:
                print(f"endtime = {end_time},starttime = {start_time} ")
                if(dataPoint.plugid == int(plugid)):
                    print(f"Inside plugid statement.....endtime = {end_time},starttime = {start_time} ")
                    print(f"Inside plugid statement datapoint time = {datetime.strptime(dataPoint.timestamp, '%Y-%m-%d@%H:%M:%S')}")
                    #plugTime = datetime.strptime(request.args.get('timestamp'),"%Y-%m-%d@%H:%M:%S")
                    plugTime = datetime.strptime(dataPoint.timestamp, "%Y-%m-%d@%H:%M:%S")
                    print(f"plugtime = {plugTime}")
                    if( plugTime <= end_time and plugTime >= start_time):
                        print(f"Inside plugtime statement.....endtime = {end_time},starttime = {start_time} ")
                        wattage_sum += dataPoint.wattage

                    # Return a response
                    response_data = {
                        'plugid': plugid,
                        'wattage_Sum': wattage_sum
                    }
            return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
# @app.route('/delete_db_info')
# def delete_db_info():
#     try:
#
if __name__ == '__main__':

    app.run(debug=True)
