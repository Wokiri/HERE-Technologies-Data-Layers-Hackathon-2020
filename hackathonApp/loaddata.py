# # Major Cities


# # from pathlib import Path
# import os
# # os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'data.geojson')
# from django.contrib.gis.utils import LayerMapping
# from .models import MajorWorldCities


# # Change:
# # 1. Classname
# # 2. layer_mapping dict
# # 3. data
# # 4. All the 3 above in run function



# # Auto-generated `LayerMapping` dictionary for MajorWorldCities model
# majorworldcities_mapping = {
#     'city_name': 'CITY_NAME',
#     'cntry_name': 'CNTRY_NAME',
#     'pop_class': 'POP_CLASS',
#     'geom': 'MULTIPOINT',
# }

# # worldborders_data = Path(__file__).resolve().parent / 'appassets' / 'WORLD_BORDERS' / 'TM_WORLD_BORDERS-0.3.shp'
# data = os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'MajorCities.geojson')


# def run(verbose = True):
#     layermap = LayerMapping(MajorWorldCities, data, majorworldcities_mapping, transform=False)
#     layermap.save(strict=True, verbose=verbose)








# # Buildings


# # from pathlib import Path
# import os
# # os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'data.geojson')
# from django.contrib.gis.utils import LayerMapping
# from .models import JburgBuildings


# # Change:
# # 1. Classname
# # 2. layer_mapping dict
# # 3. data
# # 4. All the 3 above in run function



# # Auto-generated `LayerMapping` dictionary for JburgBuildings model
# jburgbuildings_mapping = {
#     'id': 'id',
#     'names': 'names',
#     'featuretype': 'featureType',
#     'buildingtype': 'buildingType',
#     'isocountrycode': 'isoCountryCode',
#     'here_xyz': '@ns:com:here:xyz',
#     'here_mom_meta': '@ns:com:here:mom:meta',
#     'footprints': 'footprints',
#     'geom': 'MULTIPOLYGON25D',
# }

# # worldborders_data = Path(__file__).resolve().parent / 'appassets' / 'WORLD_BORDERS' / 'TM_WORLD_BORDERS-0.3.shp'
# data = os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'JBurg_Buildings.geojson')


# def run(verbose = True):
#     layermap = LayerMapping(JburgBuildings, data, jburgbuildings_mapping, transform=False)
#     layermap.save(strict=True, verbose=verbose)









# Landuse


# # from pathlib import Path
# import os
# # os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'data.geojson')
# from django.contrib.gis.utils import LayerMapping
# from .models import JburgLanduse


# # Change:
# # 1. Classname
# # 2. layer_mapping dict
# # 3. data
# # 4. All the 3 above in run function



# # Auto-generated `LayerMapping` dictionary for JBurg_Landuses model
# jburg_landuses_mapping = {
#     'id': 'id',
#     'cartotype': 'cartoType',
#     'featuretype': 'featureType',
#     'cartotypename': 'cartoTypeName',
#     'here_xyz': '@ns:com:here:xyz',
#     'here_mom_meta': '@ns:com:here:mom:meta',
#     'cartoname': 'cartoName',
#     'geom': 'MULTIPOLYGON25D',
# }

# # worldborders_data = Path(__file__).resolve().parent / 'appassets' / 'WORLD_BORDERS' / 'TM_WORLD_BORDERS-0.3.shp'
# data = os.path.join(os.getcwd(), 'hackathonApp', 'appassets', 'JBurg_Landuse.geojson')


# def run(verbose = True):
#     layermap = LayerMapping(JburgLanduse, data, jburg_landuses_mapping, transform=False)
#     layermap.save(strict=True, verbose=verbose)