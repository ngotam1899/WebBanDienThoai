# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"
from bs4 import BeautifulSoup
import csv
import urllib.request
import ssl
import json
import requests
import os
import html
import random
import pathlib
from typing import Any, Text, Dict, List
#
from rasa_sdk.events import FollowupAction
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
#
#
import gc

class act_greeting(Action):
    def name(self) -> Text:
        return "act_greeting"
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Open a file: file
        print('[%s] <- %s' % (self.name(), tracker.latest_message['text']))
        ret_text = "Xin chào bạn, mình là nhân viên tư vấn của TellMe. Không biết bạn đang tìm kiếm sản phẩm gì?"
        dispatcher.utter_message(text=ret_text)
        print('[%s] -> %s' % (self.name(), ret_text))
        del ret_text
        gc.collect()
        return []

class act_search(Action):
    def name(self) -> Text:
        return "act_search"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print('[%s] <- %s' % (self.name(), tracker.latest_message['text']))
        # Search keyword
        keyword = tracker.latest_message['entities'][0]['value']
        print(keyword)
        url = 'http://be-phonestore.herokuapp.com/products?keyword='+ keyword + '&limit=3&page=0&active=1'
        page = requests.get(url, verify=False)
        json = page.json()

        product_arr = []
        for j in json['products']:
            product_arr.append({"_id": j['_id'], "name": j['name'], "price" : j['price_min'], "image": j['bigimage']['public_url']})

        if len(json['products']) == 0 :
            dispatcher.utter_message(text="Xin lỗi sản phẩm bạn tìm kiếm hiện không có gợi ý nào")
        else:
            dispatcher.utter_message(text="Mình xin gợi ý những sản phẩm sau.")

        for idx in range(len(product_arr)):
            text = "** Tên sản phẩm: **" + product_arr[idx]["name"] + "\n" + "** Giá: **" + str(product_arr[idx]["price"]) + " VND" + "\n" + "** Link: **" + "https://localhost:5000/#/product/detail/" + str(product_arr[idx]["_id"]) + "\n\n"
            dispatcher.utter_message(text=text)
            image = product_arr[idx]["image"] + "\n\n"
            dispatcher.utter_message(image=image)

        del product_arr, url, page, json
        gc.collect() 

        return []


class act_unknown(Action):
    def name(self) -> Text:
        return "act_unknown"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Open a file: file
        print('[%s] <- %s' % (self.name(), tracker.latest_message['text']))
        dispatcher.utter_message(
            text="Xin lỗi bạn vì hiện tại tôi chưa hiểu bạn muốn gì!")
        #get all categories
        url = 'http://be-phonestore.herokuapp.com/products/categories'
        page = requests.get(url, verify=False)
        json = page.json()
        category_arr = []
        for j in json['categorys']:
            category_arr.append({"_id": j['_id'], "pathseo": j['pathseo'], "name" : j['name']})
        temp_button_lst = []
        for idx in range(len(category_arr)):
            temp_button_lst.append({
                "type": "postback",
                "title": str(category_arr[idx]["name"]),
                "payload": "category " + str(category_arr[idx]["_id"])
            })
        dispatcher.utter_message(text="Không biết bạn đang tìm kiếm loại sản phẩm gì?", buttons=temp_button_lst)
        del temp_button_lst, url, page, json, category_arr
        gc.collect()
        return []

class act_brand(Action):
    def name(self) -> Text:
        return "act_brand"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Open a file: file
        print('[%s] <- %s' % (self.name(), tracker.latest_message['text']))
        #get all categories
        category = tracker.latest_message['entities'][0]['value']
        print(category)
        url = 'http://be-phonestore.herokuapp.com/products/brands?category=' + str(category)
        res = requests.get(url, verify=False)
        json = res.json()

        brand_arr = []
        for j in json['count']:
            brand_arr.append({"_id": j['_id']['_id'], "name" : j['_id']['name']})

        temp_button_lst = []
        for idx in range(len(brand_arr)):
            temp_button_lst.append({
                "type": "postback",
                "title": str(brand_arr[idx]["name"]),
                "payload": "brand " + str(brand_arr[idx]["_id"]) + " category " + str(category)
            })
        dispatcher.utter_message(text="Không biết bạn muốn mua điện thoại hãng nào?", buttons=temp_button_lst)
        del temp_button_lst, url, res, json, brand_arr, category
        gc.collect()
        return []

