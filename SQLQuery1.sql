USE FintechAppDB;

CREATE TABLE Accounts (
    Id INT PRIMARY KEY IDENTITY,
    AccountNumber NVARCHAR(50),
    Balance DECIMAL(18,2),
    InterestRate DECIMAL(5,4),
    IsActive BIT
);

CREATE TABLE Transactions (
    Id INT PRIMARY KEY IDENTITY,
    AccountId INT,
    Amount DECIMAL(18,2),
    TransactionType NVARCHAR(50),
    CreatedAt DATETIME DEFAULT GETDATE()
);

INSERT INTO Accounts (AccountNumber, Balance, InterestRate, IsActive)
VALUES
('ACC1001', 10000, 0.0500, 1),
('ACC1002', 20000, 0.0300, 1);

SELECT * FROM Accounts;
