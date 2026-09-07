const gameDatabase = [
    {
        name: "Fortnite",
        type: "Shooter / Battle Royale",
        tier: "T1",
        tierLabel: "Closed-loop Paid Reward",
        exposure: "Medium",
        audience: "Adolescents, Young Adults",
        risk: "medium",
        updated: "02 Sep 2026",
        mechanics: "Players spend real money on in-game items (e.g. V-Bucks) that cannot be withdrawn as real money. There is no direct cash-out route.",
        sources: ["Epic Games – Terms of Service (2024)", "Australian Classification Board (2024)"]
    },
    {
        name: "Roblox",
        type: "Platform / UGC",
        tier: "T1 - T4",
        tierLabel: "Varies by role (player vs creator)",
        exposure: "Low - High",
        audience: "Children, Adolescents",
        risk: "high",
        updated: "01 Sep 2026",
        mechanics: "Players cannot convert Robux into cash, but creators can cash out through the Developer Exchange program — so tier depends on the user's role.",
        sources: ["Roblox Corporation – Developer Exchange (n.d.)"]
    },
    {
        name: "CS2 Skins Betting Sites",
        type: "Skin Betting",
        tier: "T3",
        tierLabel: "Grey-market Convertible",
        exposure: "High",
        audience: "Young Adults, Adults",
        risk: "veryhigh",
        updated: "31 Aug 2026",
        mechanics: "In-game skins can be traded or wagered on third-party sites and converted to cash through unofficial marketplaces.",
        sources: ["Harris, Griffiths & Gibson (2025). A rapid evidence review of skins gambling."]
    }
];

// ---------- Populate "Recently Added" table ----------
function renderTable() {
    const tbody = document.getElementById('gamesTableBody');
    tbody.innerHTML = gameDatabase.map((g) => {
        const dots = { low: '●●○○○', medium: '●●●○○', high: '●●●●○', veryhigh: '●●●●●' }[g.risk] || '●●○○○';
        const dotClass = g.risk === 'medium' ? 'risk-dots medium' : 'risk-dots';
        return `
            <tr>
                <td>${g.name}</td>
                <td>${g.type}</td>
                <td>${g.tier}</td>
                <td>${g.exposure}</td>
                <td>${g.audience}</td>
                <td><span class="${dotClass}">${dots}</span></td>
                <td>${g.updated}</td>
            </tr>
        `;
    }).join('');
}
renderTable();

// ---------- Search ----------
document.getElementById('searchBtn').addEventListener('click', searchGame);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchGame();
});
document.querySelectorAll('.popular-link').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('searchInput').value = link.textContent;
        searchGame();
    });
});

function searchGame() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsEl = document.getElementById('results');
    resultsEl.innerHTML = '';
    if (!query) return;

    const matches = gameDatabase.filter((g) => g.name.toLowerCase().includes(query));
    if (matches.length === 0) {
        resultsEl.innerHTML = `<div class="game-card"><p>No matching game found in the taxonomy yet.</p></div>`;
        return;
    }

    matches.forEach((g) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <h4>${g.name} <span class="tier-pill">${g.tier}</span></h4>
            <p>${g.tierLabel}</p>
            <p style="margin-top:6px;">${g.mechanics}</p>
            <p style="margin-top:6px; font-size:0.78rem; color:#777;">Sources: ${g.sources.join(' • ')}</p>
        `;
        resultsEl.appendChild(card);
    });
}

// ---------- Mock chatbot (keyword-based, no backend yet) ----------
const chatLog = document.getElementById('chatLog');

document.getElementById('chatSendBtn').addEventListener('click', sendChat);
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChat();
});
document.querySelectorAll('.suggestion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.getElementById('chatInput').value = btn.textContent;
        sendChat();
    });
});

function sendChat() {
    const input = document.getElementById('chatInput');
    const question = input.value.trim();
    if (!question) return;

    appendMsg(question, 'user');
    input.value = '';

    setTimeout(() => {
        appendMsg(mockAnswer(question), 'bot');
    }, 400);
}

function mockAnswer(question) {
    const q = question.toLowerCase();

    const mentioned = gameDatabase.find((g) => q.includes(g.name.toLowerCase()));
    if (mentioned) {
        return `${mentioned.name} is classified as ${mentioned.tier} - ${mentioned.tierLabel}. ${mentioned.mechanics}`;
    }
    if (q.includes('t6')) {
        return "No games in our current sample dataset are classified T6 yet. T6 covers unlicensed/offshore real-money wagering platforms.";
    }
    if (q.includes('loot box')) {
        return "Loot boxes are paid, randomised in-game rewards. Research (Drummond & Sauer, 2018; Zendle & Cairns, 2018) links loot-box spending to problem-gambling severity.";
    }
    if (q.includes('risk') || q.includes('determine')) {
        return "Risk is determined using our taxonomy's cash-realisability tier (T0-T6), financial exposure, and audience vulnerability.";
    }
    if (q.includes('parent')) {
        return "For parents: check a game's Cash Tier before allowing purchases. T2+ means real money is being spent on randomised or convertible rewards.";
    }
    return "I can only answer questions from our classified dataset right now (this is a demo version). Try asking about Fortnite, Roblox, or CS2 skins betting.";
}

function appendMsg(text, sender) {
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    msg.textContent = text;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
}

document.querySelector('.chat-close').addEventListener('click', () => {
    document.querySelector('.chat-panel').style.display = 'none';
});
