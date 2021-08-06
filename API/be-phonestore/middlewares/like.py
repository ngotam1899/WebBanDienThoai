import sys
import json
import requests
import pandas as pd
import numpy as np

import sklearn
from sklearn.decomposition import TruncatedSVD

url = 'http://be-phonestore.herokuapp.com/reviews/list?limit=200'
r = requests.get(url)
data = r.json()

for i in data['reviews']:
  i['user'] = i['user']['_id']
  i['product'] = i['product']['_id']

orders = pd.DataFrame(data['reviews'])
orders = orders.dropna()

ratings_utility_matrix = orders.pivot_table(values='rating', index='user', columns='product', fill_value=0)
X = ratings_utility_matrix.T
X1 = X

#Giảm kích thước
#n_components: Kích thước mong muốn của dữ liệu đầu ra (Phải nhỏ hơn số lượng features)
SVD = TruncatedSVD(n_components=3)
#Fit mô hình với X và thực hiện giảm kích thước trên X
decomposed_matrix = SVD.fit_transform(X)
correlation_matrix = np.corrcoef(decomposed_matrix)

i = sys.argv[1]
product_names = list(X.index)
product_ID = product_names.index(i)
correlation_product_ID = correlation_matrix[product_ID]

Recommend = list(X.index[correlation_product_ID > 0.90])
Recommend.remove(i) 
recommend = Recommend[0:4]
resp = {
  "data": recommend
}
print(json.dumps(resp))
#sys.stdout.flush()