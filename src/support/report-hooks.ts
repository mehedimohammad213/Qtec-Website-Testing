import {
  After,
  AfterAll,
  BeforeAll,
  ITestCaseHookParameter,
} from "@cucumber/cucumber";
import { ReportGenerator, TestResult } from "../utils/ReportGenerator";
import * as fs from "fs";
import * as path from "path";

let reportGenerator = new ReportGenerator();
let testStartTime: number = 0;

// Global test tracking
const testResults: Map<string, TestResult> = new Map();

BeforeAll(async function () {
  console.log("🚀 Starting QTEC Website Testing Suite...");
  console.log("📊 Report generation enabled");
});

After(async function (scenario: ITestCaseHookParameter) {
  const scenarioName = scenario.pickle.name;
  const duration = Date.now() - testStartTime;

  // Determine test category based on tags
  const tags = scenario.pickle.tags.map((tag) => tag.name);
  const category = getCategoryFromTags(tags);
  const priority = getPriorityFromTags(tags);

  // Determine test status
  let status: "PASSED" | "FAILED" | "SKIPPED" = "PASSED";
  let error: string | undefined;

  if (scenario.result?.status === "PASSED") {
    status = "PASSED";
  } else if (scenario.result?.status === "FAILED") {
    status = "FAILED";
    error = scenario.result?.message || "Test failed";
  } else if (scenario.result?.status === "SKIPPED") {
    status = "SKIPPED";
  }

  // Create test result
  const testResult: TestResult = {
    name: scenarioName,
    status,
    duration,
    error,
    category,
    priority,
    description: getTestDescription(scenarioName, category),
  };

  // Add to report generator
  reportGenerator.addResult(testResult);

  // Log result
  const statusIcon =
    status === "PASSED" ? "✅" : status === "FAILED" ? "❌" : "⏭️";
  console.log(
    `${statusIcon} ${scenarioName} (${category}) - ${status} in ${duration}ms`
  );

  if (error) {
    console.log(`   Error: ${error}`);
  }
});

AfterAll(async function () {
  console.log("\n📊 Generating comprehensive reports...");

  // Generate and save client report
  reportGenerator.saveReport("qtec-client-report.html");

  // Generate executive summary
  const executiveSummary = reportGenerator.generateExecutiveSummary();
  const summaryPath = path.join(
    process.cwd(),
    "reports",
    "executive-summary.md"
  );
  const reportDir = path.dirname(summaryPath);

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  fs.writeFileSync(summaryPath, executiveSummary);
  console.log(`📋 Executive summary saved to: ${summaryPath}`);

  // Generate JSON report for programmatic access
  const summary = reportGenerator.generateSummary();
  const jsonReport = {
    summary,
    generatedAt: new Date().toISOString(),
    metadata: {
      project: "QTEC Website Testing",
      version: "1.0.0",
      framework: "Playwright + Cucumber",
    },
  };

  const jsonPath = path.join(process.cwd(), "reports", "test-summary.json");
  fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2));
  console.log(`📄 JSON report saved to: ${jsonPath}`);

  // Print final summary to console
  console.log("\n🎯 TEST EXECUTION SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total Tests: ${summary.total}`);
  console.log(`Passed: ${summary.passed} ✅`);
  console.log(`Failed: ${summary.failed} ❌`);
  console.log(`Skipped: ${summary.skipped} ⏭️`);
  console.log(`Success Rate: ${summary.successRate.toFixed(1)}%`);
  console.log(`Total Duration: ${formatDuration(summary.duration)}`);
  console.log("=".repeat(50));

  if (summary.failed > 0) {
    console.log("\n🚨 FAILED TESTS:");
    const failedTests = Array.from(testResults.values()).filter(
      (t) => t.status === "FAILED"
    );
    failedTests.forEach((test) => {
      console.log(`❌ ${test.name} (${test.category})`);
      if (test.error) {
        console.log(`   Error: ${test.error}`);
      }
    });
  }

  console.log("\n📊 Reports generated successfully!");
  console.log('📁 Check the "reports" folder for detailed reports');
  console.log(
    '🌐 Open "reports/qtec-client-report.html" for a user-friendly view'
  );
});

function getCategoryFromTags(tags: string[]): string {
  const categoryMap: { [key: string]: string } = {
    "@functional": "Functional",
    "@ui-ux": "UI/UX",
    "@responsive": "Responsive",
    "@performance": "Performance",
    "@accessibility": "Accessibility",
    "@cross-browser": "Cross-Browser",
    "@mobile": "Mobile",
    "@desktop": "Desktop",
    "@tablet": "Tablet",
  };

  for (const tag of tags) {
    if (categoryMap[tag]) {
      return categoryMap[tag];
    }
  }

  return "General";
}

function getPriorityFromTags(tags: string[]): "HIGH" | "MEDIUM" | "LOW" {
  if (tags.includes("@critical") || tags.includes("@high")) {
    return "HIGH";
  } else if (tags.includes("@medium")) {
    return "MEDIUM";
  } else if (tags.includes("@low")) {
    return "LOW";
  }

  // Default priority based on test type
  const criticalTests = ["@functional", "@performance"];
  const mediumTests = ["@ui-ux", "@responsive", "@accessibility"];

  for (const tag of tags) {
    if (criticalTests.includes(tag)) {
      return "HIGH";
    } else if (mediumTests.includes(tag)) {
      return "MEDIUM";
    }
  }

  return "MEDIUM";
}

function getTestDescription(testName: string, category: string): string {
  const descriptions: { [key: string]: string } = {
    Functional: "Verifies core website functionality and user workflows",
    "UI/UX": "Tests user interface design and user experience elements",
    Responsive: "Ensures website works correctly across different screen sizes",
    Performance: "Validates website loading speed and performance metrics",
    Accessibility: "Checks website accessibility compliance and usability",
    "Cross-Browser": "Tests website compatibility across different browsers",
    Mobile: "Validates mobile-specific functionality and responsive design",
    Desktop: "Tests desktop-specific features and layout",
    Tablet: "Ensures proper functionality on tablet devices",
  };

  return descriptions[category] || "General website testing";
}

function formatDuration(ms: number): string {
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
