from django.urls import path

from .views import users, register

urlpatterns = [
    path('hello', users),
    path('register', register),
]
