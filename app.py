from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/send_data', methods=['GET'])
def send_data():
    try:
        # Get parameters from the request
        plugid = request.args.get('plugid')
        wattage = request.args.get('wattage')
        is_on = request.args.get('is_on')
        timestamp = request.args.get('timestamp')

        # You can perform any necessary processing here
        # For example, you can store the data in a database or log it

        # Return a response
        response_data = {
            'plugid': plugid,
            'wattage': wattage,
            'on_off_state': is_on,
            'timestamp': timestamp
        }

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
