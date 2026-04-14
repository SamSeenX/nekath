# 2026 Avurudu Nekath Dashboard 🌞

A minimalist, responsive dashboard to track the upcoming Sinhala and Tamil New Year Nekath (Auspicious Times) for **2026**. 

It provides real-time updates and an easily digestible timeline showing past, current, and upcoming significant events using a clean UI architecture.

## 🚀 Features

- **Dynamic Background Themes**: The aesthetic adjusts depending on which `Nekatha` is currently upcoming, providing subtle visual signaling.
- **Punya Kaalaya Alerts**: A dedicated and pulsing visual banner informs users when they are currently inside the inauspicious "Nonagathe" time window.
- **Micro-Animations**: Uses high-impact confetti celebrations powered by the `canvas-confetti` library each time a milestone is successfully reached.
- **Live Timeline**: Left side showcases an active countdown and current focus parameters (direction/color). Right side offers an auto-scrolling chronological list of the year's events which grayscale once past.
- **Modular Data Feed**: Configured strictly relying on an external mapping object to keep `data.js` perfectly isolated from rendering logic, making it scalable for future years.

## 📁 Project Structure

This project has been modularized away from a monolithic HTML structure into distinct logic concerns:

```
Nekath/
├── css/
│   └── style.css       # Custom scrollbars and styling overrides
├── js/
│   ├── app.js          # Controller handling date logic, counting, DOM manip
│   └── data.js         # Isolated payload defining all 2026 Nekath configurations
├── index.html          # Structural UI implementation utilizing Tailwind CDN
└── README.md           # Documentation
```

## 🛠️ Testing & Debugging

The application logic automatically updates every `1000ms`, recalculating state transitions and determining the active target Nekath. 

To easily preview the fireworks feature used during Nekath transitions without having to configure your device clock to a specific time interval:

- **Debug Trigger**: We have installed a floating transparent "party popper" button precisely in the bottom-right corner of the dashboard screen. Click it to fire the confetti execution protocol.
- **Time Hacking**: If you wish to preview background states immediately, you can temporarily manipulate the array in `/js/data.js` using closer localized timestamps to your current timezone or adjust your Operating System's local internal clock settings. 

## 🌐 Deployment

The system leverages standard `<script>` protocols deliberately circumventing ES6 module exports restrictions, meaning it strictly supports local raw access (`file://`) or rapid static hosting environments (Netlify, **Cloudflare Pages**, Vercel, or GitHub Pages) without demanding extra server layers or MIME-type dependency configurations. 

## ☕ Support

If you find this project useful, please consider supporting me:

- ⭐ Starring this repository
- 🐛 Reporting issues
- 💡 Suggesting improvements
- ☕ [Buy me a coffee](https://buymeacoffee.com/samseen)

---

Created with ❤️ by [SamSeen](https://buymeacoffee.com/samseen) 
