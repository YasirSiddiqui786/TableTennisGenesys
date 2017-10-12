CREATE TABLE [dbo].[HistoryRecord] (
    [EmpID]           INT           NOT NULL,
    [EmpName]         NVARCHAR (50) NOT NULL,
    [EmailID]         NVARCHAR (50) NOT NULL,
    [IsOrganiser]     DATETIME      NOT NULL,
    [CreatedDate]     DATETIME      NOT NULL,
    [UpdatedDate]     DATETIME      NOT NULL,
    [SlotID]          INT           NOT NULL,
    [Date]            DATE          NOT NULL,
    [Time]            VARCHAR (20)  NOT NULL,
    [SlotAllocID]     INT           NOT NULL,
    [Status]          VARCHAR (20)  NOT NULL,
    [TableID]         INT           NOT NULL,
    [SlotCreatedDate] DATETIME      NOT NULL,
    [SlotUpdatedDate] DATETIME      NULL
);

