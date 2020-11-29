# Major Cities


# from pathlib import Path
import os
# os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'data.geojson')
from django.contrib.gis.utils import LayerMapping
from .models import MajorWorldCities


# Change:
# 1. Classname
# 2. layer_mapping dict
# 3. data
# 4. All the 3 above in run function



# Auto-generated `LayerMapping` dictionary for MajorWorldCities model
majorworldcities_mapping = {
    'city_name': 'CITY_NAME',
    'cntry_name': 'CNTRY_NAME',
    'pop_class': 'POP_CLASS',
    'geom': 'MULTIPOINT',
}

# worldborders_data = Path(__file__).resolve().parent / 'appassets' / 'WORLD_BORDERS' / 'TM_WORLD_BORDERS-0.3.shp'
data = os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'MajorCities.geojson')


def run(verbose = True):
    layermap = LayerMapping(MajorWorldCities, data, majorworldcities_mapping, transform=False)
    layermap.save(strict=True, verbose=verbose)