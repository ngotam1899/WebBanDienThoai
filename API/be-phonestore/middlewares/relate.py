import sys
import json
import requests
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

url = 'http://localhost:3000/products/cluster'
r = requests.get(url)
data = r.json()

products = pd.DataFrame(data['products'])
products = products.dropna()

tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0)
tfidf_matrix = tf.fit_transform(products['desc_text'])

cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

products=products.reset_index()

names = products['name']
_ids = products['_id']
indices = pd.Series(products.index, index = products['_id'])

def get_recommendations(title):
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:4]
    movie_indices = [i[0] for i in sim_scores]
    return _ids.iloc[movie_indices]

res = get_recommendations('608c1b07d1dfc82f0411a8ee')

resp = {
  "data": res.tolist()
}
print(json.dumps(resp))
sys.stdout.flush()