import { app } from "@azure/functions";
import { processInterest } from "../services/SqlService";
import { uploadAuditLog } from "../services/StorageService";

app.timer("dailyInterest", {
    schedule: "0 */1 * * * *", // every 1 minute for testing
    handler: async (myTimer, context) => {

        context.log("Starting interest calculation...");

        try {
            const result = await processInterest();

            await uploadAuditLog({
                processedAccounts: result.processed,
                totalInterestPaid: result.totalInterest,
                executionTime: new Date().toISOString()
            });

            context.log("Interest processed successfully.");
        } catch (error) {
            context.log("Error:", error);
        }
    }
});