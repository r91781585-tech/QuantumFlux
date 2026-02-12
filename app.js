// Main application logic
class QuantumFluxApp {
    constructor() {
        this.theme = 'dark';
        this.widgets = [];
        this.widgetIdCounter = 0;
        this.dataStreams = new Map();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialWidgets();
        this.startAnimations();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Add widget button
        const addWidgetBtn = document.getElementById('addWidget');
        addWidgetBtn.addEventListener('click', () => this.showWidgetModal());

        // Modal close
        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => this.hideWidgetModal());

        // Widget type selection
        const widgetTypeCards = document.querySelectorAll('.widget-type-card');
        widgetTypeCards.forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.type;
                this.addWidget(type);
                this.hideWidgetModal();
            });
        });

        // Close modal on outside click
        const modal = document.getElementById('widgetModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideWidgetModal();
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = this.theme === 'dark' ? '🌙' : '☀️';

        // Redraw all charts with new theme colors
        setTimeout(() => {
            this.widgets.forEach(widget => {
                if (['line', 'bar', 'pie'].includes(widget.type)) {
                    this.updateChart(widget);
                }
            });
        }, 100);
    }

    showWidgetModal() {
        const modal = document.getElementById('widgetModal');
        modal.classList.add('active');
    }

    hideWidgetModal() {
        const modal = document.getElementById('widgetModal');
        modal.classList.remove('active');
    }

    addWidget(type) {
        const titles = {
            line: '📈 Real-time Metrics',
            bar: '📊 Weekly Performance',
            pie: '🥧 Market Distribution',
            metric: '🎯 Key Performance'
        };

        const widgetId = `widget-${this.widgetIdCounter++}`;
        const widget = {
            id: widgetId,
            type: type,
            title: titles[type] || 'Widget',
            data: this.generateInitialData(type)
        };

        this.widgets.push(widget);
        this.renderWidget(widget);
        this.startDataStream(widget);
        this.updateWidgetCount();
    }

    generateInitialData(type) {
        switch(type) {
            case 'line':
                return Array.from({length: 20}, (_, i) => ({
                    label: i,
                    value: Math.random() * 100
                }));
            case 'bar':
                return [
                    {label: 'Mon', value: Math.random() * 100},
                    {label: 'Tue', value: Math.random() * 100},
                    {label: 'Wed', value: Math.random() * 100},
                    {label: 'Thu', value: Math.random() * 100},
                    {label: 'Fri', value: Math.random() * 100}
                ];
            case 'pie':
                return [
                    {label: 'Product A', value: Math.random() * 100},
                    {label: 'Product B', value: Math.random() * 100},
                    {label: 'Product C', value: Math.random() * 100},
                    {label: 'Product D', value: Math.random() * 100}
                ];
            case 'metric':
                return {
                    value: Math.floor(Math.random() * 10000),
                    change: (Math.random() - 0.5) * 20
                };
            default:
                return [];
        }
    }

    renderWidget(widget) {
        const grid = document.getElementById('widgetGrid');
        const widgetEl = document.createElement('div');
        widgetEl.className = 'widget';
        widgetEl.id = widget.id;

        widgetEl.innerHTML = `
            <div class="widget-header">
                <h3 class="widget-title">${widget.title}</h3>
                <div class="widget-actions">
                    <button class="widget-btn" onclick="app.refreshWidget('${widget.id}')">🔄</button>
                    <button class="widget-btn" onclick="app.removeWidget('${widget.id}')">✕</button>
                </div>
            </div>
            <div class="widget-content" id="${widget.id}-content">
                ${this.renderWidgetContent(widget)}
            </div>
        `;

        grid.appendChild(widgetEl);
        
        // Render chart if needed
        if (['line', 'bar', 'pie'].includes(widget.type)) {
            setTimeout(() => this.updateChart(widget), 100);
        }
    }

    renderWidgetContent(widget) {
        switch(widget.type) {
            case 'line':
            case 'bar':
            case 'pie':
                return `<canvas id="${widget.id}-canvas" width="400" height="250"></canvas>`;
            case 'metric':
                return `
                    <div class="metric-display">
                        <div class="metric-value" id="${widget.id}-value">${widget.data.value.toLocaleString()}</div>
                        <div class="metric-label">Total Value</div>
                        <div class="metric-change ${widget.data.change >= 0 ? 'positive' : 'negative'}" id="${widget.id}-change">
                            ${widget.data.change >= 0 ? '↑' : '↓'} ${Math.abs(widget.data.change).toFixed(2)}%
                        </div>
                    </div>
                `;
            default:
                return '<p>Unknown widget type</p>';
        }
    }

    updateChart(widget) {
        const canvas = document.getElementById(`${widget.id}-canvas`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        switch(widget.type) {
            case 'line':
                this.drawLineChart(ctx, widget.data, width, height);
                break;
            case 'bar':
                this.drawBarChart(ctx, widget.data, width, height);
                break;
            case 'pie':
                this.drawPieChart(ctx, widget.data, width, height);
                break;
        }
    }

    drawLineChart(ctx, data, width, height) {
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        const values = data.map(d => d.value);
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const range = maxValue - minValue || 1;

        // Draw grid
        ctx.strokeStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--border').trim();
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Draw line
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();

        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - ((point.value - minValue) / range) * chartHeight;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw points
        ctx.fillStyle = '#3b82f6';
        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = padding + chartHeight - ((point.value - minValue) / range) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    drawBarChart(ctx, data, width, height) {
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        const maxValue = Math.max(...data.map(d => d.value));
        const barWidth = chartWidth / data.length - 10;

        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = padding + (chartWidth / data.length) * index + 5;
            const y = padding + chartHeight - barHeight;

            // Draw bar
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            gradient.addColorStop(0, '#3b82f6');
            gradient.addColorStop(1, '#8b5cf6');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw label
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim();
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth / 2, height - padding + 20);
        });
    }

    drawPieChart(ctx, data, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;

        const total = data.reduce((sum, item) => sum + item.value, 0);
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

        let currentAngle = -Math.PI / 2;

        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * Math.PI * 2;

            // Draw slice
            ctx.fillStyle = colors[index % colors.length];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();

            // Draw label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${((item.value / total) * 100).toFixed(1)}%`, labelX, labelY);

            currentAngle += sliceAngle;
        });
    }

    startDataStream(widget) {
        const interval = setInterval(() => {
            this.updateWidgetData(widget);
        }, 2000);

        this.dataStreams.set(widget.id, interval);
    }

    updateWidgetData(widget) {
        switch(widget.type) {
            case 'line':
                widget.data.shift();
                widget.data.push({
                    label: widget.data[widget.data.length - 1].label + 1,
                    value: Math.random() * 100
                });
                this.updateChart(widget);
                break;
            case 'bar':
                widget.data.forEach(item => {
                    item.value = Math.random() * 100;
                });
                this.updateChart(widget);
                break;
            case 'pie':
                widget.data.forEach(item => {
                    item.value = Math.random() * 100;
                });
                this.updateChart(widget);
                break;
            case 'metric':
                const oldValue = widget.data.value;
                widget.data.value = Math.floor(Math.random() * 10000);
                widget.data.change = ((widget.data.value - oldValue) / oldValue) * 100;
                
                const valueEl = document.getElementById(`${widget.id}-value`);
                const changeEl = document.getElementById(`${widget.id}-change`);
                if (valueEl) valueEl.textContent = widget.data.value.toLocaleString();
                if (changeEl) {
                    changeEl.className = `metric-change ${widget.data.change >= 0 ? 'positive' : 'negative'}`;
                    changeEl.textContent = `${widget.data.change >= 0 ? '↑' : '↓'} ${Math.abs(widget.data.change).toFixed(2)}%`;
                }
                break;
        }

        this.updateDataPointsCount();
    }

    refreshWidget(widgetId) {
        const widget = this.widgets.find(w => w.id === widgetId);
        if (widget) {
            widget.data = this.generateInitialData(widget.type);
            this.updateWidgetData(widget);
        }
    }

    removeWidget(widgetId) {
        const widgetEl = document.getElementById(widgetId);
        if (widgetEl) {
            widgetEl.remove();
        }

        const interval = this.dataStreams.get(widgetId);
        if (interval) {
            clearInterval(interval);
            this.dataStreams.delete(widgetId);
        }

        this.widgets = this.widgets.filter(w => w.id !== widgetId);
        this.updateWidgetCount();
    }

    updateWidgetCount() {
        const countEl = document.getElementById('widgetCount');
        if (countEl) {
            countEl.textContent = this.widgets.length;
        }
    }

    updateDataPointsCount() {
        let totalPoints = 0;
        this.widgets.forEach(widget => {
            if (Array.isArray(widget.data)) {
                totalPoints += widget.data.length;
            } else {
                totalPoints += 1;
            }
        });

        const pointsEl = document.getElementById('dataPoints');
        if (pointsEl) {
            pointsEl.textContent = totalPoints.toLocaleString();
        }
    }

    loadInitialWidgets() {
        // Load default widgets
        this.addWidget('line');
        this.addWidget('bar');
        this.addWidget('metric');
    }

    startAnimations() {
        // Animate stats
        let dataPoints = 0;
        setInterval(() => {
            dataPoints += Math.floor(Math.random() * 10);
            const pointsEl = document.getElementById('dataPoints');
            if (pointsEl && dataPoints < 1000) {
                pointsEl.textContent = dataPoints.toLocaleString();
            }
        }, 1000);
    }
}

// Initialize app when DOM is ready
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new QuantumFluxApp();
    });
} else {
    app = new QuantumFluxApp();
}