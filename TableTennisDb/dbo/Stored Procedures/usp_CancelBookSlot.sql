
 CREATE Procedure [dbo].[usp_CancelBookSlot]
 (@SlotID VARCHAR(100)
 ,
 @EmailID NVARCHAR(50)
 )
 AS
 BEGIN
 SET NOCOUNT ON

--CREATE TEMP TABLE TO INSERTING COMMA SEPARATED VALUES
CREATE TABLE #IDS (inpSlotID INT)

--Populating the Table with SlotID's in inpSLot column
DECLARE @sql VARCHAR(8000)
SELECT @sql='INSERT INTO #IDS SELECT '+ REPLACE(@SlotID,',',' UNION ALL SELECT ')
EXEC (@SQL)

--Updating the Status as cancelled for all the provided slots
 UPDATE [dbo].[SlotsAlloc] WITH (TABLOCK) SET [Status]='Cancelled' , [UpdatedDate]=GETDATE() WHERE SlotID IN (SELECT inpSlotID FROM #IDS) AND  EmailID=@EmailID
 BEGIN
 IF EXISTS (SELECT * FROM [dbo].[SlotStatus] WHERE SlotID IN (SELECT inpSlotID FROM #IDS))
 BEGIN
 UPDATE [dbo].[SlotStatus] WITH (TABLOCK) SET Count=Count-1 WHERE SlotID IN (SELECT inpSlotID FROM #IDS)
 END
 ELSE
 INSERT INTO [dbo].[SlotStatus] WITH (TABLOCK) VALUES (1,@SlotID,0)
 DROP TABLE #IDS
 SELECT 'Cancelled' AS [STATUS]
 END
 END