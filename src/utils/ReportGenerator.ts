import * as fs from "fs";
import * as path from "path";

export interface TestResult {
  name: string;
  status: "PASSED" | "FAILED" | "SKIPPED";
  duration: number;
  error?: string;
  category: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  description: string;
  screenshot?: string;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  successRate: number;
  categories: {
    [key: string]: { total: number; passed: number; failed: number };
  };
  priorities: {
    [key: string]: { total: number; passed: number; failed: number };
  };
}

export class ReportGenerator {
  private results: TestResult[] = [];
  private startTime: Date = new Date();

  addResult(result: TestResult): void {
    this.results.push(result);
  }

  generateSummary(): TestSummary {
    const total = this.results.length;
    const passed = this.results.filter((r) => r.status === "PASSED").length;
    const failed = this.results.filter((r) => r.status === "FAILED").length;
    const skipped = this.results.filter((r) => r.status === "SKIPPED").length;
    const duration = this.results.reduce((sum, r) => sum + r.duration, 0);
    const successRate = total > 0 ? (passed / total) * 100 : 0;

    const categories: {
      [key: string]: { total: number; passed: number; failed: number };
    } = {};
    const priorities: {
      [key: string]: { total: number; passed: number; failed: number };
    } = {};

    this.results.forEach((result) => {
      // Category statistics
      if (!categories[result.category]) {
        categories[result.category] = { total: 0, passed: 0, failed: 0 };
      }
      categories[result.category].total++;
      if (result.status === "PASSED") categories[result.category].passed++;
      if (result.status === "FAILED") categories[result.category].failed++;

      // Priority statistics
      if (!priorities[result.priority]) {
        priorities[result.priority] = { total: 0, passed: 0, failed: 0 };
      }
      priorities[result.priority].total++;
      if (result.status === "PASSED") priorities[result.priority].passed++;
      if (result.status === "FAILED") priorities[result.priority].failed++;
    });

    return {
      total,
      passed,
      failed,
      skipped,
      duration,
      successRate,
      categories,
      priorities,
    };
  }

  generateClientReport(): string {
    const summary = this.generateSummary();
    const endTime = new Date();
    const totalDuration = endTime.getTime() - this.startTime.getTime();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QTEC Website Testing Report - Client Summary</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
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

        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .card.success {
            border-left: 5px solid #28a745;
        }

        .card.warning {
            border-left: 5px solid #ffc107;
        }

        .card.danger {
            border-left: 5px solid #dc3545;
        }

        .card.info {
            border-left: 5px solid #17a2b8;
        }

        .card h3 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #333;
        }

