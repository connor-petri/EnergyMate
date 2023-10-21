import sqlite3
from flask import Flask, request, jsonify
#from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
app = Flask(__name__)
date_time = datetime.now()
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
if __name__ == '__main__':
    app.run(debug=True)
