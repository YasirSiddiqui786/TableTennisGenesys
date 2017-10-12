CREATE PROCEDURE [dbo].[usp_GetAvailability]
(@Date    DATE,
 @EmailID NVARCHAR(50)
)
AS
     BEGIN
         SET NOCOUNT ON;
         WITH CTE_AlreadyBooked
              AS (
              SELECT DISTINCT
                     SA.[SlotID],
                     CASE
                         WHEN SA.[Status] = 'Booked'
                         THEN 1
                         ELSE 0
                     END AS [AlreadyBooked]
              FROM [dbo].[SlotsAlloc] AS SA WITH (NOLOCK)
                   INNER JOIN [dbo].[SlotChart] AS SC WITH (NOLOCK) ON SA.SlotID = SC.SlotID
              WHERE SC.[DATE] >= CONVERT(DATE, GETDATE())
                    AND SA.EmailID = @EmailID),
              CTE_BookedName
              AS (
              SELECT DISTINCT
                     SAO.SlotID,
                     STUFF(
                          (
                              SELECT DISTINCT
                                     ','+E.EmpName
                              FROM dbo.SlotsAlloc AS SAI WITH (NOLOCK)
                                   INNER JOIN dbo.Employee AS E WITH (NOLOCK) ON E.EmailID = SAI.EmailID
                                                                                 AND SAI.EmailID <> @EmailID
                              WHERE SAO.SlotID = SAI.SlotID
                                    AND SAO.[Status] = 'Booked' FOR XML PATH(''), TYPE
                          ).value('.', 'NVARCHAR(MAX)'), 1, 1, '') EmpName
              FROM dbo.SlotsAlloc AS SAO WITH (NOLOCK) WHERE [Status]='Booked')
              SELECT SC.Date,
                     SS.[SlotID],
                     [Time],
                     4 - [Count] AS SeatsAvailable,
                     CASE
                         WHEN CONVERT(TIME, SYSDATETIME()) > SC.Time
                              AND CONVERT(DATE, GETDATE()) = SC.Date
                              AND CTE_AlreadyBooked.AlreadyBooked = 1
                         THEN 3
                         WHEN CONVERT(TIME, SYSDATETIME()) > SC.Time
                              AND CONVERT(DATE, GETDATE()) = SC.Date
                         THEN-1
                         WHEN CTE_AlreadyBooked.AlreadyBooked = 1
                         THEN 2
                         WHEN 4 - [Count] > 0
                         THEN 1
                         ELSE 0
                     END AS IsAvailable,
                     CTE_BookedName.EmpName
              FROM [dbo].[SlotStatus] AS SS WITH (NOLOCK)
                   INNER JOIN [dbo].[SlotChart] AS SC WITH (NOLOCK) ON SS.SlotID = SC.SlotID
                   LEFT OUTER JOIN CTE_BookedName ON CTE_BookedName.SlotID = SC.SlotID
                   LEFT OUTER JOIN CTE_AlreadyBooked ON CTE_AlreadyBooked.SlotID = SC.SlotID
              WHERE SC.[DATE] >= @Date
                    AND SC.[DATE] < DATEADD(d, 7, @Date)
              ORDER BY SC.Date,
                       [Time] ASC;
     END;
