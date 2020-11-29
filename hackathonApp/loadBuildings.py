# Buildings


# from pathlib import Path
import os
# os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'data.geojson')
from django.contrib.gis.utils import LayerMapping
from .models import JburgBuildings


# Change:
# 1. Classname
# 2. layer_mapping dict
# 3. data
# 4. All the 3 above in run function



# Auto-generated `LayerMapping` dictionary for JburgBuildings model
jburgbuildings_mapping = {
    'id': 'id',
    'names': 'names',
    'featuretype': 'featureType',
    'buildingtype': 'buildingType',
    'isocountrycode': 'isoCountryCode',
    'here_xyz': '@ns:com:here:xyz',
    'here_mom_meta': '@ns:com:here:mom:meta',
    'footprints': 'footprints',
    'geom': 'MULTIPOLYGON25D',
}

# worldborders_data = Path(__file__).resolve().parent / 'appassets' / 'WORLD_BORDERS' / 'TM_WORLD_BORDERS-0.3.shp'
data = os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'JBurg_Buildings.geojson')


def run(verbose = True):
    layermap = LayerMapping(JburgBuildings, data, jburgbuildings_mapping, transform=False)
    layermap.save(strict=True, verbose=verbose)