# Virtual AI Teaching Assistant — TDS Project

A Virtual AI Teaching Assistant built with an embedding-based retrieval architecture. It allows users (students, educators, researchers) to interact naturally with a knowledge base derived from course materials, outlines, slides, transcripts, and more. It is specifically designed with knowledge from the TDS course of IIT Madras.

---

## 🛠️ Features

- **Course-aware Q&A**: Chat with AI using text and images.
- **Extraction**: Data extraction is done from Discourse of TDS and TDS Jan Term Theory.
- **Embeddings**: Embeddings are created using Pinecone.
- **Data**: `data/` contains content from the TDS Course Page and `data_discourse/` has content from Discourse.
- **Downloadable Replies**: You can download AI responses as `.txt` files.

**Note**: API Key has been removed from the repository. You must add your own to enable full functionality.

---

## 📸 Screenshots

![Screenshot from 2025-06-30 23-22-51](https://github.com/user-attachments/assets/aa10da38-9b40-44c3-97ad-04e2438fcb83)
![Screenshot from 2025-06-30 23-26-14](https://github.com/user-attachments/assets/d8cf9c54-2448-4896-9990-d42fd65dd065)

---

## 🚀 Installation

```bash
# Clone the repository
>> git clone https://github.com/OmAmar106/Virtual-AI-Teaching-Assistant-TDS-Project
```

Replace `xxx` in `start.sh` with your actual API Key

```bash
# Give execution permissions and run
>> chmod +x test.sh
>> ./test.sh
```

---

## 🔌 API

- **Endpoint**: `/api`
- **Method**: `POST`
- **Expected Input**:
  - `question`: string
  - `image`: optional image input

---