        .card p {
            color: #666;
            font-size: 1.1em;
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

        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .status-passed { background-color: #28a745; }
        .status-failed { background-color: #dc3545; }
        .status-skipped { background-color: #ffc107; }

        .section {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .section h2 {
            color: #333;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f0f0;
        }

        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }

        .category-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }

        .category-item h4 {
            color: #333;
            margin-bottom: 10px;
        }

        .test-list {
            list-style: none;
        }

        .test-item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }

        .test-item:last-child {
            border-bottom: none;
        }

        .test-name {
            font-weight: 500;
            margin-bottom: 5px;
        }

        .test-description {
            color: #666;
            font-size: 0.9em;
        }

        .priority-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: bold;
            margin-left: 10px;
        }

        .priority-high { background-color: #dc3545; color: white; }
        .priority-medium { background-color: #ffc107; color: #333; }
        .priority-low { background-color: #28a745; color: white; }

        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            background: white;
            border-radius: 10px;
            margin-top: 30px;
        }

        @media (max-width: 768px) {
            .summary-cards {
                grid-template-columns: 1fr;
            }

            .category-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 QTEC Website Testing Report</h1>
            <p>Comprehensive Quality Assurance Summary</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div class="summary-cards">
            <div class="card success">
                <h3>${summary.passed}</h3>
                <p>✅ Tests Passed</p>
            </div>
            <div class="card danger">
                <h3>${summary.failed}</h3>
                <p>❌ Tests Failed</p>
            </div>
            <div class="card info">
                <h3>${summary.total}</h3>
                <p>📊 Total Tests</p>
            </div>
            <div class="card warning">
                <h3>${summary.successRate.toFixed(1)}%</h3>
                <p>🎯 Success Rate</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${
                      summary.successRate
                    }%"></div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>📈 Overall Performance</h2>
            <div class="category-grid">
                <div class="category-item">
                    <h4>⏱️ Test Duration</h4>
                    <p><strong>Total Time:</strong> ${this.formatDuration(
                      summary.duration
                    )}</p>
                    <p><strong>Average per Test:</strong> ${this.formatDuration(
                      summary.duration / summary.total
                    )}</p>
                </div>
                <div class="category-item">
                    <h4>📅 Execution Time</h4>
                    <p><strong>Started:</strong> ${this.startTime.toLocaleString()}</p>
                    <p><strong>Completed:</strong> ${endTime.toLocaleString()}</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>🏷️ Test Categories</h2>
            <div class="category-grid">
                ${Object.entries(summary.categories)
                  .map(
                    ([category, stats]) => `
                    <div class="category-item">
                        <h4>${this.getCategoryIcon(category)} ${category}</h4>
                        <p><strong>Total:</strong> ${
                          stats.total
                        } | <strong>Passed:</strong> ${
                      stats.passed
                    } | <strong>Failed:</strong> ${stats.failed}</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${
                              (stats.passed / stats.total) * 100
                            }%"></div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>

        <div class="section">
            <h2>⚡ Priority Breakdown</h2>
            <div class="category-grid">
                ${Object.entries(summary.priorities)
                  .map(
                    ([priority, stats]) => `
                    <div class="category-item">
                        <h4>${this.getPriorityIcon(
                          priority
                        )} ${priority} Priority</h4>
                        <p><strong>Total:</strong> ${
                          stats.total
                        } | <strong>Passed:</strong> ${
                      stats.passed
                    } | <strong>Failed:</strong> ${stats.failed}</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${
                              (stats.passed / stats.total) * 100
                            }%"></div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>

        <div class="section">
            <h2>🔍 Detailed Test Results</h2>
            <div class="category-grid">
                ${this.groupTestsByCategory()
                  .map(
                    (group) => `
                    <div class="category-item">
                        <h4>${this.getCategoryIcon(group.category)} ${
                      group.category
                    }</h4>
                        <ul class="test-list">
                            ${group.tests
                              .map(
                                (test) => `
                                <li class="test-item">
                                    <div class="test-name">
                                        <span class="status-indicator status-${test.status.toLowerCase()}"></span>
                                        ${test.name}
                                        <span class="priority-badge priority-${test.priority.toLowerCase()}">${
                                  test.priority
                                }</span>
                                    </div>
                                    <div class="test-description">${
                                      test.description
                                    }</div>
                                    ${
                                      test.error
                                        ? `<div style="color: #dc3545; font-size: 0.8em; margin-top: 5px;">Error: ${test.error}</div>`
                                        : ""
                                    }
                                </li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>

        <div class="footer">
            <p>📧 For technical details, please contact the QA team</p>
            <p>🔄 This report was automatically generated by the QTEC Testing Framework</p>
        </div>
    </div>
</body>
</html>`;

    return html;
  }

  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
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

  private getPriorityIcon(priority: string): string {
    const icons: { [key: string]: string } = {
      HIGH: "🔴",
      MEDIUM: "🟡",
      LOW: "🟢",
    };
    return icons[priority] || "⚪";
  }

  private groupTestsByCategory(): Array<{
    category: string;
    tests: TestResult[];
  }> {
    const groups: { [key: string]: TestResult[] } = {};

    this.results.forEach((result) => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });

    return Object.entries(groups).map(([category, tests]) => ({
      category,
      tests,
    }));
  }

  saveReport(filename: string = "client-report.html"): void {
    const reportPath = path.join(process.cwd(), "reports", filename);
    const reportDir = path.dirname(reportPath);

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, this.generateClientReport());
    console.log(`📊 Client report saved to: ${reportPath}`);
  }

  generateExecutiveSummary(): string {
    const summary = this.generateSummary();

    return `
# QTEC Website Testing - Executive Summary

## 📊 Key Metrics
- **Total Tests Executed:** ${summary.total}
- **Success Rate:** ${summary.successRate.toFixed(1)}%
- **Tests Passed:** ${summary.passed}
- **Tests Failed:** ${summary.failed}
- **Tests Skipped:** ${summary.skipped}
- **Total Duration:** ${this.formatDuration(summary.duration)}

## 🎯 Overall Assessment
${this.getOverallAssessment(summary)}

## 🚨 Critical Issues
${this.getCriticalIssues()}

## ✅ What's Working Well
${this.getWorkingFeatures()}

## 📋 Recommendations
${this.getRecommendations(summary)}

## 📈 Category Performance
${Object.entries(summary.categories)
  .map(
    ([category, stats]) =>
      `- **${category}:** ${stats.passed}/${stats.total} passed (${(
        (stats.passed / stats.total) *
        100
      ).toFixed(1)}%)`
  )
  .join("\n")}

---
*Report generated on ${new Date().toLocaleString()}*
`;
  }

  private getOverallAssessment(summary: TestSummary): string {
    if (summary.successRate >= 95) {
      return "🟢 **EXCELLENT** - The website is performing exceptionally well with minimal issues.";
    } else if (summary.successRate >= 85) {
      return "🟡 **GOOD** - The website is generally working well with some minor issues to address.";
    } else if (summary.successRate >= 70) {
      return "🟠 **FAIR** - The website has several issues that need attention before launch.";
    } else {
      return "🔴 **POOR** - The website has significant issues that require immediate attention.";
    }
  }

  private getCriticalIssues(): string {
    const failedTests = this.results.filter(
      (r) => r.status === "FAILED" && r.priority === "HIGH"
    );

    if (failedTests.length === 0) {
      return "✅ No critical issues found.";
    }

    return failedTests
      .map(
        (test) =>
          `- **${test.name}:** ${test.description}${
            test.error ? ` (Error: ${test.error})` : ""
          }`
      )
      .join("\n");
  }

  private getWorkingFeatures(): string {
    const passedTests = this.results.filter((r) => r.status === "PASSED");
    const categories = [...new Set(passedTests.map((t) => t.category))];

    return categories
      .map(
        (category) =>
          `- **${category}:** All core functionality working correctly`
      )
      .join("\n");
  }

  private getRecommendations(summary: TestSummary): string {
    const recommendations = [];

    if (summary.successRate < 95) {
      recommendations.push(
        "🔧 **Immediate Action Required:** Address failed tests before production deployment"
      );
    }

    if (summary.failed > 0) {
      recommendations.push(
        "📋 **Review Failed Tests:** Investigate and fix all failed test cases"
      );
    }

    if (summary.skipped > 0) {
      recommendations.push(
        "⏭️ **Complete Skipped Tests:** Run skipped tests to ensure full coverage"
      );
    }

    if (summary.duration > 300000) {
      // 5 minutes
      recommendations.push(
        "⚡ **Performance Optimization:** Consider optimizing slow-running tests"
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "✅ **Ready for Production:** All tests passing, website is ready for launch"
      );
    }

    return recommendations.join("\n");
  }
}
