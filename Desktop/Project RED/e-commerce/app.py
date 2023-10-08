from flask import Flask, request, jsonify
from flask_cors import CORS  
import ia

app = Flask(__name__)
CORS(app) 

@app.route('/api/user-recommendations', methods=['GET'])
def get_user_recommendations():
    user_id = request.args.get('userId')
    recommendations = ia.get_user_recommendations(user_id) 
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=7043)