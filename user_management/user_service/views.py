from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Friendship
from .serializers import UserSerializer, FriendshipSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        if password != confirm_password:
            return Response(
                {"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST
            )

        if not email or not password:
            return Response(
                {"error": "Please provide all required fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(email=email, password=password, username=email)
        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UsersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get_friendship(self, user_id, friend_id):
        try:
            user = User.objects.get(id=user_id)
            friend = User.objects.get(id=friend_id)
            friendship = Friendship.objects.filter(user=user, friend=friend).first()
            if not friendship:
                friendship = Friendship.objects.filter(user=friend, friend=user).first()
            return friendship
        except User.DoesNotExist:
            return None

    def get(self, request):
        users = User.objects.all().exclude(id=request.user.id)
        serialized_users = []
        for user in users:
            friendship = self.get_friendship(request.user.id, user.id)
            if friendship:
                user.is_friend = True
            else:
                user.is_friend = False
            serialized_users.append(
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_friend": user.is_friend,
                }
            )
        # serializer = UserSerializer(users, many=True)
        return Response(serialized_users)


class AddUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ModifyUserView(APIView):
    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            email = request.data.get("email")
            # password = request.data.get("password")
            # confirm_password = request.data.get("confirm_password")

            if not email:
                return Response(
                    {"error": "Please provide all required fields"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # if password != confirm_password:
            #     return Response(
            #         {"error": "Passwords do not match"},
            #         status=status.HTTP_400_BAD_REQUEST,
            #     )

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
    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get_friendship(self, user_id, friend_id):
        try:
            user = User.objects.get(id=user_id)
            friend = User.objects.get(id=friend_id)
            friendship = Friendship.objects.filter(user=user, friend=friend).first()
            if not friendship:
                friendship = Friendship.objects.filter(user=friend, friend=user).first()
            return friendship
        except User.DoesNotExist:
            return None

    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
            serializer = UserSerializer(user)

            friendship = self.get_friendship(request.user.id, id)
            if not friendship:
                return Response({"user": serializer.data, "friendship": None})
            friendship_serializer = FriendshipSerializer(friendship)
            # return Response(friendship_serializer.data)
            return Response(
                {"user": serializer.data, "friendship": friendship_serializer.data}
            )
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )


class UserFriendShipView(APIView):
    permission_classes = [IsAuthenticated]

    def get_friendship(self, user_id, friend_id):
        try:
            user = User.objects.get(id=user_id)
            friend = User.objects.get(id=friend_id)
            friendship = Friendship.objects.filter(user=user, friend=friend).first()
            if not friendship:
                friendship = Friendship.objects.filter(user=friend, friend=user).first()
            return friendship
        except User.DoesNotExist:
            return None

    def get(self, request, id):
        friendship = self.get_friendship(request.user.id, id)
        if not friendship:
            return Response(
                {"error": "Friendship not found."}, status=status.HTTP_404_NOT_FOUND
            )

        friendship_serializer = FriendshipSerializer(friendship)
        return Response(friendship_serializer.data)


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
    permission_classes = [IsAuthenticated]

    def get_friendship(self, user_id, friend_id):
        try:
            user = User.objects.get(id=user_id)
            friend = User.objects.get(id=friend_id)
            friendship = Friendship.objects.filter(user=user, friend=friend).first()
            if not friendship:
                friendship = Friendship.objects.filter(user=friend, friend=user).first()
            return friendship
        except User.DoesNotExist:
            return None

    def post(self, request, id):

        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        try:
            friend = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response(
                {"error": "Friend not found."}, status=status.HTTP_404_NOT_FOUND
            )
        friendship = self.get_friendship(request.user.id, id)
        if friendship:
            return Response(
                {"error": "Friendship already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = FriendshipSerializer(data={"user": user.id, "friend": friend.id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveFriendshipView(APIView):
    permission_classes = [IsAuthenticated]

    def get_friendship(self, user_id, friend_id):
        try:
            user = User.objects.get(id=user_id)
            friend = User.objects.get(id=friend_id)
            friendship = Friendship.objects.filter(user=user, friend=friend).first()
            if not friendship:
                friendship = Friendship.objects.filter(user=friend, friend=user).first()
            return friendship
        except User.DoesNotExist:
            return None

    def post(self, request, id):
        try:
            _ = self.get_friendship(request.user.id, id)
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
