import sys
import json
import requests
import pandas as pd
import numpy as np

import sklearn
from sklearn.decomposition import TruncatedSVD

url = 'http://localhost:3000/reviews/list?limit=100'
r = requests.get(url)
data = r.json()

for i in data['reviews']:
  if i['user'] is not None:
    i['user'] = i['user']['_id']

orders = pd.DataFrame(data['reviews'])
orders = orders.dropna()

ratings_utility_matrix = orders.pivot_table(values='rating', index='user', columns='product', fill_value=0)
X = ratings_utility_matrix.T
X1 = X

SVD = TruncatedSVD(n_components=4)
decomposed_matrix = SVD.fit_transform(X)
decomposed_matrix
correlation_matrix = np.corrcoef(decomposed_matrix)
correlation_matrix
i = sys.argv[1]

product_names = list(X.index)
product_ID = product_names.index(i)
correlation_product_ID = correlation_matrix[product_ID]

Recommend = list(X.index[correlation_product_ID > 0.90])
Recommend.remove(i) 
recommend = Recommend[0:3]
resp = {
  "data": recommend
}
print(json.dumps(resp))
#sys.stdout.flush()