from django.conf.urls import url, include
from django.views import generic
from rest_framework import routers
from profiles_api import views as profiles_api_views
from rest_framework import status, serializers, views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path

router = routers.DefaultRouter()
router.register(r'users', profiles_api_views.UserViewSet)

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()


class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


urlpatterns = [
    url(r'^', include(router.urls)),
	url(r'^api/$', get_schema_view()),
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),
    url(r'^api/echo/$', EchoView.as_view()),
	path('chat/',include('ws_player.urls')),

]
