export function generateUniqueWorkflows(count) {
    const names = [
        "Data Integration", "API Gateway", "Log Analysis", "Job Scheduling", "Image Processing",
        "Video Encoding", "Search Indexing", "A/B Testing", "Deployment Pipeline", "Feature Flagging",
        "Chatbot Integration", "Social Media Monitoring", "Fraud Detection", "Recommendation Engine", "Data Visualization",
        "Performance Monitoring", "Resource Allocation", "Configuration Management", "Security Auditing", "Event Tracking",
        "User Onboarding", "Survey Analysis", "Localization Service", "Code Review", "Release Management",
        "Data Migration", "Billing System", "Content Delivery", "Knowledge Base", "Error Reporting",
        "Health Check", "Analytics Dashboard", "Push Notifications", "File Conversion", "Data Validation",
        "Access Control", "Message Queue", "Data Warehousing", "Sentiment Analysis", "Document Generation",
        "Resource Monitoring", "Database Optimization", "Test Automation", "Data Cleansing", "Alerting System",
        "Service Discovery", "Data Encryption", "Compliance Reporting", "Backup Verification", "API Documentation"
    ];

    const descriptions = [
        "Automates data flow between systems.",
        "Manages API requests and responses.",
        "Analyzes system logs for errors.",
        "Schedules and executes recurring tasks.",
        "Processes and manipulates image data.",
        "Encodes video files for various formats.",
        "Builds and maintains search indexes.",
        "Runs A/B tests to optimize user experience.",
        "Automates software deployment processes.",
        "Manages feature flags for controlled releases.",
        "Integrates chatbot functionality into applications.",
        "Monitors social media for brand mentions.",
        "Detects and prevents fraudulent activities.",
        "Provides personalized recommendations to users.",
        "Visualizes data for better understanding.",
        "Monitors system performance metrics.",
        "Allocates resources efficiently.",
        "Manages system configurations.",
        "Audits system security for vulnerabilities.",
        "Tracks and analyzes user events.",
        "Guides new users through the onboarding process.",
        "Analyzes survey data for insights.",
        "Provides localization services for multilingual applications.",
        "Facilitates code review process.",
        "Manages software release cycles.",
        "Migrates data between different systems.",
        "Manages billing and invoicing processes.",
        "Delivers content to users efficiently.",
        "Maintains a knowledge base for users.",
        "Reports and tracks system errors.",
        "Performs system health checks.",
        "Provides an analytics dashboard for data visualization.",
        "Sends push notifications to users.",
        "Converts files between different formats.",
        "Validates data for consistency.",
        "Manages user access control.",
        "Manages message queues for asynchronous communication.",
        "Builds and maintains data warehouses.",
        "Analyzes sentiment in text data.",
        "Generates documents from templates.",
        "Monitors resource utilization.",
        "Optimizes database performance.",
        "Automates software testing.",
        "Cleanses and transforms data.",
        "Alerts administrators of system issues.",
        "Enables service discovery in distributed systems.",
        "Encrypts sensitive data.",
        "Generates compliance reports.",
        "Verifies data backups.",
        "Creates and maintains API documentation."
    ];

    // Shuffle arrays to ensure randomness
    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
    const shuffledNames = shuffleArray([...names]).slice(0, count);
    const shuffledDescriptions = shuffleArray([...descriptions]);

    // Generate workflows
    const workflows = shuffledNames.map((name, index) => ({
        id: index + 1, // Ensures unique IDs
        name,
        lastEdited: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString().split("T")[0],
        description: shuffledDescriptions[index % shuffledDescriptions.length],
    }));

    // Sort workflows by most recent lastEdited date
    workflows.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));

    return workflows;
}
