CREATE PROCEDURE [dbo].[usp_UpdateSlot]
 (@BookingSlotID NVARCHAR(100) --Comma Delim string of BookingSlotID
 ,
 @CancellationSlotID  NVARCHAR(100) --Comma Delim string of CancellationSlotID
 ,
 @EmailID NVARCHAR(50)

 )
 AS
 BEGIN
 SET NOCOUNT ON

 IF (ISNULL(@BookingSlotID,'')<>'')
 BEGIN
 EXEC [dbo].[usp_BookSlot] @BookingSlotID , @EmailID


 END
IF (ISNULL(@CancellationSlotID,'')<>'')
 BEGIN
 EXEC [dbo].[usp_CancelBookSlot] @CancellationSlotID,@EmailID

 END
 END
