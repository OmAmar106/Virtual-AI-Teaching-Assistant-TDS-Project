import json
import os
from typing import List, Dict, Any
from tqdm import tqdm
import requests
from pinecone import Pinecone, ServerlessSpec

AI_PIPE_API_KEY = os.getenv("API_KEY")
PINECONE_API_KEY = os.getenv("PINE_KEY")

AI_PIPE_BASE_URL = "https://aiproxy.sanand.workers.dev/openai/v1"

pinecone = Pinecone(api_key=PINECONE_API_KEY)

index_name = "discourse-embeddings"
if index_name not in pinecone.list_indexes().names():
    pinecone.create_index(
        name=index_name,
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

index = pinecone.Index(index_name)

HEADERS = {
    "Authorization": f"{AI_PIPE_API_KEY}",
    "Content-Type": "application/json",
}

def ai_pipe_embedding(text: str) -> List[float]:
    url = f"{AI_PIPE_BASE_URL}/embeddings"
    payload = {
        "model": "text-embedding-3-small",
        "input": text
    }
    response = requests.post(url, headers=HEADERS, json=payload)
    response.raise_for_status()
    return response.json()["data"][0]["embedding"]

def semantic_search(query: str, top_k: int = 5) -> List[Dict[str, Any]]:
    query_embedding = ai_pipe_embedding(query)
    search_response = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )
    results = []
    for match in search_response.matches:
        try:
            results.append({
                "score": match.score,
                "topic_id": match.metadata["topic_id"],
                "topic_title": match.metadata["topic_title"],
                "root_post_number": match.metadata["root_post_number"],
                "post_numbers": match.metadata["post_numbers"],
                "combined_text": match.metadata["combined_text"],
            })
        except:
            try:
                results.append({
                    "score": match.score,
                    "topic_id": match.metadata["link"],
                    "topic_title": match.metadata["topic_title"],
                    "combined_text": match.metadata["combined_text"],
                })
            except:
                continue
    return results

def ai_pipe_chat_completion(messages: List[Dict[str, str]]) -> str:
    url = "https://aiproxy.sanand.workers.dev/openai/v1/chat/completions"
    payload = {
        "model": "gpt-4o-mini",
        "messages": messages
    }
    response = requests.post(url, headers=HEADERS, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

def generate_answer(query: str, context_texts: List[str]) -> str:
    context = "\n\n---\n\n".join(context_texts)
    messages = [
        {"role": "system", "content": "You are a helpful assistant that answers questions based on forum discussions."},
        {"role": "user", "content": f"Based on these forum excerpts:\n\n{context}\n\nQuestion: {query}\n\nAnswer:"}
    ]
    return ai_pipe_chat_completion(messages)

# query = "I know Docker but have not used Podman before. Should I use Docker for this course?"
# results = semantic_search(query, top_k=3)

# print("\nTop search results:")
# for i, res in enumerate(results, 1):
#     print(f"\n[{i}] Score: {res['score']:.4f}")
#     print(f"Topic: {res['topic_title']}")
#     print(f"Content snippet: {res['combined_text'][:500]}...\n")

# context_texts = [res["combined_text"] for res in results]
# answer = generate_answer(query, context_texts)
# print("\nGenerated Answer:\n", answer)
