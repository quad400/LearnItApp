from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView

from .models import QuestionOption,Options,Question
from .serializer import QuestionOptionSerializer,QuestionSerializer


class QuizView(APIView):

    def get(self, request, **kwargs):
        question_id = kwargs["question_id"]
        qs = QuestionOption.objects.filter(questionz__question_id=question_id)
        print(qs)
        if qs.exists():

            serialize = QuestionOptionSerializer(instance=qs, many=True)
            return Response(serialize.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_204_NO_CONTENT)


class QuestionView(APIView):

    def post(self, request, **kwargs):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            Question.objects.create(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        qs = Question.objects.all()
        if qs.exists():
            serialize = QuestionSerializer(instance=qs, many=True)
            return Response(serialize.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_204_NO_CONTENT)
