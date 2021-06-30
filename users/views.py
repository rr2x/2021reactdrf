from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet


from users.authentication import JWTAuthentication, generate_access_token
from users.serializers import PermissionSerializer, RoleSerializer, UserSerializer

from .models import User, Permission, Role


@api_view(['POST'])
def register(request):
    data = request.data

    if data['password'] != data['password_confirm']:
        raise APIException('Passwords do not match!')

    serializer = UserSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.filter(email=email).first()

    if user is None:
        raise AuthenticationFailed('User not found!')

    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password')

    response = Response()

    token = generate_access_token(user)

    response.set_cookie(key='jwt', value=token, httponly=True)

    response.data = {
        'jwt': token
    }

    return response


@api_view(['POST'])
def logout(_):
    response = Response()
    response.delete_cookie(key='jwt')
    response.data = {
        'message': 'success'
    }
    return response


class AuthenticatedUser(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response({
            'data': serializer.data
        })


class PermissionAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = PermissionSerializer(Permission.objects.all(), many=True)

        return Response({
            'data': serializer.data
        })


class RoleViewSet(ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, _):
        serializer = RoleSerializer(Role.objects.all(), many=True)
        return Response({
            'data': serializer.data
        })

    def create(self, request):
        serializer = RoleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    def retrieve(self, _, pk=None):
        role = Role.objects.get(id=pk)
        serializer = RoleSerializer(role)
        return Response({
            'data': serializer.data
        })

    def update(self, request, pk=None):
        role = Role.objects.get(id=pk)
        serializer = RoleSerializer(instance=role, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_202_ACCEPTED)

    def destroy(self, _, pk=None):
        role = Role.objects.get(id=pk)
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
