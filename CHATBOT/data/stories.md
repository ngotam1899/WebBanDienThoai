## happy path
* greet
  - act_greeting

## happy path 2
* greet
  - act_greeting
* ask_filter
  - act_unknown

## bot challenge
* greet
  - act_greeting
* bot_challenge
  - utter_iamabot

## bot challenge 1
* bot_challenge
  - utter_iamabot

## search
* greet
  - act_greeting
* ask_product
  - act_search

## search 2
* ask_product
  - act_search

## ask filter 1
* ask_filter
  - act_unknown
* ask_category
  - act_brand

## ask filter 3
* ask_brand
  - act_price

## ask filter 4
* ask_price
  - act_filter

## ask filter
* ask_filter
  - act_unknown
* ask_category
  - act_brand
* ask_brand
  - act_price

## ask filter 2
* ask_category
  - act_brand
* ask_brand
  - act_price
* ask_price
  - act_filter

## say goodbye
* goodbye
  - utter_goodbye

## bot challenge
* greet
  - act_greeting
* bot_challenge
  - utter_iamabot

## ask promotion
* ask_promotion
  - act_promotion
