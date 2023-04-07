from sql import exec_query, get_conn
import os
# S3
bucket_name = "devdump"
endpoint_url = "https://s3.sbg.perf.cloud.ovh.net/"
access_key = "ce973f2b85da47fd88ad12acde3b141e"
secret_key = "682b30b1682c41189d2e78a6c4aa0353"
# SQL
host = '57.128.108.48'
user = 'guillaume'
password = 'Totordu1789'
database = "dev_api"
# CACHE
path_cache = 'cache'
path_cache_sql = os.path.join(path_cache, 'cache_sql')
# DEV
user_id = 'db1e919a-9dbe-4997-8b79-e88debe1075c'
dataset_id = 'e491754a-1b98-4dcb-bde6-a2cdac20524d'
import_dataset_id = 'e471754a-1b98-4dcb-bde6-a2cdac20524d'
prv = b'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCPzzVUKDphnNqu\nwHolsJuSkvma7qrpRwucHkg7DrnKCUOHWckONeKYI8e+jEfdJk/2XhBDqYxipqYJ\nrIZgN217EqAn//nFToq0WwhCVPXMDgxsjPS2T+iNdSBKmcLgK1GZxdts4saBY7mf\ncmWu5HI9PFqvA23GLdxqnvt8RKimA4+WUx3l3J+mtzTbiIqIhB8lUET56TJZ6dRU\nrmhrB5HniHk0qW/NE1n2IH/GHFNnDeSlz3/fr1JBEW+cwKleNBvspo7LaPcXpGXv\n0RtomCQSVAimJbTK500XEi5/IqhjS17e9bIpXRi2q26YzlTo7noFnGuKfmmMIcUQ\n3zZFUmCJAgMBAAECggEADH/H3K9M6LZFfwYRb8RudyJBYdUP44vmX0y1/jUQ0pW0\nyfc0rYCjN9I3TpFafycQ8OK60uiyABKIMKPPP55drIJhS2y5CKxDi7q0SHCiNvi7\nHXWwYMan+aCGHJnJ6Wo2ctEyub9pna4dYHWEzztBjx83agn4IO8UPuufw8yjZF9e\nNVLquz+ID2Pld+A/YcXpHFmEueBl9xJo83HWM6jLUd9zmeipiVerjHFXocOpFNRp\ntKbL1HgNKAY7GklLmvJPxSLaGMp0qoWXzFWdYJVv/UPp3zQuujWgtso6omeiLVXv\nLX/ok7KnNBthu4QlWxdl8MKJJpwsWSUoh/47ISB8YQKBgQC185Y0cArpPjK74ccb\nFKNni2jQ0W7UuDUg0hz7cIlMwJ1aAK65v5F4l4Yr3UzH9TJW6LqGO4MASRSyDQj9\n99nHAQUauLdLJAlm85w18Z15AJZ8CE1PFrnPpHCcy/QRiE9H4VgKb28v/LajpK78\n2jBy8E296ik15/IeLjC7UtKSqQKBgQDKVdRaT1SoDuRl7hmfw+hoWvNDwmg/6iAo\nk2cwkHNn+Ddc6nPHQpHm2PWAj5pYTk1v7WgZBw7tdM3gUXtZkg1hPiPml5lPGcdC\n9uhD0aX/ju7cvR+Ba+qHVVHZfXaYYoWNb1QdMNrGA2Ij6rqu8xL9nCutaXFsDYJm\njHJrfknq4QKBgEuV0kscVFwKe5bzNvw3+Z21GyjMJ+d0UpW8009cs5zP004lRHBj\ndXIMOC+WsiPK50uVSI8kv8npkhBZO+gNA0oZUV6FZ5duc/1xq+343jr7FIiYBk2Z\nmjz5CdMJIu35mz24DhPfsOfVaqXWbt8ZYNEOpK0FTnNXVIxXEeVvhYxpAoGBALsK\nYrZlVWXR9nL/ivJ04JfvU6fUxBgpbzbzJFXxgq2e+FbNaN/Pex6Ce1gv58cwA0ev\nmCZirvr1mgd+a1+esv2suvVEOPW1Z81Qf9+Jo0E+OTMXJVO3leMrDPHXmFU/5iOb\nwY8GhYa8w/Fd4NsvWuPUhU/WBIKVbnEr7e3OnbghAoGAW7jFcM8S/9pH/j8bOeTf\ntuRZ4joSayYoIGWwYbyfQWsFodS6XE4X3OffMuzwQBKiVI5T85n9zZKPKqzmdbbf\no50Eox2S0BlaBG1ozxRJ1xWW9W+vooplT8LdI9dmSL9L3kWj6fnXj7zXGa3I9cAY\nLfAtSTbphuOD7EHFBW0bfDM=\n-----END PRIVATE KEY-----\n'
pub = b'-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj881VCg6YZzarsB6JbCb\nkpL5mu6q6UcLnB5IOw65yglDh1nJDjXimCPHvoxH3SZP9l4QQ6mMYqamCayGYDdt\nexKgJ//5xU6KtFsIQlT1zA4MbIz0tk/ojXUgSpnC4CtRmcXbbOLGgWO5n3JlruRy\nPTxarwNtxi3cap77fESopgOPllMd5dyfprc024iKiIQfJVBE+ekyWenUVK5oaweR\n54h5NKlvzRNZ9iB/xhxTZw3kpc9/369SQRFvnMCpXjQb7KaOy2j3F6Rl79EbaJgk\nElQIpiW0yudNFxIufyKoY0te3vWyKV0YtqtumM5U6O56BZxrin5pjCHFEN82RVJg\niQIDAQAB\n-----END PUBLIC KEY-----\n'
dataset_key = b'eS4eRpXKK6MbwXyGo6pPiMlgmcxLYM8IXYPXyB2-vFE='
root_dataset_id = 'e471754a-1b98-4dcb-bde6-a2cdac20524d'
