from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsersListView,
    AddUserView,
    ModifyUserView,
    DeleteUserView,
    UserDetailsView,
    AddFriendshipView,
    RemoveFriendshipView,
    FriendshipDetailsView,
    FriendshipsListView,
)

urlpatterns = [
    path("users/", UsersListView.as_view(), name="users"),
    path("users/add/", AddUserView.as_view(), name="add_user"),
    path("users/modify/<int:id>/", ModifyUserView.as_view(), name="modify_user"),
    path("users/delete/<int:id>/", DeleteUserView.as_view(), name="delete_user"),
    path("users/<int:id>/", UserDetailsView.as_view(), name="user_details"),
    path("friendships/<int:id>/", FriendshipsListView.as_view(), name="friendships"),
    path("friendships/add/", AddFriendshipView.as_view(), name="add_friendship"),
    path(
        "friendships/remove/<int:id>/",
        RemoveFriendshipView.as_view(),
        name="remove_friendship",
    ),
    path(
        "friendships/details/<int:id>/",
        FriendshipDetailsView.as_view(),
        name="friendship_details",
    ),
]
