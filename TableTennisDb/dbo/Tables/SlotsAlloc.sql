CREATE TABLE [dbo].[SlotsAlloc] (
    [SlotAllocID] INT           IDENTITY (1, 1) NOT NULL,
    [EmailID]     NVARCHAR (50) NOT NULL,
    [Status]      VARCHAR (20)  NOT NULL,
    [SlotID]      INT           NOT NULL,
    [TableID]     INT           NOT NULL,
    [CreatedDate] DATETIME      NOT NULL,
    [UpdatedDate] DATETIME      NULL,
    CONSTRAINT [PK__SlotsAllocID] PRIMARY KEY CLUSTERED ([SlotAllocID] ASC),
    CONSTRAINT [FK_Employee_SlotsAlloc_EmailID] FOREIGN KEY ([EmailID]) REFERENCES [dbo].[Employee] ([EmailID]),
    CONSTRAINT [FK_SlotChart_SlotsAlloc_SlotID] FOREIGN KEY ([SlotID]) REFERENCES [dbo].[SlotChart] ([SlotID]),
    CONSTRAINT [FK_TableTennis_SlotsAlloc_TableID] FOREIGN KEY ([TableID]) REFERENCES [dbo].[TennisTable] ([TableID])
);

