 CREATE Procedure [dbo].[usp_GetBookedHistoryList]
 (
 @EmailID nvarchar(50)
 )
 AS BEGIN

 SET NOCOUNT ON
 DECLARE @CurrentDate DATETIME
 SET @CurrentDate=GETDATE()
 ;WITH CTE_BookedName AS
 (
SELECT DISTINCT SAO.SlotID,
  STUFF((SELECT distinct ',' + E.EmpName
         FROM dbo.SlotsAlloc AS SAI WITH (NOLOCK) 
		 INNER JOIN dbo.Employee AS E WITH (NOLOCK) ON E.EmailID= SAI.EmailID AND SAI.EmailID <> @EmailID
         WHERE SAO.SlotID = SAI.SlotID AND SAO.[Status]='Booked'
            FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)')
        ,1,1,'') EmpName
FROM dbo.SlotsAlloc AS SAO WITH (NOLOCK) 
 ) 
 SELECT SC.[Date],[Time],SA.TableID,ISNULL(SA.UpdatedDate,CreatedDate) AS UpdatedDate,EmpName AS [PlayedWith],
 CASE 
 WHEN DATEDIFF(DAY, SC.[Date], GETDATE())<=7 THEN 'LW1' 
 WHEN DATEDIFF(DAY, SC.[Date], GETDATE())<=14 THEN 'LW2' 
 WHEN DATEDIFF(DAY, SC.[Date], GETDATE())<=21 THEN 'LW3' 
 WHEN DATEDIFF(DAY, SC.[Date], GETDATE())<=28 THEN 'LW4' 
 END AS [nthLastWeek] 
 FROM [dbo].[SlotsAlloc] AS SA WITH (NOLOCK)
 INNER JOIN  [dbo].[SlotChart] AS SC WITH (NOLOCK) ON SA.SlotID= SC.SlotID 
 LEFT OUTER JOIN CTE_BookedName AS BN ON BN.SlotID=SA.SlotID
 WHERE SA.EmailID=@EmailID AND SA.[Status]='Booked'
 ORDER BY SC.[DATE] DESC,[Time] ASC
 END