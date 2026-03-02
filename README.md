# 💳 Azure FinTech Interest Engine

A serverless batch-processing system built with **Azure Functions (TypeScript)** that simulates a real-world banking interest accrual engine.

This project demonstrates how financial institutions calculate and apply daily interest to savings accounts using cloud-native Azure services.

---

## 📌 Overview

This solution implements a **time-triggered Azure Function** that:

1. Runs automatically on a schedule (CRON-based Timer Trigger)
2. Reads active accounts from Azure SQL
3. Calculates daily interest
4. Updates account balances
5. Records transactions
6. Stores execution audit logs in Azure Blob Storage

The architecture follows serverless best practices and aligns with **AZ-204 Azure Developer Associate** objectives.

---

## 🏗 Architecture
Timer Trigger (CRON)
↓
Azure Function (TypeScript - v4 model)
↓
Azure SQL Database
↓
Azure Blob Storage (Audit Logs)

---


### Inbound
- Timer Trigger (scheduled execution)

### Outbound
- Azure SQL Database (data persistence)
- Azure Blob Storage (audit logging)

---

## ⚙️ Tech Stack

- Azure Functions v4
- TypeScript
- Azure SQL Database
- Azure Blob Storage
- Azurite (local storage emulator)
- node-mssql
- @azure/storage-blob SDK

---

## 🧠 Business Logic

For each active savings account:  dailyInterest = (Balance × InterestRate) / 365

---


The function:

- Updates the account balance
- Inserts a transaction record
- Generates a JSON audit file
- Uploads audit file to Blob Storage

### Example Audit Output

```json
{
  "processedAccounts": 2,
  "totalInterestPaid": 12.45,
  "executionTime": "2026-03-01T00:00:00Z"
}
```
🗄 Database Schema
Accounts
| Column        | Type          |
| ------------- | ------------- |
| Id            | INT (PK)      |
| AccountNumber | NVARCHAR(50)  |
| Balance       | DECIMAL(18,2) |
| InterestRate  | DECIMAL(5,4)  |
| IsActive      | BIT           |

Transactions
| Column          | Type          |
| --------------- | ------------- |
| Id              | INT (PK)      |
| AccountId       | INT           |
| Amount          | DECIMAL(18,2) |
| TransactionType | NVARCHAR(50)  |
| CreatedAt       | DATETIME      |

---

🧩 Project Structure
azure-fintech-interest-engine/
│
├── src/
│   ├── functions/
│   │   └── dailyInterest.ts
│   ├── services/
│   │   ├── sqlService.ts
│   │   └── storageService.ts
│
├── host.json
├── local.settings.json (not committed)
├── package.json
└── README.md

---

🚀 Local Development
1️⃣ Install dependencies
npm install
2️⃣ Start Azurite (local storage emulator)
azurite
3️⃣ Configure local.settings.json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "SqlConnectionString": "<your-sql-connection>",
    "BlobConnectionString": "UseDevelopmentStorage=true"
  }
}
4️⃣ Start the Function
func start

---

🏛 Serverless Design Principles Applied

✔ Stateless execution
✔ Environment-based configuration
✔ Separation of concerns (Function → Service Layer)
✔ Externalized data storage
✔ Structured logging
✔ CRON-based scheduling
