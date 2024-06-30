from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Friendship
from .serializers import UserSerializer, FriendshipSerializer


class UsersListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class AddUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ModifyUserView(APIView):
    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteUserView(APIView):
    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserDetailsView(APIView):
    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )


class FriendshipsListView(APIView):
    def post(self, request, id):
        # return Response({"error": "Not implemented."}, status=status.HTTP_404_NOT_FOUND)
        try:
            user = User.objects.get(id=id)
            try:
                friendships = Friendship.objects.get(user=user)
                serializer = FriendshipSerializer(friendships, many=True)
                return Response(serializer.data)
            except Friendship.DoesNotExist:
                return Response([])

        except User.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )


class AddFriendshipView(APIView):

    def post(self, request):
        serializer = FriendshipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveFriendshipView(APIView):
    def post(self, request, id):
        try:
            friendship = Friendship.objects.get(id=id)
        except Friendship.DoesNotExist:
            return Response(
                {"error": "Friendship not found."}, status=status.HTTP_404_NOT_FOUND
            )

        friendship.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FriendshipDetailsView(APIView):
    def post(self, request, id):
        try:
            friendship = Friendship.objects.get(id=id)
            serializer = FriendshipSerializer(friendship)
            return Response(serializer.data)
        except Friendship.DoesNotExist:
            return Response(
                {"error": "Friendship not found."}, status=status.HTTP_404_NOT_FOUND
            )
