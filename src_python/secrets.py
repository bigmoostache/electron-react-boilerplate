from cryptography.hazmat.primitives.asymmetric import rsa, padding, utils, ec
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.fernet import Fernet

def get_new_keys():
    private = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
        )
    prv = private.private_bytes(encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption())
    pub = private.public_key().public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo)
    return prv, pub

def encrypt(message : bytes, secret_key : bytes):
    key = Fernet.generate_key()
    """public = serialization.load_pem_public_key(public_key)
    hidden_key = public.encrypt(
            key,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )"""
    fernet = Fernet(key)
    encrypted_message = fernet.encrypt(message)
    hidden_key = Fernet(secret_key).encrypt(key)
    return encrypted_message, hidden_key

def decrypt(encrypted_message : bytes, private_key : bytes, hidden_key : bytes):
    private_key = serialization.load_pem_private_key(private_key, password=None)
    key = private_key.decrypt(
            hidden_key,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
    print(key)
    fernet = Fernet(key)
    message = fernet.decrypt(encrypted_message)
    return message

def give_secret(secret, my_private, his_public):
    secret = my_private.decrypt(
            secret,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
    secret = his_public.encrypt(
            secret,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
    return secret