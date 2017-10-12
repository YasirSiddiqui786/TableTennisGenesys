CREATE PROCEDURE [dbo].[usp_GetEmployee]
(
@EmailID BIGINT
) AS
BEGIN
SET NOCOUNT ON
SELECT [EmpID],[EmpName] ,[EmailID] ,[IsOrganiser],[CreatedDate],[UpdatedDate] FROM dbo.Employee WITH (NOLOCK) WHERE EmailID= @EmailID 
END


