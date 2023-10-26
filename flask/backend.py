
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/recommend": {"origins": "https://main--movielover.netlify.app"}})

movies_list = pickle.load(open('movie_list.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))
movies_data=[]
@app.route('/recommend', methods=['POST', 'GET'])
def recommend():
    global movies_data
    if request.method == 'POST':
        movie_name = request.get_json()
        movies_data=recommend_movies(movie_name,movies_list,similarity)
        return jsonify(movies_data)
    elif request.method == 'GET':
        return jsonify(movies_data)
    else:
        return "Method not allowed"

def recommend_movies(movie_name, movies_list, similarity):
    print("Searching for:", movie_name) 
    try:
        movie_name = movie_name.get('name', None)
        movies_list['title'] = movies_list['title'].str.lower()
        movie_name = movie_name.lower()
        if movies_list['title'].isin([movie_name]).any():
            index = movies_list[movies_list['title'] == movie_name].index[0]
            distances = similarity[index]
            m_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[0:100]
            recommended_movies = [int(movies_list.iloc[i[0]].movie_id) for i in m_list]
            return recommended_movies
        else:
            return {"not_found": "not found"}
    except Exception as e:
        return {"error": str(e)}
if __name__ == '__main__':
    app.run(debug=True)


