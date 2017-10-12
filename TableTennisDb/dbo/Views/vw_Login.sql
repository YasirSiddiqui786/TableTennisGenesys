CREATE VIEW dbo.vw_Login
AS
SELECT DISTINCT EmailID AS Username, EmpPass AS [Password] FROM [dbo].Employee WITH (NOLOCK)