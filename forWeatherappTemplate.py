import os

forLINKstart = 'href="'

forSRCstart = 'src="'

data = ''

htmlFile = os.path.join(os.getcwd(), 'templates', 'prod', 'index.html')

if os.path.isfile(htmlFile):
    print(f'{htmlFile} file found')
    oldhtmlFile = open(htmlFile, 'rt') #read the index file; 'r' (open for reading text, synonym of 'rt')
    data = oldhtmlFile.read() #read index contents to string
    oldhtmlFile.close()
else:
    print(f'THE FILE => {htmlFile} IS NOT FOUND')
    quit()
    
# Adds djangoStatic load
if data.find('{% load static %}') == -1:
    data = data.replace('<head>', '<head>{% load static %}')


# Adds djangoStatic load
if data.find('{% include \'hackathonApp/form_selection.html\' %}') == -1:
    data = data.replace('<div class="likeSnackBar">', '<div class="likeSnackBar">{% include \'hackathonApp/form_selection.html\' %}')

# 
if data.find('id="geomValueForm">{% csrf_token %}') == -1:
    data = data.replace('id="geomValueForm">', 'id="geomValueForm">{% csrf_token %}')


tempData = data

def checkHTMLhref():
    global data
    global tempData
    
    hrefValStart = tempData[tempData.index(forLINKstart) + 6:]
    hrefVal = hrefValStart[:hrefValStart.index('"')]
    
    if 'https' in hrefVal or 'mailto' in hrefVal or '{% static' in hrefVal or '#' in hrefVal:
        cssLink = hrefVal
    else:
        cssLink = "{% static '" + hrefVal + "' %}"
    
    # Adjusts django hrefs reference
    data = data.replace(hrefVal, cssLink)
    
    tempData = hrefValStart
    
    while tempData.find(forLINKstart) != -1:
        checkHTMLhref()
        
    return data


data2 = checkHTMLhref()
tempData2 = data2

def checkHTMLsrc():
    global data2
    global tempData2
    
    srcStart = tempData2[tempData2.index(forSRCstart) + 5:]
    srcVal = srcStart[:srcStart.index('"')]
    
    if 'https' in srcVal or '{% static' in srcVal:
        src = srcVal
    else:
        src = "{% static '" + srcVal + "' %}"
    
    # Adjusts django hrefs reference
    data2 = data2.replace(srcVal, src)
    
    tempData2 = srcStart
    
    while tempData2.find(forSRCstart) != -1:
        checkHTMLsrc()
        
    return data2


# write the data into a new django-template file
newHTMLPath = os.path.join(os.getcwd(), 'hackathonApp', 'templates', 'hackathonApp', 'index.html')
newHTMLFile = open(newHTMLPath, 'w') #'w' for only writing (an existing file with the same name will be erased),
# Write data
newHTMLFile.write(checkHTMLsrc())
# close file
newHTMLFile.close()
# print(checkHTMLsrc())


if os.path.isfile(newHTMLPath):
    print(f'FILE SUCCESSFULLY WRITTEN AT: {newHTMLPath}')
    print('')