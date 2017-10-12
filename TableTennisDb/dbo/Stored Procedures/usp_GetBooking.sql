 CREATE Procedure [dbo].[usp_GetBooking]
 (
 @EmailID nvarchar(50)
 )
 AS BEGIN
 SET NOCOUNT ON
 SELECT DISTINCT SC.Date
 FROM [dbo].[SlotsAlloc] AS SA WITH (NOLOCK)
 INNER JOIN  [dbo].[SlotChart] AS SC WITH (NOLOCK) ON SA.SlotID= SC.SlotID  AND [Status]='Booked'
 
 WHERE SC.[DATE] >= CONVERT(date,GETDATE())  AND SA.EmailID=@EmailID
 ORDER BY SC.Date ASC
 END
