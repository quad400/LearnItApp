from rest_framework import (generics,
                            status,
                            )
from rest_framework import permissions as permission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.dispatch import Signal
from django.contrib.auth import logout
from django.contrib.auth import get_user_model

from . import serializers
from .models import UserAccount,Profile,Link,Skills
from core.utils import get_email
from core import constant,permissions
from .email import ActivationEmail,ConfirmationEmail


signal = Signal()
User = get_user_model()


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.UserCreateSerializer
    queryset = UserAccount
    permission_classes = [permission.AllowAny]

    def perform_create(self,*args, **kwargs):
        user = self.request.user
        signal.send(sender=self.__class__, user=user, request=self.request)

        context = {"user": user}
        to = [get_email(user)]
        if constant.SEND_ACTIVATION_EMAIL:
            ActivationEmail(self.request, context).send(to)
        return super().perform_create(*args, **kwargs)


class InstructorCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.InstructorCreateSerializer
    queryset = UserAccount
    permission_classes = [permission.AllowAny]

    def perform_create(self,*args, **kwargs):
        user = self.request.user
        signal.send(sender=self.__class__, user=user, request=self.request)

        context = {"user": user}
        to = [get_email(user)]
        if constant.SEND_ACTIVATION_EMAIL:
            ActivationEmail(self.request, context).send(to)
        return super().perform_create(*args, **kwargs)


class StaffCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.StaffCreateSerializer
    queryset = UserAccount
    permission_classes = [permission.AllowAny]

    def perform_create(self,*args, **kwargs):
        user = self.request.user
        signal.send(sender=self.__class__, user=user, request=self.request)

        context = {"user": user}
        to = [get_email(user)]
        if constant.SEND_ACTIVATION_EMAIL:
            ActivationEmail(self.request, context).send(to)
        return super().perform_create(*args, **kwargs)


class AdminCreateAPIView(generics.CreateAPIView):
    serializer_class = serializers.AdminCreateSerializer
    queryset = UserAccount
    permission_classes = [permission.AllowAny]

    def perform_create(self,*args, **kwargs):
        user = self.request.user
        signal.send(sender=self.__class__, user=user, request=self.request)

        context = {"user": user}
        to = [get_email(user)]
        if constant.SEND_ACTIVATION_EMAIL:
            ActivationEmail(self.request, context).send(to)
        return super().perform_create(*args, **kwargs)

        
class ActivationAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        serializer = serializers.ActivationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        user.is_active = True
        user.save()

        signal.send(
            sender=self.__class__, user=user, request=self.request
        )

        if constant.SEND_CONFIRMATION_EMAIL:
            context = {"user": user}
            to = [get_email(user)]
            ConfirmationEmail(self.request, context).send(to)

        return Response(status=status.HTTP_204_NO_CONTENT)


class UserLoginAPIView(APIView):
    permission_classes = []
    serializer_class=serializers.UserLoginSerializer

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        login_serializer = serializers.UserLoginSerializer(
            data={"email": email, "password":password}
        )
        if not login_serializer.is_valid():
            raise Exception(login_serializer.errors)
        
        login_serializer.save()
        token, _ = Token.objects.get_or_create(user=login_serializer.instance)

        return Response(
            {
            "message": "User successfully logged in",
            **login_serializer.data, "token": str(token)},
            status=status.HTTP_200_OK
        )


class UserLogoutAPIView(APIView):

    permission_classes = [permission.IsAuthenticated]

    def post(self, request, *args, **kwargs):

        Token.objects.filter(user=request.user).delete()
        signal.send(sender=self.request.user.__class__, request=request, user=request.user)
        logout(request)

        return Response("Logout successfull",status=status.HTTP_200_OK)


class UserAPIView(APIView):
    permission_classes = [permission.IsAuthenticated]


    def get(self, request, *args, **kwargs):
        slug = kwargs.get("profile_id")
        qs = Profile.objects.filter(profile_id=slug)
        if qs.exists():
            serializ = serializers.ProfileSerializer(instance=qs.first())
            return Response(serializ.data, status=status.HTTP_200_OK)
        return Response("Invalid details", status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        slug = kwargs.get("profile_id")
        qs = Profile.objects.filter(profile_id=slug)
        if qs.exists():
            serializer = serializers.ProfileSerializer(qs.first(), data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors)
        
        return Response("User does not exist", status=status.HTTP_404_NOT_FOUND)

    

class UserListAPIView(generics.ListAPIView):
    serializer_class = serializers.UserListSerializer
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAdminAndStaffOrReadOnly,permission.IsAdminUser]


