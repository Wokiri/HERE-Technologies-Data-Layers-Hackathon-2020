# This is an auto-generated Django model module created by ogrinspect.
from django.contrib.gis.db import models

    
class JburgBuildings(models.Model):
    id = models.BigIntegerField(primary_key=True)
    names = models.CharField(null=True, blank=True, max_length=255)
    featuretype = models.CharField(null=True, blank=True, max_length=255)
    buildingtype = models.CharField(null=True, blank=True, max_length=255)
    isocountrycode = models.CharField(null=True, blank=True, max_length=255)
    here_xyz = models.CharField(null=True, blank=True, max_length=255)
    here_mom_meta = models.CharField(null=True, blank=True, max_length=255)
    footprints = models.CharField(null=True, blank=True, max_length=255)
    geom = models.MultiPolygonField(srid=4326)
    
    def __str__(self):
        if self.names == None or self.names == 'None':
            return 'Building not named'
        else:
            return self.names


class JburgLanduse(models.Model):
    id = models.BigIntegerField(primary_key=True)
    cartotype = models.IntegerField()
    featuretype = models.CharField(null=True, blank=True, max_length=255)
    cartotypename = models.CharField(null=True, blank=True, max_length=255)
    here_xyz = models.CharField(null=True, blank=True, max_length=255)
    here_mom_meta = models.CharField(null=True, blank=True, max_length=255)
    cartoname = models.CharField(null=True, blank=True, max_length=255)
    geom = models.MultiPolygonField(srid=4326)
    
    def __str__(self):
        return self.cartotypename

    
class CircularAreaGeom(models.Model):
    geomValue = models.TextField()
    
    
class MajorWorldCities(models.Model):
    city_name = models.CharField(max_length=120)
    cntry_name = models.CharField(max_length=120)
    pop_class = models.CharField(max_length=120)
    geom = models.MultiPointField(srid=4326)
    
    def __str__(self):
        return self.city_name