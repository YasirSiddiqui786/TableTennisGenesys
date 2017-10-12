CREATE PROCEDURE [dbo].[usp_LoginValidate]
(
@EmailID nvarchar(50)
,@EmpPass nvarchar(50)
) AS
BEGIN
SET NOCOUNT ON
DECLARE @EmpName VARCHAR(50)
SELECT @EmpName=EmpName FROM [dbo].[Employee] WITH (NOLOCK) WHERE EmailID=@EmailID

SELECT CASE WHEN EXISTS (
    SELECT *
    FROM vw_LoginDetails WITH (NOLOCK) 
    WHERE EmailID = @EmailID AND EmpPass =@EmpPass
)
THEN 'Match:'+@EmpName
WHEN EXISTS (
    SELECT *
    FROM vw_LoginDetails WITH (NOLOCK) 
    WHERE EmailID = @EmailID AND EmpPass <> @EmpPass
)
THEN 'Incorrect Password'
ELSE 'Invalid EmailID' END as Outcome
END