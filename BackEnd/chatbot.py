# CHATBOT: Este código sirve para correr el chatbot en loop e intercambiar preguntas
# y respuestas con el usuario. El modelo busca categorizar la entrada del usuario y
# dar una respuesta acorde a ella.

import random
import json
import pickle
import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer

from keras.models import load_model

lemmatizer = WordNetLemmatizer()

# Importamos los archivos generados en el código anterior
intents = json.loads(open('intents.json', encoding="utf8").read())
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbot_model.keras')

# Pasamos las palabras de oración a su forma raíz
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

# Convertimos la información a unos y ceros según si están presentes en los patrones
def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0]*len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i]=1
    # print(bag)
    return np.array(bag)

# Predecimos la categoría a la que pertenece la oración
def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    max_index = np.where(res == np.max(res))[0][0]
    category = classes[max_index]
    return category

#cObtenemos una respuesta aleatoria
def get_response(tag, intents_json):
    list_of_intents = intents_json['intents']
    result = ""
    for i in list_of_intents:
        if i["tag"] == tag:
            result = random.choice(i['responses'])
            break
    return result

# Validamos que no existan datos sensibles en el mensaje del usuario
# Por ahora utizamos un tereshol
def isValid(msg):
    wrds = msg.split()
    for n in range(len(wrds)):
        if len(wrds[n]) > 15:
            global response
            response = "Detectamos posible información personal en tu mensaje. Por favor recuerda no incluir en este chat tus cuentas o credenciales, si requieres ayuda específica con tu cuenta, puedes comunicarte con nuestros empleados."
            return False
    return True

# Ejecutamos el chat en bucle
# message: la entrada del usuario
# response: la respuesta del bot
response = "¡Bienvenido al asistente virtual de Atrato Pago! ¿Cómo puedo ayudarte?"
print(response)

while True:
    message = input("")
    if isValid(message):
        ints = predict_class(message)
        response = get_response(ints, intents)
    print(response)
    