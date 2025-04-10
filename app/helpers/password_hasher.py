from pwdlib import PasswordHash

class PasswordHasher:
    def __init__(self):
        self.password_hash = PasswordHash.recommended()

    def hash(self, password: str) -> str:
        """
        Hashes a password
        """
        return self.password_hash.hash(password)
    
    def verify(self, password: str, hash: str) -> bool:
        """
        Verifies if a password matches a given hash.
        """
        return self.password_hash.verify(password, hash)