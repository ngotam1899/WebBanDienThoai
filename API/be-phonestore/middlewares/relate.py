import sys
import json
import requests
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

url = 'http://be-phonestore.herokuapp.com/products/cluster'
r = requests.get(url)
data = r.json()

products = pd.DataFrame(data['products']) #Tạo DataFrame từ ds products (gồm id, name, desc)
products = products.dropna()              #Loại bỏ các phần tử thiếu 1 trong 3 giá trị trên

tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0) #Tính tần suất xuất hiện và độ quan trọng của 1 từ trong văn bản
tfidf_matrix = tf.fit_transform(products['desc_text'])            #Chuyển đổi products['desc_text'] và dạng tfidf ở trên

cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)            #Tạo ma trận vuông tfidf_matrix tfidf_matrix

products=products.reset_index()                                   #Reset index của product vì lúc trên có dùng dropna()

names = products['name']                                          #Tên product
_ids = products['_id']                                            #Id product
indices = pd.Series(products.index, index = products['_id'])      #Tạo series với data vào là products.index, index = products['_id'] ex:             index
                                                                                                                                        # a123as123   1      
                                                                                                                                        # abcasd1as   Na
def get_recommendations(title):                                         #Title này                                                                             # acasdasda   2
    idx = indices[title]                                                #idx Vị trí của id truyền vào trong bảng
    sim_scores = list(enumerate(cosine_sim[idx]))                       #Xuất ra hàng đó theo cái cột vị trí id mình truyền vào
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)   #Sắp xếp từ cao xuống thấp
    sim_scores = sim_scores[1:5]                                        #Lấy 4 giá trị sau nó (vị trí và giá trị tương đồng)
    movie_indices = [i[0] for i in sim_scores]                          #Lưu các vị trí của các sản phẩm trong mảng vào movie_indices 
    return _ids.iloc[movie_indices]                                     #Merge bảng vị trí và id tương ứng

res = get_recommendations(sys.argv[1])    #Lấy id của sp đang xem req.query.product (là id)

resp = {
  "data": res.tolist()
}
print(json.dumps(resp))
sys.stdout.flush()