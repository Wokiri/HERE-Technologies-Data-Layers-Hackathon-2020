# This is an auto-generated Django model module created by ogrinspect.
from django.contrib.gis.db import models


class JburgBuildings(models.Model):
    names = models.CharField(null=True, blank=True, max_length=255)
    geom = models.MultiPolygonField(srid=4326)
    
    def __str__(self):
        if self.names == None or self.names == 'None':
            return 'Building not named'
        else:
            return self.names
    
class JburgLanduse(models.Model):
    cartotypen = models.CharField(null=True, blank=True, max_length=255)
    geom = models.MultiPolygonField(srid=4326)
    
    
    def __str__(self):
        return self.cartotypen

    
class CircularAreaGeom(models.Model):
    geomValue = models.TextField()
    
    
class MajorWorldCities(models.Model):
    city_name = models.CharField(max_length=120)
    cntry_name = models.CharField(max_length=120)
    pop_class = models.CharField(max_length=120)
    geom = models.MultiPointField(srid=4326)
    
    def __str__(self):
        return self.city_name