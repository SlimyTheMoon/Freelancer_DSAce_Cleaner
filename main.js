document.addEventListener('DOMContentLoaded', () => {

    // Handle File Upload
    document.getElementById('fileInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('logInput').value = event.target.result;
        };
        reader.readAsText(file);
    });

    // Process Button Event Listener
    document.getElementById('processBtn').addEventListener('click', processLogs);

    function processLogs() {
        const input = document.getElementById('logInput').value;
        const whitelistRaw = document.getElementById('whitelist').value;
        const whitelist = whitelistRaw ? whitelistRaw.split(',').map(n => n.trim().toLowerCase()).filter(n => n) : [];
        const startDateStr = document.getElementById('startDate').value;
        const endDateStr = document.getElementById('endDate').value;
        const removeSystem = document.getElementById('removeSystem').checked;
        const cutDate = document.getElementById('cutDate').checked;
        const removeOOC = document.getElementById('removeOOC').checked;

        // Parse dates for filtering
        let startDate = startDateStr ? new Date(startDateStr) : null;
        let endDate = endDateStr ? new Date(endDateStr) : null;
        if (endDate) endDate.setHours(23, 59, 59, 999);

        // Extensive blacklist of system message keywords based on your log example
        const systemKeywords = [
            "Welcome to ", "Traffic control alert", "Discovery is a",
            "To type messages", "To see past", "To learn about",
            "Players are required", "Please visit", "The year is",
            "The solar winds", "Please check your IDs", "Tip:", "Rules Tip:",
            "Death:", "Auto-Buy", "OK Access", "Initialising", "Options:",
            "Freelancer Started", "Shutdown", "Construction started",
            "Available", "Modules available", "ERR", "CONSOLE:",
            "Valley Forge Flight School", "Interspace has partnered",
            "Valley Forge will pay", "[ Warning ]", "Law enforcement will",
            "Redirecting undock", "Screen size is", "-logchat", "-logtime",
            "-localtime", "-logappend", "-showinfocards", "OK ", "A bounty of",
            "Rallying", "Your cargo is now full", "Rearmament available",
            "Connection to tradelane", "You will be kicked", "Pimp-my-ship",
            "Type /pimpship", "Restock", "This system does not exist",
            "Do not attack", "Return a player", "Be polite", "To leave Connecticut",
            " died to ", " was put out of action", " suffered a self-inflicted",
            " was shot out of the skies", " perished at ", " was obliterated by",
            " lost a fight with ", " was taken out by ", " was blown out of the stars",
            " met their end thanks to ", " got divebombed by ", " life support went offline thanks to ",
            "Access Denied!", "You have drawn ", "You have sent ", "Reputation dropped",
            "has begun docking on", "Docking in", "Successfully docked",
            "Launched from the carrier", "Position "
        ];

        const lines = input.split('\n');
        const result = [];

        for (let line of lines) {
            if (!line.trim()) continue; // Ignore completely empty lines

            // 1. Filter by Date
            const dateMatch = line.match(/^\[(\d{2})\.(\d{2})\.(\d{4})\s+\d{2}:\d{2}:\d{2}\]/);
            if (dateMatch) {
                const day = parseInt(dateMatch[1], 10);
                const month = parseInt(dateMatch[2], 10) - 1; // JS months are 0-11
                const year = parseInt(dateMatch[3], 10);
                const lineDate = new Date(year, month, day);

                if (startDate && lineDate < startDate) continue;
                if (endDate && lineDate > endDate) continue;
            }

            // 2. Filter out OOC chatter
            if (removeOOC && line.match(/\[ooc\]/i)) {
                continue;
            }

            // 3. Filter out System Messages
            if (removeSystem) {
                let isSystemMessage = false;
                
                // Catch standard system messages via keywords
                for (let keyword of systemKeywords) {
                    if (line.includes(keyword)) {
                        isSystemMessage = true;
                        break;
                    }
                }

                // Catch single slash commands (e.g., [Date] /stuck, /0) if not caught by keywords
                if (line.match(/^\[.*?\]\s*\/\w+/)) {
                    isSystemMessage = true;
                }

                if (isSystemMessage) continue;
            }

            // 4. Filter by Name Whitelist
            if (whitelist.length > 0) {
                let hasWhitelistedName = false;
                const lowerLine = line.toLowerCase();
                
                for (let name of whitelist) {
                    if (lowerLine.includes(name)) {
                        hasWhitelistedName = true;
                        break;
                    }
                }
                
                if (!hasWhitelistedName) continue;
            }

            // 4. Cut Timestamp
            let finalLine = line;
            if (cutDate) {
                finalLine = finalLine.replace(/^\[\d{2}\.\d{2}\.\d{4}\s+\d{2}:\d{2}:\d{2}\]\s*(?:\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s+SMT\s+)?/, '');
            }

            result.push(finalLine);
        }

        document.getElementById('logOutput').value = result.join('\n');
    }
});