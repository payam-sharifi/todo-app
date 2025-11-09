from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Todo
from .serializer import TodoSerializers



class TodoViewSet(ModelViewSet):
    queryset=Todo.objects.all()
    serializer_class=TodoSerializers
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