class LinkAPIView(APIView):
    '''
        Create, List, Update, Retrieve, Destroy
    '''
    permission_classes = [permission.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profile_id = kwargs["profile_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            qs = qs.first().links.all()
            serialize = serializers.LinkSerializer(instance=qs)
            return Response(serialize.data, status=status.HTTP_200_OK)

        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, *args, **kwargs):
        user = request.user
        profile_id = kwargs["profile_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            serialize = serializers.LinkSerializer(data=request.data)
            if serialize.is_valid():
                link = serialize.validated_data.get("link")
                name = serialize.validated_data.get("name")
                serialize.save(user=request.user)
                if user.is_authenticated:
                    link_create = Link.objects.create(user_id=request.user.id,name=name,link=link)
                    qs = qs.first()
                    qs = qs.links.add(link_create)
                    return Response(serialize.data, status=status.HTTP_201_CREATED)
            
            return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
                
        else:
            return Response("User does not exist",status=status.HTTP_404_NOT_FOUND)


class LinkRetrieveUpdateDestroyAPIView(APIView):
    def get(self, request, *args, **kwargs):
        profile_id = kwargs["profile_id"]
        id = kwargs["link_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            qs = qs.first().links.filter(link_id=id)
            if qs.exists():

                serialize = serializers.LinkSerializer(instance=qs.first())
                return Response(serialize.data, status=status.HTTP_200_OK)

            return Response()
        
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        profile_id = kwargs["profile_id"]
        id = kwargs["link_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            link = Link.objects.filter(link_id=id)
            if link.exists():
                link.delete()
                return Response("Successfully deleted", status=status.HTTP_200_OK)

            return Response("Link does not exist",status=status.HTTP_404_NOT_FOUND)
        
        return Response("User does not exist",status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        profile_id = kwargs["profile_id"]
        id = kwargs["link_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            qs = qs.first().links.filter(link_id=id)
            if qs.exists():
                serialize = serializers.LinkSerializer(instance=qs.first(), data=request.data)
                if serialize.is_valid():
                    serialize.save(user=request.user)
                    return Response(serialize.data, status=status.HTTP_200_OK)

                return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response("Link does not exist", status=status.HTTP_404_NOT_FOUND)

        return Response("Object does not exist", status=status.HTTP_404_NOT_FOUND)


class SkillAPIView(APIView):
    permission_classes = [permission.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profile_id = kwargs["profile_id"]

        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            qs = qs.first().skills.all()
            serialize = serializers.SkillSerializer(instance=qs)
            return Response(serialize.data, status=status.HTTP_200_OK)

        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        user = request.user
        profile_id = kwargs["profile_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            serialize = serializers.SkillSerializer(data=request.data)
            if serialize.is_valid():
                skill = serialize.validated_data.get("skill")
                serialize.save(user=request.user)
                if user.is_authenticated:
                    skill_create = Skills.objects.create(user_id=request.user.id,skill=skill)
                    qs = qs.first()
                    qs = qs.skills.add(skill_create)
                    return Response(serialize.data, status=status.HTTP_201_CREATED)
            
            return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
                
        else:
            return Response("User does not exist",status=status.HTTP_404_NOT_FOUND)


class SkillRetrieveUpdateDestroyAPIView(APIView):
    def get(self, request, *args, **kwargs):
        profile_id = kwargs["profile_id"]
        id = kwargs["skill_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            qs = qs.first().skills.filter(skill_id=id)
            if qs.exists():

                serialize = serializers.SkillSerializer(instance=qs.first())
                return Response(serialize.data, status=status.HTTP_200_OK)

            return Response()

        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        profile_id = kwargs["profile_id"]
        id = kwargs["skill_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            skill = Skills.objects.filter(skill_id=id)
            if skill.exists():
                skill.delete()
                return Response("Successfully deleted", status=status.HTTP_200_OK)

            return Response("skill does not exist",status=status.HTTP_404_NOT_FOUND)
        
        return Response("User does not exist",status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        profile_id = kwargs["profile_id"]
        id = kwargs["skill_id"]
        qs = Profile.objects.filter(profile_id=profile_id)
        if qs.exists():
            qs = qs.first().skills.filter(skill_id=id)
            if qs.exists():
                serialize = serializers.SkillSerializer(instance=qs.first(), data=request.data)
                if serialize.is_valid():
                    serialize.save(user=request.user)
                    return Response(serialize.data, status=status.HTTP_200_OK)

                return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response("skill does not exist", status=status.HTTP_404_NOT_FOUND)

        return Response("Object does not exist", status=status.HTTP_404_NOT_FOUND)
