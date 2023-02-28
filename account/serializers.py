from rest_framework import serializers, exceptions,status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from django.contrib.auth import get_user_model,authenticate
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from django.utils import timezone

from core import utils
from core.constant import SEND_ACTIVATION_EMAIL
from .models import Profile,Link,Skills

User = get_user_model()

"""
    To create student user account
"""
class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    

    class Meta:
        model = User
        fields = ("id","user_id","email","fullname","password",)

class UserSerializer(serializers.ModelSerializer):    

    is_instructor = serializers.BooleanField()

    class Meta:
        model = User
        fields = ("id","user_id","email","fullname","is_instructor",)


    # def validate(self, validated_data):
    #     password = validated_data.get("password")

    #     try:
    #         validate_password(password, User)

    #     except ValidationError as e:
    #         serializer_error = serializers.as_serializer_error(e)
    #         raise serializers.ValidationError({
    #             "password": serializer_error["non_field_errors"]
    #         })
    #     return validated_data


    # def create(self, validated_data):
    #     try:
    #         with transaction.atomic():
    #             user = User.objects.create_user(**validated_data)
    #             if SEND_ACTIVATION_EMAIL:
    #                 user.is_active = False
    #                 user.save(update_fields=['is_active']) 
    #             return user
    #     except:
    #         return Response("cannot create user",status=status.HTTP_400_BAD_REQUEST)

"""
    To create Instructors account
"""
class InstructorCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ("email","fullname","password",)

    def validate(self, validated_data):
        password = validated_data.get("password")

        try:
            validate_password(password, User)

        except ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError({
                "password": serializer_error["non_field_errors"]
            })
        return validated_data


    def create(self, validated_data):
        try:
            with transaction.atomic():
                user = User.objects.create_instructor(**validated_data)
                if SEND_ACTIVATION_EMAIL:
                    user.is_active = False
                    user.save(update_fields=['is_active']) 
                return user
        except:
            return Response("cannot create user",status=status.HTTP_400_BAD_REQUEST)

"""
    To create Staff account
"""
class StaffCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ("email","fullname","password",)

    def validate(self, validated_data):
        password = validated_data.get("password")

        try:
            validate_password(password, User)

        except ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError({
                "password": serializer_error["non_field_errors"]
            })
        return validated_data


    def create(self, validated_data):
        try:
            with transaction.atomic():
                user = User.objects.create_worker(**validated_data)
                if SEND_ACTIVATION_EMAIL:
                    user.is_active = False
                    user.save(update_fields=['is_active']) 
                return user
        except:
            return Response("cannot create user",status=status.HTTP_400_BAD_REQUEST)

"""
    To create Superuser account
"""
class AdminCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ("email","fullname","password",)

    def validate(self, validated_data):
        password = validated_data.get("password")

        try:
            validate_password(password, User)

        except ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError({
                "password": serializer_error["non_field_errors"]
            })
        return validated_data


    def create(self, validated_data):
        try:
            with transaction.atomic():
                user = User.objects.create_superuser(**validated_data)
                if SEND_ACTIVATION_EMAIL:
                    user.is_active = False
                    user.save(update_fields=['is_active']) 
                return user
        except:
            return Response("cannot create user",status=status.HTTP_400_BAD_REQUEST)


class UidTokenSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()

    def validate(self, validated_data):
        attrs = super().validate(validated_data)

        try:
            uid = utils.decode_uid(self.initial_data.get("uid", ""))
            self.user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            key_error = "invalid uid"
            raise ValidationError(
                {"uid": [self.error_messages[key_error]]}, code=key_error
            )

        is_token_valid = self.context["view"].token_generator.check_token(
            self.user, self.initial_data.get("token", "")
        )
        if is_token_valid:
            return attrs
        else:
            key_error = "Invalid token"
            raise ValidationError(
                {"uid": [self.error_messages[key_error]]}, code=key_error

            )


class ActivationSerializer(UidTokenSerializer):
    def validate(self, validated_data):
        attrs = super().validate(validated_data)
        if not self.user.is_active:
            return attrs
        raise exceptions.PermissionDenied(
            self.error_messages["stale token"]
        )


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, 
                        required=True, style={"input_type": "password"})


    def create(self, validated_data):
        user = authenticate(**validated_data)

        if not user:
            return Response(
                data="Invalid email or password",
                status = status.HTTP_401_UNAUTHORIZED,
            )
        user.last_login = timezone.now()
        user.save()

        return user


class LinkSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source='link_id', read_only=True)

    class Meta:
        model = Link
        fields = ("id","name","link")


class SkillSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source='skill_id', read_only=True)

    class Meta:
        model = Skills
        fields = ("id","skill")


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField(read_only=True)
    fullname = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    admin = serializers.SerializerMethodField(read_only=True)
    instructor = serializers.SerializerMethodField(read_only=True)
    staff = serializers.SerializerMethodField(read_only=True)
    links = LinkSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = (
            "user_id",
            "email",
            "fullname",
            "profile_id",
            "picture",
            "gender",
            "bio",
            "phone",
            "location",
            "links",
            "skills",
            "admin",
            "instructor",
            "staff",
            "created",
            "updated",
        )


    def get_user_id(self, obj):
        return obj.user.user_id

    def get_email(self, obj):
        return obj.user.email

    def get_fullname(self, obj):
        return obj.user.fullname

    def get_admin(self, obj):
        return obj.user.is_admin

    def get_instructor(self, obj):
        return obj.user.is_instructor

    def get_staff(self, obj):
        return obj.user.is_worker

    def get_links(self, obj):
        return obj.links.all

class UserListSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField(source="profile_id", read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='user',lookup_field='profile_id')
    fullname = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)


    def get_fullname(self, obj):
        return obj.user.fullname

    def get_email(self, obj):
        return obj.user.email

    def get_id(self, obj):
        return obj.profile_id


