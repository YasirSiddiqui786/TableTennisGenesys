CREATE PROCEDURE [dbo].[usp_RegEmployee]
(
@EmpID INT = 0,
@EmpName nvarchar(50)= '',
@EmailID nvarchar(50)= '',
@EmpPass nvarchar(50) = '',
@IsOrganiser bit =0
) AS
BEGIN
SET NOCOUNT ON
  IF NOT EXISTS (SELECT * FROM [dbo].[Employee] WITH (NOLOCK) WHERE [EmpID]=@EmpID OR [EmailID]=@EmailID)
  BEGIN
INSERT INTO [dbo].[Employee] WITH (TABLOCK) ([EmpID],[EmpName] ,[EmailID] ,[EmpPass] ,[IsOrganiser],[CreatedDate]) VALUES  (@EmpID,@EmpName,@EmailID ,@EmpPass ,@IsOrganiser,GETDATE())
SELECT 'Inserted' as result 

END
ELSE
BEGIN
SELECT 'Exist' as result
END
END

