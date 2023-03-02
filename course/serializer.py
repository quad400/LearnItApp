from rest_framework import serializers

from .models import (
    Course,Instructor, Syllabus, Category, Topic,Quiz,
    Skills,FAQ,Reviews,Discussion,Answer,Reply,Question
    )

from quiz.serializers import QuizSerializer


class InstructorSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True) 

    class Meta:
        model = Instructor
        fields = [
            'instructor_id',
            'user',
            'isLead_instructor'
        ]

    def get_user(self, obj):
        return f"{obj.user.email}"

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True) 
    review_course = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Reviews
        fields = [
            'review_id','user','review_course',
            'rate','comment','created'
        ]
    
    def get_user(self, obj):
        return obj.user.email

    def get_review_course(self, obj):
        return obj.review_course.title


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class SyllabusSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)
    syllabus_quiz=QuizSerializer(read_only=True,many=True)
    class Meta:
        model = Syllabus
        fields = (
            "syllabus_id","title",
            "topics","syllabus_quiz","created","updated",
        )


    def validate_title(self, attrs):
        qs = Syllabus.objects.filter(title__iexact=attrs)
        if qs.exists():
            raise serializers.ValidationError(f"{attrs} has already exist.")
        return attrs


class CategorySerializer(serializers.ModelSerializer):
    """  
        Serializer for lowest level category that has no children
    """
    class Meta:
        model = Category
        fields = ["category_id",'name']


class SkillSerializer(serializers.ModelSerializer):

    skill_course = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Skills
        fields = ['skill_id','content','skill_course']

    def get_skill_course(self, obj):
        return obj.skill_course.title

class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz
        fields = [
            "quiz_id","question","option1",
            "option2","option3","option4","answer","created",
        ]


class FAQSerializer(serializers.ModelSerializer):

    faq_course = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FAQ
        fields = ['faq_id','question','answer','faq_course',"created","updated"]

    def get_faq_course(self, obj):
        return obj.faq_course.title

class EnrollSerializer(serializers.Serializer):
    user = serializers.SerializerMethodField(read_only=True)

    def get_user(self, obj):
        return obj.email

class LikeSerializer(serializers.Serializer):
    user = serializers.SerializerMethodField(read_only=True)

    def get_user(self, obj):
        return obj.fullname


class ReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    answer_reply = serializers.SerializerMethodField(read_only=True)
    like_reply = LikeSerializer(read_only=True, many=True)
    likes_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Reply
        fields = [
            "reply_id","user","answer_reply","likes_count",
            "content","like_reply","created","updated"
        ]
        
    def get_user(self, obj):
        return obj.user.fullname

    def get_answer_reply(self, obj):
        return obj.answer_reply.content

    def get_likes_count(self, obj):
        return obj.like_reply.count()

class AnswerSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField(read_only=True)
    question_answer = serializers.SerializerMethodField(read_only=True)
    like_answer = LikeSerializer(read_only=True, many=True)
    reply = ReplySerializer(read_only=True,many=True)
    likes_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Answer
        fields = [
            "answer_id","user","question_answer","likes_count",
            "content","reply","like_answer","created","updated"
        ]

    def get_user(self, obj):
        return obj.user.fullname

    def get_question_answer(self, obj):
        return obj.question_answer.question

    def get_likes_count(self, obj):
        return obj.reply.count()

class QuestionSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = [
            "question_id","user",
            "question","detail","answers",
            "created","updated"
        ]
    
    def get_user(self, obj):
        return obj.user.fullname
    
    def validate_question(self, attrs):
        qs = Question.objects.filter(question__iexact=attrs)
        if qs.exists():
            raise serializers.ValidationError(f"{attrs} has already exist.")
        return attrs
    
    def create(self, validated_data):
        validated_data
        return super().create(validated_data)


class DiscussionSerializer(serializers.ModelSerializer):

    course_discuss = serializers.SerializerMethodField(read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Discussion
        fields = [
            "discussion_id","course_discuss",
            "questions",
        ]
    
    def get_course_discuss(self, obj):
        return obj.course_discuss.title

    def create(self, validated_data):
        return super().create(validated_data)
 

class CourseSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    syllabus = SyllabusSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    title = serializers.CharField(required=True)
    price = serializers.DecimalField(required=True, decimal_places=2, max_digits=7)
    instructors = InstructorSerializer(read_only=True, many=True)
    faqs = FAQSerializer(read_only=True, many=True)
    reviews = ReviewSerializer(read_only=True, many=True)
    enrolled = EnrollSerializer(read_only=True,many=True)
    enrolled_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = (
                    "course_id","user",
                    "title","category","price","faqs",
                    "about","instructors","syllabus","skills",
                    "enrolled","enrolled_count","reviews","created","updated",

                )

    def get_user(self, obj):
        return obj.user.fullname 

    def validate_title(self, attrs):
        qs = Course.objects.filter(title__iexact=attrs)
        if qs.exists():
            raise serializers.ValidationError(f"{attrs} has already exist.")
        return attrs


    def get_enrolled_count(self, obj):
        return obj.enrolled.count()

    def create(self, validated_data):

        return super().create(validated_data)


class InstructorRequestSerializer(serializers.Serializer):

    email = serializers.EmailField()


class QuizAnswerSerializer(serializers.Serializer):

    answer = serializers.CharField(write_only=True)


class InstructorRequestResponseSerializer(serializers.Serializer):

    reply = serializers.CharField()

{
"question" : "",
"option1": "",
"option2": "",
"option3": "",
"option4": ""
}

{
    "question": "Gender of quadri",
    "option1": "Male",
    "option2": "Female",
    "option3": "Trans",
    "option4": "None of the above",
    "answer": "Male"
}