CREATE TABLE [dbo].[SlotStatus] (
    [TableID] INT NOT NULL,
    [SlotID]  INT NOT NULL,
    [Count]   INT NULL,
    CONSTRAINT [FK_SlotStatus_SlotChart_SlotID] FOREIGN KEY ([SlotID]) REFERENCES [dbo].[SlotChart] ([SlotID]),
    CONSTRAINT [FK_SlotStatus_TennisTable_TableID] FOREIGN KEY ([TableID]) REFERENCES [dbo].[TennisTable] ([TableID])
);

