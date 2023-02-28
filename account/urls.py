from django.urls import path

from .views import (
            UserCreateAPIView,
            StaffCreateAPIView,
            InstructorCreateAPIView,
            AdminCreateAPIView,
            ActivationAPIView,
            UserLoginAPIView,
            UserLogoutAPIView,
            UserListAPIView,
            UserAPIView,
            LinkAPIView,
            LinkRetrieveUpdateDestroyAPIView,
            SkillAPIView,
            SkillRetrieveUpdateDestroyAPIView,
        )

urlpatterns = [
    # path('create/user/', UserCreateAPIView.as_view(), name="create_user"),
    # path('create/instructor/', InstructorCreateAPIView.as_view(), name="instructor_user"),
    # path('create/staff/', StaffCreateAPIView.as_view(), name="staff_user"),
    # path('create/admin/', AdminCreateAPIView.as_view(), name="super_user"),


    # path('login/', UserLoginAPIView.as_view(), name="login_user"),
    # path('logout/', UserLogoutAPIView.as_view(), name="logout_user"),
    # path('activation/', ActivationAPIView.as_view(), name="activate"),

    path('user/<slug:profile_id>/', UserAPIView.as_view(), name='user'),
    path('', UserListAPIView.as_view(), name='user_list'),

    path('user/<slug:profile_id>/skill/', SkillAPIView.as_view(), name='skill'),
    path('user/<slug:profile_id>/<slug:skill_id>/', SkillRetrieveUpdateDestroyAPIView.as_view(),name='skill_id'),

    path('user/<slug:profile_id>/link/', LinkAPIView.as_view(), name='link'),
    path('user/<slug:profile_id>/<slug:link_id>/', LinkRetrieveUpdateDestroyAPIView.as_view(),name='link_id'),

]
{
'http://127.0.0.1:8000/auth/users/': "create_user",
'http://127.0.0.1:8000/auth/jwt/create': "login_user",
'http://127.0.0.1:8000/auth/users/activation/':'activate account',
'http://127.0.0.1:8000/auth/users/resend_activation/': 'resend activation',
'http://127.0.0.1:8000/auth/users/me/':"delete update get"
}