from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.filters import OrderingFilter
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet
from .pagination import DefaultPagination
from .models import Todo
from .serializer import TodoSerializers
from .filters import TodoFilter


class TodoViewSet(ModelViewSet):
    queryset=Todo.objects.all()
    serializer_class=TodoSerializers
    filter_backends=[DjangoFilterBackend,OrderingFilter,SearchFilter]
    pagination_class=DefaultPagination
    filterset_class = TodoFilter
    ordering_fields=['erstellt_am']
    search_fields=['titel']
    # lookup_field='id'
  
    def get_serializer_context(self):
        return {'request':self.request}

    def destroy(self,request,*args,**kwargs):
        todo = get_object_or_404(Todo, pk=kwargs['pk'])
        return super().destroy(request,*args,**kwargs)
        self.perform_destroy(todo)
        return Response(
        {"message": "Todo deleted successfully"}, 
        status=status.HTTP_204_NO_CONTENT)
