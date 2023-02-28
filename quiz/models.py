from django.db import models
from django.contrib.auth import get_user_model
from customshortuuidfield.fields import CustomShortUUIDField

# Create your models here.
User = get_user_model()

class Question(models.Model):
    question_id = CustomShortUUIDField(prefix="question_",editable=False, unique=True,primary_key=True)
    question = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

class QuestionOption(models.Model):
    option = models.ForeignKey('Options', on_delete=models.DO_NOTHING)
    questionz = models.OneToOneField(Question, on_delete=models.CASCADE)


class QuizAttempt(models.Model):
    quizattempt_id = CustomShortUUIDField(prefix="quizattempt_",editable=False, unique=True,primary_key=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='my_user')
    quizes = models.ForeignKey(QuestionOption, on_delete=models.CASCADE)
    score = models.PositiveIntegerField(default=0)

class Options(models.Model):
    option_id = CustomShortUUIDField(prefix="option_",editable=False, unique=True,primary_key=True)
    quizz = models.ForeignKey(Question, on_delete=models.CASCADE)
    option = models.CharField(max_length=500)
    correct = models.BooleanField(default=False)

