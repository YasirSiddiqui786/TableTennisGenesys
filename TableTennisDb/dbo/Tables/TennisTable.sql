CREATE TABLE [dbo].[TennisTable] (
    [TableID]    INT           NOT NULL,
    [TableArena] NVARCHAR (20) NULL,
    CONSTRAINT [PK_TennisTable_TableID] PRIMARY KEY CLUSTERED ([TableID] ASC)
);

