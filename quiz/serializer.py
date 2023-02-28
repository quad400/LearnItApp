from rest_framework import serializers,status
from rest_framework.response import Response


from .models import QuestionOption, Options,Question

class QuestionOptionSerializer(serializers.ModelSerializer):

    question = serializers.SerializerMethodField(read_only=True)
    option = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = QuestionOption
        fields = ['question','option']

    def get_question(self, obj):
        return obj.quizz.question

    def get_option(self, obj):
        qs = Options.objects.filter(quizz=obj.quizz)
        if qs.exists():
            return qs.all()
        return Response("Option does not exist",status=status.HTTP_404_NOT_FOUND)


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ['question_id','question']