import * as fs from "fs";
import * as path from "path";
import { TestSummary } from "./ReportGenerator";

export class DashboardGenerator {
  private summary: TestSummary;

  constructor(summary: TestSummary) {
    this.summary = summary;
  }

  generateDashboard(): string {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QTEC Testing Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .dashboard {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px;
            background: #f8f9fa;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-card.success { border-left: 5px solid #28a745; }
        .stat-card.danger { border-left: 5px solid #dc3545; }
        .stat-card.warning { border-left: 5px solid #ffc107; }
        .stat-card.info { border-left: 5px solid #17a2b8; }

        .stat-card h3 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #333;
        }

        .stat-card p {
            color: #666;
            font-size: 1.1em;
        }

        .charts-section {
            padding: 30px;
        }

        .chart-container {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .chart-container h3 {
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }

        .chart-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
        }

        .progress-section {
            padding: 30px;
            background: #f8f9fa;
        }

        .progress-item {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-item h4 {
            color: #333;
            margin-bottom: 10px;
        }

        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: #e9ecef;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #28a745, #20c997);
            transition: width 0.3s ease;
        }

        .footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 20px;
        }

        @media (max-width: 768px) {
            .stats-grid {
                grid-template-columns: 1fr;
            }

            .chart-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>📊 QTEC Testing Dashboard</h1>
            <p>Real-time Quality Assurance Overview</p>
            <p><strong>Last Updated:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card success">
                <h3>${this.summary.passed}</h3>
                <p>✅ Tests Passed</p>
            </div>
            <div class="stat-card danger">
                <h3>${this.summary.failed}</h3>
                <p>❌ Tests Failed</p>
            </div>
            <div class="stat-card info">
                <h3>${this.summary.total}</h3>
                <p>📊 Total Tests</p>
            </div>
            <div class="stat-card warning">
                <h3>${this.summary.successRate.toFixed(1)}%</h3>
                <p>🎯 Success Rate</p>
            </div>
        </div>

        <div class="charts-section">
            <div class="chart-grid">
                <div class="chart-container">
                    <h3>📈 Test Results Overview</h3>
                    <canvas id="resultsChart" width="400" height="300"></canvas>
                </div>
                <div class="chart-container">
                    <h3>🏷️ Category Distribution</h3>
                    <canvas id="categoryChart" width="400" height="300"></canvas>
                </div>
            </div>
        </div>

        <div class="progress-section">
            <h3 style="text-align: center; margin-bottom: 20px; color: #333;">📋 Category Performance</h3>
            ${Object.entries(this.summary.categories)
              .map(
                ([category, stats]) => `
                <div class="progress-item">
                    <h4>${this.getCategoryIcon(category)} ${category}</h4>
                    <p><strong>${stats.passed}/${
                  stats.total
                }</strong> tests passed</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${
                          (stats.passed / stats.total) * 100
                        }%"></div>
                    </div>
                    <p style="text-align: right; color: #666;">${(
                      (stats.passed / stats.total) *
                      100
                    ).toFixed(1)}% success rate</p>
                </div>
            `
              )
              .join("")}
        </div>

        <div class="footer">
            <p>🔄 Dashboard automatically updates with test results</p>
            <p>📧 Contact QA team for detailed technical reports</p>
        </div>
    </div>

    <script>
        // Test Results Chart
        const resultsCtx = document.getElementById('resultsChart').getContext('2d');
        new Chart(resultsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Passed', 'Failed', 'Skipped'],
                datasets: [{
                    data: [${this.summary.passed}, ${this.summary.failed}, ${
      this.summary.skipped
    }],
                    backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Category Chart
        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        new Chart(categoryCtx, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(Object.keys(this.summary.categories))},
                datasets: [{
                    label: 'Total Tests',
                    data: ${JSON.stringify(
                      Object.values(this.summary.categories).map((c) => c.total)
                    )},
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 1
                }, {
                    label: 'Passed Tests',
                    data: ${JSON.stringify(
                      Object.values(this.summary.categories).map(
                        (c) => c.passed
                      )
                    )},
                    backgroundColor: 'rgba(40, 167, 69, 0.8)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Auto-refresh every 30 seconds
        setInterval(() => {
            location.reload();
        }, 30000);
    </script>
</body>
</html>`;

    return html;
  }

  private getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      Functional: "🔧",
      "UI/UX": "🎨",
      Responsive: "📱",
      Performance: "⚡",
      Accessibility: "♿",
      "Cross-Browser": "🌐",
      Mobile: "📱",
      Desktop: "💻",
      Tablet: "📟",
    };
    return icons[category] || "📋";
  }

  saveDashboard(filename: string = "dashboard.html"): void {
    const dashboardPath = path.join(process.cwd(), "reports", filename);
    const reportDir = path.dirname(dashboardPath);

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(dashboardPath, this.generateDashboard());
    console.log(`📊 Dashboard saved to: ${dashboardPath}`);
  }
}
