
 CREATE PROCEDURE [dbo].[usp_BookSlot]
 (@SlotID NVARCHAR(100)  --Comma Delim string of SlotIDs
 ,
 @EmailID NVARCHAR(50)
 )
 AS
 BEGIN
 SET NOCOUNT ON


 --create temp table to test inserting values into
CREATE TABLE #IDS (inpSlotID INT)

-- Create insert for comma delimited values

DECLARE @sql VARCHAR(8000)
SELECT @sql='INSERT INTO #IDS SELECT '+ REPLACE(@SlotID,',',' UNION ALL SELECT ')
EXEC (@SQL)

--Remove the already booked slot id from the set of input {Reving this method as it is being handled from front end}
--DELETE FROM #IDS WHERE inpSlotID IN (SELECT DISTINCT SlotID FROM dbo.SlotsAlloc WHERE [Status]='Booked' AND EmailID=@EmailID)

--Get the Slots which were cancelled earlier but now trying to book again
SELECT SlotID,EmailID INTO #CancelledBooking FROM SlotsAlloc SA JOIN #IDS AS InpSlots ON SA.SlotID=InpSlots.inpSlotID AND [Status]='Cancelled' AND SA.EmailID=@EmailID

--Updating the record from cancelled to booked
IF EXISTS(SELECT TOP 1 SlotID From #CancelledBooking)
BEGIN
UPDATE [dbo].[SlotStatus] WITH (TABLOCK) SET Count=Count+1 WHERE SlotID IN (SELECT SlotID FROM #CancelledBooking)
UPDATE [dbo].[SlotsAlloc] WITH (TABLOCK) SET [Status]='Booked', [UpdatedDate]=GETDATE() 
	WHERE SlotID IN (SELECT DISTINCT SlotID FROM #CancelledBooking) AND EmailID IN (SELECT DISTINCT EmailID FROM #CancelledBooking)
END
-- Add booking as fresh
 IF NOT EXISTS (SELECT EmailID FROM dbo.SlotsAlloc WITH (NOLOCK) WHERE EmailID=@EmailID AND SlotID IN (SELECT inpSlotID FROM #IDS))
 BEGIN
  INSERT INTO [dbo].[SlotsAlloc] (TableID,SlotID,EmailID,[Status],CreatedDate)
		SELECT 1 AS [TableID],inpSlotID AS [SlotID],@EmailID AS [EmailID],'Booked' AS [Status],GETDATE() AS CreatedDate FROM #IDS
  UPDATE [dbo].[SlotStatus] WITH (TABLOCK) SET Count=Count+1 WHERE SlotID IN (SELECT * FROM #IDS) 

END		
DROP TABLE #IDS
DROP TABLE #CancelledBooking
SELECT 'Booked' AS STATUS

 END
