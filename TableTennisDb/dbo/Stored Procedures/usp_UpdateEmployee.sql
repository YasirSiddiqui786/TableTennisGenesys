CREATE PROCEDURE [dbo].[usp_UpdateEmployee]
(
@EmpID INT = 0,
@EmpName nvarchar(50)= '',
@EmailID nvarchar(50)= '',
@EmpPass nvarchar(50) = '',
@IsOrganiser bit =0
) AS
BEGIN
SET NOCOUNT ON
  IF EXISTS (SELECT * FROM [dbo].[Employee] WITH (NOLOCK) WHERE [EmailID]=@EmailID)
  BEGIN
UPDATE [dbo].[Employee] WITH (TABLOCK) SET [EmpPass]=@EmpPass,[UpdatedDate]=GETDATE() WHERE [EmailID]=@EmailID
SELECT 'Updated' as result 

END
ELSE
BEGIN
SELECT 'Not Updated' as result
END
END

