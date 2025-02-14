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
    RegisterView,
    UserProfileView,
    UserFriendShipView,
)

urlpatterns = [
    path("user", UserProfileView.as_view(), name="profile"),
    path("users/register", RegisterView.as_view(), name="register"),
    path("users/", UsersListView.as_view(), name="users"),
    path("user/update", ModifyUserView.as_view(), name="modify_user"),
    path("user/remove", DeleteUserView.as_view(), name="delete_user"),
    path("users/<int:id>/", UserDetailsView.as_view(), name="user_details"),
    # path(
    #     "friendshipsBwUsers/<int:id>", UserFriendShipView.as_view(), name="friendshipsBwUsers"
    # ),
    path("friendships/<int:id>/", FriendshipsListView.as_view(), name="friendships"),
    path(
        "friendships/add/<int:id>/", AddFriendshipView.as_view(), name="add_friendship"
    ),
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
