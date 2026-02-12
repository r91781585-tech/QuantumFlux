# 🌊 QuantumFlux

A real-time data visualization and analytics platform with dynamic dashboards and interactive charts. Built with **pure HTML, CSS, and JavaScript** - no frameworks, no build tools, no dependencies!

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **📊 Real-time Data Visualization** - Live updating charts with simulated data streams
- **🎨 Interactive Dashboard** - Add, remove, and refresh widgets dynamically
- **🌓 Dark/Light Theme** - Toggle between beautiful dark and light modes
- **📈 Multiple Chart Types** - Line charts, bar charts, pie charts, and metric displays
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ Zero Dependencies** - Pure vanilla JavaScript, no frameworks required
- **🚀 Instant Setup** - Just open `index.html` in your browser!

## 🎯 Demo

Simply open `index.html` in any modern web browser to see QuantumFlux in action!

## 🚀 Quick Start

### Option 1: Direct Download
```bash
# Clone the repository
git clone https://github.com/r91781585-tech/QuantumFlux.git
cd QuantumFlux

# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Option 2: Live Server (Recommended for Development)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then open http://localhost:8000
```

## 📁 Project Structure

```
QuantumFlux/
├── index.html      # Main HTML structure
├── styles.css      # All styling with CSS variables
├── app.js          # Application logic and chart rendering
└── README.md       # This file
```

## 🎨 Features in Detail

### Dashboard Widgets

- **📈 Line Chart** - Real-time trend visualization with smooth animations
- **📊 Bar Chart** - Compare values across categories with gradient fills
- **🥧 Pie Chart** - Distribution visualization with percentage labels
- **🎯 Metric Display** - Key performance indicators with change tracking

### Interactive Controls

- **➕ Add Widget** - Click to add new visualizations to your dashboard
- **🔄 Refresh** - Update individual widgets with new data
- **✕ Remove** - Delete widgets you don't need
- **🌙/☀️ Theme Toggle** - Switch between dark and light modes

### Real-time Updates

All charts automatically update every 2 seconds with new simulated data, demonstrating real-time data streaming capabilities.

## 🛠️ Technology Stack

- **HTML5** - Semantic markup and Canvas API for charts
- **CSS3** - Modern styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript** - ES6+ features, no frameworks or libraries

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --accent: #3b82f6;        /* Primary accent color */
    --success: #10b981;       /* Success/positive color */
    --warning: #f59e0b;       /* Warning color */
    --danger: #ef4444;        /* Danger/negative color */
}
```

### Adding New Widget Types

1. Add a new widget type card in `index.html`
2. Implement the rendering logic in `app.js`
3. Add corresponding styles in `styles.css`

### Modifying Update Frequency

Change the interval in `app.js`:

```javascript
// Default: 2000ms (2 seconds)
const interval = setInterval(() => {
    this.updateWidgetData(widget);
}, 2000); // Change this value
```

## 📊 Chart Types

### Line Chart
- Displays trends over time
- Smooth line rendering with data points
- Grid background for easy reading
- Auto-scaling based on data range

### Bar Chart
- Compares values across categories
- Gradient fill for visual appeal
- Labeled axes
- Responsive bar widths

### Pie Chart
- Shows distribution percentages
- Color-coded segments
- Percentage labels on slices
- Legend for clarity

### Metric Display
- Large number display
- Percentage change indicator
- Color-coded positive/negative changes
- Clean, minimal design

## 🌐 Browser Support

QuantumFlux works on all modern browsers:

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## 📱 Responsive Design

The dashboard automatically adapts to different screen sizes:

- **Desktop** - Full sidebar + multi-column grid
- **Tablet** - Collapsible sidebar + 2-column grid
- **Mobile** - Stacked layout + single column

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern analytics platforms
- Built with ❤️ using vanilla web technologies
- No frameworks harmed in the making of this project

## 📧 Contact

Project Link: [https://github.com/r91781585-tech/QuantumFlux](https://github.com/r91781585-tech/QuantumFlux)

---

**Made with vanilla HTML, CSS, and JavaScript** 🌊