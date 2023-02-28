from rest_framework import serializers

from django.utils.encoding import force_str, force_bytes
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from rest_framework.status import HTTP_400_BAD_REQUEST

from rest_framework.validators import UniqueValidator

def get_email(user):
    email_field = user.get_email_field_name()
    return getattr(user, email_field)

def encode_uid(pk):
    return force_str(urlsafe_base64_encode(force_bytes(pk)))

def decode_uid(pk):
    return force_str(urlsafe_base64_decode(pk))


class Exception(Exception):
    message = "An Error Occured"
    code = HTTP_400_BAD_REQUEST

    def __init__(self, message=None, code=None):
        self.message = message or self.message or self.__doc__
        self.code = code or self.code

    def __str__(self):
        if isinstance(self.message, str):
            return self.message
        return ""

    def __dict__(self):
        if isinstance(self.message, dict):
            return self.message
        return {}

