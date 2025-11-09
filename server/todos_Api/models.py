from django.db import models


class Todo(models.Model):
    STATUS_CHOICES = [
        ('offen', 'Offen'),
        ('in_bearbeitung', 'In Bearbeitung'),
        ('erledigt', 'Erledigt'),
    ]
    titel = models.CharField(max_length=200)
    beschreibung = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='offen'
    )
    erstellt_am = models.DateTimeField(auto_now_add=True)
    aktualisiert_am = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.titel