from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login


@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authentication(username = username, password= password)
    if user is not None:
        login(request, user)
        token = Token.objects.get_or_create(user = user)
        return Response({'error': 'Invalid credentials'})
    else:
        return Response({'error': 'Invalid credentials'})
# Create your views here.

@api_view(['POST'])
def signup(request):
    name = request.data.get('name')
    lastname = request.data.get('lastname')
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    user = User.object.creat_user(name=name, lastname=lastname, username=username, password=password, email=email)
    if user is not None:
        token = Token.object.get_or_create(user=user)
        return Response({'token' : token.key, 'user_id' : user.id})
    else:
        return Response({'error': 'User creation failed'})