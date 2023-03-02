from rest_framework.status import (
                    HTTP_200_OK,HTTP_201_CREATED,
                    HTTP_404_NOT_FOUND,HTTP_400_BAD_REQUEST)
from rest_framework.generics import GenericAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework import mixins

from course.models import Syllabus
from core.permissions import IsOwner
from .models import Quiz,Question,Option
from .serializers import QuizSerializer,QuestionSerializer,OptionSerializer

class OptionView(ListCreateAPIView):

    serializer_class = OptionSerializer
    queryset = Option.objects.all()
    # permission_classes = [IsOwner]

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def post(self, request, *args, **kwargs):
        question_id = kwargs["question_id"]
        
        quest = Question.objects.filter(question_id=question_id)
        if quest.exists():
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                opt = serializer.save(quest=quest[0])
                quest[0].opt.add(opt)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        return Response("Question does not exist", status=HTTP_404_NOT_FOUND)

class OptionDetailView(RetrieveUpdateDestroyAPIView):

    serializer_class = OptionSerializer
    queryset = Option.objects.all()
    lookup_field = "pk"

class QuestionView(ListCreateAPIView):

    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    # permission_classes = [IsOwner]

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def post(self, request, *args, **kwargs):
        quiz_id = kwargs["quiz_id"]
        
        quiz = Quiz.objects.filter(quiz_id=quiz_id)
        if quiz.exists():
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                qs = serializer.save(quiz=quiz[0])
                quiz[0].quizs.add(qs)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        return Response("Quiz does not exist", status=HTTP_404_NOT_FOUND)


class QuestionDetailView(RetrieveUpdateDestroyAPIView):

    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    lookup_field = "pk"

class QuizView(ListCreateAPIView):

    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
    permission_classes = [IsOwner]

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def post(self, request, *args, **kwargs):
        syllabus_id = kwargs["syllabus_id"]
        
        syllabus = Syllabus.objects.filter(syllabus_id=syllabus_id)
        if syllabus.exists():
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                cre = serializer.save(user=request.user)
                syllabus.first().syllabus_quiz.add(cre)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        return Response("Course does not exist", status=HTTP_404_NOT_FOUND)

    def get(self, request, *args, **kwargs):
        syllabus_id = kwargs["syllabus_id"]
        
        qs = Syllabus.objects.filter(syllabus_id=syllabus_id)
        if qs.exists():
            return self.list(request, *args, **kwargs)    
        return Response('Syllabus does not exist', status=HTTP_404_NOT_FOUND)


class QuizDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
    permission_classes = [IsOwner]
    lookup_field = "pk"