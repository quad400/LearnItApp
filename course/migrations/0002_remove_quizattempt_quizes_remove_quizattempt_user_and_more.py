# Generated by Django 4.1.5 on 2023-03-02 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quizattempt',
            name='quizes',
        ),
        migrations.RemoveField(
            model_name='quizattempt',
            name='user',
        ),
        migrations.AlterField(
            model_name='syllabus',
            name='syllabus_quiz',
            field=models.ManyToManyField(blank=True, to='quiz.quiz'),
        ),
        migrations.DeleteModel(
            name='Quiz',
        ),
        migrations.DeleteModel(
            name='QuizAttempt',
        ),
    ]
