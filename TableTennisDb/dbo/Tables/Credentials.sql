CREATE TABLE [dbo].[Credentials] (
    [EmpName]  NVARCHAR (50)  NOT NULL,
    [EmailID]  NVARCHAR (50)  NOT NULL,
    [Password] NVARCHAR (100) NOT NULL,
    CONSTRAINT [PK_tbl_Credentials] PRIMARY KEY CLUSTERED ([EmailID] ASC)
);

