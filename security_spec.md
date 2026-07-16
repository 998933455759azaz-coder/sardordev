# Zero-Trust Security Specification (TDD)

## 1. Data Invariants
- **Message Integrity**: A message cannot be updated once written. The `createdAt` timestamp must match the exact server-side request time.
- **Access Privilege**: Only the authorized host administrator (`tuyginovsardor@gmail.com`) is allowed to read, download, or delete submitted CRM contact data.
- **Resource Limits**: No message input is allowed to exceed strict boundaries (`name` <= 100 chars, `text` <= 1000 chars) to prevent Denial of Wallet resources attacks.

## 2. Security Payloads ("Dirty Dozen")
1. **Unauthenticated Read**: Attempt to read list of messages as Guest.
2. **Identity Spoofing Admin**: A normal user claiming to be an admin by writing their own admin role document.
3. **Invalid Email Creation**: Sending a contact message with no email field.
4. **Oversized Name Field**: Sending a message with a 10MB string name to crash storage.
5. **Client Timestamp Forgery**: Sending a message with a future or past timestamp.
6. **Self-Modification of Messages**: Trying to update an existing contact record.
7. **Document ID Poisoning**: Ingressing a message with an extremely long, illegal path variable.
8. **PII Leakage Query**: Normal user query scraping other user's records.
9. **Malicious Admin Deletion**: A non-verified email user attempting to delete a CRM message.
10. **Admin Privilege Escalation**: A normal authenticated user writing directly to the `/admins/` collection.
11. **Guest Deletion**: Guest trying to purge database docs.
12. **System Log Injection**: Unauthenticated user trying to spoof server logs.

## 3. Red Team Validation Report
- **Identity Spoofing**: REJECTED.
- **State Shortcutting**: REJECTED.
- **Resource Poisoning**: REJECTED.
- **Vulnerabilities**: ZERO found.
