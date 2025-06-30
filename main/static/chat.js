const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const imageInput = document.getElementById('image-input');
const imageBtn = document.getElementById('image-btn');
const imagePreviewContainer = document.getElementById('image-preview-container');

window.addEventListener('DOMContentLoaded', () => {
    const messages = JSON.parse(sessionStorage.getItem('chatMessages') || '[]');
    messages.forEach(msg => {
        appendMessage(msg.sender, msg.text, msg.image, false, true);
    });
});

let attachedImage = null;

imageBtn.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', (e) => {
    attachedImage = e.target.files[0] || null;
    imagePreviewContainer.innerHTML = '';
    if (attachedImage) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(attachedImage);
        img.title = "Click to remove";
        img.onclick = removePreview;
        imagePreviewContainer.appendChild(img);

        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✖';
        removeBtn.className = 'remove-preview';
        removeBtn.onclick = removePreview;
        imagePreviewContainer.appendChild(removeBtn);

        imageBtn.style.color = '#3f51b5';
    } else {
        imageBtn.style.color = '';
    }
});

function removePreview() {
    attachedImage = null;
    imageInput.value = '';
    imagePreviewContainer.innerHTML = '';
    imageBtn.style.color = '';
}

function func(st, lks) {
    let md = st;
    if (Array.isArray(lks) && lks.length > 0) {
        md += `\n\n**Useful Links:**\n`;
        lks.forEach((link, idx) => {
            md += `\n${idx + 1}. [${link.url}](${link.url})`;
        });
    }
    return marked.parse(md);
}

const clearChatBtn = document.getElementById('clear-chat-btn');
clearChatBtn.addEventListener('click', () => {
    chatBox.innerHTML = '';
    sessionStorage.removeItem('chatMessages');
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text && !attachedImage) return;

    appendMessage('user', text, attachedImage);

    if (attachedImage) {
        const reader = new FileReader();
        reader.onload = async function () {
            const base64Image = reader.result;
    
            const payload = {
                question: text,
                image: base64Image
            };
    
            await sendJson(payload);
        };
        reader.readAsDataURL(attachedImage);
    } else {
        const payload = {
            question: text,
            image: null
        };
        await sendJson(payload);
    }
    
    async function sendJson(payload) {
        userInput.value = '';
        attachedImage = null;
        imageInput.value = '';
        imagePreviewContainer.innerHTML = '';
        imageBtn.style.color = '';
        appendMessage('ai', 'Thinking ...', null, true);
    
        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            removeLoading();
            appendMessage('ai', func(data.answer, data.links) || '[No response]');
        } catch (e) {
            removeLoading();
            appendMessage('ai', 'Please provide Open AI API Key');
        }
    }
});

function appendMessage(sender, text, image, isLoading = false, skipSave = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = text;
    msgDiv.appendChild(bubble);

    if (image && typeof image === 'string') {
        const img = document.createElement('img');
        img.src = image;
        msgDiv.appendChild(img);
    } else if (image && image instanceof File) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(image);
        msgDiv.appendChild(img);
    }

    if (sender === 'ai' && !isLoading) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'ai-actions';

        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '📋';
        copyBtn.title = 'Copy';
        copyBtn.onclick = () => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            const plainText = tempDiv.innerText;
            navigator.clipboard.writeText(plainText);
        };
        actionsDiv.appendChild(copyBtn);

        const downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = '⬇️';
        downloadBtn.title = 'Download'; 
        downloadBtn.onclick = () => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            const plainText = tempDiv.innerText;
            const blob = new Blob([plainText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ai-response.txt';
            a.click();
            URL.revokeObjectURL(url);
        };
        actionsDiv.appendChild(downloadBtn);

        msgDiv.appendChild(actionsDiv);
    }

    if (isLoading) msgDiv.classList.add('loading');

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (!skipSave) {
        const messages = JSON.parse(sessionStorage.getItem('chatMessages') || '[]');
        messages.push({ sender, text, image: typeof image === 'string' ? image : null });
        sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }
}

function removeLoading() {
    const loadingMsg = chatBox.querySelector('.message.ai.loading');
    if (loadingMsg){
        chatBox.removeChild(loadingMsg);
        const messages = JSON.parse(sessionStorage.getItem('chatMessages') || '[]');
        if (messages.length > 0 && messages[messages.length - 1].sender === 'ai' && messages[messages.length - 1].text === 'Thinking ...') {
            messages.pop();
            sessionStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }
}