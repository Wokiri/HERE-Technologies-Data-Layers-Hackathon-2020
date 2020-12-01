from django.shortcuts import render
from django.contrib.gis.geos import GEOSGeometry

from .models import MajorWorldCities, JburgBuildings, JburgLanduse, CircularAreaGeom


# Create your views here.
def home_view(request, *args, **kwargrs):
    
    context = {
        'majorCities': MajorWorldCities.objects.all()
    }
    
    return render(request, 'hackathonApp/index.html', context)


def spatialResults_view(request, *args, **kwargrs):
    
    CircularAreaGeom.objects.all().delete()
    
    templateData = '{ "type": "Point", "coordinates": [ 5.000000, 23.000000 ] }'
    templateOGRGeometry = GEOSGeometry(templateData)
    firstData = CircularAreaGeom.objects.create(id=1, geomValue=templateOGRGeometry)
    firstData.save()
    
    if request.method == 'POST' or request.method == 'post':
        newJsonValue = request.POST.get('geomValue')
        newOGRGeometry = GEOSGeometry(newJsonValue)
        analysisData = CircularAreaGeom.objects.get(id=1)
        analysisData.geomValue = newOGRGeometry
        analysisData.save()
        
        
    circleData = CircularAreaGeom.objects.get(id=1).geomValue
    
    context = {
        'jburgBuildings' : JburgBuildings.objects.all(),
        'circularArea' : circleData,
        'intersectingLanduse': JburgLanduse.objects.filter(geom__intersects=circleData)
    }
    
    return render(request, 'hackathonApp/spatialResults.html', context)