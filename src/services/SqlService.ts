import sql from "mssql";

const config = {
    connectionString: process.env.SqlConnectionString
};

export async function processInterest() {
    const pool = await sql.connect(config);

    const accounts = await pool.request()
        .query("SELECT * FROM Accounts WHERE IsActive = 1");

    let totalInterest = 0;

    for (const acc of accounts.recordset) {
        const dailyInterest = (acc.Balance * acc.InterestRate) / 365;

        totalInterest += dailyInterest;

        await pool.request()
            .input("balance", sql.Decimal(18,2), acc.Balance + dailyInterest)
            .input("id", sql.Int, acc.Id)
            .query("UPDATE Accounts SET Balance = @balance WHERE Id = @id");

        await pool.request()
            .input("accountId", sql.Int, acc.Id)
            .input("amount", sql.Decimal(18,2), dailyInterest)
            .query(`
                INSERT INTO Transactions (AccountId, Amount, TransactionType)
                VALUES (@accountId, @amount, 'INTEREST')
            `);
    }

    return {
        processed: accounts.recordset.length,
        totalInterest
    };
}