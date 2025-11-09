from django_filters.rest_framework import FilterSet
from .models import Todo


class TodoFilter(FilterSet):
    class Meta:
        model=Todo
        fields={
            'status':['exact']
        }