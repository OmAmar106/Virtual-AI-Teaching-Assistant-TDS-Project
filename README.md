# Virtual AI Teaching Assistant — TDS Project

A Virtual AI Teaching Assistant built with an embedding-based retrieval architecture. It allows users (students, educators, researchers) to interact naturally with a knowledge base derived from course materials, outlines, slides, transcripts, and more, it has knowledge about the course TDS - IIT Madras.

---

## 🛠️ Features

- **Course-aware Q&A**: Chat with AI using text and images.
- **Extraction**: Data extraction done from discourse of TDS and TDS Jan Term theory.
- **Embeddings**: Embeddings created using Pinecone.
- **Data**: Data folder has the data from TDS Course Page and data_discourse has the data from Discourse.
- **Download**: Download the replies from AI as .txt format.


**Note**: API Key has been removed, so it won't be possible to chat without installing it locally.

---

## Screenshots


## Installation

~~~bash
>> git clone https://github.com/OmAmar106/Virtual-AI-Teaching-Assistant-TDS-Project
~~~

Replace xxx in start.sh with the actual API Key
 
~~~bash
>> chmod +x test.sh
>> ./test.sh
~~~


## API

* /api -> method: POST, expects question and image (optional)

---