class act_price(Action):
    def name(self) -> Text:
        return "act_price"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # Open a file: file
        print('[%s] <- %s' % (self.name(), tracker.latest_message['text']))
        #get all prices
        brand = tracker.latest_message['entities'][0]['value']
        category = tracker.latest_message['entities'][1]['value']
        print(category)

        url = 'http://be-phonestore.herokuapp.com/products/categories/' + str(category)
        res = requests.get(url, verify=False)
        json = res.json()

        price_arr = []
        for j in json['category']['price']:
            price_arr.append({"name" : j['name'], "min" : j['min'], "max" : j['max']})

        temp_button_lst = []
        for idx in range(len(price_arr)):
            temp_button_lst.append({
                "type": "postback",
                "title": str(price_arr[idx]["name"]),
                "payload": "min " + str(price_arr[idx]["min"]) + " max " + str(price_arr[idx]["max"])  +" brand " + str(brand) + " category " + str(category)
            })
        dispatcher.utter_message(text="Không biệt bạn muốn mua điện thoại trong khoảng giá bao nhiêu?", buttons=temp_button_lst)
        del temp_button_lst, url, res, json, price_arr, category
        gc.collect()
        return []

class act_filter(Action):
    def name(self) -> Text:
        return "act_filter"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print('[%s] <- %s' % (self.name(), tracker.latest_message['text']))
        # Dilter
        min = tracker.latest_message['entities'][0]['value']
        if min == "None":
            min = ""
        max = tracker.latest_message['entities'][1]['value']
        if max == "None":
            max = ""
        brand = tracker.latest_message['entities'][2]['value']
        category = tracker.latest_message['entities'][3]['value']

        url = 'http://localhost:3000/products?brand=' + str(brand) + '&category=' + str(category) + '&min_p=' + str(min) + '&max_p=' + str(max) + '&limit=3&page=0&active=1'
        page = requests.get(url, verify=False)
        json = page.json()
        
        product_arr = []
        for j in json['products']:
            product_arr.append({"_id": j['_id'], "name": j['name'], "price" : j['price_min'], "image": j['bigimage']['public_url']})

        if len(json['products']) == 0 :
            dispatcher.utter_message(text="Xin lỗi sản phẩm bạn tìm kiếm hiện không có gợi ý nào")
        else:
            dispatcher.utter_message(text="Mình xin gợi ý những sản phẩm sau.")

        for idx in range(len(product_arr)):
            text = "** Tên sản phẩm: **" + product_arr[idx]["name"] + "\n" + "** Giá: **" + str(product_arr[idx]["price"]) + " VND" + "\n" + "** Link: **" + "https://localhost:5000/#/product/detail/" + str(product_arr[idx]["_id"]) + "\n\n"
            dispatcher.utter_message(text=text)
            image = product_arr[idx]["image"] + "\n\n"
            dispatcher.utter_message(image=image)

        del product_arr, url, page, json, min, max, brand, category
        gc.collect() 

        return []

class act_promotion(Action):
    def name(self) -> Text:
        return "act_promotion"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print('[%s] <- %s' % (self.name(), tracker.latest_message['text']))

        url = 'http://localhost:3000/ad?status=0&active=1&limit=3&page=0'
        page = requests.get(url, verify=False)
        json = page.json()

        product_arr = []
        for j in json['ads']:
            product_arr.append({"_id": j['_id'], "name": j['name'], "content" : j['content'], "image": j['image']['public_url'], "link": j['link'],"startedAt": j['startedAt'],"endedAt": j['endedAt']})

        if len(json['ads']) == 0 :
            dispatcher.utter_message(text="Xin lỗi hiện tại không có khuyến mãi nào")
        else:
            dispatcher.utter_message(text="Hiện tại shop đang có những khuyễn mãi sau.")

        for idx in range(len(product_arr)):
            text = "** Chương trình: **" + product_arr[idx]["name"] + "\n" + "** Khoảng thời gian: **" + "Từ " + str(product_arr[idx]["startedAt"])[0:10] + " đến " + str(product_arr[idx]["endedAt"])[0:10] + "\n" + "** Link: **" + product_arr[idx]["link"] + "\n\n"
            dispatcher.utter_message(text=text)
            image = product_arr[idx]["image"] + "\n\n"
            dispatcher.utter_message(image=image)

        del product_arr, url, page, json
        gc.collect() 

        return []