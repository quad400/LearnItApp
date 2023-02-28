from django.urls import path

from .views import QuizView,QuestionView

urlpatterns = [
    path("<slug:question_id>/", QuizView.as_view(),name='quiz'),
    path("question/", QuestionView.as_view(), name='question')
]