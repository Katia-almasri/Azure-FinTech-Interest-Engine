import { BlobServiceClient } from "@azure/storage-blob";

export async function uploadAuditLog(data: any) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.BlobConnectionString!
    );

    const containerClient = blobServiceClient.getContainerClient("auditlogs");
    await containerClient.createIfNotExists();

    const blobName = `audit-${new Date().toISOString()}.json`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(
        JSON.stringify(data),
        Buffer.byteLength(JSON.stringify(data))
    );
}