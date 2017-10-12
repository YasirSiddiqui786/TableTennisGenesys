using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Security.Cryptography;

namespace TableTennis
{
    class Encrypt_Decrypt
    {
        public string Password { get; set; } //Password 
        public string PasswordKeyGeneration { get; set; } = "PasswordToGenerateKey"; // String required to generate key
        public string EncryptedPassword { get; set; }
        public string saltValue { get; set; } // avoid creation of same encrypted hash for same password
        public string hashAlgorithm { get; set; }= "SHA1"; //Using which hashing algorithm
        public int passwordIterations { get; set; } //Shuffling of bytes
        public string initVector { get; set; } //IV value
        public int keySize { get; set; } //rgb key size

        public static void Main()
        {
            Encrypt_Decrypt ObjEnc = new Encrypt_Decrypt();
            ObjEnc.Password = "234567";
            ObjEnc.saltValue = "sALtValue";
            ObjEnc.passwordIterations = 7;
            ObjEnc.initVector = "~1B2c3D4e5F6g7H8";
            ObjEnc.keySize = 256;


            Encrypt_Decrypt ObjDec = new Encrypt_Decrypt();
            ObjDec.EncryptedPassword = ObjEnc.Encrypt(ObjEnc);
            ObjDec.saltValue = "sALtValue";
            ObjDec.passwordIterations = 7;
            ObjDec.initVector = "~1B2c3D4e5F6g7H8";
            ObjDec.keySize = 256;

            String Enc = ObjEnc.Encrypt(ObjEnc);
            String Dec = ObjDec.Decrypt(ObjDec);
            Console.WriteLine("Encryted Text : '{0}'", Enc);
            Console.WriteLine("Decrypted Text : '{0}'", Dec);
            Console.ReadKey();
        }
        public string Encrypt(Encrypt_Decrypt EncDecObj)
        {
            byte[] bytes = Encoding.ASCII.GetBytes(EncDecObj.initVector);
            byte[] rgbSalt = Encoding.ASCII.GetBytes(EncDecObj.saltValue);
            byte[] buffer = Encoding.UTF8.GetBytes(EncDecObj.Password);
            byte[] rgbKey = new PasswordDeriveBytes(EncDecObj.PasswordKeyGeneration, rgbSalt, EncDecObj.hashAlgorithm, EncDecObj.passwordIterations).GetBytes(EncDecObj.keySize / 8);
            RijndaelManaged managed = new RijndaelManaged();
            managed.Mode = CipherMode.CBC;
            ICryptoTransform transform = managed.CreateEncryptor(rgbKey, bytes);
            MemoryStream stream = new MemoryStream();
            CryptoStream stream2 = new CryptoStream(stream, transform, CryptoStreamMode.Write);
            stream2.Write(buffer, 0, buffer.Length);
            stream2.FlushFinalBlock();
            byte[] inArray = stream.ToArray();
            stream.Close();
            stream2.Close();
            return Convert.ToBase64String(inArray);
        }

        public string Decrypt(Encrypt_Decrypt EncDecObj)
        {
            byte[] bytes = Encoding.ASCII.GetBytes(EncDecObj.initVector);
            byte[] rgbSalt = Encoding.ASCII.GetBytes(EncDecObj.saltValue);
            byte[] buffer = Convert.FromBase64String(EncDecObj.EncryptedPassword);
            byte[] rgbKey = new PasswordDeriveBytes(EncDecObj.PasswordKeyGeneration, rgbSalt, EncDecObj.hashAlgorithm, EncDecObj.passwordIterations).GetBytes(EncDecObj.keySize / 8);
            RijndaelManaged managed = new RijndaelManaged();
            managed.Mode = CipherMode.CBC;
            ICryptoTransform transform = managed.CreateDecryptor(rgbKey, bytes);
            MemoryStream stream = new MemoryStream(buffer);
            CryptoStream stream2 = new CryptoStream(stream, transform, CryptoStreamMode.Read);
            byte[] buffer5 = new byte[buffer.Length];
            int count = stream2.Read(buffer5, 0, buffer5.Length);
            stream.Close();
            stream2.Close();
            return Encoding.UTF8.GetString(buffer5, 0, count);
        }
    }
}