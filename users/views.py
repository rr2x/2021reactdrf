from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from rest_framework.response import Response

from users.serializers import UserSerializer

from .models import User


@api_view(['POST'])
def register(request):
    data = request.data

    if data['password'] != data['password_confirm']:
        raise APIException('Passwords do not match!')

    serializer = UserSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def users(request):
    users = User.objects.all()
    return Response(users)
