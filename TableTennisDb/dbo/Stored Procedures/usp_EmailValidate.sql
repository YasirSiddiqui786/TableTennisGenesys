CREATE PROCEDURE [dbo].[usp_EmailValidate]
(
@EmailID nvarchar(50)
) AS
BEGIN
SET NOCOUNT ON
SELECT CASE WHEN EXISTS (
SELECT EmailID FROM [dbo].[Employee] WITH (NOLOCK) WHERE EmailID=@EmailID
) THEN 'Email Exist'
ELSE 'Email Does Not Exist' End as Outcome
END