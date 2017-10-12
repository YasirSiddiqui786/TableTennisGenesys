CREATE TABLE [dbo].[Employee] (
    [EmpID]                INT           NOT NULL,
    [EmpName]              NVARCHAR (50) NOT NULL,
    [EmailID]              NVARCHAR (50) NOT NULL,
    [IsOrganiser]          BIT           NULL,
    [CreatedDate]          DATETIME      NOT NULL,
    [UpdatedDate]          DATETIME      NULL,
    [EmpPass]              NVARCHAR (50) NOT NULL,
    [OTP]                  NVARCHAR (64) NULL,
    [OTPGeneratedDateTime] DATETIME      NULL,
    CONSTRAINT [PK_EMPLOYEE_EmailID] PRIMARY KEY CLUSTERED ([EmailID] ASC),
    CONSTRAINT [Unique_EmailID] UNIQUE NONCLUSTERED ([EmailID] ASC)
);

