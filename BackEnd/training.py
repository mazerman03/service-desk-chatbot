# TRAINING: Este código sirve solo para entrenar el modelo en base al archivo JSON 
# y generar los arhivos .keras y .pkl del modelo que se utilizarán después.

# Importar librerías
import random
import json
import pickle
import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer # Para pasar las palabras a su forma raíz

# Para crear la red neuronal
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import SGD as sgd_experimental

# Crear el lemmatizer
lemmatizer = WordNetLemmatizer()

# Leer el archivo json
intents = json.loads(open('intents.json', encoding="utf8").read())

# Estos archivos son para evitar que salgan errores
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')

words = []
classes = []
documents = []
ignore_letters = ['?', '!', '¿', '.', ','] # Caracteres a ignorar porque no afectan el mensaje

# Clasifica los patrones y las categorías
for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent["tag"]))
        if intent["tag"] not in classes:
            classes.append(intent["tag"])

words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
words = sorted(set(words))

pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))

# Pasa la información a unos y ceros según las palabras presentes en cada categoría para hacer el entrenamiento
training = []
output_empty = [0]*len(classes)
for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)
    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append([bag, output_row])
random.shuffle(training)
training = np.array(training) 
print(training) 

# Reparte los datos para pasarlos a la red
train_x = list(training[:,0])
train_y = list(training[:,1])

# Creamos la red neuronal
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))

# Creamos el optimizador y lo compilamos
sgd = sgd_experimental(learning_rate=0.001, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer = sgd, metrics = ['accuracy'])

# Entrenamos el modelo y lo guardamos
# Epoch controla la cantidad de iteraciones para ajustar los pesos de la red
train_process = model.fit(np.array(train_x), np.array(train_y), epochs=240, batch_size=5, verbose=1)
model.save("chatbot_model.keras", train_process)