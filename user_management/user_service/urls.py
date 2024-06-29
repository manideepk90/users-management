from django.urls import path, include
from rest_framework.routers import DefaultRouter
import views

urlpatterns = [
     path('users/add/', views.AddUserView.as_view(), name='add_user'),
    path('users/modify/<int:pk>/', views.ModifyUserView.as_view(), name='modify_user'),
    path('users/delete/<int:pk>/', views.DeleteUserView.as_view(), name='delete_user'),
    path('users/details/<int:pk>/', views.UserDetailsView.as_view(), name='user_details'),
    path('friendships/add/', views.AddFriendshipView.as_view(), name='add_friendship'),
    path('friendships/remove/<int:pk>/', views.RemoveFriendshipView.as_view(), name='remove_friendship'),
    path('friendships/details/<int:pk>/', views.FriendshipDetailsView.as_view(), name='friendship_details'),
]