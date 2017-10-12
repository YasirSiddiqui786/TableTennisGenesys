
CREATE PROCEDURE [dbo].[usp_GetAllEmployee]
 AS
BEGIN
SET NOCOUNT ON
SELECT [EmpID],[EmpName] ,[EmailID] ,[IsOrganiser],[CreatedDate],[UpdatedDate] FROM dbo.Employee WITH (NOLOCK)
END

