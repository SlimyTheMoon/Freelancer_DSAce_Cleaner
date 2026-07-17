# Discovery Freelancer RP Log Editor & Filter

A lightweight browser tool for cleaning and filtering roleplay chat logs from the Discovery Freelancer 24/7 RP server.

Use it to remove system noise, narrow logs by date, and extract only the player dialogue you want.

## ✨ Features

- **Fully local** — runs entirely in your web browser, with no uploads or external services.
- **Paste or upload logs** — supports raw log text or `.log` log files.
- **System message removal** — filters welcome text, rules tips, traffic alerts, death notices, bot announcements, and console spam.
- **OOC chatter removal** — removes lines marked with `[OOC]` from the output.
- **Name whitelist** — keep only lines containing one or more player names.
- **Date range filtering** — include logs only from the selected start/end dates.
- **Timestamp trimming** — remove the leading `[DD.MM.YYYY HH:MM:SS]` prefix for cleaner output. This option is enabled by default.
- **Dark UI** — a simple, easy-to-read dark theme.

## 🚀 Usage

1. Keep `index.html`, `main.css`, and `main.js` together in the same folder.
2. Open `index.html` in your browser.
3. Paste your raw log text into the input area, or upload a `.log` log file.
4. Optionally enter comma-separated character names in the whitelist.
5. Optionally select a start date and/or end date.
6. Toggle system message removal and timestamp trimming as needed.
7. Click **Process Logs**.
8. Copy the filtered output from the bottom textarea.

## 🔧 Important

- `main.js` is required for log parsing and filtering. Without it, the app will not process logs.
- `main.css` is required for the intended layout and styling. Without it, the page will still load but appear unstyled.
- Make sure the files are in the same folder; the HTML references both CSS and JavaScript.

## 🔍 What It Filters

- Built-in system messages and automated announcements common to Discovery RP logs.
- Lines that begin with commands such as `/stuck` or other console-style inputs.
- Lines that do not match any of the whitelist names when a whitelist is provided.
- Lines outside the selected date range, based on the standard DSAce timestamp format.

## 📁 Files Included

- `index.html` — interface and markup.
- `main.css` — styling.
- `main.js` — log parsing and filtering logic.
- `README.md` — project overview and usage instructions.

## 🛠️ Notes

- No backend or dependencies are required.
- All processing happens locally in the browser.
- Whitelist matching is case-insensitive and works by searching for the entered name text in each line.
- Date filtering uses the `DD.MM.YYYY HH:MM:SS` log format.

## 💡 Tip

For best results, use logs exported directly from `DSAce.log` or similar Discovery Freelancer RP chat logs.