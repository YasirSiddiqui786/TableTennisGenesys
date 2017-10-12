CREATE TABLE [dbo].[SlotChart] (
    [SlotID] INT          IDENTITY (1, 1) NOT NULL,
    [Date]   DATE         NOT NULL,
    [Time]   VARCHAR (20) NOT NULL,
    PRIMARY KEY CLUSTERED ([SlotID] ASC)
);

