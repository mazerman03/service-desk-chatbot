# Importar librerías
import os
import pandas as pd
import matplotlib.pyplot as plt
from transformers import GPT2TokenizerFast
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.chains import ConversationalRetrievalChain

# Configurar API Key
os.environ["OPENAI_API_KEY"] = "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"

# ---------------
#     OPEN TXT
# ---------------

with open('datatxt/compilation.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Step 3: Create function to count tokens
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

def count_tokens(text: str) -> int:
    return len(tokenizer.encode(text))

# Step 4: Split text into chunks
text_splitter = RecursiveCharacterTextSplitter(
    # Set a really small chunk size, just to show.
    chunk_size = 512,
    chunk_overlap  = 48,
    length_function = count_tokens,
)

chunks = text_splitter.create_documents([text])
 
# Result is many LangChain 'Documents' around 500 tokens or less (Recursive splitter sometimes allows more tokens to retain context)
type(chunks[0]) 

# Get embedding model
embeddings = OpenAIEmbeddings()

# Create vector database
db = FAISS.from_documents(chunks, embeddings)


# --------------------------
#      INICIA EL CHATBOT
# --------------------------
# Check similarity search is working
print("BenIA: ¡Hola! Soy BenIA, tu coach personal de inversión, puedes hacerme preguntas, consultas y aprender de mí. ¿Cómo puedo ayudarte?")


run = True
while run:
    query = input("User: ")
    docs = db.similarity_search(query)
    docs[0]

    # Create QA chain to integrate similarity search with user queries (answer query from knowledge base)

    chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")
    response = chain.run(input_documents=docs, question=query)
    print("BenIA: ",response)
    from IPython.display import display
    import ipywidgets as widgets

    # Create conversation chain that uses our vectordb as retriver, this also allows for chat history management
    qa = ConversationalRetrievalChain.from_llm(OpenAI(temperature=0.1), db.as_retriever())

    if "adiós" in query.lower() or "adios" in query.lower():
        print(">> Gracias por consultar a BenIA, ¡nos vemos pronto!")
        run = False
        