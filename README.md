# Password manager

## What in
* Various hashing and encryption strategies
* How password managers work
* Basic React.js
* Basic TypeScript

## Hashing vs encryption
* Hashing is one way - Hashed data can not be unhashed, it can simply be hashed again and compared.
* Encryption is two way - Encrypted data can be decrypted if you know the correct string/ key.

## Algorithms used
* SHA256 - Predictable password hash
* Argon2 - Unpredictable password hash for the database
* pbkdf2 - Generate the vault key
* AES256 - Encrypt and decrypt the vault